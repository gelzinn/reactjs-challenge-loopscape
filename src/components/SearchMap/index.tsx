import { MapContainer, SearchWrapper } from "./styles";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

const SearchMap = () => {
  const [location, setLocation] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmitLocation(e: FormEvent) {
    e.preventDefault();

    if (!search) {
      alert ("Preencha a localização para pesquisar.")
      return;
    }

    setLocation(search);
  }

  return (
    <>
      <SearchWrapper>
        <form className="container" onSubmit={handleSubmitLocation}>
          <div
            onClick={() => inputRef.current?.focus()}
          >
            <input
              type="text"
              placeholder="Insira a localização aqui"
              ref={inputRef}
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value);
              }}
            />
            {search && (
              <button onClick={() => {
                setLocation("")
                setSearch("")
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
                  <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
                </svg>
              </button>
            )}
          </div>
          <button type="submit">
            Pesquisar
          </button>
        </form>
      </SearchWrapper>
      <MapContainer>
        <iframe
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={
            location ?
            `https://www.google.com/maps/embed/v1/place?key=AIzaSyB2biQd8aXsBGvnhDNVLGutoZHUo5Z8G68
            &q=${location}` :
            `https://www.google.com/maps/embed/v1/place?key=AIzaSyB2biQd8aXsBGvnhDNVLGutoZHUo5Z8G68
            &q=Rua Campos Salles, 865, 17201-020, Jaú–SP`
          }>
        </iframe>
      </MapContainer>
    </>
  )
}

export default SearchMap;