/*********************************************
 * Tululoo Game Maker v1.3.0
 *
 * Creators 
 * Zoltan Percsich
 * Vadim "YellowAfterlife" Dyachenko
 *
 * (c) SilentWorks 2011 - 2013
 * All rights reserved.
 * www.tululoo.com
 *
 * Contributors:
 * Csaba Herbut
 ********************************************/

function tu_detect_audio(_type) {
	var _au = document.createElement('audio');
	return _au.canPlayType && _au.canPlayType(_type).replace(/no/, '');
}
//
var	__path__ = window.__path__ ? window.__path__ : '',
	// system variables:
	tu_gameloop = tu_canvas = tu_context = tu_room_to_go = null, tu_canvas_id = 'tululoocanvas',
	tu_canvas_css = 'background: rgb(42, 42, 42); border: 0;',
	tu_loading = tu_load_total = 0,
	var_override_ = (Object.defineProperty != undefined),
	// resources:
	tu_sprites = [], tu_audios = [], tu_backgrounds = [], tu_fonts = [], tu_scenes = [],
	// time:
	tu_frame_time = tu_frame_step = tu_frame_el = tu_frame_count = tu_elapsed = 0,
	tu_prev_cycle_time = tu_prev_frame_time = (new Date()).getTime(),
	// math:
	max = Math.max, min = Math.min, round = Math.round, floor = Math.floor, ceil = Math.ceil,
	sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt, tan = Math.tan, rand = Math.random,
	arccos = Math.acos, arcsin = Math.asin, arctan = Math.atan, arctan2 = Math.atan2,
	tu_r2d = -180 / Math.PI, tu_d2r = Math.PI / -180, tu_2pi = Math.PI * 2,
	// i/o variables:
	mouse_x = mouse_y = 0, mouse_down = mouse_pressed = mouse_released = false,
	key_down = [], key_pressed = [], key_released = [], tu_vkeys = [],
	tu_keys_pressed = [], tu_keys_released = [],
	touch_x = [], touch_y = [], touch_count = 0,
	tu_unpausekey = 27, tu_paused = false, tu_modal = null, tu_modaldraw = true,
	// i/o constants:
	vk_0 = 48, vk_1 = 49, vk_2 = 50, vk_3 = 51, vk_4 = 52, vk_5 = 53, vk_6 = 54,
	vk_7 = 55, vk_8 = 56, vk_9 = 57, vk_a = 65, vk_add = 107, vk_alt = 18, vk_b = 66,
	vk_backspace = 8, vk_c = 67, vk_ctrl = 17, vk_d = 68, vk_decimal = 110, vk_delete = 46,
	vk_divide = 111, vk_down = 40, vk_e = 69, vk_end = 35, vk_enter = 13, vk_escape = 27,
	vk_f1 = 112, vk_f2 = 113, vk_f3 = 114, vk_f4 = 115, vk_f5 = 116, vk_f6 = 117,
	vk_f7 = 118, vk_f8 = 119, vk_f9 = 120, vk_f10 = 121, vk_f11 = 122, vk_f12 = 123,
	vk_g = 71, vk_h = 72, vk_home = 36, vk_f = 70, vk_i = 73, vk_insert = 45, vk_j = 74, vk_k = 75,
	vk_l = 76, vk_left = 37, vk_m = 77, vk_multiply = 106, vk_n = 78, vk_num0 = 96, vk_num1 = 97,
	vk_num2 = 98, vk_num3 = 99, vk_num4 = 100, vk_num5 = 101, vk_num6 = 102, vk_num7 = 103,
	vk_num8 = 104, vk_num9 = 105, vk_o = 79, vk_p = 80, vk_pagedown = 34, vk_pageup = 33,
	vk_pause = 19, vk_q = 81, vk_r = 82, vk_right = 39, vk_s = 83, vk_shift = 16, vk_space = 32,
	vk_subtract = 109, vk_t = 84, vk_tab = 9, vk_u = 85, vk_up = 38, vk_v = 86, vk_w = 87,
	vk_x = 88, vk_y = 89, vk_z = 90,
	// collisions:
	ct_null = 0, ct_point = 1, ct_box = 2, ct_circle = 3,
	// tiles:
	tu_tiles = [], tu_tilesi = [], tu_tilez = 256,
	// sound variables:
	tu_wav_supported = tu_detect_audio('audio/wav; codecs="1"'),
	tu_ogg_supported = tu_detect_audio('audio/ogg; codecs="vorbis"'),
	tu_mp3_supported = tu_detect_audio('audio/mpeg;'),
	// drawing:
	tu_draw_alpha = 1, tu_draw_color_red = tu_draw_color_green = tu_draw_color_blue = 0,
	tu_draw_font = "Arial 12px", tu_draw_halign = "left", tu_draw_valign = "top",
	tu_draw_font_ = { size: 12, family: 'Arial', bold: false, italic: false },
	tu_draw_color = "rgb(" + tu_draw_color_red + "," + 
	tu_draw_color_green + "," + tu_draw_color_blue + ")", 
	tu_redraw, tu_redraw_auto = true,
	tu_viewport_inst = null,
	// drawing constants:
	fa_left = "left", fa_center = "center", fa_right = "right",
	fa_top = "top", fa_middle = "middle", fa_bottom = "bottom",
	// system room variables:
	tu_depth = [], tu_depthi = [], tu_depthu = [], tu_types = [], tu_persist = [],
	// public room variables:
	room_current = null,
	room_speed = 30, fps = room_speed,
	room_background = null,
	room_width = 0, room_height = 0,
	room_background_color_show = true, room_background_color_red = 0, 
	room_background_color_green = 0, room_background_color_blue = 0,
	room_viewport_width = 0, room_viewport_height = 0,
	room_viewport_object = null,
	room_viewport_hborder = 0, room_viewport_vborder = 0,
	room_viewport_x = 0, room_viewport_y = 0,
	global = null;
// keyboard functions:
function keyboard_check(_key) { return key_down[_key]; }
function keyboard_check_pressed(_key) { return key_pressed[_key]; }
function keyboard_check_released(_key) { return key_released[_key]; }
// mouse functions:
function mouse_check() { return mouse_down; }
function mouse_check_pressed() { return mouse_pressed; }
function mouse_check_released() { return mouse_released; }
// virtual keys:
function vkey() {
	this.top = 0;
	this.left = 0;
	this.right = 0;
	this.bottom = 0;
	this.key = 0;
	this.down = false;
	this.active = true;
}
function vkey_add(_x, _y, _w, _h, _k) {
	var _v = new vkey();
	_v.left = _x;
	_v.top = _y;
	_v.right = _x + _w;
	_v.bottom = _y + _h;
	_v.width = _w;
	_v.height = _h;
	_v.key = _k;
	tu_vkeys.push(_v);
	return _v;
}
// misc:
function trace() { console.log.apply(console, arguments); }
function tu_idle() { } // left empty on purpose
// minimal math:
function abs(_value) { return _value < 0 ? -_value : _value; }
function sign(_value) { return _value > 0 ? 1 : _value < 0 ? -1 : 0; }
function choose() { return arguments[~~(Math.random() * arguments.length)]; }
function random(_value) { return Math.random() * _value; }
function irandom(_value) { return ~~(Math.random() * _value + 1); }
// trig functions:
function lengthdir_x(_length, _direction) { return _length * Math.cos(_direction * tu_d2r); }
function lengthdir_y(_length, _direction) { return _length * Math.sin(_direction * tu_d2r); }
function point_distance(_x1, _y1, _x2, _y2) { return Math.sqrt(Math.pow(( _x1 - _x2), 2) + Math.pow((_y1 - _y2), 2)); }
function point_direction(_x1, _y1, _x2, _y2) { return Math.atan2(_y2 - _y1, _x2 - _x1) * tu_r2d; }
function degtorad(_degree) { return _degree * tu_d2r; }
function radtodeg(_degree) { return _degree * tu_r2d; }
// sound functions:
function sound_mode(_sound, _mode) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	switch (_sound.type) {
	case "wav": if (!tu_wav_supported) return; break;
	case "ogg": if (!tu_ogg_supported) return; break;
	case "mp3": if (!tu_mp3_supported) return; break;
	}
	if (_mode != 3) {
		_sound.audio.pause();
		if (_mode != 0) {
			_sound.audio.currentTime = 0;
		} else return;
		_sound.audio.loop = _mode > 1;
	}
	_sound.audio.play();
}
function sound_play(_sound) { sound_mode(_sound, 1); }
function sound_loop(_sound) { sound_mode(_sound, 2); }
function sound_resume(_sound) { sound_mode(_sound, 3); }
function sound_stop(_sound) { sound_mode(_sound, 0); }
function sound_stop_all() { for ( var _s = 0; _s < tu_audios.length; _s++) sound_stop( tu_audios[_s] ); }
function sound_volume( _sound, _volume) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	_sound.audio.volume = _volume;
}
// draw sprite:
function draw_sprite(_sprite_index, _sub_image, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image > _sprite_index.frames.length - 1) _sub_image = 0;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.globalAlpha = tu_draw_alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset, -_sprite_index.yoffset);
	tu_context.restore();
}
function draw_sprite_part(_sprite_index, _sub_image, _left, _top, _width, _height, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.globalAlpha = tu_draw_alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], _left, _top, _width, _height, 0, 0, _width, _height);
	tu_context.restore();
}
function draw_sprite_ext(_sprite_index, _sub_image, _x, _y, _xscale, _yscale, _rotation, _alpha) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.rotate(degtorad(_rotation));
	tu_context.scale(_xscale, _yscale);
	tu_context.globalAlpha = _alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset , -_sprite_index.yoffset, _sprite_index.width, _sprite_index.height);
	tu_context.restore();
}
// draw text:
function draw_text(_x, _y, _text) {
	tu_context.font = tu_draw_font;
	tu_context.textAlign = tu_draw_halign;
	tu_context.textBaseline = tu_draw_valign;
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.fillText( _text, _x - room_viewport_x, _y - room_viewport_y );
}
// draw shapes:
function draw_rectangle(_x1, _y1, _x2, _y2, _outline) {
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	if (_outline) tu_context.strokeRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	else tu_context.fillRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	tu_context.closePath();
}
function draw_circle(_x, _y, _r, _outline) {
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	tu_context.arc( _x - room_viewport_x, _y - room_viewport_y, _r, 0, tu_2pi, true );
	tu_context.closePath();
	!_outline ? tu_context.fill() : tu_context.stroke();
}

function draw_line(_x1, _y1, _x2, _y2) {
	tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	tu_context.moveTo( _x1 - room_viewport_x, _y1 - room_viewport_y );
	tu_context.lineTo( _x2 - room_viewport_x, _y2 - room_viewport_y );
	tu_context.closePath();
	tu_context.stroke();	
}
// draw settings:
function draw_set_alpha(_alpha) {
	tu_draw_alpha = _alpha;
}
function draw_set_color( _r, _g, _b) {
	tu_draw_color_red = _r;
	tu_draw_color_green = _g;
	tu_draw_color_blue = _b;
	tu_draw_color = tu_draw_color_red + "," + tu_draw_color_green + "," + tu_draw_color_blue;
	tu_context.fillStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.strokeStyle = "rgb(" + tu_draw_color + ")";
}
function draw_set_linewidth(_width) { tu_context.lineWidth = _width; }
// draw settings - font:
function draw_set_font (_font) {
	tu_draw_font_ = _font;
	tu_draw_font = (_font.bold == 1 ? "bold" : "") + " " + (_font.italic == 1 ? "italic" : "") + " " + _font.size + "px " + _font.family;
	tu_context.font = tu_draw_font;
	tu_context.textAlign = tu_draw_halign;
	tu_context.textBaseline = tu_draw_valign;
}
function draw_set_halign(_halign) { tu_draw_halign = _halign; }
function draw_set_valign(_valign) { tu_draw_valign = _valign; }
// room translations:
function room_goto(_scene) {
	tu_viewport_inst = null;
	tu_room_to_go = _scene;
}
function room_goto_next() {
	var _ri = 0, _r;
	for (_r = 0; _r < tu_scenes.length; _r++) if (tu_scenes[_r] == room_current) _ri = _r;
	if (typeof tu_scenes[(_ri + 1)] == "object") room_goto(tu_scenes[_ri + 1]);
}
function room_goto_previous() {
	var _ri = 0, _r;
	for (_r = 0; _r < tu_scenes.length; _r++) if (tu_scenes[_r] == room_current) _ri = _r;
	if (typeof tu_scenes[(_ri - 1)] == "object") room_goto(tu_scenes[_ri - 1]);
}
function room_goto_first() { room_goto(tu_scenes[0]); }
function room_goto_last() { room_goto(tu_scenes[(tu_scenes.length - 1)]); }
function room_restart() { room_goto(room_current); }
// instance functions:
function instance_create_(_x, _y, _object) {
	var o = new _object.constructor;
	o.parameters = arguments.length > 3 ? Array.prototype.slice.call(arguments, 3) : [];
	o.object_index = _object;
	o.__instance = true;
	o.xstart = o.x = _x;
	o.ystart = o.y = _y;
	o._depth = o.depthstart;
	instance_activate(o);
	return o;
}
function instance_create(_x, _y, _object) {
	var o = instance_create_.apply(this, arguments);
	o.on_creation();
	return o;
}
function instance_number(_object) {
	return instance_list(_object).length;
}
function instance_first(_object) {
	var l = instance_list(_object);
	return l.length ? l[0] : null;
}
// BBox <> BBox
function collide_bbox_bbox(l1, t1, r1, b1, l2, t2, r2, b2) {
	return !(b1 <= t2 || t1 >= b2 || r1 <= l2 || l1 >= r2);
}
// BBox <> SpriteBox
// (left, top, right, bottom, instX, instY, scaleX, scaleY, sprite, ofsX, ofsY)
function collide_bbox_sbox(l1, t1, r1, b1, x2, y2, h2, v2, s2) {
	return
	!( b1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| t1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| r1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| l1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> BBox
function collide_sbox_point(x2, y2, h2, v2, s2, x1, y1) {
	return
	!( y1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| y1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| x1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| x1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> Circle
function collide_sbox_circle(x2, y2, h2, v2, s2, x1, y1, r1) {
	var u, v, dx, dy;
	u = x2 + h2 * (s2.collision_left - s2.xoffset);
	v = x2 + h2 * (s2.collision_right - s2.xoffset);
	dx = (x2 < u ? u : x2 > v ? v : x2) - x2;
	u = y2 + v2 * (s2.collision_top - s2.yoffset);
	v = y2 + v2 * (s2.collision_bottom - s2.yoffset);
	dy = (y2 < u ? u : y2 > v ? v : y2) - y2;
	return (dx * dx + dy * dy < r1 * r1);
}
// BBox <> Point
function collide_bbox_point(l1, t1, r1, b1, x2, y2) {
	return (x2 > l1 && x2 < r1 && y2 > t1 && y2 < b1);
}
// BBox <> Circle
function collide_bbox_circle(l1, t1, r1, b1, x2, y2, r2) {
	var dx = (x2 < l1 ? l1 : x2 > r1 ? r1 : x2) - x2, 
		dy = (y2 < t1 ? t1 : y2 > b1 ? b1 : y2) - y2;
	return (dx * dx + dy * dy < r2 * r2);
}
// Circle <> Range
function collide_circle_range(dx, dy, dr) {
	return (dx * dx + dy * dy < dr * dr);
}
// Circle <> Circle
function collide_circle_circle(x1, y1, r1, x2, y2, r2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1 + r2);
}
// Circle <> Point
function collide_circle_point(x1, y1, r1, x2, y2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1);
}
// instance collision checking:
function instance_position(_px, _py, _object, _mult) {
	var _x, _y, _ox, _oy, _sx, _sy, _o, _s, _i, _il, _r, _dx, _dy,
		_q = (_object.__instance ? [_object] : instance_list(_object)),
		_tm = (_mult) ? true : false;
	if (_tm) _ta = [];
	_il = _q.length;
	for (_i = 0; _i < _il; _i++) {
		_o = _q[_i];
		if (!_o.collision_checking) continue;
		_s = _o.sprite_index;
		if (!_s) continue;
		_x = _o.x; _sx = _o.image_xscale;
		_y = _o.y; _sy = _o.image_yscale;
		switch (_s.collision_shape)
		{
		case 0x2:
			if (_sx == 1 && _sy == 1) {
				_ox = _s.xoffset; _oy = _s.yoffset;
				if (!collide_bbox_point(_x + _s.collision_left - _ox, _y + _s.collision_top - _oy,
				_x + _s.collision_right - _ox, _y + _s.collision_bottom - _oy, _px, _py)) break;
			} else if (!collide_sbox_point(_x, _y, _sx, _sy, _s)) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		case 0x3:
			_r = _s.collision_radius * Math.max(_o.image_xscale, _o.image_yscale);
			_dx = _o.x + (_s.width / 2 - _s.xoffset) - _px;
			_dy = _o.y + (_s.height / 2 - _s.yoffset) - _py;
			if ((_dx * _dx) + (_dy * _dy) > _r * _r) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		}
	}
	return _tm ? _ta : null;
}
//
function __place_meeting__(nx, ny, what, many) {
	this.other = null;
	var i, l,
		// sprite, scale:
		ts = this.sprite_index,
		tsx, tsy, tfx, tfy, tst,
		// circle:
		tcx, tcy, tcr,
		// bbox:
		tbl, tbr, tbt, tbb,
		// instances, multiple, output, types:
		tz, tm, ct, ch, ra,
		// other:
		o, ox, oy, os, ost, osx, osy, ofx, ofy, ofr;
	if (ts == null) return false;
	tfx = ts.xoffset;
	tfy = ts.yoffset;
	tsx = this.image_xscale;
	tsy = this.image_yscale;
	tst = ts.collision_shape;
	// bbox:
	if (tst == 2) {
		tbl = nx + tsx * (ts.collision_left - tfx);
		tbr = nx + tsx * (ts.collision_right - tfx);
		tbt = ny + tsy * (ts.collision_top - tfy);
		tbb = ny + tsy * (ts.collision_bottom - tfy);
	}
	// circle:
	if (tst == 3) {
		tcr = ts.collision_radius * (tsx > tsy ? tsx : tsy);
		tcx = nx + tsx * (ts.width / 2 - tfx);
		tcy = ny + tsy * (ts.height / 2 - tfy);
	}
	//
	tz = (what.__instance ? [what] : instance_list(what));
	tm = many ? true : false;
	if (tm) ra = [];
	l = tz.length;
	for (i = 0; i < l; i++) {
		o = tz[i];
		if (!o.collision_checking) continue;
		os = o.sprite_index;
		if (os == null) continue;
		ox = o.x; osx = o.image_xscale;
		oy = o.y; osy = o.image_yscale;
		ost = os.collision_shape;
		ct = (tst << 4) | ost;
		ch = false;
		switch(ct) {
		case 0x22:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_bbox(tbl, tbt, tbr, tbb,
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy)) break;
			} else if (!collide_bbox_sbox(tbl, tbt, tbr, tbb, ox, oy, osx, osy, os)) break;
			ch = true;
			break;
		case 0x23:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_bbox_circle(tbl, tbt, tbr, tbb, ofx, ofy, ofr)) break;
			ch = true;
			break;
		case 0x32:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_circle(
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy,
				tcx, tcy, tcr)) break;
			} else if (!collide_sbox_circle(ox, oy, osx, osy, os, tcx, tcy, tcr)) break;
			ch = true;
			break;
		case 0x33:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_circle_circle(tcx, tcy, tcr, ofx, ofy, ofr)) break;
			ch = true;
			break;
		} if (!ch) continue;
		this.other = o;
		o.other = this;
		if (!tm) return (o);
		ra.push(o);
	} return ra;
}
function position_meeting(_x, _y, _object) {
	return instance_position(_x, _y, _object) != null;
}
function __move_towards_point__(_x, _y, _speed) {
	if (_speed == 0) return;
	if (this.x == _x && this.y == _y) return;
	var _dx = _x - this.x,
		_dy = _y - this.y,
		_dist = _dx * _dx + _dy * _dy;
	if (_dist < _speed * _speed) {
		this.x = _x;
		this.y = _y;
	} else {
		_dist = Math.sqrt(_dist);
		this.x += _dx * _speed / _dist;
		this.y += _dy * _speed / _dist;
	}
}

function __instance_destroy__() {
	tu_trash.push( this );
}
// web data:
function save_web_data(_name, _value) { if (window.localStorage) window.localStorage.setItem(_name, _value); }
function save_web_integer(_name, _value) { if (window.localStorage) window.localStorage.setItem("int_" + _name, _value); }
function save_web_float(_name, _value) { if (window.localStorage) window.localStorage.setItem("float_" + _name, _value); }
function save_web_string(_name, _value) { if (window.localStorage) window.localStorage.setItem("string_" + _name, _value); }
function load_web_data(_name) { if (window.localStorage) return window.localStorage.getItem(_name); }
function load_web_integer(_name) { if (window.localStorage) return parseInt(window.localStorage.getItem("int_" + _name)); }
function load_web_float(_name) { if (window.localStorage) return parseFloat(window.localStorage.getItem("float_" + _name)); }
function load_web_string(_name) { if (window.localStorage) return '' + window.localStorage.getItem("string_" + _name); }
function delete_web_data(_name) { if (window.localStorage) window.localStorage.removeItem(_name); }
function delete_web_integer(_name) { if (window.localStorage) window.localStorage.removeItem("int_" + _name); }
function delete_web_float(_name) { if (window.localStorage) window.localStorage.removeItem("float_" + _name); }
function delete_web_string(_name) { if (window.localStorage) window.localStorage.removeItem("string_" + _name); }
function clear_web_data() { if (window.localStorage) window.localStorage.clear(); }
function web_data_number() { if (window.localStorage) return window.localStorage.length; }
// misc functions:
function pause_game( _key) {
	tu_paused = true;
	tu_unpausekey = _key;
}
function modal_end() {
	if (tu_modal == null) return;
	tu_modal.instance_destroy();
	tu_modal = null;
}
function modal_start(_inst, _draw) {
	if (tu_modal != null) modal_end();
	tu_modal = _inst;
	tu_modaldraw = _draw;
}
//
function show_mouse() { tu_canvas.style.cursor = "default"; }
function hide_mouse() { tu_canvas.style.cursor = "none"; }
//
function tu_gettime() { return (new Date()).getTime(); }

/***********************************************************************
 * ENGINE
 ***********************************************************************/
 
function tu_global () { }
global = new tu_global();
//{ Events
function __keydownlistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == tu_canvas || document.activeElement == document.body) r = false;
	if (e.repeat) return;
	var keyCode = window.event ? e.which : e.keyCode;
	if (!key_down[keyCode]) {
		key_pressed[keyCode] = true;
		tu_keys_pressed.push(keyCode);
	}
	key_down[keyCode] = true;
	if (!r) e.preventDefault();
	return r;
};
function __keyuplistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == tu_canvas || document.activeElement == document.body) r = false;
	var keyCode = window.event ? e.which : e.keyCode;
	if (key_down[keyCode])
	{
		key_released[keyCode] = true;
		tu_keys_released.push(keyCode);
	}
	key_down[keyCode] = false;
	if (!r) e.preventDefault();
	return r;
};
function __touchsim__(_x, _y) {
	var r = [{}];
	r[0].pageX = tu_canvas.offsetLeft + _x;
	r[0].pageY = tu_canvas.offsetTop + _y;
	__touchvkey__(r);
}
function __mousemovelistener__(_e) {
	if (_e.pageX != undefined && _e.pageY != undefined) {
		mouse_x = _e.pageX;
		mouse_y = _e.pageY;
	} else {
		mouse_x = _e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		mouse_y = _e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	if (room_current != null) {
		mouse_x -= tu_canvas.offsetLeft;
		mouse_y -= tu_canvas.offsetTop;			
	}
	if (mouse_down) __touchsim__(mouse_x, mouse_y);
};
function __mousedownlistener__(_e) {
	//if (!mouse_down) mouse_pressed = true;
	//mouse_down = true;
	__touchsim__(mouse_x, mouse_y);
};
function __mouseuplistener__(_e) {
	//if (mouse_down) mouse_released = true;
	//mouse_down = false;
	__touchvkey__([]);
};
function __touchvkey__(_t) {
	var _tx = 0, _ty = 0, _tc = 0, _tl = _t.length, _vl = tu_vkeys.length, _i, _j, _c, _k,
		_dx = tu_canvas.offsetLeft, _dy = tu_canvas.offsetTop, _mx = _my = 1;
	if (tu_canvas.style.width) _mx 
	touch_x = []; touch_y = []; touch_count = 0;
	for (_i = 0; _i < _vl; _i++) tu_vkeys[_i].count = 0;
	for (_i = 0; _i < _tl; _i++) {
		_c = 0;
		for (_j = 0; _j < _vl; _j++) {
			if (!tu_vkeys[_j].active) continue;
			if (_t[_i].pageX - _dx > tu_vkeys[_j].right) continue;
			if (_t[_i].pageX - _dx < tu_vkeys[_j].left) continue;
			if (_t[_i].pageY - _dy < tu_vkeys[_j].top) continue;
			if (_t[_i].pageY - _dy > tu_vkeys[_j].bottom) continue;
			tu_vkeys[_j].count++;
			if (!tu_vkeys[_j].down) {
				tu_vkeys[_j].down = true;
				_k = tu_vkeys[_j].key;
				if (!key_down[_k]) {
					key_down[_k] = true;
					key_pressed[_k] = true;
					tu_keys_pressed.push(_k);
				}
			}
			_c++;
		}
		if (_c == 0) {
			_tx += _t[_i].pageX;
			_ty += _t[_i].pageY;
			touch_x[_tc] = _t[_i].pageX - _dx;
			touch_y[_tc] = _t[_i].pageY - _dy;
			_tc++;
		}
	}
	for (_i = 0; _i < _vl; _i++) {
		if (tu_vkeys[_i].count != 0) continue;
		if (!tu_vkeys[_i].down) continue;
		tu_vkeys[_i].down = false;
		_k = tu_vkeys[_i].key;
		if (key_down[_k]) {
			key_down[_k] = false;
			key_released[_k] = true;
			tu_keys_released.push(_k);
		}
	}
	touch_count = _tc;
	if (_tc != 0) {
		mouse_x = (_tx / _tc) - _dx;
		mouse_y = (_ty / _tc) - _dy;
		if (!mouse_down) {
			mouse_down = true;
			mouse_pressed = true;
		}
	} else if (mouse_down) {
		mouse_down = false;
		mouse_released = true;
	}
};
function __touchlistener__(e) {
	e.preventDefault();
	__touchvkey__(e.targetTouches);
};
//}
function tu_init () {
	if (document.addEventListener) {
		document.addEventListener("keydown", __keydownlistener__, false);
		document.addEventListener("keyup", __keyuplistener__, false);
		document.addEventListener("mousemove", __mousemovelistener__, false);
		document.addEventListener("mousedown", __mousedownlistener__, false);
		document.addEventListener("mouseup", __mouseuplistener__, false);
		document.addEventListener("touchstart", __touchlistener__, false);
		document.addEventListener("touchend", __touchlistener__, false);
		document.addEventListener("touchmove", __touchlistener__, false);
		document.addEventListener("touchenter", __touchlistener__, false);
		document.addEventListener("touchleave", __touchlistener__, false);
		document.addEventListener("touchcancel", __touchlistener__, false);
	} else {
		document.attachEvent("onkeydown", __keydownlistener__);
		document.attachEvent("onkeyup", __keyuplistener__);
		document.attachEvent("onmousemove", __mousemovelistener__);
		document.attachEvent("onmousedown", __mousedownlistener__);
		document.attachEvent("onmouseup", __mouseuplistener__);
	}
	// initialize keycodes
	for (var _k = 0; _k < 256; _k++) {
		key_down[_k] = key_pressed[_k] = key_released[_k] = false;
	}
}

function tu_loading_inc() { tu_loading++; tu_load_total++; }
function tu_loading_dec() { tu_loading--; }

function _$_(_id_) {
	return document.getElementById( _id_ );
}

function var_override(_what, _svar, _fget, _fset) {
	if (var_override_) {
		if (_what.hasOwnProperty(_svar)) return;
		Object.defineProperty(_what, _svar, {
			get: _fget,
			set: _fset
		});
	} else {
		if (_what.__lookupGetter__(_svar) != undefined) return;
		_what.__defineGetter__(_svar, _fget);
		_what.__defineSetter__(_svar, _fset);
	}
}

//{ Depth
function _tu_depth_find(_d) {
	var _tl = tu_depthi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = tu_depthi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function _tu_depth_new(_d) {
	var _i = _tu_depth_find(_d), _o = [];
	tu_depth.splice(_i, 0, _o);
	tu_depthi.splice(_i, 0, _d);
	return _i;
}
function tu_depth_add(_d, _o) {
	var _t = tu_depthi.indexOf(_d);
	if (_t == -1) _t = _tu_depth_new(_d); // create array if none
	tu_depth[_t].push(_o);
}
function tu_depth_delete(_d, _o) {
	var _t = tu_depth[tu_depthi.indexOf(_d)], _ti = _t.indexOf(_o);
	if (_ti == -1) return;
	_t.splice(_ti, 1);
}
function tu_depth_update() {
	var i, l = tu_depthu.length, o;
	if (l == 0) return;
	for (i = 0; i < l; i++) {
		o = tu_depthu[i];
		if (o.instance_active && o._depth !== undefined) tu_depth_delete(o._depth, o);
		o._depth = o._depthn;
		if (o.instance_active && o._depth !== undefined) tu_depth_add(o._depth, o);
		o._depthu = false;
	}
	tu_depthu = [];
}
// Accessors:
function tu_depth_get() { return this._depth; }
function tu_depth_set(_d) {
	if (this._depth == _d) return; // don't change on depth match
	this._depthn = _d;
	if (this._depthu) return;
	this._depthu = true;
	tu_depthu.push(this);
}
//}
//{ Types
function instance_list(_o) {
	var _t = _o._object_index_;
	if (tu_types[_t] == undefined) tu_types[_t] = [];
	return tu_types[_t];
}
function tu_type_add(_d, _o) {
	instance_list(_d).push(_o);
}
function tu_type_delete(_o, _p) {
	var _d = tu_types[_p], _t = _d.indexOf(_o);
	_d.splice(_t, 1);
}
function tu_type_get() { return this._object_index; }
//}
//{ Tileset functions
function tile_layer_find(_d) {
	var _tl = tu_tilesi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = tu_tilesi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function tile_layer_add(_d) {
	var _i = tile_layer_find(_d), _o = [];
	tu_tiles.splice(_i, 0, _o);
	tu_tilesi.splice(_i, 0, _d);
	return _o;
}
function tile(_s, _x, _y, _l, _t, _w, _h) {
	this.source = _s;
	this.x = _x;
	this.y = _y;
	this.left = _l;
	this.top = _t;
	this.width = _w;
	this.height = _h;
	this.width2 = _w;
	this.height2 = _h;
	this.sectors = [];
}
function tile_add(_b, _l, _t, _w, _h, _x, _y, _z) {
	var	_tx1 = Math.floor(_x / tu_tilez),
		_ty1 = Math.floor(_y / tu_tilez),
		_tx2 = Math.floor((_x + _w) / tu_tilez),
		_ty2 = Math.floor((_y + _h) / tu_tilez),
		_tt = new tile(_b, _x, _y, _l, _t, _w, _h),
		_tx, _ty, _ts,
		_d, _e = tu_tilesi.indexOf(_z);
	if (_e != -1) _d = tu_tiles[_e];
	else _d = tile_layer_add(_z);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_d[_tx] == null) _d[_tx] = [];
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_d[_tx][_ty] == null) _d[_tx][_ty] = [];
			_ts = _d[_tx][_ty];
			_ts.push(_tt);
			_tt.sectors.push(_ts);
		}
	}
	return _tt;
}
function tile_find(_x, _y, _w, _h, _d) {
	var _xw = _x + _w,
		_yh = _y + _h,
		_r = [],
		_tx, _ty, _ti, _tl, _ts, _tt, _ta,
		_tx1, _ty1, _tx2, _ty2;
	_ti = tu_tilesi.indexOf(_d);
	if (_ti == -1) return _r;
	_ta = tu_tiles[_ti];
	_tx1 = Math.floor(_x / tu_tilez);
	_ty1 = Math.floor(_y / tu_tilez);
	_tx2 = Math.floor((_x + _w) / tu_tilez);
	_ty2 = Math.floor((_y + _h) / tu_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_ta[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_ta[_tx][_ty] == null) continue;
			_ts = _ta[_tx][_ty];
			_tl = _ts.length;
			for (_ti = 0; _ti < _tl; _ti++) {
				_tt = _ts[_ti];
				if (_tt.x >= _xw) continue;
				if (_tt.y >= _yh) continue;
				if (_tt.x + _tt.width2 < _x) continue;
				if (_tt.y + _tt.height2 < _y) continue;
				_r.push(_tt);
			}
		}
	}
	return _r;
}
function tile_delete(_t) {
	var _ti, _tl, _ts;
	_tl = _t.sectors.length;
	for (_ti = 0; _ti < _tl; _ti++) {
		_ts = _t.sectors[_ti];
		_ts.splice(_ts.indexOf(_t), 1);
	}
}
function tile_srender(_s) {
	var _ti, _tt;
	for (_ti = 0; _ti < _s.length; _ti++) {
		if (_s[_ti] == null) continue;
		_tt = _s[_ti];
		if (_tt.source == null) continue;
		if (_tt.source.image == null) continue;
		tu_context.drawImage(_tt.source.image, _tt.left, _tt.top, _tt.width, _tt.height, _tt.x - room_viewport_x, _tt.y - room_viewport_y, _tt.width2, _tt.height2);
	}
}
function tile_lrender(_l) {
	var _tx, _ty,
		_tx1 = Math.floor(room_viewport_x / tu_tilez),
		_tx2 = Math.floor((room_viewport_x + room_viewport_width) / tu_tilez),
		_ty1 = Math.floor(room_viewport_y / tu_tilez),
		_ty2 = Math.floor((room_viewport_y + room_viewport_height) / tu_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_l[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_l[_tx][_ty] == null) continue;
			tile_srender(_l[_tx][_ty]);
		}
	}
}
//} /Tileset functions
//{ Some events & accessors
function tu_id_get() { return this; }
function tu_parent_get() { return this._parent_index; }
function image_single_get() { return (this.image_speed == 0 ? this.image_index : -1); }
function image_single_set(_o) { this.image_speed = 0; this.image_index = _o; }
// Handles object size & sprite updates. Should get rid of this in favor of accessors.
function __handle_sprite__(_object_) {
	if (_object_.sprite_index == null) return;
	_object_.sprite_width = _object_.sprite_index.width;
	_object_.sprite_height = _object_.sprite_index.height;
	_object_.sprite_xoffset = _object_.sprite_index.xoffset;
	_object_.sprite_yoffset = _object_.sprite_index.yoffset;
	_object_.image_number = _object_.sprite_index.frames.length;
	_object_.image_index += _object_.image_speed;
	if (_object_.image_index >= _object_.image_number) _object_.image_index = _object_.image_index % _object_.image_number;
	if (_object_.image_index < 0) _object_.image_index = _object_.image_number - 1 + (_object_.image_index % _object_.image_number);
}
function __draw_self__() {
	draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
//}
//{ Inherited event lookup functions.
// There's also a way to do this with much shorter code.
function on_creation_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_creation !== on_creation_i)
	return o.on_creation.apply(this);
}
function on_destroy_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_destroy !== on_destroy_i)
	return o.on_destroy.apply(this);
}
function on_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_step !== on_step_i)
	return o.on_step.apply(this);
}
function on_end_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_end_step !== on_end_step_i)
	return o.on_end_step.apply(this);
}
function on_draw_d() {
	__handle_sprite__(this);
	__draw_self__.apply(this);
}
function on_draw_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_draw !== on_draw_i)
	return o.on_draw.apply(this);
	on_draw_d.apply(this);
}
function on_collision_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_collision !== on_collision_i)
	return o.on_collision.apply(this);
}
function on_animationend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_animationend !== on_animationend_i)
	return o.on_animationend.apply(this);
}
function on_roomstart_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomstart !== on_roomstart_i)
	return o.on_roomstart.apply(this);
}
function on_roomend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomend !== on_roomend_i)
	return o.on_roomend.apply(this);
}
//} /Inherited event handles

// instance_init(this, object_index, parent_index, visible, depth, sprite, collideable, inner index)
// Universal object constructor:
function __instance_init__(_this, _oi, _p, _v, _d, _si, _c, _io) {
	_this._object_index = undefined;
	_this._object_index_ = _io;
	_this._depth = undefined;
	_this._depthn = undefined;
	_this._depthu = false;
	var_override(_this, 'depth', tu_depth_get, tu_depth_set );
	var_override(_this, 'object_index', tu_type_get, tu_idle );
	var_override(_this, 'image_single', image_single_get, image_single_set );
	var_override(_this, 'id', tu_id_get, tu_idle);
	var_override(_this, 'parent', tu_parent_get, tu_idle);
	_this._object_index = _oi;
	_this._parent_index = _p;
	_this.xstart = _this.xprevious = _this.x = 0;
	_this.ystart = _this.yprevious = _this.y = 0;
	_this.depthstart = _d;
	_this.image_angle = _this.direction = 0;
	_this.visible = _v;
	_this.image_yscale = _this.image_xscale = 1;
	_this.image_alpha = 1;
	_this.image_index = 0;
	_this.image_speed = 1;
	_this.sprite_index = _si;
	_this.speed = 0;
	_this.other = null;
	_this.collision_checking = _c;
	_this.persistent = false;
	_this.instance_active = false;
	// Instance-specific functions:
	_this.place_meeting = __place_meeting__;
	_this.move_towards_point = __move_towards_point__;
	_this.instance_destroy = __instance_destroy__;
	_this.draw_self = __draw_self__;
}
// Universal sprite constructor:
function __sprite_init__(_this, _name, _width, _height, _xofs, _yofs, _cshape, _crad, _cl, _cr, _ct, _cb, _frames) {
	_this.frames = [];
	var _frame, _fi;
	for (_fi = 0; _fi < _frames.length; _fi++) {
		_frame = new Image();
		if (_frames[_fi]) {
			tu_loading_inc();
			_frame.onload = tu_loading_dec;
			_frame.onerror = tu_loading_dec;
			_frame.src = _frames[_fi];
		}
		_this.frames.push(_frame);
	}
	_this.width = _width;
	_this.height = _height;
	_this.xoffset = _xofs;
	_this.yoffset = _yofs;
	_this.collision_shape = (_cshape == 'Circle' ? ct_circle : _cshape == 'Box' ? ct_box : 0);
	_this.collision_radius = _crad;
	_this.collision_left = _cl;
	_this.collision_right = _cr;
	_this.collision_top = _ct;
	_this.collision_bottom = _cb;
	tu_sprites.push(_this);
}
// Universal audio constructor:
function __audio_init__(_this, _name, _wav, _mp3, _ogg) {
	var _src = '';
	_this.type = 'none';
	if (tu_ogg_supported && (_ogg != '')) {
		_this.type = 'ogg';
		_src = _ogg;
	} else if (tu_mp3_supported && (_mp3 != '')) {
		_this.type = 'mp3';
		_src = _mp3;
	} else if (tu_wav_supported && (_wav != '')) {
		_this.type = 'wav';
		_src = _wav;
	}
	if (_src != '') {
		_this.audio = document.createElement('audio');
		_this.audio.setAttribute('src', _src);
	}
	tu_audios.push(_this);
}

function __background_init__(_this, _name, _file) {
	_this.image = new Image();
	tu_loading_inc();
	_this.image.onload = tu_loading_dec;
	_this.image.onerror = tu_loading_dec;
	_this.image.src = _file;
	tu_backgrounds.push(_this);
}

function __font_init__(_this, _name, _family, _size, _bold, _italic) {
	_this.family = _family;
	_this.size = _size;
	_this.bold = _bold;
	_this.italic = _italic;
	tu_fonts.push(_this);
}

// (this, name, width, height, speed, back. red, back. green, back. blue, background, back. tilex, back. tiley, back. stretch, view width, view height, view object, view hborder, view vborder)
function __room_start__(_this, _name, _rw, _rh, _rs, _br, _bg, _bb, _bi, _bx, _by, _bs, _vw, _vh, _vo, _vx, _vy) {
	_$_('tululoogame').innerHTML = "<canvas id='" + tu_canvas_id + "' width='" + _vw + "' height='" + _vh + "' style='" + tu_canvas_css + "'></canvas>";
	tu_canvas = _$_(tu_canvas_id);
	tu_context = tu_canvas.getContext('2d');
	room_current = _this;
	// generic:
	room_speed = _rs;
	room_width = _rw;
	room_height = _rh;
	// background color:
	room_background_color_red = _br;
	room_background_color_green = _bg;
	room_background_color_blue = _bb;
	// background image:
	room_background = _bi;
	room_background_x = 0;
	room_background_y = 0;
	room_background_tile_x = _bx;
	room_background_tile_y = _by;
	room_background_tile_stretch = _bs;
	// view:
	room_viewport_width = _vw;
	room_viewport_height = _vh;
	room_viewport_x = room_viewport_y = 0;
	room_viewport_object = _vo;
	room_viewport_hborder = _vx;
	room_viewport_vborder = _vy;
	// tiles:
	var _l, _b, _t, _i, _il, _tls_, i, l, d, o, a;
	_tls_ = _this.tiles; tu_tiles = []; tu_tilesi = [];
	for (_l = 0; _l < _tls_.length; _l++)
	for (_b = 1; _b < _tls_[_l].length; _b++)
	for (_t = 1; _t < _tls_[_l][_b].length; _t++)
	tile_add(_tls_[_l][_b][0], _tls_[_l][_b][_t][0], _tls_[_l][_b][_t][1], _tls_[_l][_b][_t][2], _tls_[_l][_b][_t][3], _tls_[_l][_b][_t][4], _tls_[_l][_b][_t][5], _tls_[_l][0]);
	// objects:
	tu_depth = []; tu_depthi = []; tu_depthu = []; tu_types = [];
	a = _this.objects;
	l = a.length;
	for (i = 0; i < l; i++) {
		d = a[i];
		d = d[0]; // temp.fix for rc2
		if (d.o === undefined) continue;
		o = instance_create_(d.x, d.y, d.o);
		if (d.s !== undefined) o.sprite_index = d.s;
		if (d.d !== undefined) o.direction = d.d;
		if (d.a !== undefined) o.image_angle = d.a;
		if (d.u !== undefined) o.image_xscale = d.u;
		if (d.v !== undefined) o.image_yscale = d.v;
		if (d.c !== undefined) d.c.apply(o);
	}
	// persistent objects:
	_l = tu_persist.length
	for (_t = 0; _t < _l; _t++) instance_activate(tu_persist[_t]);
	instance_foreach(function(o) {
		if (tu_persist.indexOf(o) != -1) return;
		o.on_creation();
	});
	tu_persist = [];
	//
	instance_foreach(function(o) {
		o.on_roomstart();
	});
}

function tu_preloader() {
	var _w = Math.min(400, (tu_canvas.width * 0.6) >> 0), _h = 16,
		_x = (tu_canvas.width - _w) >> 1, _y = (tu_canvas.height - _h) >> 1,
		_p = (tu_load_total - tu_loading) / tu_load_total,
		_s = "Loading resources: " + (tu_load_total - tu_loading) + "/" + (tu_load_total);
	tu_canvas.width = tu_canvas.width;
	tu_canvas.height = tu_canvas.height;
	tu_canvas.style.backgroundColor = "rgb(42, 42, 42)";
	tu_context.font = "italic 12px Verdana";
	tu_context.textAlign = "left";
	tu_context.textBaseline = "bottom";
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(192, 192, 192, 1)";
	tu_context.fillRect(_x - 1, _y - 1, _w + 2, _h + 2);
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(0, 0, 0, 1)";
	tu_context.fillRect(_x, _y, _w, _h);
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(255, 255, 255, 1)";
	tu_context.fillRect(_x + 2, _y + 2, (_w - 4) * _p, _h - 4);
	tu_context.fillText(_s, _x, _y - 2);
}

function tu_render_back() {
	if (room_background == null) return;
	if (room_background_tile_stretch) {
		tu_context.drawImage(room_background, 0 - room_viewport_x, 0 - room_viewport_y, room_width, room_height);
		return;
	}
	var _bw, _bh, _bx, _by, _vx, _vy, _vw, _vh, _x1, _x2, _y1, _y2, _ht, _vt;
	_bw = room_background.width;
	_bh = room_background.height;
	_bx = room_background_x;
	if (room_background_tile_x) { _bx = _bx < 0 ? _bw - _bx % _bw : _bx % _bw; }
	_by = room_background_y;
	if (room_background_tile_y) { _bx = _by < 0 ? _bh - _by % _bh : _by % _bh; }
	//
	_vx = room_viewport_x;
	_vy = room_viewport_y;
	_vw = room_viewport_width;
	_vh = room_viewport_height;
	//
	_x1 = room_background_tile_x ? Math.floor(_vx / _bw) * _bw - _bx : -_bx;
	_x2 = room_background_tile_x ? Math.floor((_vx + _vw + _bw) / _bw) * _bw : _x1 + _bw;
	_y1 = room_background_tile_y ? Math.floor(_vy / _bh) * _bh - _by : -_by;
	_y2 = room_background_tile_y ? Math.floor((_vy + _vh + _bh) / _bh) * _bh : _y1 + _bh;
	for (_ht = _x1; _ht < _x2; _ht += _bw)
	for (_vt = _y1; _vt < _y2; _vt += _bh)
	tu_context.drawImage(room_background, _ht - _vx, _vt - _vy);
}
// @1.2.6
function instance_activate(_i) {
	if (_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) tu_type_add(o, _i);
	//tu_type_add(_i._object_index, _i);
	//if (_i.parent != null) tu_type_add(_i.parent, _i);
	tu_depth_add(_i._depth, _i);
	_i.instance_active = true;
}
// @1.2.6
function instance_deactivate(_i) {
	if (!_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) tu_type_delete(o._object_index_, _i);
	//tu_type_delete(_i, _i._object_index_);
	//if (_i.parent != null) tu_type_delete(_i, _i.parent._object_index_);
	tu_depth_delete(_i._depth, _i);
	_i.instance_active = false;
}
// @1.2.6 Performs function for all instances
function instance_foreach(_function) {
	var _d, _l, _o;
	for (_d in tu_depth) {
		_l = tu_depth[_d];
		for (_o = 0; _o < _l.length; _o++) _function(_l[_o]);
	}
}
// @1.2.6 Performs function for all instances on specific depth
function instance_fordepth(_depth, _function) {
	var _o, _d = tu_depthc[_depth], _l;
	if (_d == null) return;
	_l = _d.length;
	for (_o = 0; _o < _l; _o++) _function(_d[_o]);
}
// @1.2.6 Actions performed on room switch
function tu_room_switchto_(_o) {
	_o.on_roomend();
	if (!_o.persistent) return;
	tu_persist.push(_o);
	instance_deactivate(_o);
}
function tu_room_switchto(_dest) {
	tu_persist = [];
	instance_foreach(tu_room_switchto_);
	room_current = _dest;
	tu_room_to_go = null;
	room_current.start();
}
// @1.0.0 Global step event
function tu_step() {
	// object step events:
	tu_trash = [];
	var tu_deptho, tu_depthl, _obj_, _objd_, _h, _v;
	for (tu_depthd in tu_depth) {
		tu_depthc = tu_depth[tu_depthd];
		tu_depthl = tu_depthc.length;
		for (tu_deptho = 0; tu_deptho < tu_depthl; tu_deptho++) {
			_obj_ = tu_depthc[tu_deptho];
			// is viewport object?
			if (room_viewport_object != null && tu_viewport_inst == null && (_obj_.object_index == room_viewport_object || _obj_.parent == room_viewport_object)) {
				tu_viewport_inst = _obj_;
			}
			// step events:
			_obj_.on_step();
			// move object:
			if (_obj_.speed != 0) {
				_objd_ = _obj_.direction * tu_d2r;
				_obj_.x += _obj_.speed * Math.cos(_objd_);
				_obj_.y += _obj_.speed * Math.sin(_objd_);
			}
			// post-step events:
			_obj_.on_collision();
			_obj_.on_end_step();
			// post:
			_obj_.xprevious = _obj_.x;
			_obj_.yprevious = _obj_.y;
		}
	}
	// follow object
	if (tu_viewport_inst != null) {
		_h = min(room_viewport_hborder, room_viewport_width / 2);
		_v = min(room_viewport_vborder, room_viewport_height / 2);
		// hborder:
		if (tu_viewport_inst.x < room_viewport_x + _h) room_viewport_x = tu_viewport_inst.x - _h;
		if (tu_viewport_inst.x > room_viewport_x + room_viewport_width - _h) room_viewport_x = tu_viewport_inst.x - room_viewport_width + _h;
		// vborder:
		if (tu_viewport_inst.y < room_viewport_y + _v) room_viewport_y = tu_viewport_inst.y - _v;
		if (tu_viewport_inst.y > room_viewport_y + room_viewport_height - _v) room_viewport_y = tu_viewport_inst.y - room_viewport_height + _v;
		// limits:
		room_viewport_x = Math.max(0, Math.min(room_viewport_x, room_width - room_viewport_width)) >> 0;
		room_viewport_y = Math.max(0, Math.min(room_viewport_y, room_height - room_viewport_height)) >> 0;
	}
}

function tu_draw() {
	// clear canvas:
	if (room_background_color_show) {
		tu_canvas.width = tu_canvas.width;
		tu_canvas.height = tu_canvas.height;
		// set background color:
		tu_canvas.style.backgroundColor = "rgb(" + room_background_color_red + "," + room_background_color_green + "," + room_background_color_blue + ")";
	}
	tu_render_back();
	tile_layer_last = 0;
	var tu_depthc, tu_depthv, tu_deptho, tu_depthl, _obj_;
	for (tu_depthd in tu_depth) {
		tu_depthc = tu_depth[tu_depthd];
		tu_depthv = tu_depthi[tu_depthd];
		for (; tu_tilesi[tile_layer_last] >= tu_depthv && tile_layer_last < tu_tiles.length; tile_layer_last++)
		{
			tile_lrender(tu_tiles[tile_layer_last]);
		}
		tu_depthl = tu_depthc.length;
		for (tu_deptho = 0; tu_deptho < tu_depthl; tu_deptho++) {
			_obj_ = tu_depthc[tu_deptho];
			if (_obj_.visible) _obj_.on_draw();
			_obj_.on_animationend();
		}
	}
	// render remaining tile layers:
	for (; tile_layer_last < tu_tiles.length; tile_layer_last++) {
		tile_lrender(tu_tiles[tile_layer_last]);
	}
}

function tu_prestep() {
	// clear mouse states and keypressed / keyrelesed statuses
	mouse_pressed = false;
	mouse_released = false;
	var _k, _r, _obj_;
	for (_k = 0; _k < tu_keys_pressed.length; _k++) key_pressed[tu_keys_pressed[_k]] = false;
	for (_k = 0; _k < tu_keys_released.length; _k++) key_released[tu_keys_released[_k]] = false;
	tu_keys_pressed = [];
	tu_keys_released = [];
	// remove objects from destroy stack
	for (_r = 0; _r < tu_trash.length; _r++) {
		_obj_ = tu_trash[_r];
		if (tu_modal == _obj_) tu_modal = null;
		_obj_.depth = undefined;
		tu_type_delete(_obj_, _obj_._object_index_);
		if (_obj_.parent != null) tu_type_delete(_obj_, _obj_.parent._object_index_);
		_obj_.on_destroy();
	}
}

function tu_loop() {
	// calculate render time
	tu_frame_time = tu_gettime();
	tu_elapsed = (tu_frame_time - tu_prev_frame_time);
	tu_frame_step += tu_elapsed;
	tu_frame_el += tu_elapsed;
	// continue game with the UN-Pause key
	if (tu_paused && keyboard_check_pressed(tu_unpausekey)) tu_paused = false;
	//
	if (tu_room_to_go != null && tu_canvas == null) tu_room_switchto(tu_room_to_go);
	// render game:
	if (tu_frame_step >= 1000 / room_speed && tu_loading == 0 && tu_canvas != null && !tu_paused) {
		tu_frame_count++;
		tu_elapsed = tu_frame_time - tu_prev_cycle_time;
		tu_prev_cycle_time = tu_frame_time;
		tu_frame_step -= 1000 / room_speed;
		if (tu_frame_step < 0 || tu_frame_step > 1024) tu_frame_step = 0;
		// start next room, if any:
		if (tu_room_to_go != null) tu_room_switchto(tu_room_to_go);
		//
		tu_redraw = tu_redraw_auto;
		if (tu_modal != null) {
			tu_modal.on_step();
			if (tu_modal != null) tu_modal.on_end_step();
		} else tu_step();
		tu_depth_update();
		if (tu_redraw) {
			if (tu_modal == null || tu_modaldraw) tu_draw();
			else tu_modal.on_draw();
		}
		tu_depth_update();
		tu_prestep();
		tu_depth_update();
	} else if (tu_loading > 0) tu_preloader();
	// calculate fps:
	if (tu_frame_el >= Math.floor(200 / room_speed) * 5 * room_speed)
	{
		fps = Math.ceil(tu_frame_count * 1000 / tu_frame_el);
		if (fps > room_speed) fps = room_speed;
		tu_frame_el = tu_frame_count = 0;
	}
	// repeat
	tu_prev_frame_time = tu_frame_time;
	setTimeout(tu_gameloop, 5);
}
tu_init();

/***********************************************************************
 * EXTENSIONS
 ***********************************************************************/


/***********************************************************************
 * SPRITES
 ***********************************************************************/
function __spr_biden_face() { 
__sprite_init__(this, spr_biden_face, 840, 840, 380, 250, 'Box', 420, 0, 840, 0, 840, ['img/spr_biden_face_1.png','img/spr_biden_face_0.png']);
}; var spr_biden_face = new __spr_biden_face();

function __spr_font() { 
__sprite_init__(this, spr_font, 64, 64, 0, 0, 'Box', 32, 0, 64, 0, 64, ['img/spr_font_0.png','img/spr_font_1.png','img/spr_font_2.png','img/spr_font_3.png','img/spr_font_4.png','img/spr_font_5.png','img/spr_font_6.png','img/spr_font_7.png','img/spr_font_8.png','img/spr_font_9.png','img/spr_font_10.png','img/spr_font_11.png','img/spr_font_12.png','img/spr_font_13.png','img/spr_font_14.png','img/spr_font_15.png','img/spr_font_16.png','img/spr_font_17.png','img/spr_font_18.png','img/spr_font_19.png','img/spr_font_20.png','img/spr_font_21.png','img/spr_font_22.png','img/spr_font_23.png','img/spr_font_24.png','img/spr_font_25.png','img/spr_font_26.png','img/spr_font_27.png','img/spr_font_28.png','img/spr_font_29.png','img/spr_font_30.png','img/spr_font_31.png','img/spr_font_32.png','img/spr_font_33.png','img/spr_font_34.png','img/spr_font_35.png','img/spr_font_36.png','img/spr_font_37.png','img/spr_font_38.png','img/spr_font_39.png','img/spr_font_40.png','img/spr_font_41.png','img/spr_font_42.png','img/spr_font_43.png','img/spr_font_44.png','img/spr_font_45.png','img/spr_font_46.png','img/spr_font_47.png','img/spr_font_48.png','img/spr_font_49.png','img/spr_font_50.png','img/spr_font_51.png','img/spr_font_52.png','img/spr_font_53.png','img/spr_font_54.png','img/spr_font_55.png','img/spr_font_56.png','img/spr_font_57.png','img/spr_font_58.png','img/spr_font_59.png','img/spr_font_60.png','img/spr_font_61.png','img/spr_font_62.png','img/spr_font_63.png','img/spr_font_64.png','img/spr_font_65.png','img/spr_font_66.png','img/spr_font_67.png','img/spr_font_68.png','img/spr_font_69.png','img/spr_font_70.png','img/spr_font_71.png','img/spr_font_72.png','img/spr_font_73.png','img/spr_font_74.png','img/spr_font_75.png','img/spr_font_76.png','img/spr_font_77.png','img/spr_font_78.png','img/spr_font_79.png','img/spr_font_80.png','img/spr_font_81.png','img/spr_font_82.png','img/spr_font_83.png','img/spr_font_84.png','img/spr_font_85.png','img/spr_font_86.png','img/spr_font_87.png','img/spr_font_88.png','img/spr_font_89.png','img/spr_font_90.png','img/spr_font_91.png','img/spr_font_92.png','img/spr_font_93.png','img/spr_font_94.png','img/spr_font_95.png','img/spr_font_96.png','img/spr_font_97.png','img/spr_font_98.png','img/spr_font_99.png','img/spr_font_100.png','img/spr_font_101.png','img/spr_font_102.png','img/spr_font_103.png','img/spr_font_104.png','img/spr_font_105.png','img/spr_font_106.png','img/spr_font_107.png','img/spr_font_108.png','img/spr_font_109.png','img/spr_font_110.png','img/spr_font_111.png','img/spr_font_112.png','img/spr_font_113.png','img/spr_font_114.png','img/spr_font_115.png','img/spr_font_116.png','img/spr_font_117.png','img/spr_font_118.png','img/spr_font_119.png','img/spr_font_120.png','img/spr_font_121.png','img/spr_font_122.png','img/spr_font_123.png','img/spr_font_124.png','img/spr_font_125.png','img/spr_font_126.png','img/spr_font_127.png','img/spr_font_128.png','img/spr_font_129.png','img/spr_font_130.png','img/spr_font_131.png','img/spr_font_132.png','img/spr_font_133.png','img/spr_font_134.png','img/spr_font_135.png','img/spr_font_136.png','img/spr_font_137.png','img/spr_font_138.png','img/spr_font_139.png','img/spr_font_140.png','img/spr_font_141.png','img/spr_font_142.png','img/spr_font_143.png','img/spr_font_144.png','img/spr_font_145.png','img/spr_font_146.png','img/spr_font_147.png','img/spr_font_148.png','img/spr_font_149.png','img/spr_font_150.png','img/spr_font_151.png','img/spr_font_152.png','img/spr_font_153.png','img/spr_font_154.png','img/spr_font_155.png','img/spr_font_156.png','img/spr_font_157.png','img/spr_font_158.png','img/spr_font_159.png','img/spr_font_160.png','img/spr_font_161.png','img/spr_font_162.png','img/spr_font_163.png','img/spr_font_164.png','img/spr_font_165.png','img/spr_font_166.png','img/spr_font_167.png','img/spr_font_168.png','img/spr_font_169.png','img/spr_font_170.png','img/spr_font_171.png','img/spr_font_172.png','img/spr_font_173.png','img/spr_font_174.png','img/spr_font_175.png','img/spr_font_176.png','img/spr_font_177.png','img/spr_font_178.png','img/spr_font_179.png','img/spr_font_180.png','img/spr_font_181.png','img/spr_font_182.png','img/spr_font_183.png','img/spr_font_184.png','img/spr_font_185.png','img/spr_font_186.png','img/spr_font_187.png','img/spr_font_188.png','img/spr_font_189.png','img/spr_font_190.png','img/spr_font_191.png','img/spr_font_192.png','img/spr_font_193.png','img/spr_font_194.png','img/spr_font_195.png','img/spr_font_196.png','img/spr_font_197.png','img/spr_font_198.png','img/spr_font_199.png','img/spr_font_200.png','img/spr_font_201.png','img/spr_font_202.png','img/spr_font_203.png','img/spr_font_204.png','img/spr_font_205.png','img/spr_font_206.png','img/spr_font_207.png','img/spr_font_208.png','img/spr_font_209.png','img/spr_font_210.png','img/spr_font_211.png','img/spr_font_212.png','img/spr_font_213.png','img/spr_font_214.png','img/spr_font_215.png','img/spr_font_216.png','img/spr_font_217.png','img/spr_font_218.png','img/spr_font_219.png','img/spr_font_220.png','img/spr_font_221.png','img/spr_font_222.png','img/spr_font_223.png','img/spr_font_224.png','img/spr_font_225.png','img/spr_font_226.png','img/spr_font_227.png','img/spr_font_228.png','img/spr_font_229.png','img/spr_font_230.png','img/spr_font_231.png','img/spr_font_232.png','img/spr_font_233.png','img/spr_font_234.png','img/spr_font_235.png','img/spr_font_236.png','img/spr_font_237.png','img/spr_font_238.png','img/spr_font_239.png','img/spr_font_240.png','img/spr_font_241.png','img/spr_font_242.png','img/spr_font_243.png','img/spr_font_244.png','img/spr_font_245.png','img/spr_font_246.png','img/spr_font_247.png','img/spr_font_248.png','img/spr_font_249.png','img/spr_font_250.png','img/spr_font_251.png','img/spr_font_252.png','img/spr_font_253.png','img/spr_font_254.png','img/spr_font_255.png']);
}; var spr_font = new __spr_font();

function __spr_usa_flag() { 
__sprite_init__(this, spr_usa_flag, 500, 750, 0, 0, 'Box', 250, 0, 500, 0, 750, ['img/spr_usa_flag_0.png']);
}; var spr_usa_flag = new __spr_usa_flag();

function __spr_boss_face() { 
__sprite_init__(this, spr_boss_face, 675, 578, 337, 289, 'Box', 337, 0, 675, 0, 578, ['img/spr_boss_face_0.png']);
}; var spr_boss_face = new __spr_boss_face();

function __spr_boss_face_mouth() { 
__sprite_init__(this, spr_boss_face_mouth, 205, 95, 102, 47, 'Box', 102, 0, 205, 0, 95, ['img/spr_boss_face_mouth_0.png']);
}; var spr_boss_face_mouth = new __spr_boss_face_mouth();



/***********************************************************************
 * SOUNDS
 ***********************************************************************/
function __aud_dialogue() { 
__audio_init__(this, aud_dialogue, '', 'aud/biden_voice.mp3', '');
}; var aud_dialogue = new __aud_dialogue();

function __aud_silence() { 
__audio_init__(this, aud_silence, '', 'aud/silence.mp3', '');
}; var aud_silence = new __aud_silence();



/***********************************************************************
 * MUSICS
 ***********************************************************************/


/***********************************************************************
 * BACKGROUNDS
 ***********************************************************************/
function __bg_usa_flag() { 
__background_init__(this, bg_usa_flag, 'img/usa_flag.png')}; var bg_usa_flag = new __bg_usa_flag();



/***********************************************************************
 * FONTS
 ***********************************************************************/


/***********************************************************************
 * OBJECTS
 ***********************************************************************/
function __GOD() {
__instance_init__(this, GOD, null, 1, 0, null, 1, 0);
this.on_creation = function() {
with(this) {
// Calculate scale factors
global.scale = window.innerHeight / room_height;
console.log("global.scale", global.scale);
var scale_factor = room_width / room_height;
console.log("scale factor", scale_factor);

// Stretch game canvas
room_height = window.innerHeight;
room_width = room_height * scale_factor;
console.log("room", room_width, room_height);
var canvas = document.getElementById("tululoocanvas");
canvas.width = room_width;
canvas.height = room_height;
canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

// Center game canvas
canvas.style.position = "absolute";
canvas.style.left = "50%";
canvas.style.top = "50%";
canvas.style.transform = "translate(-50%, -50%)";

instance_create(0, 0, GFX_MGR);
instance_create(0, 0, boss_face);
var t = instance_create(0, 0, text_creator);
console.log("created", t);
t.lines = [
	"Hello there,",
	"Welcome\nTo\nThe\nGame",
	"Let's see...",
	"Javascript objects are containers for named values."
];

global.c_black  = "#000000";
global.c_white  = "#FFFFFF";
global.c_red    = "#FF0000";
global.c_green  = "#00FF00";
global.c_blue   = "#0000FF";
global.c_yellow = "#FFFF00";
global.c_purple = "#800080";
global.c_cyan   = "#00FFFF";
global.c_gray   = "#808080";
global.c_orange = "#FFA500";
global.c_pink   = "#FFC0CB";

}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var GOD = new __GOD();

function __ROOM_MGR() {
__instance_init__(this, ROOM_MGR, null, 1, 0, null, 1, 2);
this.on_creation = function() {
with(this) {
//// Remove banner from index.html (sowwy UwU)
var a = document.getElementsByTagName('a')[0];
a.parentNode.removeChild(a);

//// Enable audio
window.addEventListener('touchstart', () => {
	for (var i = 0; i < tu_audios.length; i++) {
		tu_audios[i].audio.muted = false;
		tu_audios[i].audio.play();
		tu_audios[i].audio.stop();
	}
})


//// Go fullscreen to avoid browser detecting swipe gestures
function goFullscreen() {
    let element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // Edge/IE
        element.msRequestFullscreen();
    }

    // Remove this event listener after fullscreen is triggered
    document.removeEventListener("touchstart", goFullscreen);
}

// Wait for the first touch, then go fullscreen
document.addEventListener("touchstart", goFullscreen, { passive: false });

//// Fix the deprecation warning by adding the new mobile-web-app-capable meta tag
// Create and append the new mobile-web-app-capable meta tag
let mobileMetaTag = document.createElement('meta');
mobileMetaTag.name = "mobile-web-app-capable";
mobileMetaTag.content = "yes";
document.head.appendChild(mobileMetaTag);

//// Disable two-fingers gestures (e.g. zooming)
let isTwoFingerTouching = false;
let isTwoFingerScrolling = false;
// Detect two-finger touch on touch-enabled devices
document.addEventListener('touchstart', function(event) {
    if (event.touches.length === 2) {
        isTwoFingerTouching = true;
        console.log("Two fingers detected.");
    }
}, { passive: true });
document.addEventListener('touchend', function() {
    isTwoFingerTouching = false;  // Reset when fingers are lifted
}, { passive: true });
document.addEventListener('touchmove', function(event) {
    if (isTwoFingerTouching) {
        event.preventDefault();  // Block movement or zoom on touch screens
    }
}, { passive: false });
// Detect two-finger scroll on trackpad
window.addEventListener('wheel', function(event) {
    if (event.ctrlKey || event.deltaY !== 0) {
        isTwoFingerScrolling = true;
    }
}, { passive: false });
window.addEventListener('wheel', function(event) {
    if (isTwoFingerScrolling) {
        event.preventDefault();  // Block scrolling or zooming on trackpads
    }
}, { passive: false });

//// Lock screen orientation
async function lockOrientation() {
    if (screen.orientation && screen.orientation.lock) {
        try {
            await screen.orientation.lock("landscape"); // or "portrait"
            console.log("Orientation locked!");
        } catch (e) {
            console.error("Orientation lock failed:", e);
        }
    }
}

// Call after entering fullscreen
document.documentElement.requestFullscreen().then(lockOrientation);

}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
//if (room_current == start && mouse_check()) {
//	room_goto(dialogue)
//}

if (mouse_check_released()) {
	console.log(room_current);
	var goto;
	switch(room_current) {
		case room_boot: goto = room_dialogue;
			break;
	}
	room_goto(goto);
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var ROOM_MGR = new __ROOM_MGR();

function __boss_face() {
__instance_init__(this, boss_face, null, 1, 0, spr_boss_face, 0, 4);
this.on_creation = function() {
with(this) {
if (this.executeOnce) {
	return;
}

// sound_loop(aud_dialogue);

/*
this.image_speed = 0;

setTimeout(animateFace, 100 + Math.random()*500);
function animateFace() {
	image_index++;
	setTimeout(animateFace, 50 + Math.random()*200);
}
*/

this.x = room_width / 2;
this.y = room_height / 2 - room_height / 8;
this.image_xscale = this.image_yscale = global.scale * 2;

this.mouth_y_start = this.mouth_y = this.y + 268 * global.scale;

this.executeOnce = true;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.mouth_y += global.scale;
if ((this.mouth_y - this.mouth_y_start) >= global.scale * 7) {
	this.mouth_y = this.mouth_y_start;
}

return;

if (image_xscale >= global.scale * 2) {
	return;
}
image_xscale += global.scale / 500;
image_yscale = image_xscale;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_sprite_ext(spr_boss_face, 0, x, y, image_xscale, image_yscale, 0, 1);

draw_sprite_ext(spr_boss_face_mouth, 0, x + 12, this.mouth_y, image_xscale, image_yscale, 0, 1);
}
}
};
}; var boss_face = new __boss_face();

function __text_creator() {
__instance_init__(this, text_creator, null, 1, 0, null, 0, 5);
this.on_creation = function() {
with(this) {
// Workaround for creation code getting called multiple times
if (this.execute_once) {
	return;
}

this.scale = global.scale*1.3;

// Text drawing setup
this.text = [];
this.line_index = -1;
this.font = spr_font;
this.ascii_offset = 0;
this.sprite_offset = 0;

// Text drawing helpers
this.letter_width = this.font.width * this.scale;
this.letter_height = this.font.height * this.scale;
this.letter_x = this.box_x = this.letter_width / 2;
this.letter_y = this.box_y = room_height - room_height / 3;

// Text rotation
this.angle = 0;
this.angle_max = this.scale * 2;
this.angle_rotation_step = this.scale / 10;
this.angle_rotation_clock = true;

// Text movement
this.offset_v = 0;
this.offset_v_max = this.scale * 12;
this.offset_v_down = true;

this.execute_once = true;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
// Skip if text is not defined yet
if (typeof this.lines == 'undefined' || this.lines.length == 0) {
	return;
}

// Text box rotation animation
if (this.angle_rotation_clock) {
	this.angle += this.angle_rotation_step;
	if (this.angle >= this.angle_max) {
		this.angle_rotation_clock = false;
	}
} else {
	this.angle -= this.angle_rotation_step;
	if (this.angle <= -this.angle_max) {
		this.angle_rotation_clock = true;
	}
}

// Text box movement animation
var offset_v_step = (this.offset_v_max - abs(this.offset_v)) * 0.1
if (this.offset_v_down) {
	this.offset_v += offset_v_step;
	if (this.offset_v >= this.offset_v_max * 0.9) {
		this.offset_v_down = false;
	}
} else {
	this.offset_v -= offset_v_step;
	if (this.offset_v <= -this.offset_v_max * 0.9) {
		this.offset_v_down = true;
	}
}

/*
Text is updated when mouse is released, so text is empty until we tap for the first time.
We cannot use this code at creation since this.lines is set after that.
Maybe put this code in End step and execute it only once?
In general I should create a framework to execute stuff only once
at specific times...
*/
if (mouse_check_released()) {
	if (this.line_index == this.lines.length - 1) {
		// end of input text reached
		return;
	}
	this.line_index++;
	this.text = [];
	this.letter_x = this.box_x;
	this.letter_y = this.box_y + this.letter_height / 2;
	
	var line = format_line(this.lines[this.line_index]);
	console.log("line", line);
	for (var i = 0; i < line.length; i++) {
		// convert each letter in a map (index, x, y) to be used when drawing text
		if (line[i] == '\n') {
			continue;
		}
		this.text.push({
			index: line[i].charCodeAt(0) - this.ascii_offset + this.sprite_offset,
			x: this.letter_x,
			y: this.letter_y - this.scale * 5 + random(this.scale * 10),
		})
		this.letter_x += this.letter_width;
		if (line[i + 1] == '\n' || this.letter_x >= room_width - this.box_x*2) {
			// if maximum line width was reached, make sure to draw text in next line
			this.letter_x = this.box_x;
			this.letter_y += this.letter_height;
		}
	}
}

function format_line(line) {
	var max_length = (room_width - letter_width) / letter_width;
	console.log("max_length", max_length);
	var words = line.split(" ");
	var current_length = 0;
	var formatted_line = "";

	for (var i = 0; i < words.length; i++) {
		word = words[i];
		if (current_length + word.length + 1 > max_length) {
			// TODO: Split word (with "-" separator) vs. putting it in the next line
			// Currently we cannot display words >10 chars
			formatted_line += '\n';
			current_length = 0;
		}
		if (current_length > 0) {
			formatted_line += " ";
			current_length++;
		}
		formatted_line += word;
		current_length += word.length; // should it be += formatted_line.length?
		console.log("format", current_length);
	}
	return formatted_line;
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
// Skip in case text is not populated yet
if (typeof this.text == 'undefined' || this.text.length == 0) {
	return;
}

// Text box background
draw_rectangle_ext(
	0, this.box_y,
	room_width, room_height,
	"#5b6a6d", 1, 0, false
);

// Text content
draw_set_alpha(1);
for (var i = 0; i<this.text.length; i++) {
	draw_sprite_ext(
		this.font,
		this.text[i].index,
		this.text[i].x - (random(1) < 0.01 ? 10*global.scale : 0),
		this.text[i].y + this.offset_v,
		this.scale,
		this.scale,
		0,
		1,
	);
}

// Text box outline
draw_set_linewidth(3 * this.scale);
var box_border = global.scale *10;
draw_rectangle_ext(
	box_border, this.box_y + box_border + this.offset_v,
	room_width - box_border, room_height - box_border + this.offset_v,
	global.c_white, 1, this.angle, true
);
// Text box overlap outline
var box_overlap_border = global.scale * 12 + this.angle;
draw_rectangle_ext(
	box_border - box_overlap_border, this.box_y + box_border + this.offset_v - box_overlap_border,
	room_width - box_border - box_overlap_border, room_height - box_border + this.offset_v - box_overlap_border,
	global.c_white, 0.5, this.angle, true
);

}
}
};
}; var text_creator = new __text_creator();

function __GFX_MGR() {
__instance_init__(this, GFX_MGR, null, 1, -999, null, 1, 6);
this.on_creation = function() {
with(this) {
global.GFX_MGR = this;

draw_rectangle = glitch_draw(draw_rectangle);
draw_rectangle_ext = glitch_draw(draw_rectangle_ext);
draw_sprite = glitch_draw(draw_sprite);
draw_sprite_ext = glitch_draw(draw_sprite_ext);
this.glitch_draw_random = 0;
this.scanline_offset = 0;

_room_viewport_x = room_viewport_x;
_room_viewport_y = room_viewport_y;

// TODO remove vvv
let overlay_canvas = document.createElement("canvas");
overlay_canvas.width = room_viewport_width; // window.innerWidth;
overlay_canvas.height = room_viewport_height; // window.innerHeight;
overlay_canvas.style.position = "absolute";
overlay_canvas.style.top = room_viewport_y; // "0";
overlay_canvas.style.left = room_viewport_x; // "0";
overlay_canvas.style.pointerEvents = "none"; // Prevent interference with game inputs
document.body.appendChild(overlay_canvas);

this.overlay_canvas = overlay_canvas;
this.overlay_ctx = this.overlay_canvas.getContext("2d");

let noiseCanvas = document.createElement("canvas");
noiseCanvas.width = overlay_canvas.width;
noiseCanvas.height = overlay_canvas.height;
let noiseCtx = noiseCanvas.getContext("2d");

// Generate static noise once
for (let i = 0; i < 5000; i++) {
    let x = Math.random() * noiseCanvas.width;
    let y = Math.random() * noiseCanvas.height;
    noiseCtx.fillStyle = `rgba(255,255,255,${Math.random() * 0.1})`;
    noiseCtx.fillRect(x, y, 1, 1);
}

this.noiseCanvas = noiseCanvas;
let blurCanvas = document.createElement("canvas");
blurCanvas.width = overlay_canvas.width;
blurCanvas.height = overlay_canvas.height;
this.blurCanvas = blurCanvas;
this.blurCtx = this.blurCanvas.getContext("2d");
let canvas = document.createElement("canvas");
canvas.width = tu_canvas.width;
canvas.height = tu_canvas.height;
let ctx_red_screen = canvas.getContext("2d");
ctx_red_screen.fillStyle = "rgba(255, 0, 0, 0.3)"; // Red tint
ctx_red_screen.fillRect(0, 0, room_width, room_height);
this.red_screen = canvas;

this.vcr_canvas = document.createElement("canvas");
this.vcr_canvas.width = tu_canvas.width;
this.vcr_canvas.height = tu_canvas.height;
this.vcr_ctx = this.vcr_canvas.getContext("2d");
this.vcr_timer = 0;

}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (Math.floor(tu_frame_step) == 0) {
	glitch_draw_random = random(1); // TODO base it on stress level
}

if (Math.random() < 0.1) { // screen glitch movement
	//room_viewport_x += (Math.random() - 0.5) * 5;
	//room_viewport_y += (Math.random() - 0.5) * 5;
}

if (Math.random() < 0.01) { // screen reset
	room_viewport_x = _room_viewport_x;
	room_viewport_y = _room_viewport_y;
}
function drawVHSOverlay() {
    //overlayCtx.clearRect(overlayCanvas.style.left, overlayCanvas.style.top, overlayCanvas.width, overlayCanvas.height);
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    // Draw scanlines
    for (let y = 0; y < overlayCanvas.height; y += 6) { 
        //overlayCtx.fillStyle = "rgba(0, 0, 0, 0.1)";
        //overlayCtx.fillRect(0, y, overlayCanvas.width, 2);
    }

    // Apply RGB bleeding effect
	/*
    let offset = (Math.random() - 0.5) * 5; // Random horizontal shift
    overlayCtx.globalCompositeOperation = "screen";
    
    overlayCtx.translate(-1 + offset, 0);
    overlayCtx.fillStyle = "red";
    overlayCtx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    overlayCtx.translate(2, 0);
    overlayCtx.fillStyle = "blue";
    overlayCtx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    overlayCtx.globalCompositeOperation = "source-over"; // Reset blending
*/

    // Apply slight blur
    //overlayCtx.filter = "blur(1.5px)";
	blurCtx.filter = "blur(1.5px)";
	blurCtx.clearRect(0, 0, blurCanvas.width, blurCanvas.height);
	blurCtx.drawImage(overlayCanvas, 0, 0);

	// Draw the pre-blurred overlay back onto the main canvas
	overlayCtx.drawImage(blurCanvas, 0, 0);

    // Call again after a delay
    setTimeout(drawVHSOverlay, 1000 / 30);
	//requestAnimationFrame(drawVHSOverlay);
}

// drawVHSOverlay();

}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_noise();
draw_scanlines();
draw_vcr();
if (this.glitch_draw_random > 0.1  && this.glitch_draw_random < 0.5) {
	slice_screen();
}




}
}
};
}; var GFX_MGR = new __GFX_MGR();



/***********************************************************************
 * SCENES
 ***********************************************************************/
function __room_boot() { 
this.tiles = [
];
this.objects = [
[{o:ROOM_MGR, x:120, y:220}]];
this.start = function() {
__room_start__(this, room_boot, 640, 480, 30, 0, 0, 0, null, 0, 0, 0, 640, 480, null, 50, 50);
};
}
var room_boot = new __room_boot();
tu_scenes.push(room_boot);
function __room_dialogue() { 
this.tiles = [
];
this.objects = [
[{o:GOD, x:100, y:60}]];
this.start = function() {
__room_start__(this, room_dialogue, 960, 1704, 30, 0, 83, 146, bg_usa_flag.image, 1, 0, 1, 960, 1704, null, 0, 0);

/*
var scale_factor = room_width / room_height;
console.log("scale factor", scale_factor);
global.scale_h = window.innerHeight / room_height;
global.scale_w = scale_factor;
console.log("global.scale", global.scale_w, global.scale_h);
room_height = window.innerHeight;
room_width = room_height * scale_factor;
console.log("room", room_width, room_height);
var canvas = document.getElementById("tululoocanvas");
canvas.width = room_width;
canvas.height = room_height;
console.log("canvas", canvas.height, canvas.width);
*/
};
}
var room_dialogue = new __room_dialogue();
tu_scenes.push(room_dialogue);
tu_room_to_go = room_boot;


/***********************************************************************
 * CUSTOM GLOBAL VARIABLES
 ***********************************************************************/


/***********************************************************************
 * CUSTOM GLOBAL FUNCTIONS
 ***********************************************************************/

function draw_rectangle_ext(x1, y1, x2, y2, color, alpha, angle, outline) { 
let ctx = tu_canvas.getContext("2d");

let width = x2 - x1;
let height = y2 - y1;
let centerX = x1 + width / 2;
let centerY = y1 + height / 2;

ctx.globalAlpha = alpha;
ctx.fillStyle = color;
ctx.strokeStyle = color;

ctx.save();
ctx.translate(centerX, centerY);
ctx.rotate(angle * Math.PI / 180);

if (outline) {
	ctx.strokeRect(-width / 2, -height / 2, width, height);
} else {
	ctx.fillRect(-width / 2, -height / 2, width, height);
}

ctx.restore();
ctx.globalAlpha = 1.0;
}
function glitch_draw(fn) { 
return function(...args) {
	if (global.GFX_MGR == undefined) {
		return;
	}
	let rnd = global.GFX_MGR.glitch_draw_random;
	
	let ctx = tu_canvas.getContext("2d");
	ctx.save();

	if (rnd > 0.5 && rnd < 0.51) {
		console.log("glitch_draw - glitch");
	    ctx.translate(200*global.scale, 0);
		//ctx.scale(1.1, 1.1);
		ctx.globalAlpha = 0.3;
		ctx.filter = "saturate(0) brightness(250%) "; 
		// Draw shadow
		fn(...args);
		
		// Reset
		ctx.restore();
		ctx.save();  
		ctx.filter = "none";  
		ctx.globalAlpha = 1.0;  
	} else {
		// Draw original
		fn(...args);
	}

	if (rnd < 0.01) {
		console.log("glitch_draw - screen");
		ctx.globalCompositeOperation = "screen";
		ctx.translate(-40*global.scale, 0); 
		ctx.globalAlpha = 0.5; 
		// Draw effected
		fn(...args);
	}
	if (rnd > 0.99) {
		console.log("glitch_draw - lighter");
		ctx.globalCompositeOperation = "lighter";
		ctx.translate(15*global.scale, 0);
		// Draw effected
		fn(...args);
	}

	ctx.restore();
	// Reset drawing settings
	ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1.0;
};

}
function draw_noise() { 
for (let i = 0; i < 3000; i++) {
	let ctx = tu_canvas.getContext("2d");
	//ctx.save();

	let x = Math.random() * room_width;
	let y = Math.random() * room_height;
	ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`;
	ctx.fillRect(x, y, 1, 1);
	
	//ctx.restore();
}

}
function draw_scanlines() { 
if (!global.GFX_MGR) {
	return;
}

let scanline_step = 8;
let scanline_offset_step = global.scale;
let ctx = tu_canvas.getContext("2d");

// Update scanline offset ONCE per frame
global.GFX_MGR.scanline_offset =
	(global.GFX_MGR.scanline_offset + scanline_offset_step) % (global.scale * scanline_step * 2);

for (let y = global.GFX_MGR.scanline_offset; y < room_height; y += global.scale * scanline_step * 2) {
	//ctx.globalCompositeOperation = "color-burn";
	ctx.globalCompositeOperation = "overlay";
	ctx.globalAlpha = 0.2 + 0.8 * (room_height - y) / room_height;
	ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
	ctx.fillRect(0, y, room_width, global.scale * scanline_step);
}

// reset
ctx.globalCompositeOperation = "source-over";
ctx.globalAlpha = 1.0;
}
function glitch_canvas(fn) { 
return function() {
	fn(); // Call original tu_draw function

	let ctx = tu_canvas.getContext("2d");
	let imageData = ctx.getImageData(0, 0, tu_canvas.width, tu_canvas.height);
	let pixels = imageData.data;

	// Apply horizontal glitch shifts & RGB distortion
	for (let y = 0; y < tu_canvas.height; y += 5) {
		let offset = (Math.random() - 0.5) * 10; // Random horizontal shift
		ctx.putImageData(imageData, offset, y);
	}

	ctx.globalCompositeOperation = "lighter"; // Blend colors
	ctx.filter = "blur(1px)";
	ctx.putImageData(imageData, 0, 0);
	ctx.globalCompositeOperation = "source-over";
};

}
function glitch_draw_v2(fn) { 
return function (...args) {
    if (global.GFX_MGR == undefined) {
        return;
    }

    let rnd = global.GFX_MGR.glitch_draw_random;
    let ctx = tu_canvas.getContext("2d");
    ctx.save();

    // 🔹 1. Random Flicker Effect (Simulates VHS frame instability)
    if (Math.random() < 0.05) {
        ctx.globalAlpha = Math.random() > 0.7 ? 0.2 : 1.0;
    }

    // 🔹 2. Shadow Ghosting Effect
    if (rnd > 0.5 && rnd < 0.55) {
        console.log("glitch_draw - shadow");
        ctx.scale(1.1, 1.1);
        ctx.globalAlpha = 0.3;
        ctx.filter = "brightness(50%) blur(3px)";
        fn(...args);
    }

    // 🔹 3. Draw Base Sprite
    ctx.globalAlpha = 1.0;
    fn(...args);

    // 🔹 4. RGB Channel Separation
    if (rnd < 0.05) {
        console.log("glitch_draw - red shift");
        ctx.globalCompositeOperation = "screen";
        ctx.translate(-2 * global.scale, 0); // Slight red channel shift
        ctx.filter = "brightness(1.2)";
        fn(...args);
    }
    if (rnd > 0.95) {
        console.log("glitch_draw - blue shift");
        ctx.globalCompositeOperation = "lighter";
        ctx.translate(2 * global.scale, 0); // Opposite shift for blue
        fn(...args);
    }

    // 🔹 5. Scanline Wobble Effect
    if (rnd > 0.7) {
        ctx.translate(0, Math.sin(Date.now() * 0.01) * 3); // Small Y wobble
    }

    ctx.restore();

    // Reset blending mode & transparency
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1.0;
};

}
function glitch_draw_v3(fn) { 
return function(...args) {
    let ctx = tu_canvas.getContext("2d");

    // Get sprite position and size
    let x = args[1], y = args[2], width = args[3] || 64, height = args[4] || 64;

    // Create an offscreen canvas matching the sprite size
    let buffer_canvas = document.createElement("canvas");
    buffer_canvas.width = room_width;
    buffer_canvas.height = room_height;
    let buffer_ctx = buffer_canvas.getContext("2d");

    buffer_ctx.clearRect(0, 0, room_width, room_height);
    
    // Step 1: Draw the sprite onto the buffer
    buffer_ctx.save();
    fn.apply(buffer_ctx, args);
    buffer_ctx.restore();

    // Step 2: Apply the red tint only inside the sprite area
    buffer_ctx.globalCompositeOperation = "source-atop";
    buffer_ctx.fillStyle = "red";
    buffer_ctx.fillRect(0, 0, width, height);
    buffer_ctx.globalCompositeOperation = "source-over";

    // Step 3: Draw the tinted sprite back onto the main canvas
    ctx.drawImage(buffer_canvas, x, y);
};

}
function draw_vcr() { 
if (global.GFX_MGR === undefined) {
	return;
}

const canvas = global.GFX_MGR.vcr_canvas;
const ctx = global.GFX_MGR.vcr_ctx;
let posy1 = 0;
let posy2 = canvas.height;
let posy3 = 0;
const num = 20;
radius = 2;
xmax = canvas.width;
ymax = canvas.height;		

//canvas.style.filter = `blur(2px)`;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = `#fff`;

ctx.beginPath();
for (var i = 0; i <= num; i++) {
	var x = Math.random(i) * xmax;
	var y1 = (posy1+=3) + random(posy2);
	var y2 = random(posy3-=3);
	ctx.fillRect(x, y1, radius, radius);
	ctx.fillRect(x, y2, radius, radius);
	ctx.fill();

	this.render_tail(ctx, x, y1, radius);
	this.render_tail(ctx, x, y2, radius);
}
ctx.closePath();

let tu_ctx = tu_canvas.getContext("2d");
tu_ctx.globalCompositeOperation = "screen"; 
tu_ctx.filter = "blur(2px)";
tu_ctx.drawImage(canvas, 0, 0);
tu_ctx.globalCompositeOperation = "source-over";
}
function render_tail(ctx, x, y, radius) { 
const n = 1 + random(50);

const dirs = [1, -1];
let rd = radius;
const dir = dirs[Math.floor(Math.random() * dirs.length)];
for (let i = 0; i < n; i++) {
	const step = 0.01;
	let r = (rd -= step) + random(radius);
	let dx = 1 + random(4);

	radius -= 0.1;

	dx *= dir;

	ctx.fillRect((x += dx), y, r, r);
	ctx.fill();
}
}
function slice_screen() { 
if (global.GFX_MGR === undefined) {
	return;
}

const canvas = global.GFX_MGR.vcr_canvas;
const ctx = global.GFX_MGR.vcr_ctx;
if (Math.floor(tu_frame_step) == 0) {
    let width = canvas.width;
    let height = canvas.height;
    let slice_height = height/24; // Make slices bigger for visibility

    ctx.clearRect(0, 0, width, height);

    // 🟢 First, draw the full tu_canvas onto vcr_canvas
    ctx.drawImage(tu_canvas, 0, 0);  

    // 🟥 Apply horizontal slice shifting (VCR distortion)
    for (let y = 0; y < height; y += slice_height) {
        let shift = (Math.random() - 0.5) * 20; // Stronger shift effect
        ctx.drawImage(canvas, 0, y, width, slice_height, shift, y, width, slice_height);
    }
}

let tu_ctx = tu_canvas.getContext("2d");
tu_ctx.globalCompositeOperation = "screen"; 
tu_ctx.drawImage(canvas, 0, 0);
tu_ctx.globalCompositeOperation = "source-over";
}


tu_gameloop = tu_loop;
tu_loop();
