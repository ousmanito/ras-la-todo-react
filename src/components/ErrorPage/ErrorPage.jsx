import React from 'react'
import errorImg from "./ErrorImg.png"
import "./ErrorPage.css"


const ErrorPage = () => {
  return (
    <>
      <div className='error-container'>
        <h1 id='error-container__title'>Ooops ...</h1>
        <h2 id='error-container__content'>Problème de connexion, veuillez réessayer plus tard !</h2>
        <img id="error-container__img" src={errorImg} alt="Image d'erreur" />
      </div>
    </>
  )
}

export default ErrorPage