import Link from "next/link";
import Image from "next/image";
import style from "../../styles/Details.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { getPokemonDetailExtra } from "../api/getPokemonDetailExtra";
import { getPokemonDetail } from "../api/getPokemonDetail";
import { getPokemonWeakness } from "../api/getPokemonWeakness";

export default function details() {
  const router = useRouter();
  const { name } = router.query;
  const [pokemonDetailExtra, setPokemonsDetailExtra] = useState();
  const [pokemonDetail, setPokemonsDetail] = useState();
  const [pokemonWeakness, setPokemonsWeakness] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const detailExtra = await getPokemonDetailExtra(name);
      setPokemonsDetailExtra(detailExtra);
      const detail = await getPokemonDetail(name);
      setPokemonsDetail(detail);
      const weakness = await getPokemonWeakness(name);
      setPokemonsWeakness(weakness);
      return;
    };
    fetchData();
  }, [name]);

  return (
    <div className={style.characterPage}>
      <div id="logo">
        <Image
          src="/../public/image/Logo.png"
          width={265}
          height={95}
          alt="Logo"
          priority
        />
      </div>
      <div className={`${style.Frame} left`}></div>
      <div className={`${style.Frame} right`}></div>

      <div className={style.container}>
        <div className={`${style.column} ${style.first}`}>
          <h1>
            {pokemonDetail ? pokemonDetail.name : "Loading"} #
            {pokemonDetail && pokemonDetail.id}
          </h1>
          <p>
            {pokemonDetailExtra
              ? pokemonDetailExtra.flavor_text_entries.find(
                  (item) =>
                    item.version.name === "sword" && item.language.name === "en"
                ).flavor_text
              : "Loading"}
          </p>
          <div className={style.borderWrap}>
            <div className={style.details}>
              <div>
                <h2>Height</h2>
                <p>{pokemonDetail && pokemonDetail.height}</p>
              </div>
              <div>
                <h2>Category</h2>
                <p>
                  {pokemonDetailExtra
                    ? pokemonDetailExtra.genera.find(
                        (item) => item.language.name === "en"
                      ).genus
                    : "Loading"}
                </p>
              </div>
              <div>
                <h2>Weight</h2>
                <p>{pokemonDetail && pokemonDetail.weight} lbs</p>
              </div>
              <div>
                <h2>Abilities</h2>
                {pokemonDetail &&
                  pokemonDetail.abilities.map((value, key) => {
                    return <p key={key}>{value.ability.name.toLowerCase()}</p>;
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.column} ${style.second}`}>
          {pokemonDetailExtra ? (
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetailExtra.id}.png`}
              alt="pokemon picture"
              width={475}
              height={475}
            />
          ) : (
            "Loading"
          )}

          <div className={style.shadow}></div>
        </div>
        <div className={`${style.column} ${style.third}`}>
          <div className={style.title}>
            <h2>Type</h2>
            <div className={style.cardTag}>
              {pokemonDetail &&
                pokemonDetail.types.map((value, key) => {
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
          <div className={style.title}>
            <h2>Weakness</h2>
            <div className={style.cardTag}>
              {pokemonWeakness
                ? pokemonWeakness.map((value, key) => {
                    return (
                      <div
                        className={`${style.tag} ${value.toLowerCase()}`}
                        key={key}
                      >
                        {value}
                      </div>
                    );
                  })
                : "Loading"}
            </div>
          </div>
          <div className={style.title}>
            <h2>Stats</h2>
            <div className={style.stats}>
              {pokemonDetail &&
                pokemonDetail.stats.map((value, key) => {
                  let percent = (value.base_stat / 100) * 345;
                  percent = percent >= 345 ? 345 : percent;
                  return (
                    <span key={key}>
                      <h3>{value.stat.name}</h3>
                      <div className={style.outerLayer}>
                        <div
                          className={style.innerLayer}
                          style={{
                            background: "#30a7d7",
                            height: "4px",
                            width: percent,
                          }}
                        ></div>
                      </div>
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className={style.buttonSection}>
        <Link href="/" className={style.button}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <svg clipPath="url(#clip0_11_241)">
              <path
                d="M21 20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8947 20.2652 21 20 21H4C3.73478 21 3.48043 20.8947 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V9.49003C2.99989 9.33764 3.03462 9.18724 3.10152 9.05033C3.16841 8.91341 3.26572 8.79359 3.386 8.70003L11.386 2.47803C11.5615 2.34147 11.7776 2.26733 12 2.26733C12.2224 2.26733 12.4385 2.34147 12.614 2.47803L20.614 8.70003C20.7343 8.79359 20.8316 8.91341 20.8985 9.05033C20.9654 9.18724 21.0001 9.33764 21 9.49003V20V20ZM11 13V19H13V13H11Z"
                fill="white"
              />
            </svg>
            <defs>
              <clipPath id="clip0_11_241">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
