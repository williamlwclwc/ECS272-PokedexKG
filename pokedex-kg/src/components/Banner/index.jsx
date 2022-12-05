import React, { Component } from 'react'
import { Card, Button } from 'antd'
import RadarPlot from '../RadarPlot';

export default class Banner extends Component {

  state = {}

  static getDerivedStateFromProps(props, state){
    console.log(props)
    return props
  }

  render() {

    function firstUpperCase(str) {
      return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
    }

    return (
      <div>
        { 
          this.state.group === 0?
          <Card 
            hoverable
            title="Pokemon Information"
            cover={
            <img 
              alt={"Pokemon Profile of " + this.state.attr.name} 
              src={"https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+this.state.attr.pokemon_id.padStart(3, '0')+".png"} 
              style={{width:92, display:'inline-block'}}
            />
            }
            style={{textAlign:"center"}}
        >
            <span style={{fontWeight:"bold", fontSize:16}}>NAME</span><br/>
            <span style={{textTransform: 'capitalize', fontFamily: "Georgia"}}>{this.state.attr.name}</span><br/>
            <span style={{fontWeight:"bold", fontSize:16}}>BODY</span><br/>
            <span style={{fontFamily: "Georgia"}}>{(parseFloat(this.state.attr.height) / 10) + " m"}, {(parseFloat(this.state.attr.weight) / 10) + " kg"}</span><br/>
            <span style={{fontWeight:"bold", fontSize:16}}>TYPES</span><br/>
            <span style={{fontFamily: "Georgia"}}>{this.state.attr.types.join(", ")}</span><br />
            <span style={{fontWeight:"bold", fontSize:16}}>ABILITIES</span><br/>
            <span style={{fontFamily: "Georgia"}}>{this.state.attr.abilities.join(", ")}</span><br />
            <span style={{fontWeight:"bold", fontSize:16}}>EGG GROUP</span><br/>
            <span style={{fontFamily: "Georgia"}}>{this.state.attr.egg_groups.join(", ")}</span><br />
            <span style={{fontWeight:"bold", fontSize:16}}>STATS</span><br/>
            <div style={{height:200}}>
              <RadarPlot {...this.state}/>
              <span style={{fontFamily: "Georgia"}}>Total: {this.state.totalStats}</span>
            </div>
            <br />
            <Button type="link" href={"https://bulbapedia.bulbagarden.net/wiki/" + this.state.attr.name.split("-").map(firstUpperCase).join("_") + '_(Pokémon)'} target="_blank">More on Pokemon Wiki</Button>
          </Card>
          : null
        }
        {
          this.state.group === 1?
          <Card 
            hoverable
            title="Move Information"
            style={{textAlign:"center"}}
          >
            <span style={{fontWeight:"bold", fontSize:16}}>NAME</span><br/>
            <span style={{textTransform: 'capitalize', fontFamily: "Georgia"}}>{this.state.attr.name}</span><br/>
            <span style={{fontWeight:"bold", fontSize:16}}>TYPES</span><br/>
            <span style={{fontFamily: "Georgia"}}>{this.state.attr.move_type}</span><br />
            <span style={{fontWeight:"bold", fontSize:16}}>ACCURACY</span><br/>
            <span style={{fontFamily: "Georgia"}}>{this.state.attr.accuracy}</span><br />
            <span style={{fontWeight:"bold", fontSize:16}}>POWER</span><br/>
            <span style={{fontFamily: "Georgia"}}>{this.state.attr.power}</span><br />
            <span style={{fontWeight:"bold", fontSize:16}}>PP</span><br/>
            <span style={{fontFamily: "Georgia"}}>{this.state.attr.pp}</span><br />
            <Button type="link" href={"https://bulbapedia.bulbagarden.net/wiki/" + this.state.attr.name.split("-").map(firstUpperCase).join("_") + '_(move)'} target="_blank">More on Pokemon Wiki</Button>
          </Card>
          :null
        }
        {
          this.state.group === 2?
          <Card 
            hoverable
            title="Type Information"
            style={{textAlign:"center"}}
          >
            <span style={{fontWeight:"bold", fontSize:16}}>NAME</span><br/>
            <span style={{textTransform: 'capitalize', fontFamily: "Georgia"}}>{this.state.attr.name}</span><br/>
            <Button type="link" href={"https://bulbapedia.bulbagarden.net/wiki/" + this.state.attr.name.split("-").map(firstUpperCase).join("_") + '_(type)'} target="_blank">More on Pokemon Wiki</Button>
          </Card>
          :null
        }
        {
          this.state.group === 3?
          <Card 
            hoverable
            title="Ability Information"
            style={{textAlign:"center"}}
          >
            <span style={{fontWeight:"bold", fontSize:16}}>NAME</span><br/>
            <span style={{textTransform: 'capitalize', fontFamily: "Georgia"}}>{this.state.attr.name}</span><br/>
            <Button type="link" href={"https://bulbapedia.bulbagarden.net/wiki/" + this.state.attr.name.split("-").map(firstUpperCase).join("_") + '_(Ability)'} target="_blank">More on Pokemon Wiki</Button>
          </Card>
          :null
        }
        {
          this.state.group === 4?
          <Card 
            hoverable
            title="Egg Group Information"
            style={{textAlign:"center"}}
          >
            <span style={{fontWeight:"bold", fontSize:16}}>NAME</span><br/>
            <span style={{textTransform: 'capitalize', fontFamily: "Georgia"}}>{this.state.attr.name}</span><br/>
            <Button type="link" href={"https://bulbapedia.bulbagarden.net/wiki/" + this.state.attr.name.split("-").map(firstUpperCase).join("_") + '_(Egg_Group)'} target="_blank">More on Pokemon Wiki</Button>
          </Card>
          :null
        }
      </div>
    )
  }
}
