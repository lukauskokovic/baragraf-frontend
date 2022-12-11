import React from 'react'
import './Landing.scss';

export const Landing = () => {
    return <div id="landing">
        <section className="site-mission flex padding-global">
        <div className="mission-img">
          <img
            src="./logo.png"
            alt=""
          />
        </div>
        <div className="section-text">
          <h2>Naš cilj</h2>
          <p>
            O nama – Cypollo daje priliku ljudima da se anonimno posavetuju sa nekim ko je doživeo slično iskustvo, da potraži stručnu pomoć ili da pronađe utehu u nekoj od svojih omiljenih poznatih ličnosti. Bilo da želite da razgovarate sa nekim u pravom vremenu, sa psihologom, grupom ljudi ili prosto da podelite svoje iskustvo, Cypollo ima mesta za Vas.
          </p>
        </div>
      </section>
      <svg style={{transform: "rotate(0deg) translateY(6%)", transition: "0.3s"}} viewBox="0 0 1440 290" version="1.1"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(83.136, 31.357, 136.927, 1)" offset="0%"></stop><stop stop-color="rgba(159.622, 0, 255, 1)" offset="100%"></stop></linearGradient></defs><path style={{transform: "translate(0, 0px)", opacity: 1}} fill="url(#sw-gradient-0)" d="M0,145L80,145C160,145,320,145,480,149.8C640,155,800,164,960,145C1120,126,1280,77,1440,53.2C1600,29,1760,29,1920,38.7C2080,48,2240,68,2400,62.8C2560,58,2720,29,2880,53.2C3040,77,3200,155,3360,183.7C3520,213,3680,193,3840,154.7C4000,116,4160,58,4320,58C4480,58,4640,116,4800,159.5C4960,203,5120,232,5280,203C5440,174,5600,87,5760,62.8C5920,39,6080,77,6240,120.8C6400,164,6560,213,6720,203C6880,193,7040,126,7200,116C7360,106,7520,155,7680,169.2C7840,184,8000,164,8160,159.5C8320,155,8480,164,8640,183.7C8800,203,8960,232,9120,207.8C9280,184,9440,106,9600,96.7C9760,87,9920,145,10080,159.5C10240,174,10400,145,10560,130.5C10720,116,10880,116,11040,140.2C11200,164,11360,213,11440,236.8L11520,261L11520,290L11440,290C11360,290,11200,290,11040,290C10880,290,10720,290,10560,290C10400,290,10240,290,10080,290C9920,290,9760,290,9600,290C9440,290,9280,290,9120,290C8960,290,8800,290,8640,290C8480,290,8320,290,8160,290C8000,290,7840,290,7680,290C7520,290,7360,290,7200,290C7040,290,6880,290,6720,290C6560,290,6400,290,6240,290C6080,290,5920,290,5760,290C5600,290,5440,290,5280,290C5120,290,4960,290,4800,290C4640,290,4480,290,4320,290C4160,290,4000,290,3840,290C3680,290,3520,290,3360,290C3200,290,3040,290,2880,290C2720,290,2560,290,2400,290C2240,290,2080,290,1920,290C1760,290,1600,290,1440,290C1280,290,1120,290,960,290C800,290,640,290,480,290C320,290,160,290,80,290L0,290Z"></path></svg>
      <section className="site-mission flex padding-global" id="crkninja">
        <div className="mission-img">
          <img
            src="./placecrnkinja.jpg"
            alt=""
          />
        </div>
        <div className="section-text">
          <h2>Niste sami</h2>
          <p>
            Svakome se može desiti – Zlostavljanje preko Interneta (iliti Cyberbullying) je vrsta nasilja koja postaje sve popularnija kako se tehnologija razvaja. Po istraživanjima čak 7 od 10 ljudi je pretrpelo neku vrstu cyber-nasilja pre nego što su navršili 18 godina, a čak ni odrasli ljudi nisu sigurni od te vrste nasilja.
            Poznate licnosti – kada kažemo ,,Svakome se može misliti’’, zaista to mislimo! Na našem sajtu možete pronaći priznanja poznatih ličnosti koji su nam poverili svoja iskustva u borbi protiv cyber-nasilja.
          </p>
        </div>
      </section>
      <svg style={{transform: "rotate(180deg) translateY(1%)", transition: "0.3s"}} viewBox="0 0 1440 200" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(83, 31, 137, 1)" offset="0%"></stop><stop stop-color="rgba(160, 0, 255, 1)" offset="100%"></stop></linearGradient></defs><path  style={{transform:"translate(0, 0px);", opacity:1}} fill="url(#sw-gradient-0)" d="M0,100L26.7,100C53.3,100,107,100,160,103.3C213.3,107,267,113,320,100C373.3,87,427,53,480,36.7C533.3,20,587,20,640,26.7C693.3,33,747,47,800,43.3C853.3,40,907,20,960,36.7C1013.3,53,1067,107,1120,126.7C1173.3,147,1227,133,1280,106.7C1333.3,80,1387,40,1440,40C1493.3,40,1547,80,1600,110C1653.3,140,1707,160,1760,140C1813.3,120,1867,60,1920,43.3C1973.3,27,2027,53,2080,83.3C2133.3,113,2187,147,2240,140C2293.3,133,2347,87,2400,80C2453.3,73,2507,107,2560,116.7C2613.3,127,2667,113,2720,110C2773.3,107,2827,113,2880,126.7C2933.3,140,2987,160,3040,143.3C3093.3,127,3147,73,3200,66.7C3253.3,60,3307,100,3360,110C3413.3,120,3467,100,3520,90C3573.3,80,3627,80,3680,96.7C3733.3,113,3787,147,3813,163.3L3840,180L3840,200L3813.3,200C3786.7,200,3733,200,3680,200C3626.7,200,3573,200,3520,200C3466.7,200,3413,200,3360,200C3306.7,200,3253,200,3200,200C3146.7,200,3093,200,3040,200C2986.7,200,2933,200,2880,200C2826.7,200,2773,200,2720,200C2666.7,200,2613,200,2560,200C2506.7,200,2453,200,2400,200C2346.7,200,2293,200,2240,200C2186.7,200,2133,200,2080,200C2026.7,200,1973,200,1920,200C1866.7,200,1813,200,1760,200C1706.7,200,1653,200,1600,200C1546.7,200,1493,200,1440,200C1386.7,200,1333,200,1280,200C1226.7,200,1173,200,1120,200C1066.7,200,1013,200,960,200C906.7,200,853,200,800,200C746.7,200,693,200,640,200C586.7,200,533,200,480,200C426.7,200,373,200,320,200C266.7,200,213,200,160,200C106.7,200,53,200,27,200L0,200Z"></path></svg>
      <section className="site-mission flex padding-global">
        <div className="mission-img">
          <img
            src="./psiho.jpg"
            alt=""
          />
        </div>
        <div className="section-text">
          <h2>Psiholozi</h2>
          <p>
            Želite da potražite pomoć, a ne znate odakle da počnete? Bez brige! Na našem sajtu možete videti listu psihologa kao i njihove ocene i iskustva, kako biste pronašli pravu osobu za Vas. Ukoliko se odlučite da kontaktirate neke od verifikovanih psihologa putem našeg sajta.
          </p>
        </div>
      </section>
      <section className="site-mission flex padding-global">
        <div className="mission-img">
          <img
            src="./supportgroup.jpg"
            alt=""
          />
        </div>
        <div className="section-text">
          <h2>Support groups</h2>
          <p>
          Željni ste kontakta s ljudima? Preko naših grupa za podršku možete besplatno pristupiti grupama predvidjenim za različite vrste problema! Svaka vrsta cyber-nasilja je validna, i zato želimo da, pomoću Support groups, ljudi imaju priliku da dobiju savet ili olakšanje time što će razgovarati sa osobama koje su imale slična iskustva.
          </p>
        </div>
      </section>
    </div>
}