import { BookmarkSimple, ClockCounterClockwise, Gear, Heart, HeartBreak, MagnifyingGlass, Moon, SmileyXEyes, Sun, TrashSimple, X } from "phosphor-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { LocationResponse } from "../../models/localStorage";
import { Modal } from "../Modal";
import { MapContainer, Navbar, SearchMapContainer } from "./styles";

const SearchMap = () => {
  const initialLocalStorageHistory: string | [] = localStorage.getItem("geolocation-history") || [];
  const initialLocalStorageBookmark: string | [] = localStorage.getItem("geolocation-bookmark") || [];
  
  const [location, setLocation] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [searchError, setSearchError] = useState<string | unknown>("");
  const [recentSearch, setRecentSearch] = useState<LocationResponse | null>();

  const [searchButtonLoading, setSearchButtonLoading] = useState<boolean>(false);
  
  const [historyStorage, setHistoryStorage] = useState<any>(initialLocalStorageHistory)
  const [bookmarkStorage, setBookmarkStorage] = useState<any>(initialLocalStorageBookmark)

  const [modalsOpenned, setModalsOpenned] = useState({
    history: false,
    bookmarks: false,
    custom: false
  })

  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapperRef = useRef<HTMLInputElement>(null);

  const GoogleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API

  useEffect(() => {
    if (initialLocalStorageHistory) {
      if (typeof initialLocalStorageHistory === 'string') {
        setHistoryStorage(JSON.parse(initialLocalStorageHistory) as string);
      } else {
        setHistoryStorage(initialLocalStorageHistory as []);
      }
    }

    if (initialLocalStorageBookmark) {
      if (typeof initialLocalStorageBookmark === 'string') {
        setBookmarkStorage(JSON.parse(initialLocalStorageBookmark) as string);
      } else {
        setBookmarkStorage(initialLocalStorageBookmark as []);
      }
    }
  }, [])

  useEffect(() => {
    if (historyStorage) {
      localStorage.setItem("geolocation-history", JSON.stringify(historyStorage));
    }
  }, [historyStorage])

  useEffect(() => {
    if (bookmarkStorage) {
      localStorage.setItem("geolocation-bookmark", JSON.stringify(bookmarkStorage));
    }
  }, [bookmarkStorage])

  useEffect(() => {
    if (!searchError) return
    console.log(searchError);
  }, [searchError])

  function handleSubmitLocation(e: FormEvent) {
    e.preventDefault();
    setRecentSearch(null);

    if (!search) {
      inputRef.current?.focus();
      return;
    }

    const getLocationInfo = async () => {
      try {
        setSearchButtonLoading(true)

        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=${GoogleMapsKey}`)
        const data = await res.json()

        setHistoryStorage([...historyStorage, {
          id: uuidv4(),
          search,
          address: data.results[0].formatted_address,
          placeId: data.results[0].place_id,
          coords: {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
          },
          timestamp: new Date().toISOString(),
        }])
        
        setRecentSearch({
          id: uuidv4(),
          search,
          address: data.results[0].formatted_address,
          placeId: data.results[0].place_id,
          coords: {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
          },
          timestamp: new Date().toISOString(),
        })

        // window.history.replaceState(null, `${search} — Geolocation`, `/&search=${search}?lat=${data.results[0].geometry.location.lat}?lng=${data.results[0].geometry.location.lng}`)

        // localStorage.setItem("geolocation-history", JSON.stringify(historyStorage?.map((item: any) => item)));
      } catch (error) {
        setSearchError(error);
      } finally {
        setSearchButtonLoading(false)
      }
    }

    getLocationInfo();
    setLocation(search);
  }

  function handleSaveLocation (id: string) {
    if (!recentSearch || !bookmarkStorage) return;

    if (bookmarkStorage.some((bookmark: any) => bookmark.id === recentSearch.id)) {
      setBookmarkStorage(bookmarkStorage?.filter((item: any) => item.id != id));
      return;
    } else {
      setBookmarkStorage([...bookmarkStorage, recentSearch]);
      return;
    }
  }

  function handleClearSearchAndLocation () {
    setSearch("")
    setLocation("")
  }

  function handleClearStorage(storage: string) {
    switch (storage) {
      case "bookmark":
        if (!initialLocalStorageBookmark) return;

        setBookmarkStorage([]);
        localStorage.removeItem("geolocation-bookmark")
        break;
      case "history":
        if (!initialLocalStorageHistory) return;

        setHistoryStorage([]);
        localStorage.removeItem("geolocation-history")
        break;
    }
  }

  return (
    <SearchMapContainer>
      {modalsOpenned && (
        <>
          {(() => {
            if (modalsOpenned.history) {
              return (
                <Modal title="Recentes" label={`${historyStorage?.length} de 20`} onClose={() => {
                  setModalsOpenned({
                    ...modalsOpenned,
                    history: !modalsOpenned.history
                  })
                }}>
                  {historyStorage && historyStorage?.length > 0 ? (
                    <ul>
                      {Array.from(historyStorage).reverse().map(({ search, address, id }: any, index: number) => {
                        return (
                          <a
                            key={id}
                            id={id}
                            onClick={() => {
                              setModalsOpenned({
                                ...modalsOpenned,
                                history: !modalsOpenned.history
                              })
                              setSearch(search)
                              setLocation(search)

                              window.history.pushState({}, document.title, "/");
                            }}
                          >
                            <div className="info">
                              <span>{address.substring(0, address.indexOf(","))}</span>
                              <p>{address}</p>
                              <pre>{index + 1}</pre>
                            </div>
                            <button onClick={(e) => {
                              e.stopPropagation(); 
                              setHistoryStorage(historyStorage.filter((item: any) => item.id != id))
                            }}>
                              <X />
                            </button>
                          </a>
                        )
                      })}
                       <a
                        className="clear"
                        onClick={() => handleClearStorage("history")}
                      >
                        Limpar histórico de pesquisa
                      </a>
                    </ul>
                  ) : (
                    <div className="warning">
                      <SmileyXEyes weight="light" />
                      <div className="message">
                        <strong>Não há buscas recentes disponíveis.</strong>
                        <p>Faça uma agora!</p>
                      </div>
                    </div>
                  )}
                </Modal>
              )
            }

            if (modalsOpenned.bookmarks) {
              return (
                <Modal title="Salvos" label={`${bookmarkStorage?.length} de 20`}>
                  {bookmarkStorage && bookmarkStorage?.length > 0 ? (
                    <ul>
                      {Array.from(bookmarkStorage).reverse().map(({ search, address, id }: any, index: number) => {
                        return (
                          <a
                            key={id}
                            id={id}
                            onClick={() => {
                              setModalsOpenned({
                                ...modalsOpenned,
                                bookmarks: !modalsOpenned.bookmarks
                              })
                              setSearch(search)
                              setLocation(search)

                              window.history.pushState({}, document.title, "/");
                            }}
                          >
                            <div className="info">
                              <span>{address.substring(0, address.indexOf(","))}</span>
                              <p>{address}</p>
                              <pre>{index + 1}</pre>
                            </div>
                            <button onClick={(e) => {
                              e.stopPropagation(); 
                              setBookmarkStorage(bookmarkStorage.filter((item: any) => item.id != id))
                            }}>
                              <X />
                            </button>
                          </a>
                        )
                      })}
                      <a
                        className="clear"
                        onClick={() => handleClearStorage("bookmark")}
                      >
                        Limpar histórico de salvos
                      </a>
                    </ul>
                  ) : (
                    <div className="warning">
                      <HeartBreak weight="light" />
                      <div className="message">
                        <strong>Não há buscas favoritas disponíveis.</strong>
                        <p>Salve uma agora!</p>
                      </div>
                    </div>
                  )}
                </Modal>
              )
            }

            if (modalsOpenned.custom) {
              const body = document.querySelector("body");
              const getTheme = body?.getAttribute("data-theme");

              function handleCheckExistentLocalStorage() {
                if (historyStorage || bookmarkStorage) {
                  return true;
                } else {
                  return false;
                }
              }

              function handleThemeSwitcher (themeButton: string) {
                const darkThemeButton = document.querySelector("#theme-switcher-btn-dark");
                const lightThemeButton = document.querySelector("#theme-switcher-btn-light");

                if (themeButton == "dark") {
                  body?.setAttribute("data-theme", "dark");

                  lightThemeButton?.classList.remove("selected");
                  darkThemeButton?.classList.add("selected");
                }

                if (themeButton == "light") {
                  body?.setAttribute("data-theme", "light");

                  darkThemeButton?.classList.remove("selected");
                  lightThemeButton?.classList.add("selected");
                }
              }

              function handleDeleteLocalStorage () {
                try {
                  handleClearStorage("bookmark");
                  handleClearStorage("history");

                  return alert("Conteúdo armazenado sobre seus dados de navegação, foram deletados com sucesso!");
                } catch (error) {
                  return console.log(error);
                }
              }

              return (
                <Modal title="Personalizar" right>
                  <span className="subtitle">Temas</span>
                  <div className="theme-switcher">
                    <button
                      id="theme-switcher-btn-dark"
                      className={getTheme == "dark" ? "selected" : ""}
                      onClick={() => handleThemeSwitcher("dark")}
                    >
                      <Moon />
                      <p>Escuro</p>
                    </button>
                    <button
                      id="theme-switcher-btn-light"
                      className={getTheme == "light" ? "selected" : ""}
                      onClick={() => handleThemeSwitcher("light")}
                    >
                      <Sun />
                      <p>Claro</p>
                    </button>
                  </div>
                  <span className="subtitle">Armazenamento</span>
                  <div>
                    <button
                      id="theme-switcher-btn-dark"
                      disabled={handleCheckExistentLocalStorage() ? false : true}
                      onClick={handleDeleteLocalStorage}
                    >
                      <TrashSimple />
                      <p>Excluir conteúdo</p>
                    </button>
                  </div>
                </Modal>
              )
            }
          })()}
        </>
      )}

      <MapContainer>
        <iframe
          frameBorder="0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          id="google-maps"
          src={
            location ?
            `https://www.google.com/maps/embed/v1/place?key=${GoogleMapsKey}&q=${location}` :
            `https://www.google.com/maps/embed/v1/place?key=${GoogleMapsKey}&q=Rua Campos Salles, 865, 17201-020, Jaú–SP`
          }>
        </iframe>
      </MapContainer>

      <Navbar>
        {location && recentSearch && (
          <div className="save-location">
            <div className="location">
              <span>{recentSearch.address.substring(0, recentSearch.address.indexOf(","))}</span>
              <p>{recentSearch.address}</p>
            </div>
            <button
              className="save"
              onClick={() => {
                handleSaveLocation(recentSearch.id)
              }}
            >
              {bookmarkStorage.some((bookmark: any) => bookmark.id === recentSearch.id) ? <Heart weight="fill" /> : <Heart />}
            </button>
          </div>
        )}
        <a
          className={modalsOpenned.history ? "active" : ""}
          onClick={() => {
            setModalsOpenned({
              bookmarks: false,
              custom: false,
              history: !modalsOpenned.history
            })
          }}
        >
          <ClockCounterClockwise />
          <span>Recentes</span>
        </a>
        <a
          className={modalsOpenned.bookmarks ? "active" : ""}
          onClick={() => {
            setModalsOpenned({
              bookmarks: !modalsOpenned.bookmarks,
              custom: false,
              history: false
            })
          }}
        >
          <BookmarkSimple />
          <span>Salvos</span>
        </a>
        <form onSubmit={handleSubmitLocation}>
          <div
            ref={inputWrapperRef}
            onClick={() => inputRef.current?.focus()}
          >
            <input
              type="text"
              placeholder="Insira uma localização aqui"
              required
              ref={inputRef}
              value={search}
              disabled={searchButtonLoading ? true : false}
              onInput={(e: ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('')}
              onInvalid={(e: ChangeEvent<HTMLInputElement>) => e.target.setCustomValidity('Por favor, preencha uma localização.')}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value);
              }}
            />
            {location && search.length > 0 && (
              <button onClick={handleClearSearchAndLocation}>
                <X />
              </button>
            )}
            <button type="submit" disabled={location === search}>
              <MagnifyingGlass />
            </button>
          </div>
        </form>
        <a
          className={modalsOpenned.custom ? "active" : ""}
          onClick={() => {
            setModalsOpenned({
              bookmarks: false,
              custom: !modalsOpenned.custom,
              history: false
            })
          }}
        >
          <Gear />
          <span>Personalizar</span>
        </a>
      </Navbar>
    </SearchMapContainer>
  )
}

export default SearchMap;