import {
  types,
  onSnapshot,
  flow,
  applySnapshot,
  getSnapshot,
} from 'mobx-state-tree';
import Decimal from 'decimal.js';

// IN CASE OF API RESPONSE OR OBJECT DATA TYPE, USE IN THIS WAY -

/* const HospitalType = types.model({id: types.number, name: types.string});

const DecimalPrimitive = types.reference(types.string, {
  get: function (value) {
    return new Decimal(value);
  },
  set: function (value) {
    return value.toString();
  },
});

const PlanType = types.model({
  planID: types.string,
  tenureInMonths: types.number,
  monthlyEMI: types.number,
  downpayments: types.number,
  downpaymentAmount: types.number,
  interestRatePercentage: types.number,
  processingFeePercentage: types.optional(types.number, 0),
}); */

// 3 different types - KEEPING THEM COMMENTED DOWN ALL THE WAY IN ORDER TO KNOW THE IMPLEMENTATION STEPS

const UserModel = types
  .model('User', {
    firstName: types.string,
    loader: types.boolean,
    name: types.string,
    /* hospitalNames: types.array(HospitalType), // here is way to define that type
    hospitalServices: types.array(HospitalType), // here is way to define that type
    loanPlans: types.array(PlanType), // here is way to define that type */
  })
  .actions(self => ({
    // afterCreate() {
    //   console.log("I'm called as useEffect");
    // },

    setFirstName(value) {
      self.firstName = value;
    },

    setLoader(value) {
      self.loader = value;
    },

    setName(value) {
      self.name = value;
    },

    /*  setHospitalNames(jsonData) {
      self.hospitalNames = jsonData;
    },
    setHospitalServices(jsonData) {
      self.hospitalServices = jsonData;
    },
    setLoanPlans(jsonData) {
      self.loanPlans = jsonData;
    }, */
  }));
/*
  .views(self => ({
    get fullName() {
      return self.middleName
        ? self.firstName + ' ' + self.middleName + ' ' + self.lastName
        : self.firstName + ' ' + self.lastName;
    },
    
    // get getHospitalNames() {
    //   return JSON.parse(self.hospitalNames);
    // },
  }));
  */

const user = UserModel.create({
  firstName: '',
  loader: false,
  name:'Mohit'

  /* hospitalNames: [],
  hospitalServices: [],
  loanPlans: [], */
});

export default user;
