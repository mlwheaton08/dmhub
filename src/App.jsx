import { Route, Routes } from 'react-router-dom'
import { CombatTracker1 } from './components/combat_tracker/v1/CombatTracker1'
import { CombatTracker2 } from './components/combat_tracker/v2/CombatTracker2'
import { Home } from './components/home/Home'

export default function App() {

	return (
		<Routes>
			<Route path="/" element={ <Home /> } />
			<Route path="/combat_tracker_v1" element={ <CombatTracker1 /> } />
			<Route path="/combat_tracker_v2" element={ <CombatTracker2 /> } />
		</Routes>
	)
}