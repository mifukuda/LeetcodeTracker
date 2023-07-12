import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WelcomeScreen, EnterSolutionModal, HomeScreen } from './components';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<WelcomeScreen/>}/> 
				<Route path="/home" element={<HomeScreen/>}/>
				<Route path="/entersolution" element={<EnterSolutionModal/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
