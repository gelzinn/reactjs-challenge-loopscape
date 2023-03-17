import { useEffect } from "react";
import SearchMap from "./components/SearchMap"

function App() {
  function setColorScheme(scheme: string) {
    const body = document.querySelector("body");

    if (!body) return;

    switch(scheme){
      case 'dark':
        body.setAttribute("data-theme", "dark");
        break;
      case 'light':
        body.setAttribute("data-theme", "light");
        break;
      default:
        body.setAttribute("data-theme", "dark");
        break;
    }
  }
  
  function getPreferredColorScheme() {
    if (window.matchMedia) {
      if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        return 'dark';
      } else {
        return 'light';
      }
    }
    return 'dark';
  }

  useEffect(() => {
    if(!window.matchMedia) return

    var colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeQuery.addEventListener('change', updateColorScheme);

    function updateColorScheme(){
      setColorScheme(getPreferredColorScheme());
    }

    updateColorScheme();
  }, [window.matchMedia])

  return (
    <>
      <SearchMap />
    </>
  )
}

export default App
