import { useEffect, useId, useMemo, useReducer, useRef, useState } from "react";

const PROFILE_STORAGE_KEY = "hooks-about-you-profile";

const initialProfile = {
  basic: {
    fullName: "",
    age: "",
    city: "",
    pronouns: "",
    currentRole: "",
    bio: "",
  },
  history: {
    childhood: "",
    turningPoint: "",
    proudestMoment: "",
    biggestChallenge: "",
  },
  life: {
    values: [],
    routines: [],
    dreams: "",
    supportNetwork: "",
    notes: "",
  },
};

function profileReducer(state, action) {
  switch (action.type) {
    case "hydrate":
      return action.payload ? { ...initialProfile, ...action.payload } : state;
    case "update-basic":
      return {
        ...state,
        basic: {
          ...state.basic,
          [action.field]: action.value,
        },
      };
    case "update-history":
      return {
        ...state,
        history: {
          ...state.history,
          [action.field]: action.value,
        },
      };
    case "update-life":
      return {
        ...state,
        life: {
          ...state.life,
          [action.field]: action.value,
        },
      };
    case "toggle-value":
      return {
        ...state,
        life: {
          ...state.life,
          values: state.life.values.includes(action.value)
            ? state.life.values.filter((item) => item !== action.value)
            : [...state.life.values, action.value],
        },
      };
    case "toggle-routine":
      return {
        ...state,
        life: {
          ...state.life,
          routines: state.life.routines.includes(action.value)
            ? state.life.routines.filter((item) => item !== action.value)
            : [...state.life.routines, action.value],
        },
      };
    case "reset":
      return initialProfile;
    default:
      return state;
  }
}

export default function AboutYouProfile() {
  const [profile, dispatch] = useReducer(profileReducer, initialProfile);
  const [showSummary, setShowSummary] = useState(false);
  const hydratedRef = useRef(false);
  const nameId = useId();
  const ageId = useId();
  const cityId = useId();
  const pronounsId = useId();
  const roleId = useId();
  const bioId = useId();
  const childhoodId = useId();
  const turningPointId = useId();
  const proudestMomentId = useId();
  const biggestChallengeId = useId();
  const dreamsId = useId();
  const supportNetworkId = useId();
  const notesId = useId();

  useEffect(() => {
    const saved = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!saved) {
      hydratedRef.current = true;
      return;
    }

    try {
      dispatch({ type: "hydrate", payload: JSON.parse(saved) });
    } catch {
      window.localStorage.removeItem(PROFILE_STORAGE_KEY);
    } finally {
      hydratedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const completion = useMemo(() => {
    const textFields = [
      profile.basic.fullName,
      profile.basic.age,
      profile.basic.city,
      profile.basic.pronouns,
      profile.basic.currentRole,
      profile.basic.bio,
      profile.history.childhood,
      profile.history.turningPoint,
      profile.history.proudestMoment,
      profile.history.biggestChallenge,
      profile.life.dreams,
      profile.life.supportNetwork,
      profile.life.notes,
    ];

    const filledTextFields = textFields.filter(
      (field) => field.trim().length > 0,
    ).length;
    const filledChecks =
      profile.life.values.length + profile.life.routines.length;
    const totalFields = textFields.length + 8;
    const completed = Math.min(filledTextFields + filledChecks, totalFields);

    return Math.round((completed / totalFields) * 100);
  }, [profile]);

  const summary = useMemo(() => {
    const values =
      profile.life.values.length > 0
        ? profile.life.values.join(", ")
        : "valores ainda nao registrados";
    const routines =
      profile.life.routines.length > 0
        ? profile.life.routines.join(", ")
        : "rotinas ainda nao registradas";

    return `${profile.basic.fullName || "Esta pessoa"} vive em ${
      profile.basic.city || "uma cidade nao informada"
    } e hoje se apresenta como ${
      profile.basic.currentRole || "alguem em construcao"
    }. Seu ponto de virada foi ${
      profile.history.turningPoint || "um capitulo ainda nao descrito"
    }. Entre os valores mais fortes estao ${values}. Na rotina, aparecem ${routines}. Seu maior sonho hoje envolve ${
      profile.life.dreams || "metas ainda em definicao"
    }.`;
  }, [profile]);

  return (
    <>
      <section className="section-intro">
        <div>
          <p className="panel-kicker">Novo componente complexo</p>
          <h2>Fale de voce</h2>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="ghost-button"
            onClick={() => setShowSummary((current) => !current)}
          >
            {showSummary ? "Ocultar resumo" : "Gerar resumo"}
          </button>
          <button
            type="button"
            className="danger-button"
            onClick={() => dispatch({ type: "reset" })}
          >
            Limpar perfil
          </button>
        </div>
      </section>

      <section className="panel profile-panel">
        <div className="panel-head">
          <div>
            <p className="panel-kicker">useReducer + useMemo + useEffect</p>
            <h2>Formulario de historia de vida</h2>
          </div>
          <span className="pill">Preenchimento: {completion}%</span>
        </div>

        <p className="subtitle">
          Um exemplo de formulario mais completo para coletar dados basicos,
          historia pessoal, valores, rotina e visao de futuro.
        </p>

        <div className="profile-grid">
          <article className="profile-section">
            <h3>Informacoes basicas</h3>
            <div className="task-form">
              <label htmlFor={nameId}>Nome completo</label>
              <input
                id={nameId}
                type="text"
                value={profile.basic.fullName}
                onChange={(event) =>
                  dispatch({
                    type: "update-basic",
                    field: "fullName",
                    value: event.target.value,
                  })
                }
              />

              <div className="inline-fields">
                <div>
                  <label htmlFor={ageId}>Idade</label>
                  <input
                    id={ageId}
                    type="number"
                    min="0"
                    value={profile.basic.age}
                    onChange={(event) =>
                      dispatch({
                        type: "update-basic",
                        field: "age",
                        value: event.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label htmlFor={cityId}>Cidade</label>
                  <input
                    id={cityId}
                    type="text"
                    value={profile.basic.city}
                    onChange={(event) =>
                      dispatch({
                        type: "update-basic",
                        field: "city",
                        value: event.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label htmlFor={pronounsId}>Pronomes</label>
                  <input
                    id={pronounsId}
                    type="text"
                    placeholder="ela/dela, ele/dele..."
                    value={profile.basic.pronouns}
                    onChange={(event) =>
                      dispatch({
                        type: "update-basic",
                        field: "pronouns",
                        value: event.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <label htmlFor={roleId}>Papel atual</label>
              <input
                id={roleId}
                type="text"
                placeholder="Estudante, lider, designer..."
                value={profile.basic.currentRole}
                onChange={(event) =>
                  dispatch({
                    type: "update-basic",
                    field: "currentRole",
                    value: event.target.value,
                  })
                }
              />

              <label htmlFor={bioId}>Como voce se apresenta em poucas linhas</label>
              <textarea
                id={bioId}
                rows="4"
                value={profile.basic.bio}
                onChange={(event) =>
                  dispatch({
                    type: "update-basic",
                    field: "bio",
                    value: event.target.value,
                  })
                }
              />
            </div>
          </article>

          <article className="profile-section">
            <h3>Historia e marcos</h3>
            <div className="task-form">
              <label htmlFor={childhoodId}>Infancia e contexto familiar</label>
              <textarea
                id={childhoodId}
                rows="4"
                value={profile.history.childhood}
                onChange={(event) =>
                  dispatch({
                    type: "update-history",
                    field: "childhood",
                    value: event.target.value,
                  })
                }
              />

              <label htmlFor={turningPointId}>Momento de virada</label>
              <textarea
                id={turningPointId}
                rows="3"
                value={profile.history.turningPoint}
                onChange={(event) =>
                  dispatch({
                    type: "update-history",
                    field: "turningPoint",
                    value: event.target.value,
                  })
                }
              />

              <label htmlFor={proudestMomentId}>Maior orgulho</label>
              <textarea
                id={proudestMomentId}
                rows="3"
                value={profile.history.proudestMoment}
                onChange={(event) =>
                  dispatch({
                    type: "update-history",
                    field: "proudestMoment",
                    value: event.target.value,
                  })
                }
              />

              <label htmlFor={biggestChallengeId}>Desafio mais marcante</label>
              <textarea
                id={biggestChallengeId}
                rows="3"
                value={profile.history.biggestChallenge}
                onChange={(event) =>
                  dispatch({
                    type: "update-history",
                    field: "biggestChallenge",
                    value: event.target.value,
                  })
                }
              />
            </div>
          </article>

          <article className="profile-section">
            <h3>Valores e futuro</h3>
            <div className="task-form">
              <fieldset className="choice-group">
                <legend>Valores que definem voce</legend>
                {["Empatia", "Curiosidade", "Disciplina", "Criatividade"].map(
                  (value) => (
                    <label key={value} className="check-option">
                      <input
                        type="checkbox"
                        checked={profile.life.values.includes(value)}
                        onChange={() => dispatch({ type: "toggle-value", value })}
                      />
                      <span>{value}</span>
                    </label>
                  ),
                )}
              </fieldset>

              <fieldset className="choice-group">
                <legend>Rotinas que fazem parte da sua vida</legend>
                {["Estudo continuo", "Exercicio", "Leitura", "Tempo com familia"].map(
                  (value) => (
                    <label key={value} className="check-option">
                      <input
                        type="checkbox"
                        checked={profile.life.routines.includes(value)}
                        onChange={() =>
                          dispatch({ type: "toggle-routine", value })
                        }
                      />
                      <span>{value}</span>
                    </label>
                  ),
                )}
              </fieldset>

              <label htmlFor={dreamsId}>Sonhos e proximos passos</label>
              <textarea
                id={dreamsId}
                rows="3"
                value={profile.life.dreams}
                onChange={(event) =>
                  dispatch({
                    type: "update-life",
                    field: "dreams",
                    value: event.target.value,
                  })
                }
              />

              <label htmlFor={supportNetworkId}>Rede de apoio</label>
              <textarea
                id={supportNetworkId}
                rows="3"
                value={profile.life.supportNetwork}
                onChange={(event) =>
                  dispatch({
                    type: "update-life",
                    field: "supportNetwork",
                    value: event.target.value,
                  })
                }
              />

              <label htmlFor={notesId}>Observacoes importantes</label>
              <textarea
                id={notesId}
                rows="3"
                value={profile.life.notes}
                onChange={(event) =>
                  dispatch({
                    type: "update-life",
                    field: "notes",
                    value: event.target.value,
                  })
                }
              />
            </div>
          </article>
        </div>
      </section>

      {showSummary ? (
        <section className="profile-summary">
          <h3>Resumo automatico</h3>
          <p>{summary}</p>
        </section>
      ) : null}
    </>
  );
}
