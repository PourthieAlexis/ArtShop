import {expect, jest, test} from '@jest/globals';
const func = jest.fn(
    () => {
        
    }
)
const table = [
    {name: 1, path: '/', count: 1, write: true},
    {name: 2, path: '/login', count: 3,write: false},
    {name: 3, path: '/register', count: 6},
    {name: 4, path: '/art-detail/', count: 1, write: true},
    {name: 5, path: '/cart', count: 3,write: false},
    {name: 6, path: '/create-art', count: 6},
    {name: 7, path: '/profil', count: 1, write: true},
    {name: 8, path: '/verifyEmail/', count: 3,write: false},
  ];
  test.each(table)('table as a variable', ({name,path,count,write}) => {
    // again everything is typed as expected, e.g. `extra: boolean | undefined`
  });
/* test('Tester une réponse des routes', async() => {
    const mockRoute = {
        params: {
          id: 1,
        },
      };
      const mockRouter = {
        push: jest.fn(),
      };
    
      const wrapper = mount( {
        global: {
          mocks: {
            $route: mockRoute,
            $router: mockRouter,
          },
        },
      });
    
      await wrapper.find('button').trigger('click');
    
      expect(mockRouter.push).toHaveBeenCalledTimes(1);
}) */

it("Test mot de passe", () => 
    {
        func.mockName("Bad");
        expect(func.getMockName()).toBe("Bad");
        const passCheck = "Mdp123456789.";
        const password = "Mdp123456789.";
        expect(password).toBe(passCheck);
        expect(password.length).toBeGreaterThanOrEqual(12);
    }

)