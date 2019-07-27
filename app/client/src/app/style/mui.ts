import { createMuiTheme } from "@material-ui/core";

declare module "@material-ui/core/styles/createMuiTheme" {

  // tslint:disable-next-line:interface-name
  interface Theme {
    navHeight: string;
  }

  // allow configuration using `createMuiTheme`
  // tslint:disable-next-line:interface-name
  interface ThemeOptions {
    navHeight?: string;
  }
}

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  navHeight: "64px"
});

export default theme;
