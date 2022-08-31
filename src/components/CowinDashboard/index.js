import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'

import VaccinationByGender from '../VaccinationByGender'

import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const appConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    appStatus: appConstants.initial,
    resultObject: {},
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const option = {
      method: 'GET',
    }
    const response = await fetch(vaccinationDataApiUrl, option)
    const data = await response.json()
    if (response.ok) {
      const newObject = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      const {last7DaysVaccination} = newObject
      const newLast7DaysVaccination = last7DaysVaccination.map(eachValue => ({
        vaccineDate: eachValue.vaccine_date,
        dose1: eachValue.dose_1,
        dose2: eachValue.dose_2,
      }))

      console.log(last7DaysVaccination)
      newObject.last7DaysVaccination = [...newLast7DaysVaccination]
      this.setState({appStatus: appConstants.success, resultObject: newObject})
    } else {
      this.setState({appStatus: appConstants.failure})
    }
  }

  successState = () => {
    const {resultObject} = this.state
    return (
      <>
        <VaccinationCoverage resultObject={resultObject} />
        <VaccinationByGender resultObject={resultObject} />
        <VaccinationByAge resultObject={resultObject} />
      </>
    )
  }

  failureState = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  appState = () => {
    const {appStatus} = this.state
    switch (appStatus) {
      case appConstants.success:
        return this.successState()
      case appConstants.failure:
        return this.failureState()
      case appConstants.initial:
        return (
          <div className="loadercontainer" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="img"
          />
          <h1 className="main">Co-WIN</h1>
        </div>
        <h1 className="sub">CoWIN Vaccination in India</h1>
        {this.appState()}
      </div>
    )
  }
}

export default CowinDashboard
