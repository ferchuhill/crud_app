import { DiReact } from 'react-icons/di';
import { MdOutlineSyncAlt } from 'react-icons/md';
import { userService } from '../../services';
import { useAppDispatch } from '../../hook/useRedux';
import { setPerson } from '../../redux/';

export const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(setPerson({ person: [], token: '' }));
    userService.logout();
  };
  return (
    <>
      <header>
        <div className="logo">
          <DiReact />
          <h1>APP</h1>
        </div>
        <div className="close_session">
          <a onClick={logout}>
            <MdOutlineSyncAlt />
            Logout
          </a>
        </div>
      </header>
      <style jsx>
        {`
          header {
            @apply bg-white h-12 w-screen shadow-md sticky top-0 z-50 mb-5;
          }
          .logo {
            @apply px-4 flex flex-row items-center h-full;
          }
          .logo h1 {
            @apply px-2;
          }
          .close_session {
            @apply absolute top-3 right-3 flex items-end justify-end;
          }
          .close_session a {
            @apply flex flex-row justify-center items-center cursor-pointer;
            @apply hover:text-blue-900;
          }
        `}
      </style>
    </>
  );
};
