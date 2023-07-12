import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WelcomeScreen, EnterSolutionScreen } from './components';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<WelcomeScreen/>}/> 
				<Route path="/entersolution" element={<EnterSolutionScreen/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
