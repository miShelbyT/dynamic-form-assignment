import React from 'react'

function MailingAddressBlock({
  address1,
  setAddress1,
  address2,
  setAddress2,
  address3,
  setAddress3,
  city,
  setCity,
  userState,
  setUserState,
  zip,
  setZip,
}) {
  return (
    <>
      <h3>Please enter your mailing address:</h3>
      <fieldset>
        <legend>Mailing Address</legend>
        <label htmlFor="address-1">Address: </label>
        <input
          id="address-1"
          required
          type="text"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
        />
        <label htmlFor="address-2">Address (cont): </label>
        <input
          id="address-2"
          type="text"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
        <label htmlFor="address-3">Address (cont): </label>
        <input
          id="address-3"
          type="text"
          value={address3}
          onChange={(e) => setAddress3(e.target.value)}
        />
        <label htmlFor="city">City: </label>
        <input
          id="city"
          required
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label htmlFor="state">State: </label>
        <input
          id="state"
          required
          type="text"
          value={userState}
          onChange={(e) => setUserState(e.target.value)}
        />
        <label htmlFor="zip">Zip: </label>
        <input
          id="zip"
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
