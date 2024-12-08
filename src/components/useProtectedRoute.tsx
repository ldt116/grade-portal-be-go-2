import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../routes/index'; // Giả sử tệp routes được export từ './route/index'

function useProtectedRoute(currentRoute) {
  const navigate = useNavigate();
  const protectedRole = sessionStorage.getItem('protectedRole'); // Lấy role từ sessionStorage

  useEffect(() => {
    // Tìm route hiện tại trong danh sách routes
    const route = routes.find((r) => r.path === currentRoute);

    // Nếu không có route hoặc protectedRole không khớp, điều hướng về home
    if (!route || route.protectedRole !== protectedRole) {
      navigate('/home');
    }
  }, [currentRoute, navigate, protectedRole]);
}

export default useProtectedRoute;
