import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { konstanter, proptypes as moterPropTypes } from 'moter-npm';
import { Utvidbar } from 'digisyfo-npm';
import DropdownInnholdsviser from './DropdownInnholdsviser';
import * as epostinnholdActions from '../../actions/epostinnhold_actions';
import * as arbeidsgiverepostinnholdActions from '../../actions/arbeidsgiverepostinnhold_actions';
const { BRUKER, ARBEIDSGIVER } = konstanter;

export const mapStateToInnholdsviserProps = (state) => {
    return {
        epostinnhold: state.epostinnhold.data,
        arbeidsgiverepostinnhold: state.arbeidsgiverEpostinnhold.data,
        henter: state.epostinnhold.henter === true || state.arbeidsgiverEpostinnhold.henter === true,
        hentingFeilet: state.epostinnhold.hentingFeilet === true || state.arbeidsgiverEpostinnhold.hentingFeilet === true,
    };
};

const actions = Object.assign({}, epostinnholdActions, {
    hentEpostinnhold: epostinnholdActions.hentBekreftMoteEpostinnhold,
    hentArbeidsgiverEpostinnhold: arbeidsgiverepostinnholdActions.hentBekreftMoteArbeidsgiverEpostinnhold,
});

export const InnholdsviserContainer = connect(mapStateToInnholdsviserProps, actions)(DropdownInnholdsviser);

const InformasjonSendt = ({ arbeidstaker, mote, ledetekster }) => {
    return (<div>
        <h2>Informasjon sendt:</h2>
        { arbeidstaker.kontaktinfo.skalHaVarsel &&
            <Utvidbar erApen={false} tittel="Arbeidstaker"
                ikon="svg/person.svg" ikonHover="svg/person_hover.svg" ikonAltTekst="Arbeidstaker" className="blokk"
                variant="lysebla">
                <InnholdsviserContainer mote={mote} ledetekster={ledetekster} type={ BRUKER } />
            </Utvidbar>
        }
        <Utvidbar erApen={false} tittel="Arbeidsgiver"
            ikon="svg/arbeidsgiver.svg" ikonHover="svg/arbeidsgiver_hover.svg" ikonAltTekst="Arbeidsgiver" className="blokk" variant="lilla">
            <InnholdsviserContainer mote={mote} ledetekster={ledetekster} type={ ARBEIDSGIVER } />
        </Utvidbar>
    </div>);
};

InformasjonSendt.propTypes = {
    arbeidstaker: PropTypes.object,
    mote: moterPropTypes.mote,
    fikkIkkeOpprettetVarsel: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default InformasjonSendt;
