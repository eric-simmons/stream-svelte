import preprocess from 'svelte-preprocess';


//prepend so i can use sass in any style and also use my variables without the @use in every tag
const config = {
  preprocess: preprocess({
    scss: {
      prependData: '@use "src/styles/variables.scss";'
    }
  })
}

export default config