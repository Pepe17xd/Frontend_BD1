import { useState } from 'react';

export function useNavigation(initialPage = 'home') {
  const [state, setState] = useState({ page: initialPage, params: {} });

  const goTo = (page, params = {}) => {
    setState({ page, params });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    page: state.page,
    params: state.params,
    goTo,
    openJob: (jobId) => goTo('jobDetail', { jobId }),
    openProfessional: (professionalId) => goTo('professionalProfile', { professionalId }),
  };
}
