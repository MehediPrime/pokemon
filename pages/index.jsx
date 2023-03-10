import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getInitialPokemonName } from "./api/getInitialPokemonName";
import { getPokemonShortData } from "./api/getPokemonShortData";
import style from "../styles/Home.module.css";

export default function Home() {
  const [pokemons, setPokemons] = useState(false);
  const [imageSrc, setPokemonsSrcImage] = useState([]);
  const [movableContainer, setMovableContainer] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const initialName = await getInitialPokemonName();

      const pokemon = await Promise.all(
        initialName.map(async (value) => {
          const data = await getPokemonShortData(value.name);
          return data.pokemon;
        })
      );

      setPokemons(pokemon);
      setPokemonsSrcImage(initialName);
      return;
    };
    fetchData();
  }, []);

  useEffect(() => {
    const container = document.getElementById("cards");
    setMovableContainer(container);
    let isDown = false;
    let startX;
    let scrollLeft;
    const slider = container;
    const end = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const start = (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const move = (e) => {
      if (!isDown) return;

      e.preventDefault();
      const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
      const dist = x - startX;
      slider.scrollLeft = scrollLeft - dist;
    };

    (() => {
      slider.addEventListener("mousedown", start);
      slider.addEventListener("touchstart", start);

      slider.addEventListener("mousemove", move);
      slider.addEventListener("touchmove", move);

      slider.addEventListener("mouseleave", end);
      slider.addEventListener("mouseup", end);
      slider.addEventListener("touchend", end);
    })();
  }, [movableContainer]);

  const moveRight = (e) => {
    e.preventDefault();
    movableContainer.scrollLeft = movableContainer.scrollLeft + 250;
  };
  const moveLeft = (e) => {
    e.preventDefault();
    movableContainer.scrollLeft = movableContainer.scrollLeft - 250;
  };
  return (
    <>
      <div className={style.hero}>
        <div id="logo">
          <img
            src={"image/Logo.png"}
            width={265}
            height={95}
            alt="Logo"
            priority
          />
        </div>

        <button
          className={`${style.moveButton} ${style.left}`}
          onClick={moveLeft}
        >
          {"<"}
        </button>
        <button
          className={`${style.moveButton} ${style.right}`}
          onClick={moveRight}
        >
          {">"}
        </button>

        <div className={style.cards} id="cards">
          {pokemons ? (
            pokemons.map((value, key) => {
              const imgLink = imageSrc.find((img) => img.name === value.name);
              return (
                <Link
                  className={style.card}
                  href={`/details?name=${value.name}`}
                  key={key}
                >
                  <center>
                    <div className={style.cardImages}>
                      <p>#{value.id}</p>
                      <center>
                        <img
                          className={style.cardImage}
                          src={imgLink.artwork}
                          alt={imgLink.name}
                          width="175px"
                        />
                      </center>
                    </div>
                  </center>
                  <div className={style.cardTitle}>
                    {value.name}
                    <div className={style.cardTag}>
                      {value.types.map((value, key) => {
                        return (
                          <div
                            className={`${
                              style.tag
                            } ${value.type.name.toLowerCase()}`}
                            key={key}
                          >
                            {value.type.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <h1 style={{ fontSize: "50px" }}>Loading</h1>
          )}
        </div>
      </div>

      <div className={style.blog}>
        <div className={`${style.sideAnimation} left`}></div>
        <div className={`${style.sideAnimation} right`}></div>
        <div className={style.title}>
          Ash & Pikachu Arrive in Pok??mon Universe
        </div>
      </div>
      <div className={style.details}>
        <div className={style.leftPart}>
          <div className={style.imageOne}>
            <img
              src="image/Image03.png"
              width={200}
              height={200}
              alt="image03"
            />
          </div>
          <div className={style.imageTwo}>
            <img
              src="image/Image04.png"
              width={200}
              height={200}
              alt="image04"
            />
          </div>
          <div className={style.imageThree}>
            <img
              src="image/Image02.png"
              width={200}
              height={200}
              alt="image02"
            />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa
            vitae ab, consequatur voluptates temporibus architecto excepturi
            nostrum expedita obcaecati! Magni accusamus asperiores eum ex facere
            suscipit porro nemo id quaerat soluta dolorem tenetur totam unde,
            cum consequatur corporis voluptatum similique quis quam? Qui dolorum
            officia atque quaerat dolor suscipit necessitatibus impedit commodi
            nisi neque, consectetur temporibus harum iste sed asperiores? Velit
          </p>
          <p className={style.disappear}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa
            vitae ab, consequatur voluptates temporibus architecto excepturi
            nostrum expedita obcaecati! Magni accusamus asperiores eum ex facere
            suscipit porro nemo id quaerat soluta dolorem tenetur totam unde,
            cum consequatur corporis voluptatum similique quis quam? Qui dolorum
            officia atque quaerat dolor suscipit necessitatibus impedit commodi
            nisi
          </p>
          <p className={style.disappear}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa
            vitae ab, consequatur voluptates temporibus architecto excepturi
            nostrum expedita obcaecati! Magni accusamus asperiores eum ex facere
            suscipit porro nemo id quaerat soluta dolorem tenetur totam unde,
            cum consequatur corporis voluptatum similique quis quam? Qui dolorum
            officia atque quaerat dolor suscipit necessitatibus impedit commodi
            nisi neque, consectetur temporibus harum iste sed asperiores? Velit
            temporibus at, quae nobis facere pariatur accusamus placeat, quas
            dignissimos nam enim illum autem!
          </p>
          <p className={style.disappear}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa vel
            expedita magni repellat corporis impedit laudantium nemo repellendus
            qui, aliquam modi veniam delectus ea itaque? Sint eligendi molestias
            est laboriosam tempora minus eos autem optio! Deleniti, sapiente
            accusamus rerum eveniet, nostrum excepturi quaerat voluptatibus
            molestiae, porro necessitatibus asperiores repellendus quae non
            fugit facere quod esse laudantium veniam cumque repudiandae expedita
            quam est laborum! Exercitationem ullam adipisci odit labore ducimus
            beatae suscipit culpa, quasi provident tempora molestiae quibusdam!
            Inventore perspiciatis tempore iure doloribus autem praesentium
            nesciunt, minus veritatis fuga accusamus sequi debitis asperiores ad
            esse! Exercitationem harum ducimus maxime ullam hic ipsam enim
            perferendis at debitis dolor excepturi incidunt voluptas sed porro
            dicta nulla, cum in facilis eaque. Molestias quam voluptatem neque
            eos nisi ut ducimus cumque dolores earum recusandae nostrum ipsa,
            saepe atque
            <br />
            adipisci, ratione quasi esse ad voluptatibus assumenda. Illo
            provident autem, suscipit quas porro alias officiis beatae fugiat.
            repudiandae ab explicabo, dolores consequatur fuga hic voluptatibus
            incidunt repellat libero eius. Eius perferendis voluptas ab amet.
          </p>
        </div>
        <div className={style.middlePart}>
          <div className={style.middleColumns}>
            <div className={style.middleColumnOne}>
              <img
                src="image/Image04.png"
                width={200}
                height={200}
                alt="image04"
              />
            </div>
            <div className={style.middleColumnTwo}>
              <img
                src="image/Image03.png"
                width={200}
                height={200}
                alt="image03"
              />

              <img
                src="image/Image02.png"
                width={200}
                height={200}
                alt="image02"
              />
            </div>
            <div className={style.middleColumnThree}>
              <img
                src="image/Image05.png"
                width={200}
                height={200}
                alt="image05"
              />
              <img
                src="image/Image01.png"
                width={200}
                height={200}
                alt="image01"
              />
            </div>
          </div>
        </div>
        <div className={style.rightPart}>
          <div className={style.imageFour}>
            <img
              src="image/Image05.png"
              width={200}
              height={200}
              alt="image05"
            />
          </div>
          <div className={style.imageFive}>
            <img
              src="image/Image01.png"
              width={200}
              height={200}
              alt="image01"
            />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
            vitae maxime ipsa ad quisquam numquam distinctio ullam repellendus a
            nulla ipsum quibusdam fuga nemo veniam at, fugiat porro magni
            doloremque reiciendis itaque sequi blanditiis. Quis quos nobis
            quaerat optio in dolorem voluptas reprehenderit deleniti explicabo,
            eos possimus
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. In dolorum
            vero eius! Enim velit voluptate vitae ea nulla corrupti accusantium
            quisquam alias id. Inventore enim dolores, asperiores assumenda sit
            quidem eius mollitia adipisci vero non, nulla rem dolorum temporibus
            libero corporis odio quisquam! Consequatur corporis maiores neque
            saepe. Eaque, ut. quidem eius mollitia adipisci vero non, nulla rem
            dolorum temporibus libero dolorum temporibus libero corporis odio
            quisquam! Consequatur corporis maiores neque saepe. Eaque,
            ut.corporis odio quisquam! Consequatur corporis maiores neque saepe.
            Eaque, ut.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            quo, labore alias laudantium accusamus molestias obcaecati dicta
            commodi, eos enim cum delectus quidem ullam at cumque pariatur optio
            eius illo? Ad impedit similique, perspiciatis harum sunt recusandae
            fugiat beatae debitis ipsa fugit quia, velit tenetur dolores
            cupiditate <br />
            Lorem ipsam necessitatibus possimus. commodi, eos enim cum delectus
            quidem ullam at cumque pariatur optio eius illo? Ad impedit
            similique, perspiciatis harum sunt recusandae fugiat beatae debitis
            ipsa fugit quia.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
            reiciendis aliquam, nostrum ex repellendus voluptatum ipsum. Qui
            dignissimos aliquid, illo rerum id, quos obcaecati tempore quaerat
            <br />
            laborum nemo voluptatum nostrum unde incidunt voluptate beatae fuga
            accusamus? Laudantium, molestias. Quidem in quaerat fugiat quisquam
            repellendus, molestias laborum quam amet natus sunt placeat <br />
            repudiandae ab explicabo, dolores consequatur fuga hic voluptatibus
            incidunt repellat libero eius. Eius perferendis voluptas ab amet.
          </p>
        </div>
      </div>
    </>
  );
}
