import React, { useState } from 'react';
import { TwoPaneLayout } from './components/TwoPaneLayout';
import { SixWForm, FormValues } from './components/SixWForm';
import { RightPane } from './components/RightPane';
import { renderDescription } from './lib/description';
import { Example } from './data/examples';

const App: React.FC = () => {
  const [form, setForm] = useState<FormValues>({
    what: '',
    why: '',
    who: [],
    where: '',
    when: '',
    how: ''
  });

  const description = renderDescription(form);

  const handleChange = (v: FormValues) => {
    setForm(v);
  };

  const handleExample = (ex: Example) => {
    setForm({
      what: ex.what,
      why: ex.why,
      who: ex.who || [],
      where: ex.where || '',
      when: ex.when || '',
      how: ex.how || ''
    });
  };

  return (
    <TwoPaneLayout
      left={<SixWForm value={form} onChange={handleChange} description={description} />}
      right={<RightPane description={description} onSelectExample={handleExample} />}
    />
  );
};

export default App;
