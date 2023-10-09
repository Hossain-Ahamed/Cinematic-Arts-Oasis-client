import { useEffect, useState } from "react"
import ThemeButton from "./components/Theme/ThemeButton";


function App() {
  const [theme, setTheme] = useState(null);


  useEffect(() => {
    if (localStorage.getItem("c_art_THEME") === 'dark') {
      setTheme("dark")
    } else if (localStorage.getItem("c_art_THEME") === 'light') {
      setTheme('light')
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme("dark")
      } else {
        setTheme("light")
      }
    }
  }, [])

  useEffect(() => {
    if (theme === "dark") {
      localStorage.setItem("c_art_THEME", "dark")
      document.documentElement.classList.add("dark")
    } else if (theme === "light") {
      localStorage.setItem("c_art_THEME", "light")
      document.documentElement.classList.remove("dark")
    }
  }, [theme])


  return (
    <>


      <ThemeButton theme={theme} setTheme={setTheme} />
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme}</button>
    </>
  )
}

export default App
