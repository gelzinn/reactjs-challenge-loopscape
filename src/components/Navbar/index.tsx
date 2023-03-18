import { BookmarkSimple, ClockCounterClockwise, Gear, Heart, MagnifyingGlass } from "phosphor-react";
import { NavbarContainer } from "./styles";

interface NavbarProps {
  location: string;
  modals: {
    bookmarks: boolean,
    custom: boolean,
    history: boolean,
  },
  setModalsState: any,
}

export const Navbar = ({
  
}: NavbarProps) => {
  return (
    <NavbarContainer>
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
      </NavbarContainer>
  )
}