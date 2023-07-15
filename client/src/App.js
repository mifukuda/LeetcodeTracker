import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WelcomeScreen, EnterSolutionModal, HomeScreen, ProblemScreen, LoginScreen, CreateAccountScreen } from './components';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<WelcomeScreen/>}/>
				<Route path="/login" element={<CreateAccountScreen/>}/>
				<Route path="/login" element={<LoginScreen/>}/>
				<Route path="/home" element={<HomeScreen/>}/>
				<Route path="/problem/:id" element={<ProblemScreen/>}/>
				<Route path="/entersolution" element={<EnterSolutionModal/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
