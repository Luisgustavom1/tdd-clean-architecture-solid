import { LoadSurveyList } from '@/domain/usecases'
import { Calendar } from '@/presentation/components/calendar'
import { Icon, IconName } from '@/presentation/components/icon'
import React from 'react'
import Styles from './list-item.scss'

type Props = {
  survey: LoadSurveyList.Model
}

export const SurveyItem = ({ survey }: Props) => {
  return (
    <li data-testid='survey-item' className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon
          className={Styles.iconWrap}
          icon={survey.didAnswer ? IconName.thumbUp : IconName.thumbDown}
        />
        <Calendar date={survey.date} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>
        <a href={`/surveys/${survey.id}`}>
          Ver Resultado
        </a>
      </footer>
    </li>
  )
}
