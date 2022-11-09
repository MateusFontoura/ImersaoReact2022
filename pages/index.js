import React from "react";
import config from "../config.json"
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu/index";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
    const estilosDaHomePage = {
        //backgroundColor: "red"
    };
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    return (
        <>
            <CSSReset />
            <div style={estilosDaHomePage}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}>

                </Menu>
                <Header>

                </Header>
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>

                </Timeline>
                <FavoriteUsers favorites={config.favorites}>

                </FavoriteUsers >
            </div>
        </>
    );
}

export default HomePage



const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info{
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }

    .user-banner{
        width: 1512px;
        height: 230px;
        border-radius: 0%;

    }
    .user-favorites{
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    .user-favorites-cards{
        font-size: 14px;
        font-family: 'Helvetica';
        margin-left: 10px;
    }

`;
const StyledBanner = styled.div`
    background-image: url(${({ banner }) => banner});
    width: 1512px;
    height: 230px;
    border-radius: 0%;
`;
function Header(props) {
    return (
        <StyledHeader>
            <StyledBanner banner={config.banner}></StyledBanner>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`}></img>
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>



            </section>

        </StyledHeader>
    )
}

function Timeline({ searchValue, ...props }) {
    const playlistNames = Object.keys(props.playlists)
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized);

                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb}></img>
                                        <span>{video.title}</span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

function FavoriteUsers(props) {
    const favoriteUsers = Object.keys(props.favorites);
    return (
        <StyledHeader>
            <div>
                <h2>Usuários Favoritos</h2>
            </div>
            <div className="user-favorites"  >

                {favoriteUsers.map((favorite) => {
                    const userName = props.favorites[favorite];
                    return (
                        <div >
                            {userName.map((user) => {
                                return (
                                    <div className="user-favorites-cards">
                                        <a href={user.profile}>
                                            <img src={`https://github.com/${config.github}.png`}></img>
                                        </a>
                                        <p>{user.name}</p>
                                    </div>
                                )
                            })}

                        </div>

                    )
                })

                }
            </div>
        </StyledHeader>
    )
}