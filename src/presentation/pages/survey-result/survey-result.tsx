import React from 'react'
import FlipMove from 'react-flip-move'
import Button from '@/presentation/components/button'
import Footer from '@/presentation/components/footer'
import Header from '@/presentation/components/header'
import Styles from './survey-result-styles.scss'
import { Loading } from '@/presentation/components/loading'

export const SurveyResult = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />

      <section className={Styles.contentWrap}>
        <h2>Qual é seu framework web favorito</h2>
        <FlipMove className={Styles.answersList}>
          <li>
            <img src="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" />
            <span className={Styles.answer}>ReactJs</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li className={Styles.active}>
            <img src="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" />
            <span className={Styles.answer}>ReactJs</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li>
            <img src="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" />
            <span className={Styles.answer}>ReactJs</span>
            <span className={Styles.percent}>50%</span>
          </li>
        </FlipMove>
        <Button variant='filled'>Voltar</Button>
        {true && <Loading />}
      </section>

      <Footer />
    </div>
  )
}
