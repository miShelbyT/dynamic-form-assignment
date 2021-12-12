import { useState, useEffect } from 'react'
import MailingAddressBlock from './MailingAddressBlock'
import { useLocalStorage } from './useLocalStorage'

function Form() {
  const [email, setEmail] = useLocalStorage('email', '')
  const [firstName, setFirstName] = useLocalStorage('firstName', '')
  const [middleName, setMiddleName] = useLocalStorage('middleName', '')
  const [lastName, setLastName] = useLocalStorage('lastName', '')
  const [dob, setDob] = useLocalStorage('dob', '')

  const [spouse, setSpouse] = useLocalStorage('spouseSelected', '')

  const [spouseFirstName, setSpouseFirstName] = useLocalStorage(
    'spouseFirstName',
    ''
  )
  const [spouseMiddleName, setSpouseMiddleName] = useLocalStorage(
    'spouseMiddleName',
    ''
  )
  const [spouseLastName, setSpouseLastName] = useLocalStorage(
    'spouseLastName',
    ''
  )
  const [spouseDob, setSpouseDob] = useLocalStorage('spouseDob', '')

  const [children, setChildren] = useLocalStorage('children', '')

  const [numChildren, setNumChildren] = useLocalStorage('numChildren', '')
  const [address1, setAddress1] = useLocalStorage('address1', '')
  const [address2, setAddress2] = useLocalStorage('address2', '')
  const [address3, setAddress3] = useLocalStorage('address3', '')
  const [city, setCity] = useLocalStorage('city', '')
  const [userState, setUserState] = useLocalStorage('userState', '')
  const [zip, setZip] = useLocalStorage('zip', '')

  const [received, setReceived] = useState('No')

  //borrowed from client.js => no need to reinvent the wheel. thank you!
  function stripEmpty(obj) {
    return Object.keys(obj)
      .filter(function (k) {
        return obj[k] !== null && obj[k] !== ''
      })
      .reduce(function (acc, k) {
        var v = obj[k]
        if (typeof v === 'object') {
          v = stripEmpty(v)
          if (Object.keys(v).length !== 0) {
            acc[k] = v
          }
        } else {
          acc[k] = v
        }
        return acc
      }, {})
  }

  function handleOnSubmit(e) {
    e.preventDefault()

    const application = {
      account: {
        email: email,
      },
      applicant: {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        date_of_birth: dob,
        spouse: {
          first_name: spouseFirstName,
          middle_name: spouseMiddleName,
          last_name: spouseLastName,
          date_of_birth: spouseDob,
        },
        dependents: {
          number_of_children: parseInt(numChildren) || null,
        },
      },
      mailing_address: {
        address1: address1,
        address2: address2,
        address3: address3,
        city: city,
        state: userState,
        zip: zip,
      },
    }

    fetch('http://localhost:8888', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(stripEmpty(application)),
    })
      .then((response) => response.json())
      .then((data) => setReceived('Yes'))
  }

  function applicationAccepted() {
    return (
      <h4>
        Your application has been received, we will be in touch shortly. Please
        save this page for your records.
      </h4>
    )
  }
  useEffect(() => {}, [email, firstName, middleName, lastName])

  return (
    <form onSubmit={handleOnSubmit}>
      <h3>
        Thank you for your interest in our product. Please fill out the
        following information:
      </h3>
      <fieldset>
        <legend>Applicant</legend>
        <label>First Name: </label>
        <input
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>Middle Name: </label>
        <input
          type="text"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <label>Last Name: </label>
        <input
          type="text"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>Date of Birth: </label>
        <input
          type="date"
          required
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        {firstName === '' || lastName === '' || dob === '' ? null : (
          <fieldset>
            <label>Email Address: </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
        )}

        {email === '' ? null : (
          <>
            <h3>Would You Like To Enroll A Spouse?</h3>
            <label>Yes </label>
            <input
              type="radio"
              name="spouse"
              checked={spouse === 'Yes'}
              value="Yes"
              onChange={() => setSpouse('Yes')}
            />
            <label>No </label>
            <input
              type="radio"
              name="spouse"
              checked={spouse === 'No'}
              value="No"
              onChange={() => setSpouse('No')}
            />
          </>
        )}

        {spouse === 'Yes' ? (
          <fieldset>
            <legend>Spouse</legend>
            <label>First Name: </label>
            <input
              type="text"
              value={spouseFirstName}
              onChange={(e) => setSpouseFirstName(e.target.value)}
            />
            <label>Middle Name: </label>
            <input
              type="text"
              value={spouseMiddleName}
              onChange={(e) => setSpouseMiddleName(e.target.value)}
            />
            <label>Last Name: </label>
            <input
              type="text"
              value={spouseLastName}
              onChange={(e) => setSpouseLastName(e.target.value)}
            />
            <label>Date of Birth: </label>
            <input
              type="date"
              value={spouseDob}
              onChange={(e) => setSpouseDob(e.target.value)}
            />
          </fieldset>
        ) : null}

        {spouse === 'No' ||
        spouseFirstName !== '' ||
        spouseLastName !== '' ||
        spouseDob !== '' ? (
          <>
            <h3>Do You Have Any Dependent Children?</h3>
            <label>Yes </label>
            <input
              type="radio"
              name="children"
              checked={children === 'Yes'}
              value="Yes"
              onChange={() => setChildren('Yes')}
            />
            <label>No </label>
            <input
              type="radio"
              name="children"
              checked={children === 'No'}
              value="No"
              onChange={() => setChildren('No')}
            />
          </>
        ) : null}
        {children === 'Yes' ? (
          <fieldset>
            <label>Number of Children: </label>
            <input
              type="number"
              min="1"
              value={numChildren}
              onChange={(e) => setNumChildren(e.target.value)}
            />
          </fieldset>
        ) : null}

        {children === 'No' || numChildren !== '' ? (
          <MailingAddressBlock
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            address3={address3}
            setAddress3={setAddress3}
            city={city}
            setCity={setCity}
            userState={userState}
            setUserState={setUserState}
            zip={zip}
            setZip={setZip}
          />
        ) : null}
      </fieldset>
      <h4 style={{color: 'red'}}>Please do not click the Submit button more than once.</h4>
      <button>Submit</button>

      {received === 'Yes' ? applicationAccepted() : null}
    </form>
  )
}

export default Form
