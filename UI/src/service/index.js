import axios from 'axios';
import {BASE_URL,GET_LANGUAGE_URL,GET_KEY_PHRASES_URL,GET_SENTIMENT_URL} from '../constant';

export const getEntityData = (uid) => {
  return axios.get(BASE_URL, {
    params: {
      uid
    }
  }).then(resp => {
    return resp;
  }, err => {
    return err;
  });
}

export const getLanguage = (uid) => {
  return axios.get(GET_LANGUAGE_URL, {
    params: {
      uid
    }
  }).then(resp => {
    return resp;
  }, err => {
    return err;
  });
}

export const getKeyPhrases = (uid) => {
  return axios.get(GET_KEY_PHRASES_URL, {
    params: {
      uid
    }
  }).then(resp => {
    return resp;
  }, err => {
    return err;
  });
}

export const getSentiment = (uid, lang) => {
  return axios.get(GET_SENTIMENT_URL, {
    params: {
      uid,
      lang
    }
  }).then(resp => {
    return resp;
  }, err => {
    return err;
  });
}