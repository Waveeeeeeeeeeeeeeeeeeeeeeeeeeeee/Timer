import { SApp, SHeader } from './assets/styles/app.styles';
import { Timer } from './components/Timer';

function App() {
    return (
        <SApp>
            <SHeader>
                <Timer></Timer>
            </SHeader>
        </SApp>
    );
}

export default App;
