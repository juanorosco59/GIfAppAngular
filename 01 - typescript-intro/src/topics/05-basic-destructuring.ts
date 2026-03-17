interface AudioPlayer {
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details
}

interface Details {
    author: string;
    year: number;
}

const AudioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 360,
    song: 'My Way',
    details: { author: 'Frank Sinatra', year: 1969 }
}

console.log('AudioPlayer', AudioPlayer.song);

const { song: anotherSong, songDuration: duration, details: detailsSong } = AudioPlayer;
const { author: authorDetails, year: yearDetails } = detailsSong;

 console.log('Song:', anotherSong)
 console.log('Duration:', duration)
 console.log('Author:', authorDetails)
 console.log('Year:', yearDetails)

const [p1, p2, trunks = 'Not found']: string[] = ['Goku', 'Vegeta', 'Trunks'];
//const trunks = dbz[3] || 'No encontrado';

console.log('Personsaje 3', trunks);



export { };