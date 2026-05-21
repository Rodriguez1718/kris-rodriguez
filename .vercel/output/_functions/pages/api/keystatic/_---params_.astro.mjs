import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { parseString } from 'set-cookie-parser';
import { config as config$1, collection, fields, singleton } from '@keystatic/core';
import React from 'react';
export { renderers } from '../../../renderers.mjs';

function makeHandler(_config) {
  return async function keystaticAPIRoute(context) {
    var _context$locals, _ref, _config$clientId, _ref2, _config$clientSecret, _ref3, _config$secret;
    const envVarsForCf = (_context$locals = context.locals) === null || _context$locals === void 0 || (_context$locals = _context$locals.runtime) === null || _context$locals === void 0 ? void 0 : _context$locals.env;
    const handler = makeGenericAPIRouteHandler({
      ..._config,
      clientId: (_ref = (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_ID) !== null && _ref !== void 0 ? _ref : tryOrUndefined(() => {
        return undefined                                          ;
      }),
      clientSecret: (_ref2 = (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_SECRET) !== null && _ref2 !== void 0 ? _ref2 : tryOrUndefined(() => {
        return undefined                                              ;
      }),
      secret: (_ref3 = (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_SECRET) !== null && _ref3 !== void 0 ? _ref3 : tryOrUndefined(() => {
        return undefined                                ;
      })
    }, {
      slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"
    });
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    let headersInADifferentStructure = /* @__PURE__ */ new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ("getSetCookie" in headers && typeof headers.getSetCookie === "function") {
          const setCookieHeaders2 = headers.getSetCookie();
          if (setCookieHeaders2 !== null && setCookieHeaders2 !== void 0 && setCookieHeaders2.length) {
            headersInADifferentStructure.set("set-cookie", setCookieHeaders2);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get("set-cookie");
    headersInADifferentStructure.delete("set-cookie");
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === "lax" || sameSite === "strict" || sameSite === "none" ? sameSite : void 0
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map((x) => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}

const config = config$1({
  storage: {
    kind: "local"
  },
  ui: {
    brand: {
      name: "Kris Portfolio",
      mark: () => React.createElement(
        "a",
        {
          href: "/",
          target: "_blank",
          style: {
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            fontSize: "12px",
            border: "1px solid currentColor",
            padding: "2px 6px",
            borderRadius: "4px",
            letterSpacing: "0.5px"
          }
        },
        "View Site ↗"
      )
    }
  },
  singletons: {
    about: singleton({
      label: "About Me",
      path: "src/content/about/index",
      format: { data: "json" },
      previewUrl: "/",
      schema: {
        content: fields.text({ label: "Bio / Content", multiline: true })
      }
    }),
    settings: singleton({
      label: "Site Settings",
      path: "src/content/settings/index",
      format: { data: "json" },
      previewUrl: "/",
      schema: {
        title: fields.text({ label: "Site Title" }),
        tagline: fields.text({ label: "Site Tagline" })
      }
    })
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/*",
      format: { data: "json" },
      previewUrl: "/work/{slug}",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        summary: fields.text({ label: "Summary", multiline: true }),
        client: fields.text({ label: "Client" }),
        year: fields.integer({ label: "Year" }),
        published_at: fields.date({ label: "Published At" }),
        featured_image: fields.image({
          label: "Featured Image",
          directory: "public/images/projects",
          publicPath: "/images/projects/"
        }),
        content: fields.text({ label: "Content", multiline: true }),
        tag: fields.text({ label: "Tags (comma separated)" }),
        url: fields.text({ label: "Project URL" })
      }
    }),
    skills: collection({
      label: "Skills",
      slugField: "name",
      path: "src/content/skills/*",
      format: { data: "json" },
      previewUrl: "/",
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        category: fields.text({ label: "Category (e.g. Frontend, Design)" }),
        level: fields.text({ label: "Level (e.g. Advanced, Expert)" })
      }
    }),
    experiences: collection({
      label: "Experiences",
      slugField: "role",
      path: "src/content/experiences/*",
      format: { data: "json" },
      previewUrl: "/",
      schema: {
        role: fields.slug({ name: { label: "Role / Title" } }),
        company: fields.text({ label: "Company" }),
        start_date: fields.text({ label: "Start Date" }),
        end_date: fields.text({ label: "End Date" }),
        description: fields.text({ label: "Description", multiline: true })
      }
    }),
    contacts: collection({
      label: "Contacts",
      slugField: "platform",
      path: "src/content/contacts/*",
      format: { data: "json" },
      previewUrl: "/",
      schema: {
        platform: fields.slug({ name: { label: "Platform" } }),
        display_label: fields.text({ label: "Display Label (e.g. @username)" }),
        url: fields.text({ label: "URL" })
      }
    })
  }
});

const all = makeHandler({ config });
const ALL = all;

const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  all,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
