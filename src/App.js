import { ThemeProvider } from 'styled-components/native';
import { Main } from './screens';
import { theme } from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}
