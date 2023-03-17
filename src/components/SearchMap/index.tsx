import { BookmarkSimple, ClockCounterClockwise, Gear, Heart, MagnifyingGlass, SmileyXEyes, X } from "phosphor-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "../Modal";
import { MapContainer, Navbar } from "./styles";

const SearchMap = () => {
  const initialLocalStorageHistory: any = localStorage.getItem("geolocation-history") || [];

  const [location, setLocation] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [searchError, setSearchError] = useState<string | unknown>("");
  
  const [historyStorage, setHistoryStorage] = useState<any>(initialLocalStorageHistory)

  const [modalsOpenned, setModalsOpenned] = useState({
    history: false,
    bookmarks: false,
    custom: false
  })

  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapperRef = useRef<HTMLInputElement>(null);

  const GoogleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API
  
  useEffect(() => {
    if (historyStorage) {
      // localStorage.setItem("geolocation-history", JSON.stringify(historyStorage?.map((item: string[]) => item)));
      // console.log(historyStorage)
    }
  }, [historyStorage])

  useEffect(() => {
    if (!searchError) return
    console.log(searchError);
  }, [searchError])

  function handleSubmitLocation(e: FormEvent) {
    e.preventDefault();

    if (!search) {
      inputRef.current?.focus();
      return;
    }

    const getLocationInfo = async () => {
      try {
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=${GoogleMapsKey}`)
        const data = await res.json()

        setHistoryStorage([...historyStorage, {
          id: uuidv4(),
          search: search,
          address: data.results[0].formatted_address,
          placeId: data.results[0].place_id,
          coords: {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
          },
          timestamp: new Date()
        }])

        window.history.replaceState(null, `${search} — Geolocation`, `/&search=${search}?lat=${data.results[0].geometry.location.lat}?lng=${data.results[0].geometry.location.lng}`)

        // localStorage.setItem("geolocation-history", JSON.stringify(historyStorage?.map((item: any) => item)));
      } catch (error) {
        setSearchError(error);
      }
    }

    getLocationInfo();
    setLocation(search);
  }

  function handleClearSearchAndLocation () {
    setSearch("")
    setLocation("")
  }

  return (
    <>
      {modalsOpenned && (
        <>
          {(() => {
            if (modalsOpenned.history) {
              return (
                <Modal title="Recentes" onClose={() => {
                  setModalsOpenned({
                    ...modalsOpenned,
                    history: !modalsOpenned.history
                  })
                }}>
                  {historyStorage && historyStorage.length > 0 ? (
                    <ul>
                      {Array.from(historyStorage).sort().map(({ search, address, id }: any) => {
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
                              <span>{search}</span>
                              <p>{address}</p>
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
                <Modal title="Salvos">
                  <div className="warning">
                      <SmileyXEyes weight="light" />
                      <div className="message">
                        <strong>Não há buscas favoritas disponíveis.</strong>
                        <p>Salve uma agora!</p>
                      </div>
                    </div>
                </Modal>
              )
            }

            if (modalsOpenned.custom) {
              return (
                <Modal title="Personalizar" right>
                  <p>Em breve</p>
                </Modal>
              )
            }
          })()}
        </>
      )}
      <Navbar>
        {location && (
          <div className="save-location">
            <div className="location">
              <span>{location}</span>
              {/* <p>{location}</p> */}
            </div>
            <button className="save">
              <Heart />
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
    </>
  )
}

export default SearchMap;