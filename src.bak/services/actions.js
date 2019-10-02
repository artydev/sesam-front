export function changeAgent(newAgentIdent) {
  return {
    type: 'CHANGE_AGENT',
    payload: { newAgentIdent }
  };
}


