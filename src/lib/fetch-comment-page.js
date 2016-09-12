import Debug from 'debug'
const debug = Debug('fetch-comment-page')

import requestImport from './request'
import { buildCommentServiceUrl } from './url-builder'

export default function (videoId, pageToken, getSession, deps = {}) {
  if (!videoId) {
    return Promise.reject('Missing first parameter: videoId')
  }
  if (!pageToken) {
    return Promise.reject('Missing second parameter: pageToken')
  }
  if (!getSession) {
    return Promise.reject('Missing third parameter: getSession')
  }

  const { request = requestImport } = deps

  debug('fetching comment page for %s with page token %s', videoId, pageToken)
  return getSession(videoId)
    .then(session => buildFormData(session, pageToken))
    .then(formData => fetchPage(formData, request))
}

export function buildFormData (session, pageToken) {
  if (!session) {
    throw new Error('Missing first parameter: session')
  }
  if (!pageToken) {
    throw new Error('Missing second parameter: pageToken')
  }

  const { sessionToken } = session
  if (!sessionToken) {
    throw new Error('Missing field in session: session.sessionToken')
  }

  return {
    session_token: sessionToken,
    page_token: pageToken
  }
}

export function fetchPage (formData, request) {
  if (!formData) {
    return Promise.reject('Missing first argument: formData')
  }
  if (!request) {
    return Promise.reject('Missing second argument: request')
  }

  const url = buildCommentServiceUrl()
  return request({
    method: 'POST',
    json: true,
    form: formData,
    url,
  })
}
