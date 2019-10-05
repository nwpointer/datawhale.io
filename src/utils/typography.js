import Typography from "typography"
import github from "typography-theme-github"

github.overrideThemeStyles = ({ rhythm, scale }, options) => ({
    'h1,h2':{ border:'0px' },
    'container': {'padding-right': rhythm(1.5), 'padding-left': rhythm(1.5)}   
})

github.baseLineHeight = 1.8
github.googleFonts = [
    {
        name: "Avenir",
        styles: ["300i", "400", "400i", "500", "600", "700"],
    }
]

const typography = new Typography(github)

export const { scale, rhythm, options } = typography
export default typography