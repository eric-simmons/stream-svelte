//why is it underlined?
import './app.css'
import App from './App.svelte'
//output the app component at the target div 'app'
const app = new App({
    target: document.getElementById('app')
})

export default App