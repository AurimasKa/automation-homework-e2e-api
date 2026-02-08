export const card = {
  number: '4242 4242 4242 4242',
  cvv: '111',
  nameOnCard: 'Testas Testauskas',
  expiryMonth: '01',
  expiryYear: '2027',
} as const;

export const billingAddress = {
  city: 'Vilnius',
  street: 'Antakalnio g. 1-1',
  zipCode: '01234',
} as const;

export const personalDetails = {
  firstMiddleName: 'Testas',
  lastName: 'Testauskas',
  phoneNumber: '61234567',
  dateOfBirth: { year: '1992', month: 'Jan', day: '01' } as const,
  email: 'test@example.com',
} as const;

export const bitcoinAddress = '1FfmbHfnpaZjKFvyi1okTjJJusN455paPH';

export const adaAddress = 'Ae2tdPwUPEZFSi1cTyL1ZL6bgixhc2vSy5heg6Zg9uP7PpumkAJ82Qprt8b';
