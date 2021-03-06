import React, { useState, useEffect } from "react"
import Album from "../components/album"

export default () => {
  const albumName = "Lemonade"
  const artistName = "Beyoncé"
  const albumQuote = "Dishes smashed on my counter \n from our last encounter \n Pictures snatched out the frame \n Bitch, I scratched out your name \n and your face"
  const description = "Beyonce shows what it is like being black, a woman, a daughter, a wife, through an almost contradictory exploration that ultimately proves she’s got it all."
  const albumYear = "2016"

  const [detail, setDetail] = useState("")
  const [coverUrl, setUrl] = useState()

  useEffect(() => {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=d480a44e0bca768c6231ebdcd3cdbd3e&artist=${artistName.split(' ').join('+')}&album=${albumName.split(' ').join('+')}&format=json`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('error');
      })
      .then (json => {
        const orgDetail = String(json.album.wiki.content)
        setDetail(orgDetail.slice(0, orgDetail.indexOf("Album track list:")).replace(/\.([^\s\d])/g, '. $1'))
        setUrl(json.album.image[3]['#text'].replace("300x300", "600x600"))
      })
  })

  return (
    <main>
      <Album
        year={albumYear}
        name={albumName}
        artist={artistName}
        quote={albumQuote}
        albumDescription={description}
        albumCover={coverUrl}
        albumDetail={detail}
      />
    </main>
  )
}
