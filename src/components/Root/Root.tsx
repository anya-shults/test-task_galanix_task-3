import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import App from '../../App';
import { UniversityList } from '../UniversityList/UniversityList';

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path=":country?" element={<UniversityList />} />
        <Route path=":page?" element={<UniversityList />} />
        <Route path=":perPage?" element={<UniversityList />} />
        <Route path="home" element={<Navigate to=".." replace />} />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Route>
    </Routes>
  </Router>
);