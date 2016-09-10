import test from 'blue-tape'
import nodeUrl from 'url'

import {
  VIDEO_PAGE_URL,
  WATCH_FRAGMENTS_URL,
  buildVideoPageUrl,
  buildWatchFragmentsUrl
} from '../../lib/url-builder'

test('/lib/url-build.js', t => {
  t.test('- exports buildVideoPageUrl() function', t => {
    t.ok(buildVideoPageUrl, 'exports buildVideoPageUrl')
    t.equal(typeof buildVideoPageUrl, 'function', 'is of type function')
    t.end()
  })

  t.test('- exports buildWatchFragmentsUrl() function', t => {
    t.ok(buildWatchFragmentsUrl, 'exports buildWatchFragmentsUrl')
    t.equal(typeof buildWatchFragmentsUrl, 'function', 'is of type function')
    t.end()
  })

  t.test('- buildVideoPageUrl() builds a video page url', t => {
    const videoId = 'K23jKl24k'
    const urlStr = buildVideoPageUrl(videoId)

    t.ok(urlStr.indexOf(`${VIDEO_PAGE_URL}?`) === 0, 'starts with correct base url')

    const url = nodeUrl.parse(urlStr, true)
    t.ok(url, 'url parsed successfully')
    t.deepEqual(url.query, {v: videoId}, 'query contains correct values')
    t.end()
  })

  t.test('- buildWatchFragmentsUrl() builds a watch fragments url', t => {
    const videoId = 'K23jKl24k'
    const commentsToken = 'EhYSCzJhNFV4ZHk5VFFZwAEAyAEA4AEBGAY='
    const fragments = ['comments', 'andmore']

    const urlStr = buildWatchFragmentsUrl(videoId, commentsToken, fragments)
    t.ok(urlStr.indexOf(`${WATCH_FRAGMENTS_URL}?`) === 0, 'starts with correct base url')

    const url = nodeUrl.parse(urlStr, true)
    t.deepEqual(url.query, {
      v: videoId,
      ctoken: commentsToken,
      frags: fragments.join(','),
      tr: 'time',
      distiller: '1',
      spf: 'load'
    }, 'query contains correct values')
    t.end()
  })

  t.test('- buildWatchFragmentsUrl() uses default fragment if not given', t => {
    const videoId = 'K23jKl24k'
    const commentsToken = 'EhYSCzJhNFV4ZHk5VFFZwAEAyAEA4AEBGAY='
    const defaultFragment = 'comments'

    const urlStr = buildWatchFragmentsUrl(videoId, commentsToken)
    t.ok(urlStr.indexOf(`${WATCH_FRAGMENTS_URL}?`) === 0, 'starts with correct base url')

    const url = nodeUrl.parse(urlStr, true)
    t.deepEqual(url.query, {
      v: videoId,
      ctoken: commentsToken,
      frags: defaultFragment,
      tr: 'time',
      distiller: '1',
      spf: 'load'
    }, 'query contains correct values')
    t.end()
  })
})
