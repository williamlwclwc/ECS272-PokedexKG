import React, { Component } from 'react'
import { Pagination, Image } from 'antd';

import "./index.css"
import pikachu from '../../assets/pikachu.png'
import solar_power from '../../assets/solar_power.png'
import evolution from '../../assets/evolution.png'
import eevee from '../../assets/eevee.png'
import dragon from '../../assets/dragon.png'
import types from '../../assets/type.png'

export default class Container extends Component {

  constructor(props){
    super(props)
    this.state = {curPage: props.startPage}
  }

  onChange = (page, pageSize) => {
      this.setState({curPage: page})
  }

  componentWillUnmount() {
    this.props.updateStartPage(this.state.curPage)
  }

  render() {
    
    return (
      <div className='slides'>
        <div style={{display:this.state.curPage === 1? 'flex': 'none', flexDirection: 'column'}} className="page">
          <h1 className='pagetitle'>Introduction</h1>
          <div className='pagecontent'>
            <div className='pagetext'>
              <span>
              Pokémon (an abbreviation for Pocket Monsters in Japan) is a Japanese media franchise managed by The Pokémon Company, founded by Nintendo, Game Freak, and Creatures. The franchise was created by Satoshi Tajiri in 1996, and is centered around fictional creatures called "Pokémon". In Pokémon, Pokémon Trainers are people who catch, train, care for, and battle with Pokémon. The English slogan for the franchise is "Gotta Catch ‘Em All!". There are currently 1008 Pokémon species.
              </span>
              <br />
              <span>
              The franchise began as Pocket Monsters: Red and Green (later released outside of Japan as Pokémon Red and Blue), a pair of video games for the original Game Boy handheld system that were developed by Game Freak and published by Nintendo in February 1996. Pokémon soon became a media mix franchise adapted into various different media. Pokémon is one of the highest-grossing media franchise of all time. The Pokémon video game series is the third best-selling video game franchise of all time with more than 440 million copies sold and one billion mobile downloads. The Pokémon video game series spawned an anime television series that has become the most successful video game adaptation of all time with over 20 seasons and 1,000 episodes in 192 countries. The Pokémon Trading Card Game is the highest-selling trading card game of all time with over 43.2 billion cards sold. In addition, the Pokémon franchise includes the world's top-selling toy brand, an anime film series, a live-action film (Detective Pikachu), books, manga comics, music, merchandise, and a temporary theme park. The franchise is also represented in other Nintendo media, such as the Super Smash Bros. series, where various Pokémon characters are playable.
              </span>
            </div>
            <div className='img'>
              <Image src="https://cdn3.whatculture.com/images/2015/11/sD7qci9K.jpg" alt="Pokémon Series" width="500px"/>
            </div>
          </div> 
        </div>
        <div style={{display:this.state.curPage === 2? 'flex': 'none', flexDirection: 'column'}} className="page">
          <h1 className='pagetitle'>Pikachu</h1>
          <div className='pagecontent'>
            <div className='pagetext'>
              <span>Pikachu (ピカチュウ, Pikachuu) is an Electric-type Pokémon which was introduced in Generation I. Pikachu is renowned for being the most well-known and recognizable Pokémon. Over the years, Pikachu has become so popular that it serves as the Pokémon franchise mascot. It is the Version Mascot and First partner Pokémon for the game Pokémon Yellow and its remake, Pokémon: Let's Go, Pikachu!. It is also well known from the anime, where Ash Ketchum, the protagonist, owns a Pikachu. It evolves from Pichu when leveled up with high friendship and evolves into Raichu using a Thunderstone.</span>
              <br />
              <span>Go search 'pikachu' on the 'Explore Stories' page for more details.</span>
            </div>
            <div className='img'>
              <Image src={pikachu} alt="Pikachu" width="500px"/>
            </div>
          </div>
        </div>
        <div style={{display:this.state.curPage === 3? 'flex': 'none', flexDirection: 'column'}} className="page">
        <h1 className='pagetitle'>Gameplay</h1>
          <div className='pagecontent'>
            <div className='pagetext'>
              <span>In Pokémon games, players are designated as Pokémon Trainers and have three general goals: to complete the regional Pokédex by collecting all of the available Pokémon species found in the fictional region where a game takes place, to complete the national Pokédex by transferring Pokémon from other regions, and to train a team of powerful Pokémon from those they have caught to compete against teams owned by other Trainers so they may eventually win the Pokémon League and become the regional Champion. These themes of collecting, training, and battling are present in almost every version of the Pokémon franchise, including the video games, the anime and manga series, and the Pokémon Trading Card Game (also known as TCG).</span>
              <br />
              <span>In the main series, each game's single-player mode requires the Trainer to raise a team of Pokémon to defeat many non-player character (NPC) Trainers and their Pokémon. Each game lays out a somewhat linear path through a specific region of the Pokémon world for the Trainer to journey through, completing events and battling opponents along the way (including foiling the plans of an evil team of Pokémon Trainers who serve as antagonists to the player). Except Pokémon Sun and Moon and Pokémon Ultra Sun and Ultra Moon, which follow unique storylines.</span>
            </div>
            <div className='img'>
              <Image src="https://upload.wikimedia.org/wikipedia/en/a/a6/Pok%C3%A9mon_protagonists.jpg" alt="Pokémon Trainer Avater" width="500px"/>
            </div>
          </div>
        </div>
        <div style={{display:this.state.curPage === 4? 'flex': 'none', flexDirection: 'column'}} className="page">
          <h1 className='pagetitle'>Pokémons Fights</h1>
          <div className='pagecontent'>
            <div className='pagetext'>
              <span>In most incarnations of the Pokémon universe, a Trainer who encounters a wild Pokémon has the ability to capture that Pokémon by throwing a specially designed, mass-producible spherical tool called a Poké Ball at it. If the Pokémon is unable to escape the confines of the Poké Ball, it is considered to be under the ownership of that Trainer. Afterwards, it will obey whatever commands it receives from its new Trainer, unless the Trainer demonstrates such a lack of experience that the Pokémon would rather act on its own accord. Trainers can send out any of their Pokémon to wage non-lethal battles against other Pokémon; if the opposing Pokémon is wild, the Trainer can capture that Pokémon with a Poké Ball, increasing their collection of creatures. If a Pokémon fully defeats an opponent in battle so that the opponent is knocked out ("faints"), the winning Pokémon gains experience points and may level up. Beginning with Pokémon X and Y, experience points are also gained from catching Pokémon in Poké Balls.</span>
            </div>
            <div className='img'>
              <Image src="https://www.escapistmagazine.com/wp-content/uploads/2019/11/butterfree_evolution-scaled.png?resize=1080%2C822" alt="Pokémon Evolution" width="400px"/>
            </div>
          </div>
        </div>
        <div style={{display:this.state.curPage === 5? 'flex': 'none', flexDirection: 'column'}} className="page">
          <h1 className='pagetitle'>Make up a Pokémon Team</h1>
          <div className='pagecontent'>
            <div className='pagetext'>
              <span>A quick filter rather than iterate through a Pokedex database can benefits for advanced Pokemon players who want to find a Pokemon to his team. For example, solar power is a useful ability for attackers
                under sunny weather, it will increase a Pokemon's special attack during harsh sunlight. A player may
                want to look for an attacker with this ability to collaborate with another Pokemon who can change the
                weather and brings sunlight. Traditionally, the player needs to search for this ability in Pokedex and iterate
                through every Pokemon that has the ability in the list. Here, when changing the node encoding to attack
                stats, the user can easily filter out several Pokemon candidates that have better attack stats than others because they have bigger node size. This can be more helpful when we
                have a long list of candidates.</span>
            </div>
            <div className='img'>
              <Image src={solar_power} alt="solar power" width="500px"/>
            </div>
          </div>
        </div>
        <div style={{display:this.state.curPage === 6? 'flex': 'none', flexDirection: 'column'}} className="page">
        <h1 className='pagetitle'>How Pokémon Evolves</h1>
          <div className='pagecontent'>
            <div className='pagetext'>
              <span>When leveling up, the Pokémon's battling aptitude statistics ("stats", such as "Attack" and "Speed") increase. At certain levels, the Pokémon may also learn new moves, which are techniques used in battle. In addition, many species of Pokémon can undergo a form of metamorphosis and transform into a similar but stronger species of Pokémon, a process called evolution; this process occurs spontaneously under differing circumstances, and is itself a central theme of the series. Some species of Pokémon may undergo a maximum of two evolutionary transformations, while others may undergo only one, and others may not evolve at all.  Pokémon X and Y introduced the concept of "Mega Evolution," by which certain fully evolved Pokémon may temporarily undergo an additional evolution into a stronger form for the purpose of battling; this evolution is considered a special case, and unlike other evolutionary stages, is reversible.</span>
              <br />
              <span>When going through the evolution, most Pokémons retain their original types and moves, so their nodes in the Nodelink graph are near. For example, we can see the links of Pichu, Pikachu and Raichu shares most of moves and types. </span>
              <br />
              <span>However, some Pokémons don't follow this rule. For example, Eevee is a Normal type Pokémon, but it can evolve into one of eight different Pokémons, none of them retain Normal type. We can see the nodes of Eevee and Eevee family(イーブイズ) are relatively far from each other.</span>
            </div>
            <div className='img'>
              <Image src={evolution} alt="evolution" width="500px"/>
              <Image src={eevee} alt="eevee" width="500px"/>
            </div>
          </div>
        </div>
        <div style={{display:this.state.curPage === 7? 'flex': 'none', flexDirection: 'column'}} className="page">
          <h1 className='pagetitle'>Are you a Dragon?</h1>
          <div className='pagecontent'>
            <div className='pagetext'>
              <span>Charizard is a draconic, bipedal Pokémon. It is primarily orange with a cream underside from the chest to the tip of its tail. It has a long neck, small blue eyes, slightly raised nostrils, and two horn-like structures protruding from the back of its rectangular head. There are two fangs visible in its upper jaw when its mouth is closed. Two large wings with blue-green undersides sprout from its back, and a horn-like appendage juts out from the top of the third joint of each wing. A single wing-finger is visible through the center of each wing membrane. Charizard's arms are short and skinny compared to its robust belly, and each limb has three white claws. It has stocky legs with cream-colored soles on each of its plantigrade feet. The tip of its long, tapering tail burns with a sizable flame.</span>
              <br />
              <span>However, it's not a Dragon type Pokémon. Though not offcially a dragon, it still has a close relationship with dragon type Pokemons. For example, it can master the move "Dragon Tail", which is considered to be the distinctive move of Dragon type Pokemons.</span>
              <span> If you search for Charizard, flying type, dragon type, you may suprisingly find that Charizard is a lot more closer to dragon type than flying type.</span>
            </div>
            <div className='img'>
              <Image src="https://archives.bulbagarden.net/media/upload/6/65/Mega_Charizard_X_Mega_Charizard_Y_artwork.png" alt="charizard" width="360px"/>
              <Image src={dragon} alt="dragon" width="360px"/>
            </div>
          </div>
        </div>
        <div style={{display:this.state.curPage === 8? 'flex': 'none', flexDirection: 'column'}} className="page">
          <h1 className='pagetitle'>Between types</h1>
          <div className='pagecontent'>
            <div className='pagetext'>
              <span>Types (Japanese: タイプ) are properties applied to Pokémon and their moves, which affect the power of moves in battles. As of Generation VI, there are 18 types, as listed to the right. Most of these were introduced during Generation I, but the Dark and Steel types were introduced in Generation II, and the Fairy type was introduced in Generation VI. A unique ??? type also existed from Generations II through IV. During Generation I, types were occasionally referred to as elements. The types are largely based on the concept of classical elements in popular culture.</span>
              <br />
              <span>Different types have different inter-type relations. For example, the node of Water type and Ice Type are more close to each other than to Rock Type.</span>
            </div>
            <div className='img'>
              <Image src={types} alt="types" width="500px"/>
            </div>
          </div>
        </div>
        <Pagination defaultCurrent={this.state.curPage} total={8} onChange={this.onChange} pageSize={1} showQuickJumper={true}/>
      </div>
    )
  }
}
