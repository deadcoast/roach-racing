/* Original procedural anatomical illustration. The same placement record draws bench and racer. */
(function (root) {
    'use strict';
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const PALETTE = { vermilion: ['#9e493b', '#cb7356', '#64332c'], ochre: ['#a17f45', '#ccab64', '#685332'], ivory: ['#bdb69f', '#dfd7bc', '#7e796b'] };
    function moduleShape(kind, col) {
        const ink = '#201d19';
        let content = '';
        const path = (d, fill = col, stroke = ink, sw = 2) => `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`;
        if (kind === 'drive') {
            content += path('M-26-28 Q0-42 26-28 L31 19 Q0 42-31 19Z');
            for (let i = -3; i <= 3; i++)
                content += path(`M-25 ${i * 7} Q0 ${i * 7 - 10} 25 ${i * 7}`, 'none', '#eac091', 1.6);
            content += path('M0-28 L0 25', 'none', ink, 4);
            content += '<circle cy="-30" r="6" fill="#d9bb87"/>';
        }
        else if (kind === 'reserve') {
            content += path('M-6-38 Q-41-32-37 6 Q-26 43-4 26 Q14 46 31 21 Q47-15 17-33 Q8-38-6-38Z');
            content += path('M-17-22 Q-29-1-19 14 M4-28 Q23-11 18 15', 'none', '#ead7a5', 3);
            for (let i = 0; i < 5; i++)
                content += `<circle cx="${-20 + i * 9}" cy="${18 - Math.sin(i) * 9}" r="2" fill="#f4dba6" opacity=".55"/>`;
        }
        else if (kind === 'hopper') {
            for (const s of [-1, 1]) {
                content += `<g transform="scale(${s} 1)">`;
                content += path('M40-13 Q61-39 107-17 Q116-9 106 8 L72 51 L99 104 L87 112 L53 53 L80 0 Q63-6 44 8Z');
                content += path('M54-13 L88-4 M59-22 L98-12 M62 31 L70 37', 'none', '#ead1a0', 2);
                content += '<circle cx="58" cy="51" r="8" fill="#7c643c" stroke="#221e19" stroke-width="2"/>';
                content += path('M88 107 L105 118 L79 117', 'none', col, 3);
                content += '</g>';
            }
        }
        else if (kind === 'horn') {
            content += path('M-17 17 Q-27-2-14-18 L-8-39 Q-1-77 22-107 Q18-66 10-50 L12-23 Q24-10 15 14Z');
            content += path('M-4-30 Q3-57 15-81', 'none', '#f4e4bc', 2.5);
            for (let i = 0; i < 5; i++)
                content += path(`M${-17 + i} ${10 - i * 6} Q0 ${16 - i * 6} ${17 - i} ${10 - i * 6}`, 'none', '#8b714d', 1.7);
        }
        else if (kind === 'claws') {
            for (const s of [-1, 1]) {
                content += `<g transform="scale(${s} 1)">`;
                content += path('M34 15 Q54 8 76-11 L104-64 L119-75 L117-40 L96 5 L127-12 L139-31 L145-17 L132 5 L91 31 L71 13 L46 31Z');
                for (let i = 0; i < 4; i++)
                    content += path(`M${91 + i * 7} ${13 - i * 6} l7 4 l-3-10`);
                content += '<circle cx="85" cy="12" r="7" fill="#776c48" stroke="#29261b" stroke-width="2"/>';
                content += '</g>';
            }
        }
        else if (kind === 'vanes') {
            for (const s of [-1, 1]) {
                content += `<g transform="scale(${s} 1)">`;
                content += path('M25 9 L24-15 Q70-37 115-33 Q96-7 62 2 L36 15Z');
                for (let i = 0; i < 4; i++)
                    content += path(`M34 ${-12 + i * 5} Q68 ${-23 + i * 5} ${106 - i * 10} ${-31 + i * 6}`, 'none', '#dbd0ab', 1);
                content += '</g>';
            }
        }
        else if (kind === 'frame') {
            for (const side of [-1, 1]) {
                content += `<g transform="scale(${side} 1)">`;
                content += path('M12-56 L31-47 L40 37 L26 56 L16 40 L20-40Z');
                for (let i = -3; i <= 3; i++)
                    content += path(`M16 ${i * 12}L37 ${i * 12 + 4}`, 'none', '#e5d3a5', 2);
                content += '</g>';
            }
        }
        else if (kind === 'gear') {
            for (const side of [-1, 1]) {
                content += `<g transform="scale(${side} 1)">`;
                content += path('M5-9 L35-28 L45-23 L28-1 L43 19 L33 30 L6 8Z');
                content += '<circle cx="8" r="8" fill="#dcc59a" stroke="#251e17" stroke-width="3"/>';
                content += '</g>';
            }
        }
        else if (kind === 'suspension') {
            for (const side of [-1, 1]) {
                content += `<g transform="translate(${side * 50} 0)">`;
                content += path('M-14-30 L14-30 L20 20 L11 34 L-11 34 L-20 20Z');
                for (let i = -2; i <= 2; i++)
                    content += path(`M-15 ${i * 10}L15 ${i * 10 + 3}`, 'none', '#ebc384', 3);
                content += '</g>';
            }
        }
        else if (kind === 'stabilizer') {
            for (const side of [-1, 1]) {
                content += `<g transform="scale(${side} 1)">`;
                content += path('M40 5 Q70-5 102-30', 'none', col, 6);
                content += '<ellipse cx="104" cy="-30" rx="15" ry="24" fill="' + col + '" stroke="#211e18" stroke-width="3"/>';
                content += path('M98-38 L108-23', 'none', '#d1e2b7', 2);
                content += '</g>';
            }
        }
        else if (kind === 'damper') {
            content += path('M-15-48 Q0-60 15-48 L24 24 Q0 49-24 24Z');
            content += '<ellipse cy="14" rx="16" ry="21" fill="#dcba75" stroke="#211e18" stroke-width="3"/>';
            content += path('M0-43V-8 M-21 12H-15 M15 12H21', 'none', '#eee0b4', 3);
        }
        else if (kind === 'pads') {
            for (const s of [-1, 1])
                for (const y of [-29, 27])
                    content += `<g transform="translate(${s * 110},${y}) rotate(${s * 20})">${path('M-11-13 Q0-20 11-13 L13 5 Q0 18-13 5Z')}<path d="M-7-5H7 M-8 0H8 M-6 5H6" stroke="#67664e" stroke-width="1.4"/></g>`;
        }
        return content;
    }
    function roach(design, options = {}) {
        const B = root.RRRBench, colors = PALETTE[design.livery] || PALETTE.vermilion, selected = options.selected, cutaway = options.cutaway, issues = options.issues || [], interactive = options.interactive !== false;
        let out = '';
        out += '<g class="roach-art">';
        const hp=options.hostProfile; out+=`<g class="native-body" transform="translate(320 310) scale(${hp?.scaleX||1} ${hp?.scaleY||1}) translate(-320 -310)">`;
        // Grounding belongs to the entire body, never to isolated punctuation/cells.
        out += '<ellipse cx="320" cy="351" rx="127" ry="173" fill="#000" opacity=".17"/>';
        for (const side of [-1, 1])
            for (let i = 0; i < 3; i++) {
                if (i === 2 && design.placements.some(p => B.byId[p.id].kind === 'hopper'))
                    continue;
                const y = 245 + i * 66, x = 320 + side * 53, spread = (design.tuning.stance - .38) * 95;
                out += `<path d="M${x} ${y} Q${320 + side * (106 + spread)} ${y - 24} ${320 + side * (142 + spread)} ${y + (i - 1) * 30} L${320 + side * (171 + spread)} ${y + (i - 1) * 54 + 17}" fill="none" stroke="#292521" stroke-width="11" stroke-linejoin="round"/><path d="M${x} ${y} Q${320 + side * (106 + spread)} ${y - 24} ${320 + side * (142 + spread)} ${y + (i - 1) * 30} L${320 + side * (171 + spread)} ${y + (i - 1) * 54 + 17}" fill="none" stroke="${colors[1]}" stroke-width="5" stroke-linejoin="round"/>`;
                out += `<circle cx="${320 + side * (142 + spread)}" cy="${y + (i - 1) * 30}" r="5" fill="${colors[2]}"/>`;
            }
        out += `<path d="M256 270 Q243 311 248 367 Q249 446 320 481 Q393 445 394 370 Q400 311 384 270Z" fill="${colors[0]}" stroke="#261f1b" stroke-width="4"/>`;
        for (let i = 0; i < 7; i++) {
            const y = 300 + i * 22, w = 68 - i * 4;
            out += `<path d="M${320 - w} ${y} Q320 ${y + 35} ${320 + w} ${y}" fill="none" stroke="${colors[2]}" stroke-width="7"/><path d="M${324 - w} ${y - 4} Q320 ${y + 23} ${316 + w} ${y - 4}" fill="none" stroke="${colors[1]}" stroke-width="2" opacity=".7"/>`;
        }
        out += `<path d="M268 217 Q320 194 372 217 Q394 254 379 308 Q320 326 260 308 Q246 260 268 217Z" fill="${colors[2]}" stroke="#251f1b" stroke-width="4"/><path d="M271 221 Q320 208 367 221 L373 282 Q320 299 266 282Z" fill="${colors[0]}" stroke="${colors[1]}" stroke-width="2"/>`;
        out += `<path d="M281 181 Q320 157 359 181 L366 213 Q350 236 320 234 Q288 235 274 212Z" fill="${colors[0]}" stroke="#28211c" stroke-width="4"/>`;
        for (const side of [-1, 1]) {
            out += `<ellipse cx="${320 + side * 34}" cy="196" rx="9" ry="15" fill="#171b1b" stroke="${colors[1]}" stroke-width="2"/><circle cx="${320 + side * 36}" cy="192" r="2.8" fill="#e6d4a9"/>`;
            out += `<path d="M${320 + side * 22} 175 Q${320 + side * 38} 129 ${320 + side * 99} 111 Q${320 + side * 140} 99 ${320 + side * 122} 67" fill="none" stroke="${colors[1]}" stroke-width="2.5" stroke-linecap="round"/>`;
        }
        out += '<path d="M305 230 L298 247 M335 230 L342 247" stroke="#d9c39f" stroke-width="4"/>';
        if (cutaway)
            out += '<path d="M270 223 Q320 207 370 223 L375 405 Q355 454 320 465 Q276 441 265 401Z" fill="#131d1b" stroke="#baa27b" stroke-width="1.5" stroke-dasharray="3 4"/><path d="M320 223 V444 M292 252 L320 270 L348 252 M283 319 L320 334 L357 319 M293 389 L320 404 L347 389" fill="none" stroke="#634638" stroke-width="6"/>';
        out+='</g>'; // native body ends; real graft dimensions do not scale with bodyform
        const placements = [...design.placements].sort((a, b) => (B.byId[a.id].layer === 'internal' ? -1 : 1) - (B.byId[b.id].layer === 'internal' ? -1 : 1));
        for (const p of placements) {
            const a = B.byId[p.id], hidden = a.layer === 'internal' && !cutaway;
            if (hidden)
                continue;
            const bad = issues.some(v => v.ids.includes(p.id)), active = p.id === selected;
            out += `<g class="assembly-part${active ? ' active' : ''}${bad ? ' invalid' : ''}" data-part="${esc(p.id)}" ${interactive ? `role="button" tabindex="0" aria-label="Move ${esc(a.name)}. Arrow keys nudge. Shift increases the step."` : ''} transform="translate(${320 + p.x * 165} ${310 + p.y * 180}) rotate(${p.angle})">`;
            if (active || bad)
                out += `<ellipse cx="0" cy="0" rx="${['hopper', 'claws', 'vanes', 'pads'].includes(a.kind) ? 149 : 43}" ry="${a.kind === 'hopper' ? 125 : a.kind === 'horn' ? 118 : 54}" fill="none" stroke="${bad ? '#ea6651' : '#e6c690'}" stroke-width="1.2" stroke-dasharray="3 6" opacity=".85"/>`;
            out += `<g class="physical-part">${moduleShape(a.kind, a.colour)}</g>`;
            if (active || bad)
                out += `<circle r="5" fill="#e5c998" stroke="#302821" stroke-width="2"/>`;
            out += '</g>';
        }
        if (!cutaway)
            out += `<text x="320" y="269" text-anchor="middle" fill="#ead8b1" font-family="Georgia,serif" font-size="34" font-weight="bold">${esc(design.number)}</text><path d="M316 322V452 M324 322V452" stroke="${colors[1]}" stroke-width="1" opacity=".7"/>`;
        out += '</g>';
        return out;
    }
    root.RRRArt = { esc, PALETTE, moduleShape, roach };
})(globalThis);
