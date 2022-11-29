# Nblocks React example project

This project contains a simple demonstration app to showcase how easily Nblocks can be integrated into your existing stack.
Read more about Nblocks [here](https://nblocks.dev)

The template was cloned from this [Github Repo](https://github.com/cruip/tailwind-dashboard-template).
Shoutout to https://cruip.com for providing this awesome template which we have downsized for an easy demo.

## Usage

This project was bootstrapped with [Vite](https://vitejs.dev/).

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run dev
```

#### Compiles and minifies for production
```
npm run build
```

## Example cases
### Restrict a view for certain subscription plan

Update the route for `/analytics` found in *src/Routes.jsx* and wrap it with the *PlanAccessGuard* component.

```javascript
 <Route
        exact
        path="/analytics"
        element={
          <AuthGuard>
            <PlanAccessGuard plans={['PREMIUM']}>
                <Analytics />
            </PlanAccessGuard>
          </AuthGuard>
        }
      />
```

Update the side menu bar, found in *src/partials/Sidebar.jsx* to remove the link to `/analytics` by wrapping it with the *PlanAccessControllComponent*.

```javascript
{/* The clickable analytics button (Only for premium users) */}
<PlanAccessControllComponent plans={['PREMIUM']}>
    <AnalyticsButton />
</PlanAccessControllComponent>
```