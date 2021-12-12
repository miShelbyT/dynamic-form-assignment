import React from 'react'

function MailingAddressBlock({address1, setAddress1, address2, setAddress2, address3, setAddress3, city, setCity, userState, setUserState, zip, setZip }) {
  return (
    <>
     <h3>Please enter your mailing address:</h3>
    <fieldset>
        <legend>Mailing Address</legend>
        <label>Address: </label>
        <input
          required
          type="text"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
        />
        <label>Address (cont): </label>
        <input
          type="text"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
        <label>Address (cont): </label>
        <input
          type="text"
          value={address3}
          onChange={(e) => setAddress3(e.target.value)}
        />
        <label>City: </label>
        <input
          required
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label>State: </label>
        <input
          required
          type="text"
          value={userState}
          onChange={(e) => setUserState(e.target.value)}
        />
        <label>Zip: </label>
        <input
          required
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
      </fieldset>
      </>
  )
}

export default MailingAddressBlock
