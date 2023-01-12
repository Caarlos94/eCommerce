import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import style from './carrusel.module.css'
const items = [
  {
    src: "https://img.freepik.com/foto-gratis/repartidor-tiro-medio_23-2149035872.jpg?w=2000",
    // altText: 'ENVIOS A TODO EL PAIS',
    caption: 'ENVIOS A TODO EL PAIS',
    caption2:'PAGA HASTA EN 24 CUOTAS'
  },
  {
    src: 'https://blog.printsome.es/wp-content/uploads/sites/3/camisetas-al-por-mayor-header.jpg',
    // altText: 'LOS MEJORES PRODUCTOS DE CALIDAD',
    caption: 'LOS MEJORES PRODUCTOS DE CALIDAD',
    caption2:'LOS ENCONTRAS EN SUPRA SPORTS'
  },
  {
    src: 'https://uvn-brightspot.s3.amazonaws.com/assets/vixes/p/pareja-sentada-en-sofa-9.jpg',
    // altText: 'TODO DESDE LA COMODIDAD DE TU CASA',
    caption: 'TODO DESDE LA COMODIDAD DE TU CASA',
    caption2:'SUPRA SPORTS'
  }
];

class Carrusel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
      
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText}  className={style.img}/>
          <CarouselCaption captionText={item.caption2} captionHeader={item.caption} />
        </CarouselItem>
      
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default Carrusel;

