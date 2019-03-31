import { TranslateService } from 'ter-localization';
import Isemail from 'isemail';

function isEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const required = (field, title) => (data) => {
  if (data && data[field]) {
    return true;
  }

  return {
    field,
    message: TranslateService.t('validation')('is_required', { title }),
  };
};

const email = (field, title) => (data) => {
  if (data && (!data[field]
    || (Isemail.validate(data[field])
    && isEmail(data[field]) && data[field].length <= 255))) {
    return true;
  }

  return {
    field,
    message: TranslateService.t('validation')('is_email', { title }),
  };
};

const name = (field, title) => (data) => {
  if (data && (!data[field] || (data[field].length <= 70))) {
    return true;
  }

  return {
    field,
    message: TranslateService.t('validation')('is_name', { title }),
  };
};

const shop = (field, title) => (data) => {
  if (data && (!data[field] || (data[field].length <= 255))) {
    return true;
  }

  return {
    field,
    message: TranslateService.t('validation')('is_shop', { title }),
  };
};

const phone = (field, title) => (data) => {
  if (data && (!data[field] || (/^\d+$/.test(data[field]) && !data[field].match(/[a-z]/i) && data[field].length <= 16))) {
    return true;
  }

  return {
    field,
    message: TranslateService.t('validation')('is_phone', { title }),
  };
};

const password = (field, title) => (data) => {
  if (data && (!data[field] || (!data[field].match(/ /) && data[field].length >= 6 && data[field].length <= 32))) {
    return true;
  }

  return {
    field,
    message: TranslateService.t('validation')('is_password', { title }),
  };
};

const validate = validators => (data) => {
  const totalResult = validators
    .map(validator => validator(data))
    .filter(result => result !== true);
  const fieldsValidation = totalResult.reduce((total, current) => {
    if (!total[current.field]) {
      return {
        ...total,
        [current.field]: [current.message],
      };
    }

    return {
      ...total,
      [current.field]: [
        ...total[current.field],
        current.message,
      ],
    };
  }, {});

  return {
    fields: fieldsValidation,
    total: totalResult,
  };
};

const isValidated = validators => data => validate(validators)(data).total.length === 0;

const Validator = {
  required,
  validate,
  isValidated,
  email,
  phone,
  name,
  shop,
  password,
};

export default Validator;
