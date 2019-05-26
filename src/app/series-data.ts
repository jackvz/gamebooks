import { Series } from './series';

enum SeriesOption {
  LoneWolf_Kai = 1,
  LoneWolf_MagnaKai,
  LoneWolf_GrandMaster,
  LoneWolf_NewOrder,
  GreyStar,
  FreewayWarrior
}
export const SERIES_OPTION = SeriesOption;

export const SERIES: Series[] = [
  { id: SeriesOption.LoneWolf_Kai, name: 'Lone Wolf - The Kai Series',
    heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/lw/01fftd/ill1.png',
    blurb: 'You are the sole survivor of a devastating attack on the monastery where you were learning the skills of the Kai Lords. You swear vengeance on the Darklords for the massacre of the Kai warriors, and with a sudden flash of insight you know what you must do. You must set off on a perilous journey to the capital city to warn the King of the terrible threat that faces his people: For you are now the last of the Kai you are now Lone Wolf.' },
  { id: SeriesOption.LoneWolf_MagnaKai, name: 'Lone Wolf - The Magnakai Series',
    heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/lw/06tkot/ill1.png',
    // heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/lw/06tkot/ill7.png',
    blurb: 'You are Kai Master Lone Wolf—last of the Kai Lords of Sommerlund, sole survivor of a massacre by the Darklords of Helgedad. You discovered the lost Sommlending treasure, The Book of the Magnakai, containing the wisdom and Disciplines of the Kai lords recorded in the time of Sun Eagle, the first Kai Grand Master. With Magnakai Disciplines, you have sworn to restore the Kai to their former glory and so ensure the security of your land against the Darklords.' },
  { id: SeriesOption.LoneWolf_GrandMaster, name: 'Lone Wolf - The Grand Master Series',
    heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/lw/13tplor/ill7.png',
    // heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/lw/13tplor/ill10.png',
    // heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/lw/18dotd/ill1.png',
    // heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/lw/18dotd/ill5.png',
    blurb: 'You are the warrior Lone Wolf—Kai Grand Master of Sommerlund. You have defeated the Darklords of Helgedad and avenged your murdered ancestors, but now you are challenged by a sinister evil which threatens to destroy all life on your home world of Magnamund.' },
  { id: SeriesOption.LoneWolf_NewOrder, name: 'Lone Wolf - The New Order Series',
    // heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/lw/21votm/ill4.png',
    // heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/lw/21votm/ill12.png',
    // heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/lw/23mh/ill3.png',
    // heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/lw/23mh/ill5.png',
    heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/lw/23mh/ill9.png',
    blurb: 'The Moonstone is a legendary artefact that was created by the god-like Shianti. It contains the might of all their magic and wisdom, the sum of their divine knowledge. Lone Wolf—Supreme Master of the Kai—has succeeded in retrieving it from the clutches of Naar, the King of the Darkness. Now the Moonstone must be returned to its creators who are exiled upon the remote Isle of Lorn in Southern Magnamund. Someone must take the fabled artefact to the Shianti and Lone Wolf has chosen you, the most promising warrior among the ranks of the New Order Kai, to carry out this vital mission.' },
  { id: SeriesOption.GreyStar, name: 'Grey Star the Wizard',
    heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/gs/01gstw/ill7.png',
    // heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/gs/01gstw/ill2.png',
    blurb: 'In the World of Lone Wolf a new hero has arisen--Grey Star the Wizard You are Grey Star. From the core of a raging storm you appeared—a human child, ship-wrecked and orphaned, a gift of hope to the exiled Shianti sorcerers. Ever since that fateful night they have raised you as one of their own, teaching you the mysteries of their magic in preparation for an epic quest. The time has now come. You must find the legendary Moonstone and with its power crush the evil Wytch-king of Shadaki. For only you can save the land of your birth from the cruel grip of his empire. But be warned! Ahead lies a terrifying journey into the unknown where survival or death confronts you with every turn of the page.' },
  { id: SeriesOption.FreewayWarrior, name: 'Freeway Warrior',
    // heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/fw/01hh/ill5.png',
    // heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/fw/01hh/ill9.png',
    // heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/fw/02smr/small10.png',
    // heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/fw/02smr/ill3.png',
    // heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/fw/02smr/ill9.png',
    heroImage: 'https://www.projectaon.org/en/xhtml-less-simple/fw/02smr/ill12.png',
    blurb: 'You are Cal Phoenix, the Freeway Warrior, champion and protector of Dallas Colony One. A murderous gang of HAVOC clansmen, led by the psychotic Mad Dog Michigan, are bent on destroying your fragile colony as it crosses the wastelands of Texas on the first stage of a life-or-death exodus to the California coast. These bike-riding clansmen are a formidable enemy: armed, cunning, and extremely dangerous, capable of launching a lightning raid at any time, day or night. You will need all your wits about you if you are to defend your people and reach your destination intact!' }
];
