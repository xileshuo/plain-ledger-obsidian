!function(f){typeof module!='undefined'&&typeof exports=='object'?module.exports=f():typeof define!='undefined'&&define.amd?define(f):(typeof self!='undefined'?self:this).fflate=f()}(function(){var _e={};"use strict";_e.deflate=zt,_e.deflateSync=kt,_e.inflate=At,_e.inflateSync=Tt,_e.gzip=It,_e.compress=It,_e.gzipSync=Ut,_e.compressSync=Ut,_e.gunzip=Zt,_e.gunzipSync=qt,_e.zlib=Lt,_e.zlibSync=Bt,_e.unzlib=Nt,_e.unzlibSync=Pt,_e.gzip=It,_e.compress=It,_e.decompress=Jt,_e.decompressSync=Kt,_e.strToU8=nn,_e.strFromU8=rn,_e.zip=dn,_e.zipSync=gn,_e.unzip=zn,_e.unzipSync=kn;var t=(typeof module!='undefined'&&typeof exports=='object'?function(_f){"use strict";var e,r,t,n=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{e=require("worker_threads"),r=e.Worker,t=e.isMarkedAsUntransferable}catch(e){}exports.default=r?function(e,o,a,s,u){var i=!1,l=new r(e+n,{eval:!0}).on("error",function(e){return u(e,null)}).on("message",function(e){return u(null,e)}).on("exit",function(e){e&&!i&&u(Error("exited with code "+e),null)});return t&&(s=s.filter(function(e){return!t(e)})),l.postMessage(a,s),l.terminate=function(){return i=!0,r.prototype.terminate.call(l)},l}:function(e,r,t,n,o){setImmediate(function(){return o(Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var a=function(){};return{terminate:a,postMessage:a}};return _f}:function(_f){"use strict";var e={};_f.default=function(r,t,s,a,n){var o=new Worker(e[t]||(e[t]=URL.createObjectURL(new Blob([r+';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'],{type:"text/javascript"}))));return o.onmessage=function(e){var r=e.data,t=r.$e$;if(t){var s=Error(t[0]);s.code=t[1],s.stack=t[2],n(s,null)}else n(null,r)},o.postMessage(s,a),o};return _f})({}),n=Uint8Array,r=Uint16Array,i=Int32Array,e=new n([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),o=new n([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),s=new n([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),a=function(t,n){for(var e=new r(31),o=0;o<31;++o)e[o]=n+=1<<t[o-1];var s=new i(e[30]);for(o=1;o<30;++o)for(var a=e[o];a<e[o+1];++a)s[a]=a-e[o]<<5|o;return{b:e,r:s}},u=a(e,2),h=u.b,f=u.r;h[28]=258,f[258]=28;for(var c=a(o,0),l=c.b,p=c.r,v=new r(32768),d=0;d<32768;++d){var g=(43690&d)>>1|(21845&d)<<1;v[d]=((65280&(g=(61680&(g=(52428&g)>>2|(13107&g)<<2))>>4|(3855&g)<<4))>>8|(255&g)<<8)>>1}var y=function(t,n,i){for(var e=t.length,o=0,s=new r(n);o<e;++o)t[o]&&++s[t[o]-1];var a,u=new r(n);for(o=1;o<n;++o)u[o]=u[o-1]+s[o-1]<<1;if(i){a=new r(1<<n);var h=15-n;for(o=0;o<e;++o)if(t[o])for(var f=o<<4|t[o],c=n-t[o],l=u[t[o]-1]++<<c,p=l|(1<<c)-1;l<=p;++l)a[v[l]>>h]=f}else for(a=new r(e),o=0;o<e;++o)t[o]&&(a[o]=v[u[t[o]-1]++]>>15-t[o]);return a},m=new n(288);for(d=0;d<144;++d)m[d]=8;for(d=144;d<256;++d)m[d]=9;for(d=256;d<280;++d)m[d]=7;for(d=280;d<288;++d)m[d]=8;var b=new n(32);for(d=0;d<32;++d)b[d]=5;var w=y(m,9,0),x=y(m,9,1),z=y(b,5,0),k=y(b,5,1),M=function(t){for(var n=t[0],r=1;r<t.length;++r)t[r]>n&&(n=t[r]);return n},S=function(t,n,r){var i=n/8|0;return(t[i]|t[i+1]<<8)>>(7&n)&r},A=function(t,n){var r=n/8|0;return(t[r]|t[r+1]<<8|t[r+2]<<16)>>(7&n)},T=function(t){return(t+7)/8|0},D=function(t,r,i){return(null==r||r<0)&&(r=0),(null==i||i>t.length)&&(i=t.length),new n(t.subarray(r,i))};_e.FlateErrorCode={UnexpectedEOF:0,InvalidBlockType:1,InvalidLengthLiteral:2,InvalidDistance:3,StreamFinished:4,NoStreamHandler:5,InvalidHeader:6,NoCallback:7,InvalidUTF8:8,ExtraFieldTooLong:9,InvalidDate:10,FilenameTooLong:11,StreamFinishing:12,InvalidZipData:13,UnknownCompressionMethod:14};var C=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],I=function(t,n,r){var i=Error(n||C[t]);if(i.code=t,Error.captureStackTrace&&Error.captureStackTrace(i,I),!r)throw i;return i},U=function(t,r,i,a){var u=t.length,f=a?a.length:0;if(!u||r.f&&!r.l)return i||new n(0);var c=!i,p=c||2!=r.i,v=r.i;c&&(i=new n(3*u));var d=function(t){var r=i.length;if(t>r){var e=new n(Math.max(2*r,t));e.set(i),i=e}},g=r.f||0,m=r.p||0,b=r.b||0,w=r.l,z=r.d,C=r.m,U=r.n,F=8*u;do{if(!w){g=S(t,m,1);var E=S(t,m+1,3);if(m+=3,!E){var Z=t[(Y=T(m)+4)-4]|t[Y-3]<<8,q=Y+Z;if(q>u){v&&I(0);break}p&&d(b+Z),i.set(t.subarray(Y,q),b),r.b=b+=Z,r.p=m=8*q,r.f=g;continue}if(1==E)w=x,z=k,C=9,U=5;else if(2==E){var O=S(t,m,31)+257,G=S(t,m+10,15)+4,L=O+S(t,m+5,31)+1;m+=14;for(var B=new n(L),H=new n(19),j=0;j<G;++j)H[s[j]]=S(t,m+3*j,7);m+=3*G;var N=M(H),P=(1<<N)-1,V=y(H,N,1);for(j=0;j<L;){var Y,J=V[S(t,m,P)];if(m+=15&J,(Y=J>>4)<16)B[j++]=Y;else{var K=0,Q=0;for(16==Y?(Q=3+S(t,m,3),m+=2,K=B[j-1]):17==Y?(Q=3+S(t,m,7),m+=3):18==Y&&(Q=11+S(t,m,127),m+=7);Q--;)B[j++]=K}}var R=B.subarray(0,O),W=B.subarray(O);C=M(R),U=M(W),w=y(R,C,1),z=y(W,U,1)}else I(1);if(m>F){v&&I(0);break}}p&&d(b+131072);for(var X=(1<<C)-1,$=(1<<U)-1,_=m;;_=m){var tt=(K=w[A(t,m)&X])>>4;if((m+=15&K)>F){v&&I(0);break}if(K||I(2),tt<256)i[b++]=tt;else{if(256==tt){_=m,w=null;break}var nt=tt-254;tt>264&&(nt=S(t,m,(1<<(et=e[j=tt-257]))-1)+h[j],m+=et);var rt=z[A(t,m)&$],it=rt>>4;if(rt||I(3),m+=15&rt,W=l[it],it>3){var et=o[it];W+=A(t,m)&(1<<et)-1,m+=et}if(m>F){v&&I(0);break}p&&d(b+131072);var ot=b+nt;if(b<W){var st=f-W,at=Math.min(W,ot);for(st+b<0&&I(3);b<at;++b)i[b]=a[st+b]}for(;b<ot;++b)i[b]=i[b-W]}}r.l=w,r.p=_,r.b=b,r.f=g,w&&(g=1,r.m=C,r.d=z,r.n=U)}while(!g);return b!=i.length&&c?D(i,0,b):i.subarray(0,b)},F=function(t,n,r){var i=n/8|0;t[i]|=r<<=7&n,t[i+1]|=r>>8},E=function(t,n,r){var i=n/8|0;t[i]|=r<<=7&n,t[i+1]|=r>>8,t[i+2]|=r>>16},Z=function(t,i){for(var e=[],o=0;o<t.length;++o)t[o]&&e.push({s:o,f:t[o]});var s=e.length,a=e.slice();if(!s)return{t:j,l:0};if(1==s){var u=new n(e[0].s+1);return u[e[0].s]=1,{t:u,l:1}}e.sort(function(t,n){return t.f-n.f}),e.push({s:-1,f:25001});var h=e[0],f=e[1],c=0,l=1,p=2;for(e[0]={s:-1,f:h.f+f.f,l:h,r:f};l!=s-1;)h=e[e[c].f<e[p].f?c++:p++],f=e[c!=l&&e[c].f<e[p].f?c++:p++],e[l++]={s:-1,f:h.f+f.f,l:h,r:f};var v=a[0].s;for(o=1;o<s;++o)a[o].s>v&&(v=a[o].s);var d=new r(v+1),g=q(e[l-1],d,0);if(g>i){o=0;var y=0,m=g-i,b=1<<m;for(a.sort(function(t,n){return d[n.s]-d[t.s]||t.f-n.f});o<s;++o){var w=a[o].s;if(!(d[w]>i))break;y+=b-(1<<g-d[w]),d[w]=i}for(y>>=m;y>0;){var x=a[o].s;d[x]<i?y-=1<<i-d[x]++-1:++o}for(;o>=0&&y;--o){var z=a[o].s;d[z]==i&&(--d[z],++y)}g=i}return{t:new n(d),l:g}},q=function(t,n,r){return-1==t.s?Math.max(q(t.l,n,r+1),q(t.r,n,r+1)):n[t.s]=r},O=function(t){for(var n=t.length;n&&!t[--n];);for(var i=new r(++n),e=0,o=t[0],s=1,a=function(t){i[e++]=t},u=1;u<=n;++u)if(t[u]==o&&u!=n)++s;else{if(!o&&s>2){for(;s>138;s-=138)a(32754);s>2&&(a(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(a(o),--s;s>6;s-=6)a(8304);s>2&&(a(s-3<<5|8208),s=0)}for(;s--;)a(o);s=1,o=t[u]}return{c:i.subarray(0,e),n:n}},G=function(t,n){for(var r=0,i=0;i<n.length;++i)r+=t[i]*n[i];return r},L=function(t,n,r){var i=r.length,e=T(n+2);t[e]=255&i,t[e+1]=i>>8,t[e+2]=255^t[e],t[e+3]=255^t[e+1];for(var o=0;o<i;++o)t[e+o+4]=r[o];return 8*(e+4+i)},B=function(t,n,i,a,u,h,f,c,l,p,v){F(n,v++,i),++u[256];for(var d=Z(u,15),g=d.t,x=d.l,k=Z(h,15),M=k.t,S=k.l,A=O(g),T=A.c,D=A.n,C=O(M),I=C.c,U=C.n,q=new r(19),B=0;B<T.length;++B)++q[31&T[B]];for(B=0;B<I.length;++B)++q[31&I[B]];for(var H=Z(q,7),j=H.t,N=H.l,P=19;P>4&&!j[s[P-1]];--P);var V,Y,J,K,Q=p+5<<3,R=G(u,m)+G(h,b)+f,W=G(u,g)+G(h,M)+f+14+3*P+G(q,j)+2*q[16]+3*q[17]+7*q[18];if(l>=0&&Q<=R&&Q<=W)return L(n,v,t.subarray(l,l+p));if(F(n,v,1+(W<R)),v+=2,W<R){V=y(g,x,0),Y=g,J=y(M,S,0),K=M;var X=y(j,N,0);for(F(n,v,D-257),F(n,v+5,U-1),F(n,v+10,P-4),v+=14,B=0;B<P;++B)F(n,v+3*B,j[s[B]]);v+=3*P;for(var $=[T,I],_=0;_<2;++_){var tt=$[_];for(B=0;B<tt.length;++B)F(n,v,X[rt=31&tt[B]]),v+=j[rt],rt>15&&(F(n,v,tt[B]>>5&127),v+=tt[B]>>12)}}else V=w,Y=m,J=z,K=b;for(B=0;B<c;++B){var nt=a[B];if(nt>255){var rt;E(n,v,V[257+(rt=nt>>18&31)]),v+=Y[rt+257],rt>7&&(F(n,v,nt>>23&31),v+=e[rt]);var it=31&nt;E(n,v,J[it]),v+=K[it],it>3&&(E(n,v,nt>>5&8191),v+=o[it])}else E(n,v,V[nt]),v+=Y[nt]}return E(n,v,V[256]),v+Y[256]},H=new i([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),j=new n(0),N=function(t,s,a,u,h,c){var l=c.z||t.length,v=new n(u+l+5*(1+Math.ceil(l/7e3))+h),d=v.subarray(u,v.length-h),g=c.l,y=7&(c.r||0);if(s){y&&(d[0]=c.r>>3);for(var m=H[s-1],b=m>>13,w=8191&m,x=(1<<a)-1,z=c.p||new r(32768),k=c.h||new r(x+1),M=Math.ceil(a/3),S=2*M,A=function(n){return(t[n]^t[n+1]<<M^t[n+2]<<S)&x},C=new i(25e3),I=new r(288),U=new r(32),F=0,E=0,Z=c.i||0,q=0,O=c.w||0,G=0;Z+2<l;++Z){var j=A(Z),N=32767&Z,P=k[j];if(z[N]=P,k[j]=N,O<=Z){var V=l-Z;if((F>7e3||q>24576)&&(V>423||!g)){y=B(t,d,0,C,I,U,E,q,G,Z-G,y),q=F=E=0,G=Z;for(var Y=0;Y<286;++Y)I[Y]=0;for(Y=0;Y<30;++Y)U[Y]=0}var J=2,K=0,Q=w,R=N-P&32767;if(V>2&&j==A(Z-R))for(var W=Math.min(b,V)-1,X=Math.min(32767,Z),$=Math.min(258,V);R<=X&&--Q&&N!=P;){if(t[Z+J]==t[Z+J-R]){for(var _=0;_<$&&t[Z+_]==t[Z+_-R];++_);if(_>J){if(J=_,K=R,_>W)break;var tt=Math.min(R,_-2),nt=0;for(Y=0;Y<tt;++Y){var rt=Z-R+Y&32767,it=rt-z[rt]&32767;it>nt&&(nt=it,P=rt)}}}R+=(N=P)-(P=z[N])&32767}if(K){C[q++]=268435456|f[J]<<18|p[K];var et=31&f[J],ot=31&p[K];E+=e[et]+o[ot],++I[257+et],++U[ot],O=Z+J,++F}else C[q++]=t[Z],++I[t[Z]]}}for(Z=Math.max(Z,O);Z<l;++Z)C[q++]=t[Z],++I[t[Z]];y=B(t,d,g,C,I,U,E,q,G,Z-G,y),g||(c.r=7&y|d[y/8|0]<<3,y-=7,c.h=k,c.p=z,c.i=Z,c.w=O)}else{for(Z=c.w||0;Z<l+g;Z+=65535){var st=Z+65535;st>=l&&(d[y/8|0]=g,st=l),y=L(d,y+1,t.subarray(Z,st))}c.i=l}return D(v,0,u+T(y)+h)},P=function(){for(var t=new Int32Array(256),n=0;n<256;++n){for(var r=n,i=9;--i;)r=(1&r&&-306674912)^r>>>1;t[n]=r}return t}(),V=function(){var t=-1;return{p:function(n){for(var r=t,i=0;i<n.length;++i)r=P[255&r^n[i]]^r>>>8;t=r},d:function(){return~t}}},Y=function(){var t=1,n=0;return{p:function(r){for(var i=t,e=n,o=0|r.length,s=0;s!=o;){for(var a=Math.min(s+2655,o);s<a;++s)e+=i+=r[s];i=(65535&i)+15*(i>>16),e=(65535&e)+15*(e>>16)}t=i,n=e},d:function(){return(255&(t%=65521))<<24|(65280&t)<<8|(255&(n%=65521))<<8|n>>8}}},J=function(t,r,i,e,o){if(!o&&(o={l:1},r.dictionary)){var s=r.dictionary.subarray(-32768),a=new n(s.length+t.length);a.set(s),a.set(t,s.length),t=a,o.w=s.length}return N(t,null==r.level?6:r.level,null==r.mem?o.l?Math.ceil(1.5*Math.max(8,Math.min(13,Math.log(t.length)))):20:12+r.mem,i,e,o)},K=function(t,n){var r={};for(var i in t)r[i]=t[i];for(var i in n)r[i]=n[i];return r},Q=function(t,n,r){for(var i=t(),e=""+t,o=e.slice(e.indexOf("[")+1,e.lastIndexOf("]")).replace(/\s+/g,"").split(","),s=0;s<i.length;++s){var a=i[s],u=o[s];if("function"==typeof a){n+=";"+u+"=";var h=""+a;if(a.prototype)if(-1!=h.indexOf("[native code]")){var f=h.indexOf(" ",8)+1;n+=h.slice(f,h.indexOf("(",f))}else for(var c in n+=h,a.prototype)n+=";"+u+".prototype."+c+"="+a.prototype[c];else n+=h}else r[u]=a}return n},R=[],W=function(t){var n=[];for(var r in t)t[r].buffer&&n.push((t[r]=new t[r].constructor(t[r])).buffer);return n},X=function(n,r,i,e){if(!R[i]){for(var o="",s={},a=n.length-1,u=0;u<a;++u)o=Q(n[u],o,s);R[i]={c:Q(n[a],o,s),e:s}}var h=K({},R[i].e);return(0,t.default)(R[i].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+r+"}",i,h,W(h),e)},$=function(){return[n,r,i,e,o,s,h,l,x,k,v,C,y,M,S,A,T,D,I,U,Tt,et,ot]},_=function(){return[n,r,i,e,o,s,f,p,w,m,z,b,v,H,j,y,F,E,Z,q,O,G,L,B,T,D,N,J,kt,et]},tt=function(){return[pt,gt,lt,V,P]},nt=function(){return[vt,dt]},rt=function(){return[yt,lt,Y]},it=function(){return[mt]},et=function(t){return postMessage(t,[t.buffer])},ot=function(t){return t&&{out:t.size&&new n(t.size),dictionary:t.dictionary}},st=function(t,n,r,i,e,o){var s=X(r,i,e,function(t,n){s.terminate(),o(t,n)});return s.postMessage([t,n],n.consume?[t.buffer]:[]),function(){s.terminate()}},at=function(t){return t.ondata=function(t,n){return postMessage([t,n],[t.buffer])},function(n){n.data[0]?(t.push(n.data[0],n.data[1]),postMessage([n.data[0].length])):t.flush(n.data[1])}},ut=function(t,n,r,i,e,o,s){var a,u=X(t,i,e,function(t,r){t?(u.terminate(),n.ondata.call(n,t)):Array.isArray(r)?1==r.length?(n.queuedSize-=r[0],n.ondrain&&n.ondrain(r[0])):(r[1]&&u.terminate(),n.ondata.call(n,t,r[0],r[1])):s(r)});u.postMessage(r),n.queuedSize=0,n.push=function(t,r){n.ondata||I(5),a&&n.ondata(I(4,0,1),null,!!r),n.queuedSize+=t.length,u.postMessage([t,a=r],t.buffer instanceof ArrayBuffer?[t.buffer]:[])},n.terminate=function(){u.terminate()},o&&(n.flush=function(t){u.postMessage([0,t])})},ht=function(t,n){return t[n]|t[n+1]<<8},ft=function(t,n){return(t[n]|t[n+1]<<8|t[n+2]<<16|t[n+3]<<24)>>>0},ct=function(t,n){return ft(t,n)+4294967296*ft(t,n+4)},lt=function(t,n,r){for(;r;++n)t[n]=r,r>>>=8},pt=function(t,n){var r=n.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=n.level<2?4:9==n.level?2:0,t[9]=3,0!=n.mtime&&lt(t,4,Math.floor(new Date(n.mtime||Date.now())/1e3)),r){t[3]=8;for(var i=0;i<=r.length;++i)t[i+10]=r.charCodeAt(i)}},vt=function(t){31==t[0]&&139==t[1]&&8==t[2]||I(6,"invalid gzip data");var n=t[3],r=10;4&n&&(r+=2+(t[10]|t[11]<<8));for(var i=(n>>3&1)+(n>>4&1);i>0;i-=!t[r++]);return r+(2&n)},dt=function(t){var n=t.length;return(t[n-4]|t[n-3]<<8|t[n-2]<<16|t[n-1]<<24)>>>0},gt=function(t){return 10+(t.filename?t.filename.length+1:0)},yt=function(t,n){var r=n.level,i=0==r?0:r<6?1:9==r?3:2;if(t[0]=120,t[1]=i<<6|(n.dictionary&&32),t[1]|=31-(t[0]<<8|t[1])%31,n.dictionary){var e=Y();e.p(n.dictionary),lt(t,2,e.d())}},mt=function(t,n){return(8!=(15&t[0])||t[0]>>4>7||(t[0]<<8|t[1])%31)&&I(6,"invalid zlib data"),(t[1]>>5&1)==+!n&&I(6,"invalid zlib data: "+(32&t[1]?"need":"unexpected")+" dictionary"),2+(t[1]>>3&4)};function bt(t,n){return"function"==typeof t&&(n=t,t={}),this.ondata=n,t}var wt=function(){function t(t,r){if("function"==typeof t&&(r=t,t={}),this.ondata=r,this.o=t||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new n(98304),this.o.dictionary){var i=this.o.dictionary.subarray(-32768);this.b.set(i,32768-i.length),this.s.i=32768-i.length}}return t.prototype.p=function(t,n){this.ondata(J(t,this.o,0,0,this.s),n)},t.prototype.push=function(t,r){this.ondata||I(5),this.s.l&&I(4);var i=t.length+this.s.z;if(i>this.b.length){if(i>2*this.b.length-32768){var e=new n(-32768&i);e.set(this.b.subarray(0,this.s.z)),this.b=e}var o=this.b.length-this.s.z;this.b.set(t.subarray(0,o),this.s.z),this.s.z=this.b.length,this.p(this.b,!1),this.b.set(this.b.subarray(-32768)),this.b.set(t.subarray(o),32768),this.s.z=t.length-o+32768,this.s.i=32766,this.s.w=32768}else this.b.set(t,this.s.z),this.s.z+=t.length;this.s.l=1&r,(this.s.z>this.s.w+8191||r)&&(this.p(this.b,r||!1),this.s.w=this.s.i,this.s.i-=2),r&&(this.s=this.o={},this.b=j)},t.prototype.flush=function(t){if(this.ondata||I(5),this.s.l&&I(4),this.p(this.b,!1),this.s.w=this.s.i,this.s.i-=2,t){var r=new n(6);r[0]=this.s.r>>3;var i=L(r,this.s.r,j);this.s.r=0,this.ondata(r.subarray(0,i>>3),!1)}},t}();_e.Deflate=wt;var xt=function(){return function(t,n){ut([_,function(){return[at,wt]}],this,bt.call(this,t,n),function(t){var n=new wt(t.data);onmessage=at(n)},6,1)}}();function zt(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[_],function(t){return et(kt(t.data[0],t.data[1]))},0,r)}function kt(t,n){return J(t,n||{},0,0)}_e.AsyncDeflate=xt;var Mt=function(){function t(t,r){"function"==typeof t&&(r=t,t={}),this.ondata=r;var i=t&&t.dictionary&&t.dictionary.subarray(-32768);this.s={i:0,b:i?i.length:0},this.o=new n(32768),this.p=new n(0),i&&this.o.set(i)}return t.prototype.e=function(t){if(this.ondata||I(5),this.d&&I(4),this.p.length){if(t.length){var r=new n(this.p.length+t.length);r.set(this.p),r.set(t,this.p.length),this.p=r}}else this.p=t},t.prototype.c=function(t){this.s.i=+(this.d=t||!1);var n=this.s.b,r=U(this.p,this.s,this.o);this.ondata(D(r,n,this.s.b),this.d),this.o=D(r,this.s.b-32768),this.s.b=this.o.length,this.p=D(this.p,this.s.p/8|0),this.s.p&=7},t.prototype.push=function(t,n){this.e(t),this.c(n)},t}();_e.Inflate=Mt;var St=function(){return function(t,n){ut([$,function(){return[at,Mt]}],this,bt.call(this,t,n),function(t){var n=new Mt(t.data);onmessage=at(n)},7,0)}}();function At(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[$],function(t){return et(Tt(t.data[0],ot(t.data[1])))},1,r)}function Tt(t,n){return U(t,{i:2},n&&n.out,n&&n.dictionary)}_e.AsyncInflate=St;var Dt=function(){function t(t,n){this.c=V(),this.l=0,this.v=1,wt.call(this,t,n)}return t.prototype.push=function(t,n){this.c.p(t),this.l+=t.length,wt.prototype.push.call(this,t,n)},t.prototype.p=function(t,n){var r=J(t,this.o,this.v&&gt(this.o),n&&8,this.s);this.v&&(pt(r,this.o),this.v=0),n&&(lt(r,r.length-8,this.c.d()),lt(r,r.length-4,this.l)),this.ondata(r,n)},t.prototype.flush=function(t){wt.prototype.flush.call(this,t)},t}();_e.Gzip=Dt,_e.Compress=Dt;var Ct=function(){return function(t,n){ut([_,tt,function(){return[at,wt,Dt]}],this,bt.call(this,t,n),function(t){var n=new Dt(t.data);onmessage=at(n)},8,1)}}();function It(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[_,tt,function(){return[Ut]}],function(t){return et(Ut(t.data[0],t.data[1]))},2,r)}function Ut(t,n){n||(n={});var r=V(),i=t.length;r.p(t);var e=J(t,n,gt(n),8),o=e.length;return pt(e,n),lt(e,o-8,r.d()),lt(e,o-4,i),e}_e.AsyncGzip=Ct,_e.AsyncCompress=Ct;var Ft=function(){function t(t,n){this.v=1,this.r=0,Mt.call(this,t,n)}return t.prototype.push=function(t,r){if(Mt.prototype.e.call(this,t),this.r+=t.length,this.v){var i=this.p.subarray(this.v-1),e=i.length>3?vt(i):4;if(e>i.length){if(!r)return}else this.v>1&&this.onmember&&this.onmember(this.r-i.length);this.p=i.subarray(e),this.v=0}Mt.prototype.c.call(this,0),this.s.f&&!this.s.l?(this.v=T(this.s.p)+9,this.s={i:0},this.o=new n(0),this.push(new n(0),r)):r&&Mt.prototype.c.call(this,r)},t}();_e.Gunzip=Ft;var Et=function(){return function(t,n){var r=this;ut([$,nt,function(){return[at,Mt,Ft]}],this,bt.call(this,t,n),function(t){var n=new Ft(t.data);n.onmember=function(t){return postMessage(t)},onmessage=at(n)},9,0,function(t){return r.onmember&&r.onmember(t)})}}();function Zt(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[$,nt,function(){return[qt]}],function(t){return et(qt(t.data[0],t.data[1]))},3,r)}function qt(t,r){var i=vt(t);return i+8>t.length&&I(6,"invalid gzip data"),U(t.subarray(i,-8),{i:2},r&&r.out||new n(dt(t)),r&&r.dictionary)}_e.AsyncGunzip=Et;var Ot=function(){function t(t,n){this.c=Y(),this.v=1,wt.call(this,t,n)}return t.prototype.push=function(t,n){this.c.p(t),wt.prototype.push.call(this,t,n)},t.prototype.p=function(t,n){var r=J(t,this.o,this.v&&(this.o.dictionary?6:2),n&&4,this.s);this.v&&(yt(r,this.o),this.v=0),n&&lt(r,r.length-4,this.c.d()),this.ondata(r,n)},t.prototype.flush=function(t){wt.prototype.flush.call(this,t)},t}();_e.Zlib=Ot;var Gt=function(){return function(t,n){ut([_,rt,function(){return[at,wt,Ot]}],this,bt.call(this,t,n),function(t){var n=new Ot(t.data);onmessage=at(n)},10,1)}}();function Lt(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[_,rt,function(){return[Bt]}],function(t){return et(Bt(t.data[0],t.data[1]))},4,r)}function Bt(t,n){n||(n={});var r=Y();r.p(t);var i=J(t,n,n.dictionary?6:2,4);return yt(i,n),lt(i,i.length-4,r.d()),i}_e.AsyncZlib=Gt;var Ht=function(){function t(t,n){Mt.call(this,t,n),this.v=t&&t.dictionary?2:1}return t.prototype.push=function(t,n){if(Mt.prototype.e.call(this,t),this.v){if(this.p.length<6&&!n)return;this.p=this.p.subarray(mt(this.p,this.v-1)),this.v=0}n&&(this.p.length<4&&I(6,"invalid zlib data"),this.p=this.p.subarray(0,-4)),Mt.prototype.c.call(this,n)},t}();_e.Unzlib=Ht;var jt=function(){return function(t,n){ut([$,it,function(){return[at,Mt,Ht]}],this,bt.call(this,t,n),function(t){var n=new Ht(t.data);onmessage=at(n)},11,0)}}();function Nt(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[$,it,function(){return[Pt]}],function(t){return et(Pt(t.data[0],ot(t.data[1])))},5,r)}function Pt(t,n){return U(t.subarray(mt(t,n&&n.dictionary),-4),{i:2},n&&n.out,n&&n.dictionary)}_e.AsyncUnzlib=jt;var Vt=function(){function t(t,n){this.o=bt.call(this,t,n)||{},this.G=Ft,this.I=Mt,this.Z=Ht}return t.prototype.i=function(){var t=this;this.s.ondata=function(n,r){t.ondata(n,r)}},t.prototype.push=function(t,r){if(this.ondata||I(5),this.s)this.s.push(t,r);else{if(this.p&&this.p.length){var i=new n(this.p.length+t.length);i.set(this.p),i.set(t,this.p.length)}else this.p=t;this.p.length>2&&(this.s=31==this.p[0]&&139==this.p[1]&&8==this.p[2]?new this.G(this.o):8!=(15&this.p[0])||this.p[0]>>4>7||(this.p[0]<<8|this.p[1])%31?new this.I(this.o):new this.Z(this.o),this.i(),this.s.push(this.p,r),this.p=null)}},t}();_e.Decompress=Vt;var Yt=function(){function t(t,n){Vt.call(this,t,n),this.queuedSize=0,this.G=Et,this.I=St,this.Z=jt}return t.prototype.i=function(){var t=this;this.s.ondata=function(n,r,i){t.ondata(n,r,i)},this.s.ondrain=function(n){t.queuedSize-=n,t.ondrain&&t.ondrain(n)}},t.prototype.push=function(t,n){this.queuedSize+=t.length,Vt.prototype.push.call(this,t,n)},t}();function Jt(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),31==t[0]&&139==t[1]&&8==t[2]?Zt(t,n,r):8!=(15&t[0])||t[0]>>4>7||(t[0]<<8|t[1])%31?At(t,n,r):Nt(t,n,r)}function Kt(t,n){return 31==t[0]&&139==t[1]&&8==t[2]?qt(t,n):8!=(15&t[0])||t[0]>>4>7||(t[0]<<8|t[1])%31?Tt(t,n):Pt(t,n)}_e.AsyncDecompress=Yt;var Qt=function(t,r,i,e){for(var o in t){var s=t[o],a=r+o,u=e;Array.isArray(s)&&(u=K(e,s[1]),s=s[0]),ArrayBuffer.isView(s)?i[a]=[s,u]:(i[a+="/"]=[new n(0),u],Qt(s,a,i,e))}},Rt="undefined"!=typeof TextEncoder&&new TextEncoder,Wt="undefined"!=typeof TextDecoder&&new TextDecoder,Xt=0;try{Wt.decode(j,{stream:!0}),Xt=1}catch(t){}var $t=function(t){for(var n="",r=0;;){var i=t[r++],e=(i>127)+(i>223)+(i>239);if(r+e>t.length)return{s:n,r:D(t,r-1)};e?3==e?(i=((15&i)<<18|(63&t[r++])<<12|(63&t[r++])<<6|63&t[r++])-65536,n+=String.fromCharCode(55296|i>>10,56320|1023&i)):n+=String.fromCharCode(1&e?(31&i)<<6|63&t[r++]:(15&i)<<12|(63&t[r++])<<6|63&t[r++]):n+=String.fromCharCode(i)}},_t=function(){function t(t){this.ondata=t,Xt?this.t=new TextDecoder:this.p=j}return t.prototype.push=function(t,r){if(this.ondata||I(5),r=!!r,this.t)return this.ondata(this.t.decode(t,{stream:!0}),r),void(r&&(this.t.decode().length&&I(8),this.t=null));this.p||I(4);var i=new n(this.p.length+t.length);i.set(this.p),i.set(t,this.p.length);var e=$t(i),o=e.s,s=e.r;r?(s.length&&I(8),this.p=null):this.p=s,this.ondata(o,r)},t}();_e.DecodeUTF8=_t;var tn=function(){function t(t){this.ondata=t}return t.prototype.push=function(t,n){this.ondata||I(5),this.d&&I(4),this.ondata(nn(t),this.d=n||!1)},t}();function nn(t,r){if(r){for(var i=new n(t.length),e=0;e<t.length;++e)i[e]=t.charCodeAt(e);return i}if(Rt)return Rt.encode(t);var o=t.length,s=new n(t.length+(t.length>>1)),a=0,u=function(t){s[a++]=t};for(e=0;e<o;++e){if(a+5>s.length){var h=new n(a+8+(o-e<<1));h.set(s),s=h}var f=t.charCodeAt(e);f<128||r?u(f):f<2048?(u(192|f>>6),u(128|63&f)):f>55295&&f<57344?(u(240|(f=65536+(1047552&f)|1023&t.charCodeAt(++e))>>18),u(128|f>>12&63),u(128|f>>6&63),u(128|63&f)):(u(224|f>>12),u(128|f>>6&63),u(128|63&f))}return D(s,0,a)}function rn(t,n){if(n){for(var r="",i=0;i<t.length;i+=16384)r+=String.fromCharCode.apply(null,t.subarray(i,i+16384));return r}if(Wt)return Wt.decode(t);var e=$t(t),o=e.s;return(r=e.r).length&&I(8),o}_e.EncodeUTF8=tn;var en=function(t){return 1==t?3:t<6?2:9==t?1:0},on=function(t,n){return n+30+ht(t,n+26)+ht(t,n+28)},sn=function(t,n,r){var i=ht(t,n+28),e=ht(t,n+30),o=rn(t.subarray(n+46,n+46+i),!(2048&ht(t,n+8))),s=n+46+i,a=an(t,s,e,r,ft(t,n+20),ft(t,n+24),ft(t,n+42)),u=a[0],h=a[1],f=a[2];return[ht(t,n+10),u,h,o,s+e+ht(t,n+32),f]},an=function(t,n,r,i,e,o,s){var a=4294967295==e,u=4294967295==o,h=4294967295==s,f=n+r;if(i&&a+u+h){for(;n+4<f;n+=4+ht(t,n+2))if(1==ht(t,n))return[a?ct(t,n+4+8*u):e,u?ct(t,n+4):o,h?ct(t,n+4+8*(u+a)):s,1];i<2&&I(13)}return[e,o,s,0]},un=function(t){var n=0;if(t)for(var r in t){var i=t[r].length;i>65535&&I(9),n+=i+4}return n},hn=function(t,n,r,i,e,o,s,a){var u=i.length,h=r.extra,f=a&&a.length,c=un(h);lt(t,n,null!=s?33639248:67324752),n+=4,null!=s&&(t[n++]=20,t[n++]=r.os),t[n]=20,n+=2,t[n++]=r.flag<<1|(o<0&&8),t[n++]=e&&8,t[n++]=255&r.compression,t[n++]=r.compression>>8;var l=new Date(null==r.mtime?Date.now():r.mtime),p=l.getFullYear()-1980;if((p<0||p>119)&&I(10),lt(t,n,p<<25|l.getMonth()+1<<21|l.getDate()<<16|l.getHours()<<11|l.getMinutes()<<5|l.getSeconds()>>1),n+=4,-1!=o&&(lt(t,n,r.crc),lt(t,n+4,o<0?-o-2:o),lt(t,n+8,r.size)),lt(t,n+12,u),lt(t,n+14,c),n+=16,null!=s&&(lt(t,n,f),lt(t,n+6,r.attrs),lt(t,n+10,s),n+=14),t.set(i,n),n+=u,c)for(var v in h){var d=h[v],g=d.length;lt(t,n,+v),lt(t,n+2,g),t.set(d,n+4),n+=4+g}return f&&(t.set(a,n),n+=f),n},fn=function(t,n,r,i,e){lt(t,n,101010256),lt(t,n+8,r),lt(t,n+10,r),lt(t,n+12,i),lt(t,n+16,e)},cn=function(){function t(t){this.filename=t,this.c=V(),this.size=0,this.compression=0}return t.prototype.process=function(t,n){this.ondata(null,t,n)},t.prototype.push=function(t,n){this.ondata||I(5),this.c.p(t),this.size+=t.length,n&&(this.crc=this.c.d()),this.process(t,n||!1)},t}();_e.ZipPassThrough=cn;var ln=function(){function t(t,n){var r=this;n||(n={}),cn.call(this,t),this.d=new wt(n,function(t,n){r.ondata(null,t,n)}),this.compression=8,this.flag=en(n.level)}return t.prototype.process=function(t,n){try{this.d.push(t,n)}catch(t){this.ondata(t,null,n)}},t.prototype.push=function(t,n){cn.prototype.push.call(this,t,n)},t}();_e.ZipDeflate=ln;var pn=function(){function t(t,n){var r=this;n||(n={}),cn.call(this,t),this.d=new xt(n,function(t,n,i){r.ondata(t,n,i)}),this.compression=8,this.flag=en(n.level),this.terminate=this.d.terminate}return t.prototype.process=function(t,n){this.d.push(t,n)},t.prototype.push=function(t,n){cn.prototype.push.call(this,t,n)},t}();_e.AsyncZipDeflate=pn;var vn=function(){function t(t){this.ondata=t,this.u=[],this.d=1}return t.prototype.add=function(t){var r=this;if(this.ondata||I(5),2&this.d)this.ondata(I(4+8*(1&this.d),0,1),null,!1);else{var i=nn(t.filename),e=i.length,o=t.comment,s=o&&nn(o),a=e!=t.filename.length||s&&o.length!=s.length,u=e+un(t.extra)+30;e>65535&&this.ondata(I(11,0,1),null,!1);var h=new n(u);hn(h,0,t,i,a,-1);var f=[h],c=function(){for(var t=0,n=f;t<n.length;t++)r.ondata(null,n[t],!1);f=[]},l=this.d;this.d=0;var p=this.u.length,v=K(t,{f:i,u:a,o:s,t:function(){t.terminate&&t.terminate()},r:function(){if(c(),l){var t=r.u[p+1];t?t.r():r.d=1}l=1}}),d=0;t.ondata=function(i,e,o){if(i)r.ondata(i,e,o),r.terminate();else if(d+=e.length,f.push(e),o){var s=new n(16);lt(s,0,134695760),lt(s,4,t.crc),lt(s,8,d),lt(s,12,t.size),f.push(s),v.c=d,v.b=u+d+16,v.crc=t.crc,v.size=t.size,l&&v.r(),l=1}else l&&c()},this.u.push(v)}},t.prototype.end=function(){var t=this;2&this.d?this.ondata(I(4+8*(1&this.d),0,1),null,!0):(this.d?this.e():this.u.push({r:function(){1&t.d&&(t.u.splice(-1,1),t.e())},t:function(){}}),this.d=3)},t.prototype.e=function(){for(var t=0,r=0,i=0,e=0,o=this.u;e<o.length;e++)i+=46+(h=o[e]).f.length+un(h.extra)+(h.o?h.o.length:0);for(var s=new n(i+22),a=0,u=this.u;a<u.length;a++){var h;hn(s,t,h=u[a],h.f,h.u,-h.c-2,r,h.o),t+=46+h.f.length+un(h.extra)+(h.o?h.o.length:0),r+=h.b}fn(s,t,this.u.length,i,r),this.ondata(null,s,!0),this.d=2},t.prototype.terminate=function(){for(var t=0,n=this.u;t<n.length;t++)n[t].t();this.d=2},t}();function dn(t,r,i){i||(i=r,r={}),"function"!=typeof i&&I(7);var e={};Qt(t,"",e,r);var o=Object.keys(e),s=o.length,a=0,u=0,h=s,f=Array(s),c=[],l=function(){for(var t=0;t<c.length;++t)c[t]()},p=function(t,n){xn(function(){i(t,n)})};xn(function(){p=i});var v=function(){var t=new n(u+22),r=a,i=u-a;u=0;for(var e=0;e<h;++e){var o=f[e];try{var s=o.c.length;hn(t,u,o,o.f,o.u,s);var c=30+o.f.length+un(o.extra),l=u+c;t.set(o.c,l),hn(t,a,o,o.f,o.u,s,u,o.m),a+=16+c+(o.m?o.m.length:0),u=l+s}catch(t){return p(t,null)}}fn(t,a,f.length,i,r),p(null,t)};s||v();for(var d=function(t){var n=o[t],r=e[n],i=r[0],h=r[1],d=V(),g=i.length;d.p(i);var y=nn(n),m=y.length,b=h.comment,w=b&&nn(b),x=w&&w.length,z=un(h.extra),k=0==h.level?0:8,M=function(r,i){if(r)l(),p(r,null);else{var e=i.length;f[t]=K(h,{size:g,crc:d.d(),c:i,f:y,m:w,u:m!=n.length||w&&b.length!=x,compression:k}),a+=30+m+z+e,u+=76+2*(m+z)+(x||0)+e,--s||v()}};if(m>65535&&M(I(11,0,1),null),k)if(g<16e4)try{M(null,kt(i,h))}catch(t){M(t,null)}else c.push(zt(i,h,M));else M(null,i)},g=0;g<h;++g)d(g);return l}function gn(t,r){r||(r={});var i={},e=[];Qt(t,"",i,r);var o=0,s=0;for(var a in i){var u=i[a],h=u[0],f=u[1],c=0==f.level?0:8,l=(M=nn(a)).length,p=f.comment,v=p&&nn(p),d=v&&v.length,g=un(f.extra);l>65535&&I(11);var y=c?kt(h,f):h,m=y.length,b=V();b.p(h),e.push(K(f,{size:h.length,crc:b.d(),c:y,f:M,m:v,u:l!=a.length||v&&p.length!=d,o:o,compression:c})),o+=30+l+g+m,s+=76+2*(l+g)+(d||0)+m}for(var w=new n(s+22),x=o,z=s-o,k=0;k<e.length;++k){var M;hn(w,(M=e[k]).o,M,M.f,M.u,M.c.length);var S=30+M.f.length+un(M.extra);w.set(M.c,M.o+S),hn(w,o,M,M.f,M.u,M.c.length,M.o,M.m),o+=16+S+(M.m?M.m.length:0)}return fn(w,o,e.length,z,x),w}_e.Zip=vn;var yn=function(){function t(){}return t.prototype.push=function(t,n){this.ondata(null,t,n)},t.compression=0,t}();_e.UnzipPassThrough=yn;var mn=function(){function t(){var t=this;this.i=new Mt(function(n,r){t.ondata(null,n,r)})}return t.prototype.push=function(t,n){try{this.i.push(t,n)}catch(t){this.ondata(t,null,n)}},t.compression=8,t}();_e.UnzipInflate=mn;var bn=function(){function t(t,n){var r=this;n<32e4?this.i=new Mt(function(t,n){r.ondata(null,t,n)}):(this.i=new St(function(t,n,i){r.ondata(t,n,i)}),this.terminate=this.i.terminate)}return t.prototype.push=function(t,n){this.i.terminate&&(t=D(t,0)),this.i.push(t,n)},t.compression=8,t}();_e.AsyncUnzipInflate=bn;var wn=function(){function t(t){this.onfile=t,this.k=[],this.o={0:yn},this.p=j}return t.prototype.push=function(t,r){var i=this;if(this.onfile||I(5),this.p||I(4),this.c>0){var e=Math.min(this.c,t.length),o=t.subarray(0,e);if(this.c-=e,this.d?this.d.push(o,!this.c):this.k[0].push(o),(t=t.subarray(e)).length)return this.push(t,r)}else{var s=0,a=0,u=void 0,h=void 0;this.p.length?t.length?((h=new n(this.p.length+t.length)).set(this.p),h.set(t,this.p.length)):h=this.p:h=t;for(var f=h.length,c=this.c,l=c&&this.d,p=function(){var t=ft(h,a);if(67324752==t){s=1,u=a,v.d=null,v.c=0;var n=ht(h,a+6),r=ht(h,a+8),e=2048&n,o=8&n,l=ht(h,a+26),p=ht(h,a+28);if(f>a+30+l+p){var d=[];v.k.unshift(d),s=2;var g,y=ft(h,a+18),m=ft(h,a+22),b=rn(h.subarray(a+30,a+=30+l),!e),w=an(h,a,p,2,y,m,0),x=w[0],z=w[1];o&&(x=-1-w[3]),a+=p,v.c=x;var k={name:b,compression:r,start:function(){if(k.ondata||I(5),x){var t=i.o[r];t||k.ondata(I(14,"unknown compression type "+r,1),null,!1),(g=x<0?new t(b):new t(b,x,z)).ondata=function(t,n,r){k.ondata(t,n,r)};for(var n=0,e=d;n<e.length;n++)g.push(e[n],!1);i.k[0]==d&&i.c?i.d=g:g.push(j,!0)}else k.ondata(null,j,!0)},terminate:function(){g&&g.terminate&&g.terminate()}};x>=0&&(k.size=x,k.originalSize=z),v.onfile(k)}return"break"}if(c){if(134695760==t)return u=a+=12+(-2==c&&8),s=3,v.c=0,"break";if(33639248==t)return u=a-=4,s=3,v.c=0,"break"}},v=this;a<f-4&&"break"!==p();++a);if(this.p=j,c<0){var d=h.subarray(0,s?u-12-(-2==c&&8)-(134695760==ft(h,u-16)&&4):a);l?l.push(d,!!s):this.k[+(2==s)].push(d)}if(2&s)return this.push(h.subarray(a),r);this.p=h.subarray(a)}r&&(this.c&&I(13),this.p=null)},t.prototype.register=function(t){this.o[t.compression]=t},t}();_e.Unzip=wn;var xn="function"==typeof queueMicrotask?queueMicrotask:"function"==typeof setTimeout?setTimeout:function(t){t()};function zn(t,r,i){i||(i=r,r={}),"function"!=typeof i&&I(7);var e=[],o=function(){for(var t=0;t<e.length;++t)e[t]()},s={},a=function(t,n){xn(function(){i(t,n)})};xn(function(){a=i});for(var u=t.length-22;101010256!=ft(t,u);--u)if(!u||t.length-u>65558)return a(I(13,0,1),null),o;var h=ht(t,u+8);if(h){var f=h,c=ft(t,u+16),l=117853008==ft(t,u-20);if(l){var p=ft(t,u-12);(l=101075792==ft(t,p))&&(f=h=ft(t,p+32),c=ft(t,p+48))}for(var v=r&&r.filter,d=function(r){var i=sn(t,c,l),u=i[0],f=i[1],p=i[2],d=i[3],g=i[4],y=on(t,i[5]);c=g;var m=function(t,n){t?(o(),a(t,null)):(n&&(s[d]=n),--h||a(null,s))};if(!v||v({name:d,size:f,originalSize:p,compression:u}))if(u)if(8==u){var b=t.subarray(y,y+f);if(p<524288||f>.8*p)try{m(null,Tt(b,{out:new n(p)}))}catch(t){m(t,null)}else e.push(At(b,{size:p},m))}else m(I(14,"unknown compression type "+u,1),null);else m(null,D(t,y,y+f));else m(null,null)},g=0;g<f;++g)d()}else a(null,{});return o}function kn(t,r){for(var i={},e=t.length-22;101010256!=ft(t,e);--e)(!e||t.length-e>65558)&&I(13);var o=ht(t,e+8);if(!o)return{};var s=ft(t,e+16),a=117853008==ft(t,e-20);if(a){var u=ft(t,e-12);(a=101075792==ft(t,u))&&(o=ft(t,u+32),s=ft(t,u+48))}for(var h=r&&r.filter,f=0;f<o;++f){var c=sn(t,s,a),l=c[0],p=c[1],v=c[2],d=c[3],g=c[4],y=on(t,c[5]);s=g,h&&!h({name:d,size:p,originalSize:v,compression:l})||(l?8==l?i[d]=Tt(t.subarray(y,y+p),{out:new n(v)}):I(14,"unknown compression type "+l):i[d]=D(t,y,y+p))}return i}return _e});
var __MUMU_FFLATE__ = (typeof fflate !== "undefined" ? fflate : null);
if (!__MUMU_FFLATE__ && typeof module !== "undefined" && module.exports && module.exports.unzipSync) {
  __MUMU_FFLATE__ = module.exports;
}
/*! For license information please see tesseract.min.js.LICENSE.txt */
!function(t,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.Tesseract=r():t.Tesseract=r()}(self,(()=>(()=>{var t={30:(t,r,e)=>{function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}var o=function(t){"use strict";var r,e=Object.prototype,o=e.hasOwnProperty,i=Object.defineProperty||function(t,r,e){t[r]=e.value},a="function"==typeof Symbol?Symbol:{},c=a.iterator||"@@iterator",u=a.asyncIterator||"@@asyncIterator",f=a.toStringTag||"@@toStringTag";function s(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{s({},"")}catch(t){s=function(t,r,e){return t[r]=e}}function l(t,r,e,n){var o=r&&r.prototype instanceof m?r:m,a=Object.create(o.prototype),c=new N(n||[]);return i(a,"_invoke",{value:P(t,e,c)}),a}function h(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var p="suspendedStart",y="suspendedYield",v="executing",d="completed",g={};function m(){}function b(){}function w(){}var L={};s(L,c,(function(){return this}));var x=Object.getPrototypeOf,E=x&&x(x(A([])));E&&E!==e&&o.call(E,c)&&(L=E);var O=w.prototype=m.prototype=Object.create(L);function S(t){["next","throw","return"].forEach((function(r){s(t,r,(function(t){return this._invoke(r,t)}))}))}function j(t,r){function e(i,a,c,u){var f=h(t[i],t,a);if("throw"!==f.type){var s=f.arg,l=s.value;return l&&"object"===n(l)&&o.call(l,"__await")?r.resolve(l.__await).then((function(t){e("next",t,c,u)}),(function(t){e("throw",t,c,u)})):r.resolve(l).then((function(t){s.value=t,c(s)}),(function(t){return e("throw",t,c,u)}))}u(f.arg)}var a;i(this,"_invoke",{value:function(t,n){function o(){return new r((function(r,o){e(t,n,r,o)}))}return a=a?a.then(o,o):o()}})}function P(t,r,e){var n=p;return function(o,i){if(n===v)throw new Error("Generator is already running");if(n===d){if("throw"===o)throw i;return G()}for(e.method=o,e.arg=i;;){var a=e.delegate;if(a){var c=_(a,e);if(c){if(c===g)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(n===p)throw n=d,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n=v;var u=h(t,r,e);if("normal"===u.type){if(n=e.done?d:y,u.arg===g)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(n=d,e.method="throw",e.arg=u.arg)}}}function _(t,e){var n=e.method,o=t.iterator[n];if(o===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=r,_(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var i=h(o,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,g;var a=i.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,g):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,g)}function k(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function T(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function A(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return i.next=i}}return{next:G}}function G(){return{value:r,done:!0}}return b.prototype=w,i(O,"constructor",{value:w,configurable:!0}),i(w,"constructor",{value:b,configurable:!0}),b.displayName=s(w,f,"GeneratorFunction"),t.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===b||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,s(t,f,"GeneratorFunction")),t.prototype=Object.create(O),t},t.awrap=function(t){return{__await:t}},S(j.prototype),s(j.prototype,u,(function(){return this})),t.AsyncIterator=j,t.async=function(r,e,n,o,i){void 0===i&&(i=Promise);var a=new j(l(r,e,n,o),i);return t.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},S(O),s(O,f,"Generator"),s(O,c,(function(){return this})),s(O,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var r=Object(t),e=[];for(var n in r)e.push(n);return e.reverse(),function t(){for(;e.length;){var n=e.pop();if(n in r)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=A,N.prototype={constructor:N,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(T),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,o){return c.type="throw",c.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=o.call(a,"catchLoc"),f=o.call(a,"finallyLoc");if(u&&f){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!f)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),g},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),T(e),g}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;T(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:A(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),g}},t}("object"===n(t=e.nmd(t))?t.exports:{});try{regeneratorRuntime=o}catch(t){"object"===("undefined"==typeof globalThis?"undefined":n(globalThis))?globalThis.regeneratorRuntime=o:Function("r","regeneratorRuntime = r")(o)}},35:(t,r,e)=>{"use strict";function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,n)}return e}function i(t,r,e){return(r=function(t){var r=function(t){if("object"!=n(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var e=r.call(t,"string");if("object"!=n(e))return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==n(r)?r:r+""}(r))in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}var a="browser"===e(938)("type")?function(t){return new URL(t,window.location.href).href}:function(t){return t};t.exports=function(t){var r=function(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?o(Object(e),!0).forEach((function(r){i(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):o(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}({},t);return["corePath","workerPath","langPath"].forEach((function(e){t[e]&&(r[e]=a(r[e]))})),r}},65:function(t,r){"use strict";var e=this,n=!1;r.logging=n,r.setLogging=function(t){n=t},r.log=function(){for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];return n?console.log.apply(e,r):null}},70:t=>{"use strict";t.exports=function(t,r){return"".concat(t,"-").concat(r,"-").concat(Math.random().toString(16).slice(3,8))}},130:t=>{"use strict";function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function e(){e=function(){return n};var t,n={},o=Object.prototype,i=o.hasOwnProperty,a=Object.defineProperty||function(t,r,e){t[r]=e.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",f=c.asyncIterator||"@@asyncIterator",s=c.toStringTag||"@@toStringTag";function l(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{l({},"")}catch(t){l=function(t,r,e){return t[r]=e}}function h(t,r,e,n){var o=r&&r.prototype instanceof b?r:b,i=Object.create(o.prototype),c=new A(n||[]);return a(i,"_invoke",{value:_(t,e,c)}),i}function p(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}n.wrap=h;var y="suspendedStart",v="suspendedYield",d="executing",g="completed",m={};function b(){}function w(){}function L(){}var x={};l(x,u,(function(){return this}));var E=Object.getPrototypeOf,O=E&&E(E(G([])));O&&O!==o&&i.call(O,u)&&(x=O);var S=L.prototype=b.prototype=Object.create(x);function j(t){["next","throw","return"].forEach((function(r){l(t,r,(function(t){return this._invoke(r,t)}))}))}function P(t,e){function n(o,a,c,u){var f=p(t[o],t,a);if("throw"!==f.type){var s=f.arg,l=s.value;return l&&"object"==r(l)&&i.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,c,u)}),(function(t){n("throw",t,c,u)})):e.resolve(l).then((function(t){s.value=t,c(s)}),(function(t){return n("throw",t,c,u)}))}u(f.arg)}var o;a(this,"_invoke",{value:function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}})}function _(r,e,n){var o=y;return function(i,a){if(o===d)throw Error("Generator is already running");if(o===g){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=k(c,n);if(u){if(u===m)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===y)throw o=g,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=d;var f=p(r,e,n);if("normal"===f.type){if(o=n.done?g:v,f.arg===m)continue;return{value:f.arg,done:n.done}}"throw"===f.type&&(o=g,n.method="throw",n.arg=f.arg)}}}function k(r,e){var n=e.method,o=r.iterator[n];if(o===t)return e.delegate=null,"throw"===n&&r.iterator.return&&(e.method="return",e.arg=t,k(r,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var i=p(o,r.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,m;var a=i.arg;return a?a.done?(e[r.resultName]=a.value,e.next=r.nextLoc,"return"!==e.method&&(e.method="next",e.arg=t),e.delegate=null,m):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,m)}function T(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function N(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function G(e){if(e||""===e){var n=e[u];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(i.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}throw new TypeError(r(e)+" is not iterable")}return w.prototype=L,a(S,"constructor",{value:L,configurable:!0}),a(L,"constructor",{value:w,configurable:!0}),w.displayName=l(L,s,"GeneratorFunction"),n.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===w||"GeneratorFunction"===(r.displayName||r.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,L):(t.__proto__=L,l(t,s,"GeneratorFunction")),t.prototype=Object.create(S),t},n.awrap=function(t){return{__await:t}},j(P.prototype),l(P.prototype,f,(function(){return this})),n.AsyncIterator=P,n.async=function(t,r,e,o,i){void 0===i&&(i=Promise);var a=new P(h(t,r,e,o),i);return n.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},j(S),l(S,s,"Generator"),l(S,u,(function(){return this})),l(S,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var r=Object(t),e=[];for(var n in r)e.push(n);return e.reverse(),function t(){for(;e.length;){var n=e.pop();if(n in r)return t.value=n,t.done=!1,t}return t.done=!0,t}},n.values=G,A.prototype={constructor:A,reset:function(r){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(N),!r)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var e=this;function n(n,o){return c.type="throw",c.arg=r,e.next=n,o&&(e.method="next",e.arg=t),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=i.call(a,"catchLoc"),f=i.call(a,"finallyLoc");if(u&&f){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!f)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=r&&r<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=r,o?(this.method="next",this.next=o.finallyLoc,m):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),m},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),N(e),m}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;N(e)}return o}}throw Error("illegal catch attempt")},delegateYield:function(r,e,n){return this.delegate={iterator:G(r),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=t),m}},n}function n(t,r,e,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void e(t)}c.done?r(u):Promise.resolve(u).then(n,o)}function o(t){return function(){var r=this,e=arguments;return new Promise((function(o,i){var a=t.apply(r,e);function c(t){n(a,o,i,c,u,"next",t)}function u(t){n(a,o,i,c,u,"throw",t)}c(void 0)}))}}var i=function(t){return new Promise((function(r,e){var n=new FileReader;n.onload=function(){r(n.result)},n.onerror=function(t){var r=t.target.error.code;e(Error("File could not be read! Code=".concat(r)))},n.readAsArrayBuffer(t)}))},a=function(){var t=o(e().mark((function t(r){var n,c,u;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r,void 0!==r){t.next=3;break}return t.abrupt("return","undefined");case 3:if("string"!=typeof r){t.next=16;break}if(!/data:image\/([a-zA-Z]*);base64,([^"]*)/.test(r)){t.next=8;break}n=atob(r.split(",")[1]).split("").map((function(t){return t.charCodeAt(0)})),t.next=14;break;case 8:return t.next=10,fetch(r);case 10:return c=t.sent,t.next=13,c.arrayBuffer();case 13:n=t.sent;case 14:t.next=43;break;case 16:if(!("undefined"!=typeof HTMLElement&&r instanceof HTMLElement)){t.next=30;break}if("IMG"!==r.tagName){t.next=21;break}return t.next=20,a(r.src);case 20:n=t.sent;case 21:if("VIDEO"!==r.tagName){t.next=25;break}return t.next=24,a(r.poster);case 24:n=t.sent;case 25:if("CANVAS"!==r.tagName){t.next=28;break}return t.next=28,new Promise((function(t){r.toBlob(function(){var r=o(e().mark((function r(o){return e().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,i(o);case 2:n=r.sent,t();case 4:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}())}));case 28:t.next=43;break;case 30:if(!("undefined"!=typeof OffscreenCanvas&&r instanceof OffscreenCanvas)){t.next=39;break}return t.next=33,r.convertToBlob();case 33:return u=t.sent,t.next=36,i(u);case 36:n=t.sent,t.next=43;break;case 39:if(!(r instanceof File||r instanceof Blob)){t.next=43;break}return t.next=42,i(r);case 42:n=t.sent;case 43:return t.abrupt("return",new Uint8Array(n));case 44:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}();t.exports=a},192:t=>{"use strict";t.exports={AFR:"afr",AMH:"amh",ARA:"ara",ASM:"asm",AZE:"aze",AZE_CYRL:"aze_cyrl",BEL:"bel",BEN:"ben",BOD:"bod",BOS:"bos",BUL:"bul",CAT:"cat",CEB:"ceb",CES:"ces",CHI_SIM:"chi_sim",CHI_TRA:"chi_tra",CHR:"chr",CYM:"cym",DAN:"dan",DEU:"deu",DZO:"dzo",ELL:"ell",ENG:"eng",ENM:"enm",EPO:"epo",EST:"est",EUS:"eus",FAS:"fas",FIN:"fin",FRA:"fra",FRK:"frk",FRM:"frm",GLE:"gle",GLG:"glg",GRC:"grc",GUJ:"guj",HAT:"hat",HEB:"heb",HIN:"hin",HRV:"hrv",HUN:"hun",IKU:"iku",IND:"ind",ISL:"isl",ITA:"ita",ITA_OLD:"ita_old",JAV:"jav",JPN:"jpn",KAN:"kan",KAT:"kat",KAT_OLD:"kat_old",KAZ:"kaz",KHM:"khm",KIR:"kir",KOR:"kor",KUR:"kur",LAO:"lao",LAT:"lat",LAV:"lav",LIT:"lit",MAL:"mal",MAR:"mar",MKD:"mkd",MLT:"mlt",MSA:"msa",MYA:"mya",NEP:"nep",NLD:"nld",NOR:"nor",ORI:"ori",PAN:"pan",POL:"pol",POR:"por",PUS:"pus",RON:"ron",RUS:"rus",SAN:"san",SIN:"sin",SLK:"slk",SLV:"slv",SPA:"spa",SPA_OLD:"spa_old",SQI:"sqi",SRP:"srp",SRP_LATN:"srp_latn",SWA:"swa",SWE:"swe",SYR:"syr",TAM:"tam",TEL:"tel",TGK:"tgk",TGL:"tgl",THA:"tha",TIR:"tir",TUR:"tur",UIG:"uig",UKR:"ukr",URD:"urd",UZB:"uzb",UZB_CYRL:"uzb_cyrl",VIE:"vie",YID:"yid"}},286:t=>{"use strict";t.exports={workerBlobURL:!0,logger:function(){}}},318:t=>{"use strict";t.exports=function(t){var r,e=t.workerPath,n=t.workerBlobURL;if(Blob&&URL&&n){var o=new Blob(['importScripts("'.concat(e,'");')],{type:"application/javascript"});r=new Worker(URL.createObjectURL(o))}else r=new Worker(e);return r}},330:t=>{"use strict";t.exports={rE:"7.0.0"}},364:function(t,r,e){"use strict";function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}var o=this;function i(){i=function(){return r};var t,r={},e=Object.prototype,o=e.hasOwnProperty,a=Object.defineProperty||function(t,r,e){t[r]=e.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",f=c.asyncIterator||"@@asyncIterator",s=c.toStringTag||"@@toStringTag";function l(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{l({},"")}catch(t){l=function(t,r,e){return t[r]=e}}function h(t,r,e,n){var o=r&&r.prototype instanceof b?r:b,i=Object.create(o.prototype),c=new A(n||[]);return a(i,"_invoke",{value:_(t,e,c)}),i}function p(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}r.wrap=h;var y="suspendedStart",v="suspendedYield",d="executing",g="completed",m={};function b(){}function w(){}function L(){}var x={};l(x,u,(function(){return this}));var E=Object.getPrototypeOf,O=E&&E(E(G([])));O&&O!==e&&o.call(O,u)&&(x=O);var S=L.prototype=b.prototype=Object.create(x);function j(t){["next","throw","return"].forEach((function(r){l(t,r,(function(t){return this._invoke(r,t)}))}))}function P(t,r){function e(i,a,c,u){var f=p(t[i],t,a);if("throw"!==f.type){var s=f.arg,l=s.value;return l&&"object"==n(l)&&o.call(l,"__await")?r.resolve(l.__await).then((function(t){e("next",t,c,u)}),(function(t){e("throw",t,c,u)})):r.resolve(l).then((function(t){s.value=t,c(s)}),(function(t){return e("throw",t,c,u)}))}u(f.arg)}var i;a(this,"_invoke",{value:function(t,n){function o(){return new r((function(r,o){e(t,n,r,o)}))}return i=i?i.then(o,o):o()}})}function _(r,e,n){var o=y;return function(i,a){if(o===d)throw Error("Generator is already running");if(o===g){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=k(c,n);if(u){if(u===m)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===y)throw o=g,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=d;var f=p(r,e,n);if("normal"===f.type){if(o=n.done?g:v,f.arg===m)continue;return{value:f.arg,done:n.done}}"throw"===f.type&&(o=g,n.method="throw",n.arg=f.arg)}}}function k(r,e){var n=e.method,o=r.iterator[n];if(o===t)return e.delegate=null,"throw"===n&&r.iterator.return&&(e.method="return",e.arg=t,k(r,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var i=p(o,r.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,m;var a=i.arg;return a?a.done?(e[r.resultName]=a.value,e.next=r.nextLoc,"return"!==e.method&&(e.method="next",e.arg=t),e.delegate=null,m):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,m)}function T(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function N(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function G(r){if(r||""===r){var e=r[u];if(e)return e.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var i=-1,a=function e(){for(;++i<r.length;)if(o.call(r,i))return e.value=r[i],e.done=!1,e;return e.value=t,e.done=!0,e};return a.next=a}}throw new TypeError(n(r)+" is not iterable")}return w.prototype=L,a(S,"constructor",{value:L,configurable:!0}),a(L,"constructor",{value:w,configurable:!0}),w.displayName=l(L,s,"GeneratorFunction"),r.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===w||"GeneratorFunction"===(r.displayName||r.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,L):(t.__proto__=L,l(t,s,"GeneratorFunction")),t.prototype=Object.create(S),t},r.awrap=function(t){return{__await:t}},j(P.prototype),l(P.prototype,f,(function(){return this})),r.AsyncIterator=P,r.async=function(t,e,n,o,i){void 0===i&&(i=Promise);var a=new P(h(t,e,n,o),i);return r.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},j(S),l(S,s,"Generator"),l(S,u,(function(){return this})),l(S,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var r=Object(t),e=[];for(var n in r)e.push(n);return e.reverse(),function t(){for(;e.length;){var n=e.pop();if(n in r)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=G,A.prototype={constructor:A,reset:function(r){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(N),!r)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var e=this;function n(n,o){return c.type="throw",c.arg=r,e.next=n,o&&(e.method="next",e.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=o.call(a,"catchLoc"),f=o.call(a,"finallyLoc");if(u&&f){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!f)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),m},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),N(e),m}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;N(e)}return o}}throw Error("illegal catch attempt")},delegateYield:function(r,e,n){return this.delegate={iterator:G(r),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=t),m}},r}function a(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=Array(r);e<r;e++)n[e]=t[e];return n}function c(t,r,e,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void e(t)}c.done?r(u):Promise.resolve(u).then(n,o)}function u(t){return function(){var r=this,e=arguments;return new Promise((function(n,o){var i=t.apply(r,e);function a(t){c(i,n,o,a,u,"next",t)}function u(t){c(i,n,o,a,u,"throw",t)}a(void 0)}))}}var f=e(910),s=e(65).log,l=e(70),h=0;t.exports=function(){var t=l("Scheduler",h),r={},e={},n=[];h+=1;var c=function(){return Object.keys(r).length},p=function(){if(0!==n.length)for(var t=Object.keys(r),o=0;o<t.length;o+=1)if(void 0===e[t[o]]){n[0](r[t[o]]);break}},y=function(r,c){return new Promise((function(l,h){var y=f({action:r,payload:c});n.push(function(){var t=u(i().mark((function t(u){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.shift(),e[u.id]=y,t.prev=2,t.t0=l,t.next=6,u[r].apply(o,[].concat(function(t){if(Array.isArray(t))return a(t)}(i=c)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(i)||function(t,r){if(t){if("string"==typeof t)return a(t,r);var e={}.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?a(t,r):void 0}}(i)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),[y.id]));case 6:t.t1=t.sent,(0,t.t0)(t.t1),t.next=13;break;case 10:t.prev=10,t.t2=t.catch(2),h(t.t2);case 13:return t.prev=13,delete e[u.id],p(),t.finish(13);case 17:case"end":return t.stop()}var i}),t,null,[[2,10,13,17]])})));return function(r){return t.apply(this,arguments)}}()),s("[".concat(t,"]: Add ").concat(y.id," to JobQueue")),s("[".concat(t,"]: JobQueue length=").concat(n.length)),p()}))},v=function(){var r=u(i().mark((function r(e){var n,o,a,u=arguments;return i().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(0!==c()){r.next=2;break}throw Error("[".concat(t,"]: You need to have at least one worker before adding jobs"));case 2:for(n=u.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=u[a];return r.abrupt("return",y(e,o));case 4:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}(),d=function(){var t=u(i().mark((function t(){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:Object.keys(r).forEach(function(){var t=u(i().mark((function t(e){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r[e].terminate();case 2:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}()),n=[];case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return{addWorker:function(e){return r[e.id]=e,s("[".concat(t,"]: Add ").concat(e.id)),s("[".concat(t,"]: Number of workers=").concat(c())),p(),e.id},addJob:v,terminate:d,getQueueLen:function(){return n.length},getNumWorkers:c}}},523:(t,r,e)=>{"use strict";var n=e(830),o=e(318),i=e(862),a=e(727),c=e(753),u=e(130);t.exports={defaultOptions:n,spawnWorker:o,terminateWorker:i,onMessage:a,send:c,loadImage:u}},535:(t,r,e)=>{"use strict";function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(){o=function(){return r};var t,r={},e=Object.prototype,i=e.hasOwnProperty,a=Object.defineProperty||function(t,r,e){t[r]=e.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",f=c.asyncIterator||"@@asyncIterator",s=c.toStringTag||"@@toStringTag";function l(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{l({},"")}catch(t){l=function(t,r,e){return t[r]=e}}function h(t,r,e,n){var o=r&&r.prototype instanceof b?r:b,i=Object.create(o.prototype),c=new A(n||[]);return a(i,"_invoke",{value:_(t,e,c)}),i}function p(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}r.wrap=h;var y="suspendedStart",v="suspendedYield",d="executing",g="completed",m={};function b(){}function w(){}function L(){}var x={};l(x,u,(function(){return this}));var E=Object.getPrototypeOf,O=E&&E(E(G([])));O&&O!==e&&i.call(O,u)&&(x=O);var S=L.prototype=b.prototype=Object.create(x);function j(t){["next","throw","return"].forEach((function(r){l(t,r,(function(t){return this._invoke(r,t)}))}))}function P(t,r){function e(o,a,c,u){var f=p(t[o],t,a);if("throw"!==f.type){var s=f.arg,l=s.value;return l&&"object"==n(l)&&i.call(l,"__await")?r.resolve(l.__await).then((function(t){e("next",t,c,u)}),(function(t){e("throw",t,c,u)})):r.resolve(l).then((function(t){s.value=t,c(s)}),(function(t){return e("throw",t,c,u)}))}u(f.arg)}var o;a(this,"_invoke",{value:function(t,n){function i(){return new r((function(r,o){e(t,n,r,o)}))}return o=o?o.then(i,i):i()}})}function _(r,e,n){var o=y;return function(i,a){if(o===d)throw Error("Generator is already running");if(o===g){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=k(c,n);if(u){if(u===m)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===y)throw o=g,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=d;var f=p(r,e,n);if("normal"===f.type){if(o=n.done?g:v,f.arg===m)continue;return{value:f.arg,done:n.done}}"throw"===f.type&&(o=g,n.method="throw",n.arg=f.arg)}}}function k(r,e){var n=e.method,o=r.iterator[n];if(o===t)return e.delegate=null,"throw"===n&&r.iterator.return&&(e.method="return",e.arg=t,k(r,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var i=p(o,r.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,m;var a=i.arg;return a?a.done?(e[r.resultName]=a.value,e.next=r.nextLoc,"return"!==e.method&&(e.method="next",e.arg=t),e.delegate=null,m):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,m)}function T(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function N(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function G(r){if(r||""===r){var e=r[u];if(e)return e.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var o=-1,a=function e(){for(;++o<r.length;)if(i.call(r,o))return e.value=r[o],e.done=!1,e;return e.value=t,e.done=!0,e};return a.next=a}}throw new TypeError(n(r)+" is not iterable")}return w.prototype=L,a(S,"constructor",{value:L,configurable:!0}),a(L,"constructor",{value:w,configurable:!0}),w.displayName=l(L,s,"GeneratorFunction"),r.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===w||"GeneratorFunction"===(r.displayName||r.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,L):(t.__proto__=L,l(t,s,"GeneratorFunction")),t.prototype=Object.create(S),t},r.awrap=function(t){return{__await:t}},j(P.prototype),l(P.prototype,f,(function(){return this})),r.AsyncIterator=P,r.async=function(t,e,n,o,i){void 0===i&&(i=Promise);var a=new P(h(t,e,n,o),i);return r.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},j(S),l(S,s,"Generator"),l(S,u,(function(){return this})),l(S,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var r=Object(t),e=[];for(var n in r)e.push(n);return e.reverse(),function t(){for(;e.length;){var n=e.pop();if(n in r)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=G,A.prototype={constructor:A,reset:function(r){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(N),!r)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var e=this;function n(n,o){return c.type="throw",c.arg=r,e.next=n,o&&(e.method="next",e.arg=t),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=i.call(a,"catchLoc"),f=i.call(a,"finallyLoc");if(u&&f){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!f)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=r&&r<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=r,o?(this.method="next",this.next=o.finallyLoc,m):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),m},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),N(e),m}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;N(e)}return o}}throw Error("illegal catch attempt")},delegateYield:function(r,e,n){return this.delegate={iterator:G(r),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=t),m}},r}function i(t,r,e,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void e(t)}c.done?r(u):Promise.resolve(u).then(n,o)}function a(t){return function(){var r=this,e=arguments;return new Promise((function(n,o){var a=t.apply(r,e);function c(t){i(a,n,o,c,u,"next",t)}function u(t){i(a,n,o,c,u,"throw",t)}c(void 0)}))}}var c=e(603),u=function(){var t=a(o().mark((function t(r,e,n){var i;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c(e,1,n);case 2:return i=t.sent,t.abrupt("return",i.recognize(r).finally(a(o().mark((function t(){return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.terminate();case 2:case"end":return t.stop()}}),t)})))));case 4:case"end":return t.stop()}}),t)})));return function(r,e,n){return t.apply(this,arguments)}}(),f=function(){var t=a(o().mark((function t(r,e){var n;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c("osd",0,e);case 2:return n=t.sent,t.abrupt("return",n.detect(r).finally(a(o().mark((function t(){return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.terminate();case 2:case"end":return t.stop()}}),t)})))));case 4:case"end":return t.stop()}}),t)})));return function(r,e){return t.apply(this,arguments)}}();t.exports={recognize:u,detect:f}},603:(t,r,e)=>{"use strict";function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}var o=["logger","errorHandler"];function i(){i=function(){return r};var t,r={},e=Object.prototype,o=e.hasOwnProperty,a=Object.defineProperty||function(t,r,e){t[r]=e.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",f=c.asyncIterator||"@@asyncIterator",s=c.toStringTag||"@@toStringTag";function l(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{l({},"")}catch(t){l=function(t,r,e){return t[r]=e}}function h(t,r,e,n){var o=r&&r.prototype instanceof b?r:b,i=Object.create(o.prototype),c=new A(n||[]);return a(i,"_invoke",{value:_(t,e,c)}),i}function p(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}r.wrap=h;var y="suspendedStart",v="suspendedYield",d="executing",g="completed",m={};function b(){}function w(){}function L(){}var x={};l(x,u,(function(){return this}));var E=Object.getPrototypeOf,O=E&&E(E(G([])));O&&O!==e&&o.call(O,u)&&(x=O);var S=L.prototype=b.prototype=Object.create(x);function j(t){["next","throw","return"].forEach((function(r){l(t,r,(function(t){return this._invoke(r,t)}))}))}function P(t,r){function e(i,a,c,u){var f=p(t[i],t,a);if("throw"!==f.type){var s=f.arg,l=s.value;return l&&"object"==n(l)&&o.call(l,"__await")?r.resolve(l.__await).then((function(t){e("next",t,c,u)}),(function(t){e("throw",t,c,u)})):r.resolve(l).then((function(t){s.value=t,c(s)}),(function(t){return e("throw",t,c,u)}))}u(f.arg)}var i;a(this,"_invoke",{value:function(t,n){function o(){return new r((function(r,o){e(t,n,r,o)}))}return i=i?i.then(o,o):o()}})}function _(r,e,n){var o=y;return function(i,a){if(o===d)throw Error("Generator is already running");if(o===g){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=k(c,n);if(u){if(u===m)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===y)throw o=g,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=d;var f=p(r,e,n);if("normal"===f.type){if(o=n.done?g:v,f.arg===m)continue;return{value:f.arg,done:n.done}}"throw"===f.type&&(o=g,n.method="throw",n.arg=f.arg)}}}function k(r,e){var n=e.method,o=r.iterator[n];if(o===t)return e.delegate=null,"throw"===n&&r.iterator.return&&(e.method="return",e.arg=t,k(r,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var i=p(o,r.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,m;var a=i.arg;return a?a.done?(e[r.resultName]=a.value,e.next=r.nextLoc,"return"!==e.method&&(e.method="next",e.arg=t),e.delegate=null,m):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,m)}function T(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function N(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function G(r){if(r||""===r){var e=r[u];if(e)return e.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var i=-1,a=function e(){for(;++i<r.length;)if(o.call(r,i))return e.value=r[i],e.done=!1,e;return e.value=t,e.done=!0,e};return a.next=a}}throw new TypeError(n(r)+" is not iterable")}return w.prototype=L,a(S,"constructor",{value:L,configurable:!0}),a(L,"constructor",{value:w,configurable:!0}),w.displayName=l(L,s,"GeneratorFunction"),r.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===w||"GeneratorFunction"===(r.displayName||r.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,L):(t.__proto__=L,l(t,s,"GeneratorFunction")),t.prototype=Object.create(S),t},r.awrap=function(t){return{__await:t}},j(P.prototype),l(P.prototype,f,(function(){return this})),r.AsyncIterator=P,r.async=function(t,e,n,o,i){void 0===i&&(i=Promise);var a=new P(h(t,e,n,o),i);return r.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},j(S),l(S,s,"Generator"),l(S,u,(function(){return this})),l(S,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var r=Object(t),e=[];for(var n in r)e.push(n);return e.reverse(),function t(){for(;e.length;){var n=e.pop();if(n in r)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=G,A.prototype={constructor:A,reset:function(r){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(N),!r)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var e=this;function n(n,o){return c.type="throw",c.arg=r,e.next=n,o&&(e.method="next",e.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=o.call(a,"catchLoc"),f=o.call(a,"finallyLoc");if(u&&f){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!f)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),m},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),N(e),m}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;N(e)}return o}}throw Error("illegal catch attempt")},delegateYield:function(r,e,n){return this.delegate={iterator:G(r),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=t),m}},r}function a(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=Array(r);e<r;e++)n[e]=t[e];return n}function c(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,n)}return e}function u(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?c(Object(e),!0).forEach((function(r){f(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):c(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}function f(t,r,e){return(r=function(t){var r=function(t){if("object"!=n(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var e=r.call(t,"string");if("object"!=n(e))return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==n(r)?r:r+""}(r))in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}function s(t,r){if(null==t)return{};var e,n,o=function(t,r){if(null==t)return{};var e={};for(var n in t)if({}.hasOwnProperty.call(t,n)){if(-1!==r.indexOf(n))continue;e[n]=t[n]}return e}(t,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)e=i[n],-1===r.indexOf(e)&&{}.propertyIsEnumerable.call(t,e)&&(o[e]=t[e])}return o}function l(t,r,e,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void e(t)}c.done?r(u):Promise.resolve(u).then(n,o)}function h(t){return function(){var r=this,e=arguments;return new Promise((function(n,o){var i=t.apply(r,e);function a(t){l(i,n,o,a,c,"next",t)}function c(t){l(i,n,o,a,c,"throw",t)}a(void 0)}))}}var p=e(35),y=e(910),v=e(65).log,d=e(70),g=e(972),m=e(523),b=m.defaultOptions,w=m.spawnWorker,L=m.terminateWorker,x=m.onMessage,E=m.loadImage,O=m.send,S=0;t.exports=h(i().mark((function t(){var r,e,n,c,f,l,m,j,P,_,k,T,N,A,G,I,F,R,D,M,C,U,Y,B,H,K,W,z,J,V,Z,Q,q,X,$=arguments;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=$.length>0&&void 0!==$[0]?$[0]:"eng",e=$.length>1&&void 0!==$[1]?$[1]:g.LSTM_ONLY,n=$.length>2&&void 0!==$[2]?$[2]:{},c=$.length>3&&void 0!==$[3]?$[3]:{},f=d("Worker",S),l=p(u(u({},b),n)),m=l.logger,j=l.errorHandler,P=s(l,o),_={},k="string"==typeof r?r.split("+"):r,T=e,N=c,A=[g.DEFAULT,g.LSTM_ONLY].includes(e)&&!P.legacyCore,F=new Promise((function(t,r){I=t,G=r})),R=function(t){G(t.message)},(D=w(P)).onerror=R,S+=1,M=function(t){var r=t.id,e=t.action,n=t.payload;return new Promise((function(t,o){v("[".concat(f,"]: Start ").concat(r,", action=").concat(e));var i="".concat(e,"-").concat(r);_[i]={resolve:t,reject:o},O(D,{workerId:f,jobId:r,action:e,payload:n})}))},C=function(){return console.warn("`load` is depreciated and should be removed from code (workers now come pre-loaded)")},U=function(t){return M(y({id:t,action:"load",payload:{options:{lstmOnly:A,corePath:P.corePath,logging:P.logging}}}))},Y=function(t,r,e){return M(y({id:e,action:"FS",payload:{method:"writeFile",args:[t,r]}}))},B=function(t,r){return M(y({id:r,action:"FS",payload:{method:"readFile",args:[t,{encoding:"utf8"}]}}))},H=function(t,r){return M(y({id:r,action:"FS",payload:{method:"unlink",args:[t]}}))},K=function(t,r,e){return M(y({id:e,action:"FS",payload:{method:t,args:r}}))},W=function(t,r){return M(y({id:r,action:"loadLanguage",payload:{langs:t,options:{langPath:P.langPath,dataPath:P.dataPath,cachePath:P.cachePath,cacheMethod:P.cacheMethod,gzip:P.gzip,lstmOnly:[g.DEFAULT,g.LSTM_ONLY].includes(T)&&!P.legacyLang}}}))},z=function(t,r,e,n){return M(y({id:n,action:"initialize",payload:{langs:t,oem:r,config:e}}))},J=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"eng",r=arguments.length>1?arguments[1]:void 0,e=arguments.length>2?arguments[2]:void 0,n=arguments.length>3?arguments[3]:void 0;if(A&&[g.TESSERACT_ONLY,g.TESSERACT_LSTM_COMBINED].includes(r))throw Error("Legacy model requested but code missing.");var o=r||T;T=o;var i=e||N;N=i;var c,u=("string"==typeof t?t.split("+"):t).filter((function(t){return!k.includes(t)}));return k.push.apply(k,function(t){if(Array.isArray(t))return a(t)}(c=u)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(c)||function(t,r){if(t){if("string"==typeof t)return a(t,r);var e={}.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?a(t,r):void 0}}(c)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u.length>0?W(u,n).then((function(){return z(t,o,i,n)})):z(t,o,i,n)},V=function(){return M(y({id:arguments.length>1?arguments[1]:void 0,action:"setParameters",payload:{params:arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}}}))},Z=function(){var t=h(i().mark((function t(r){var e,n,o,a=arguments;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=a.length>1&&void 0!==a[1]?a[1]:{},n=a.length>2&&void 0!==a[2]?a[2]:{text:!0},o=a.length>3?a[3]:void 0,t.t0=M,t.t1=y,t.t2=o,t.next=8,E(r);case 8:return t.t3=t.sent,t.t4=e,t.t5=n,t.t6={image:t.t3,options:t.t4,output:t.t5},t.t7={id:t.t2,action:"recognize",payload:t.t6},t.t8=(0,t.t1)(t.t7),t.abrupt("return",(0,t.t0)(t.t8));case 15:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}(),Q=function(){var t=h(i().mark((function t(r,e){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!A){t.next=2;break}throw Error("`worker.detect` requires Legacy model, which was not loaded.");case 2:return t.t0=M,t.t1=y,t.t2=e,t.next=7,E(r);case 7:return t.t3=t.sent,t.t4={image:t.t3},t.t5={id:t.t2,action:"detect",payload:t.t4},t.t6=(0,t.t1)(t.t5),t.abrupt("return",(0,t.t0)(t.t6));case 12:case"end":return t.stop()}}),t)})));return function(r,e){return t.apply(this,arguments)}}(),q=function(){var t=h(i().mark((function t(){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return null!==D&&(L(D),D=null),t.abrupt("return",Promise.resolve());case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),x(D,(function(t){var r=t.workerId,e=t.jobId,n=t.status,o=t.action,i=t.data,a="".concat(o,"-").concat(e);if("resolve"===n)v("[".concat(r,"]: Complete ").concat(e)),_[a].resolve({jobId:e,data:i}),delete _[a];else if("reject"===n){if(_[a].reject(i),delete _[a],"load"===o&&G(i),!j)throw Error(i);j(i)}else"progress"===n&&m(u(u({},i),{},{userJobId:e}))})),X={id:f,worker:D,load:C,writeText:Y,readText:B,removeFile:H,FS:K,reinitialize:J,setParameters:V,recognize:Z,detect:Q,terminate:q},U().then((function(){return W(r)})).then((function(){return z(r,e,c)})).then((function(){return I(X)})).catch((function(){})),t.abrupt("return",F);case 34:case"end":return t.stop()}}),t)})))},727:t=>{"use strict";t.exports=function(t,r){t.onmessage=function(t){var e=t.data;r(e)}}},753:t=>{"use strict";function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function e(){e=function(){return n};var t,n={},o=Object.prototype,i=o.hasOwnProperty,a=Object.defineProperty||function(t,r,e){t[r]=e.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",f=c.asyncIterator||"@@asyncIterator",s=c.toStringTag||"@@toStringTag";function l(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{l({},"")}catch(t){l=function(t,r,e){return t[r]=e}}function h(t,r,e,n){var o=r&&r.prototype instanceof b?r:b,i=Object.create(o.prototype),c=new A(n||[]);return a(i,"_invoke",{value:_(t,e,c)}),i}function p(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}n.wrap=h;var y="suspendedStart",v="suspendedYield",d="executing",g="completed",m={};function b(){}function w(){}function L(){}var x={};l(x,u,(function(){return this}));var E=Object.getPrototypeOf,O=E&&E(E(G([])));O&&O!==o&&i.call(O,u)&&(x=O);var S=L.prototype=b.prototype=Object.create(x);function j(t){["next","throw","return"].forEach((function(r){l(t,r,(function(t){return this._invoke(r,t)}))}))}function P(t,e){function n(o,a,c,u){var f=p(t[o],t,a);if("throw"!==f.type){var s=f.arg,l=s.value;return l&&"object"==r(l)&&i.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,c,u)}),(function(t){n("throw",t,c,u)})):e.resolve(l).then((function(t){s.value=t,c(s)}),(function(t){return n("throw",t,c,u)}))}u(f.arg)}var o;a(this,"_invoke",{value:function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}})}function _(r,e,n){var o=y;return function(i,a){if(o===d)throw Error("Generator is already running");if(o===g){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=k(c,n);if(u){if(u===m)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===y)throw o=g,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=d;var f=p(r,e,n);if("normal"===f.type){if(o=n.done?g:v,f.arg===m)continue;return{value:f.arg,done:n.done}}"throw"===f.type&&(o=g,n.method="throw",n.arg=f.arg)}}}function k(r,e){var n=e.method,o=r.iterator[n];if(o===t)return e.delegate=null,"throw"===n&&r.iterator.return&&(e.method="return",e.arg=t,k(r,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var i=p(o,r.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,m;var a=i.arg;return a?a.done?(e[r.resultName]=a.value,e.next=r.nextLoc,"return"!==e.method&&(e.method="next",e.arg=t),e.delegate=null,m):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,m)}function T(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function N(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function G(e){if(e||""===e){var n=e[u];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(i.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}throw new TypeError(r(e)+" is not iterable")}return w.prototype=L,a(S,"constructor",{value:L,configurable:!0}),a(L,"constructor",{value:w,configurable:!0}),w.displayName=l(L,s,"GeneratorFunction"),n.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===w||"GeneratorFunction"===(r.displayName||r.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,L):(t.__proto__=L,l(t,s,"GeneratorFunction")),t.prototype=Object.create(S),t},n.awrap=function(t){return{__await:t}},j(P.prototype),l(P.prototype,f,(function(){return this})),n.AsyncIterator=P,n.async=function(t,r,e,o,i){void 0===i&&(i=Promise);var a=new P(h(t,r,e,o),i);return n.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},j(S),l(S,s,"Generator"),l(S,u,(function(){return this})),l(S,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var r=Object(t),e=[];for(var n in r)e.push(n);return e.reverse(),function t(){for(;e.length;){var n=e.pop();if(n in r)return t.value=n,t.done=!1,t}return t.done=!0,t}},n.values=G,A.prototype={constructor:A,reset:function(r){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(N),!r)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var e=this;function n(n,o){return c.type="throw",c.arg=r,e.next=n,o&&(e.method="next",e.arg=t),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=i.call(a,"catchLoc"),f=i.call(a,"finallyLoc");if(u&&f){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!f)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=r&&r<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=r,o?(this.method="next",this.next=o.finallyLoc,m):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),m},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),N(e),m}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;N(e)}return o}}throw Error("illegal catch attempt")},delegateYield:function(r,e,n){return this.delegate={iterator:G(r),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=t),m}},n}function n(t,r,e,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void e(t)}c.done?r(u):Promise.resolve(u).then(n,o)}t.exports=function(){var t,r=(t=e().mark((function t(r,n){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r.postMessage(n);case 1:case"end":return t.stop()}}),t)})),function(){var r=this,e=arguments;return new Promise((function(o,i){var a=t.apply(r,e);function c(t){n(a,o,i,c,u,"next",t)}function u(t){n(a,o,i,c,u,"throw",t)}c(void 0)}))});return function(t,e){return r.apply(this,arguments)}}()},830:(t,r,e)=>{"use strict";function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,n)}return e}function i(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?o(Object(e),!0).forEach((function(r){a(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):o(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}function a(t,r,e){return(r=function(t){var r=function(t){if("object"!=n(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var e=r.call(t,"string");if("object"!=n(e))return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==n(r)?r:r+""}(r))in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}var c=e(330).rE,u=e(286);t.exports=i(i({},u),{},{workerPath:"https://cdn.jsdelivr.net/npm/tesseract.js@v".concat(c,"/dist/worker.min.js")})},862:t=>{"use strict";t.exports=function(t){t.terminate()}},877:(t,r,e)=>{"use strict";function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,n)}return e}function i(t,r,e){return(r=function(t){var r=function(t){if("object"!=n(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var e=r.call(t,"string");if("object"!=n(e))return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==n(r)?r:r+""}(r))in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}e(30);var a=e(364),c=e(603),u=e(535),f=e(192),s=e(972),l=e(971),h=e(65).setLogging;t.exports=function(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?o(Object(e),!0).forEach((function(r){i(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):o(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}({languages:f,OEM:s,PSM:l,createScheduler:a,createWorker:c,setLogging:h},u)},910:(t,r,e)=>{"use strict";var n=e(70),o=0;t.exports=function(t){var r=t.id,e=t.action,i=t.payload,a=void 0===i?{}:i,c=r;return void 0===c&&(c=n("Job",o),o+=1),{id:c,action:e,payload:a}}},938:t=>{"use strict";function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}t.exports=function(t){var e={};return"undefined"!=typeof WorkerGlobalScope?e.type="webworker":"object"===("undefined"==typeof document?"undefined":r(document))?e.type="browser":"object"===("undefined"==typeof process?"undefined":r(process))&&(e.type="node"),void 0===t?e:e[t]}},971:t=>{"use strict";t.exports={OSD_ONLY:"0",AUTO_OSD:"1",AUTO_ONLY:"2",AUTO:"3",SINGLE_COLUMN:"4",SINGLE_BLOCK_VERT_TEXT:"5",SINGLE_BLOCK:"6",SINGLE_LINE:"7",SINGLE_WORD:"8",CIRCLE_WORD:"9",SINGLE_CHAR:"10",SPARSE_TEXT:"11",SPARSE_TEXT_OSD:"12",RAW_LINE:"13"}},972:t=>{"use strict";t.exports={TESSERACT_ONLY:0,LSTM_ONLY:1,TESSERACT_LSTM_COMBINED:2,DEFAULT:3}}},r={};function e(n){var o=r[n];if(void 0!==o)return o.exports;var i=r[n]={id:n,loaded:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}return e.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),e(877)})()));
//# sourceMappingURL=tesseract.min.js.map

var __MUMU_TESSERACT__ = (function(){
  var t = null;
  try {
    if (typeof module !== "undefined" && module.exports) {
      if (typeof module.exports.createWorker === "function") t = module.exports;
      else if (module.exports.Tesseract) t = module.exports.Tesseract;
    }
  } catch (_) {}
  var g = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
  if (!t && g.Tesseract) t = g.Tesseract;
  if (!t && typeof self !== "undefined" && self.Tesseract) t = self.Tesseract;
  if (t) g.__MUMU_TESSERACT__ = t;
  return t;
})();
var __MUMU_TESSERACT_WORKER__ = "/*! For license information please see worker.min.js.LICENSE.txt */\n(()=>{var t={30:(t,e,r)=>{function n(t){return n=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&\"function\"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?\"symbol\":typeof t},n(t)}var i=function(t){\"use strict\";var e,r=Object.prototype,i=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},a=\"function\"==typeof Symbol?Symbol:{},s=a.iterator||\"@@iterator\",u=a.asyncIterator||\"@@asyncIterator\",h=a.toStringTag||\"@@toStringTag\";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},\"\")}catch(t){f=function(t,e,r){return t[e]=r}}function c(t,e,r,n){var i=e&&e.prototype instanceof v?e:v,a=Object.create(i.prototype),s=new _(n||[]);return o(a,\"_invoke\",{value:U(t,r,s)}),a}function l(t,e,r){try{return{type:\"normal\",arg:t.call(e,r)}}catch(t){return{type:\"throw\",arg:t}}}t.wrap=c;var p=\"suspendedStart\",y=\"suspendedYield\",d=\"executing\",g=\"completed\",b={};function v(){}function w(){}function m(){}var A={};f(A,s,(function(){return this}));var E=Object.getPrototypeOf,x=E&&E(E(j([])));x&&x!==r&&i.call(x,s)&&(A=x);var k=m.prototype=v.prototype=Object.create(A);function O(t){[\"next\",\"throw\",\"return\"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function I(t,e){function r(o,a,s,u){var h=l(t[o],t,a);if(\"throw\"!==h.type){var f=h.arg,c=f.value;return c&&\"object\"===n(c)&&i.call(c,\"__await\")?e.resolve(c.__await).then((function(t){r(\"next\",t,s,u)}),(function(t){r(\"throw\",t,s,u)})):e.resolve(c).then((function(t){f.value=t,s(f)}),(function(t){return r(\"throw\",t,s,u)}))}u(h.arg)}var a;o(this,\"_invoke\",{value:function(t,n){function i(){return new e((function(e,i){r(t,n,e,i)}))}return a=a?a.then(i,i):i()}})}function U(t,e,r){var n=p;return function(i,o){if(n===d)throw new Error(\"Generator is already running\");if(n===g){if(\"throw\"===i)throw o;return P()}for(r.method=i,r.arg=o;;){var a=r.delegate;if(a){var s=S(a,r);if(s){if(s===b)continue;return s}}if(\"next\"===r.method)r.sent=r._sent=r.arg;else if(\"throw\"===r.method){if(n===p)throw n=g,r.arg;r.dispatchException(r.arg)}else\"return\"===r.method&&r.abrupt(\"return\",r.arg);n=d;var u=l(t,e,r);if(\"normal\"===u.type){if(n=r.done?g:y,u.arg===b)continue;return{value:u.arg,done:r.done}}\"throw\"===u.type&&(n=g,r.method=\"throw\",r.arg=u.arg)}}}function S(t,r){var n=r.method,i=t.iterator[n];if(i===e)return r.delegate=null,\"throw\"===n&&t.iterator.return&&(r.method=\"return\",r.arg=e,S(t,r),\"throw\"===r.method)||\"return\"!==n&&(r.method=\"throw\",r.arg=new TypeError(\"The iterator does not provide a '\"+n+\"' method\")),b;var o=l(i,t.iterator,r.arg);if(\"throw\"===o.type)return r.method=\"throw\",r.arg=o.arg,r.delegate=null,b;var a=o.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,\"return\"!==r.method&&(r.method=\"next\",r.arg=e),r.delegate=null,b):a:(r.method=\"throw\",r.arg=new TypeError(\"iterator result is not an object\"),r.delegate=null,b)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function B(t){var e=t.completion||{};e.type=\"normal\",delete e.arg,t.completion=e}function _(t){this.tryEntries=[{tryLoc:\"root\"}],t.forEach(L,this),this.reset(!0)}function j(t){if(t){var r=t[s];if(r)return r.call(t);if(\"function\"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function r(){for(;++n<t.length;)if(i.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=e,r.done=!0,r};return o.next=o}}return{next:P}}function P(){return{value:e,done:!0}}return w.prototype=m,o(k,\"constructor\",{value:m,configurable:!0}),o(m,\"constructor\",{value:w,configurable:!0}),w.displayName=f(m,h,\"GeneratorFunction\"),t.isGeneratorFunction=function(t){var e=\"function\"==typeof t&&t.constructor;return!!e&&(e===w||\"GeneratorFunction\"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,f(t,h,\"GeneratorFunction\")),t.prototype=Object.create(k),t},t.awrap=function(t){return{__await:t}},O(I.prototype),f(I.prototype,u,(function(){return this})),t.AsyncIterator=I,t.async=function(e,r,n,i,o){void 0===o&&(o=Promise);var a=new I(c(e,r,n,i),o);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},O(k),f(k,h,\"Generator\"),f(k,s,(function(){return this})),f(k,\"toString\",(function(){return\"[object Generator]\"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=j,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method=\"next\",this.arg=e,this.tryEntries.forEach(B),!t)for(var r in this)\"t\"===r.charAt(0)&&i.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if(\"throw\"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(n,i){return s.type=\"throw\",s.arg=t,r.next=n,i&&(r.method=\"next\",r.arg=e),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if(\"root\"===a.tryLoc)return n(\"end\");if(a.tryLoc<=this.prev){var u=i.call(a,\"catchLoc\"),h=i.call(a,\"finallyLoc\");if(u&&h){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!h)throw new Error(\"try statement without catch or finally\");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,\"finallyLoc\")&&this.prev<n.finallyLoc){var o=n;break}}o&&(\"break\"===t||\"continue\"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method=\"next\",this.next=o.finallyLoc,b):this.complete(a)},complete:function(t,e){if(\"throw\"===t.type)throw t.arg;return\"break\"===t.type||\"continue\"===t.type?this.next=t.arg:\"return\"===t.type?(this.rval=this.arg=t.arg,this.method=\"return\",this.next=\"end\"):\"normal\"===t.type&&e&&(this.next=e),b},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),B(r),b}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if(\"throw\"===n.type){var i=n.arg;B(r)}return i}}throw new Error(\"illegal catch attempt\")},delegateYield:function(t,r,n){return this.delegate={iterator:j(t),resultName:r,nextLoc:n},\"next\"===this.method&&(this.arg=e),b}},t}(\"object\"===n(t=r.nmd(t))?t.exports:{});try{regeneratorRuntime=i}catch(t){\"object\"===(\"undefined\"==typeof globalThis?\"undefined\":n(globalThis))?globalThis.regeneratorRuntime=i:Function(\"r\",\"regeneratorRuntime = r\")(i)}},54:t=>{\"use strict\";t.exports={COLOR:0,GREY:1,BINARY:2}},65:function(t,e){\"use strict\";var r=this,n=!1;e.logging=n,e.setLogging=function(t){n=t},e.log=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return n?console.log.apply(r,e):null}},133:function(t,e,r){var n=r(545).hp;(function(){\"use strict\";function t(t){throw t}var r=void 0,i=!0,o=\"undefined\"!=typeof Uint8Array&&\"undefined\"!=typeof Uint16Array&&\"undefined\"!=typeof Uint32Array&&\"undefined\"!=typeof DataView;function a(e,r){this.index=\"number\"==typeof r?r:0,this.m=0,this.buffer=e instanceof(o?Uint8Array:Array)?e:new(o?Uint8Array:Array)(32768),2*this.buffer.length<=this.index&&t(Error(\"invalid index\")),this.buffer.length<=this.index&&this.f()}a.prototype.f=function(){var t,e=this.buffer,r=e.length,n=new(o?Uint8Array:Array)(r<<1);if(o)n.set(e);else for(t=0;t<r;++t)n[t]=e[t];return this.buffer=n},a.prototype.d=function(t,e,r){var n,i=this.buffer,o=this.index,a=this.m,s=i[o];if(r&&1<e&&(t=8<e?(l[255&t]<<24|l[t>>>8&255]<<16|l[t>>>16&255]<<8|l[t>>>24&255])>>32-e:l[t]>>8-e),8>e+a)s=s<<e|t,a+=e;else for(n=0;n<e;++n)s=s<<1|t>>e-n-1&1,8==++a&&(a=0,i[o++]=l[s],s=0,o===i.length&&(i=this.f()));i[o]=s,this.buffer=i,this.m=a,this.index=o},a.prototype.finish=function(){var t,e=this.buffer,r=this.index;return 0<this.m&&(e[r]<<=8-this.m,e[r]=l[e[r]],r++),o?t=e.subarray(0,r):(e.length=r,t=e),t};var s,u=new(o?Uint8Array:Array)(256);for(s=0;256>s;++s){for(var h=c=s,f=7,c=c>>>1;c;c>>>=1)h<<=1,h|=1&c,--f;u[s]=(h<<f&255)>>>0}var l=u;function p(t,e,r){var n,i=\"number\"==typeof e?e:e=0,o=\"number\"==typeof r?r:t.length;for(n=-1,i=7&o;i--;++e)n=n>>>8^d[255&(n^t[e])];for(i=o>>3;i--;e+=8)n=(n=(n=(n=(n=(n=(n=(n=n>>>8^d[255&(n^t[e])])>>>8^d[255&(n^t[e+1])])>>>8^d[255&(n^t[e+2])])>>>8^d[255&(n^t[e+3])])>>>8^d[255&(n^t[e+4])])>>>8^d[255&(n^t[e+5])])>>>8^d[255&(n^t[e+6])])>>>8^d[255&(n^t[e+7])];return(4294967295^n)>>>0}var y=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918e3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],d=o?new Uint32Array(y):y;function g(){}function b(t){this.buffer=new(o?Uint16Array:Array)(2*t),this.length=0}function v(t){var e,r,n,i,a,s,u,h,f,c,l=t.length,p=0,y=Number.POSITIVE_INFINITY;for(h=0;h<l;++h)t[h]>p&&(p=t[h]),t[h]<y&&(y=t[h]);for(e=1<<p,r=new(o?Uint32Array:Array)(e),n=1,i=0,a=2;n<=p;){for(h=0;h<l;++h)if(t[h]===n){for(s=0,u=i,f=0;f<n;++f)s=s<<1|1&u,u>>=1;for(c=n<<16|h,f=s;f<e;f+=a)r[f]=c;++i}++n,i<<=1,a<<=1}return[r,p,y]}function w(t,e){this.k=A,this.F=0,this.input=o&&t instanceof Array?new Uint8Array(t):t,this.b=0,e&&(e.lazy&&(this.F=e.lazy),\"number\"==typeof e.compressionType&&(this.k=e.compressionType),e.outputBuffer&&(this.a=o&&e.outputBuffer instanceof Array?new Uint8Array(e.outputBuffer):e.outputBuffer),\"number\"==typeof e.outputIndex&&(this.b=e.outputIndex)),this.a||(this.a=new(o?Uint8Array:Array)(32768))}b.prototype.getParent=function(t){return 2*((t-2)/4|0)},b.prototype.push=function(t,e){var r,n,i,o=this.buffer;for(r=this.length,o[this.length++]=e,o[this.length++]=t;0<r&&(n=this.getParent(r),o[r]>o[n]);)i=o[r],o[r]=o[n],o[n]=i,i=o[r+1],o[r+1]=o[n+1],o[n+1]=i,r=n;return this.length},b.prototype.pop=function(){var t,e,r,n,i,o=this.buffer;for(e=o[0],t=o[1],this.length-=2,o[0]=o[this.length],o[1]=o[this.length+1],i=0;!((n=2*i+2)>=this.length)&&(n+2<this.length&&o[n+2]>o[n]&&(n+=2),o[n]>o[i]);)r=o[i],o[i]=o[n],o[n]=r,r=o[i+1],o[i+1]=o[n+1],o[n+1]=r,i=n;return{index:t,value:e,length:this.length}};var m,A=2,E={NONE:0,L:1,t:A,X:3},x=[];for(m=0;288>m;m++)switch(i){case 143>=m:x.push([m+48,8]);break;case 255>=m:x.push([m-144+400,9]);break;case 279>=m:x.push([m-256+0,7]);break;case 287>=m:x.push([m-280+192,8]);break;default:t(\"invalid literal: \"+m)}function k(t,e){this.length=t,this.N=e}w.prototype.h=function(){var e,n,s,u,h=this.input;switch(this.k){case 0:for(s=0,u=h.length;s<u;){var f,c,l,p=n=o?h.subarray(s,s+65535):h.slice(s,s+65535),y=(s+=n.length)===u,d=r,g=r,b=this.a,v=this.b;if(o){for(b=new Uint8Array(this.a.buffer);b.length<=v+p.length+5;)b=new Uint8Array(b.length<<1);b.set(this.a)}if(f=y?1:0,b[v++]=0|f,l=65536+~(c=p.length)&65535,b[v++]=255&c,b[v++]=c>>>8&255,b[v++]=255&l,b[v++]=l>>>8&255,o)b.set(p,v),v+=p.length,b=b.subarray(0,v);else{for(d=0,g=p.length;d<g;++d)b[v++]=p[d];b.length=v}this.b=v,this.a=b}break;case 1:var w=new a(o?new Uint8Array(this.a.buffer):this.a,this.b);w.d(1,1,i),w.d(1,2,i);var m,E,k,O=U(this,h);for(m=0,E=O.length;m<E;m++)if(k=O[m],a.prototype.d.apply(w,x[k]),256<k)w.d(O[++m],O[++m],i),w.d(O[++m],5),w.d(O[++m],O[++m],i);else if(256===k)break;this.a=w.finish(),this.b=this.a.length;break;case A:var I,S,_,j,P,T,R,C,M,N,F,G,z,D,W,Y=new a(o?new Uint8Array(this.a.buffer):this.a,this.b),V=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],q=Array(19);for(I=A,Y.d(1,1,i),Y.d(I,2,i),S=U(this,h),R=B(T=L(this.U,15)),M=B(C=L(this.T,7)),_=286;257<_&&0===T[_-1];_--);for(j=30;1<j&&0===C[j-1];j--);var J,Q,X,H,K,$,Z=_,tt=j,et=new(o?Uint32Array:Array)(Z+tt),rt=new(o?Uint32Array:Array)(316),nt=new(o?Uint8Array:Array)(19);for(J=Q=0;J<Z;J++)et[Q++]=T[J];for(J=0;J<tt;J++)et[Q++]=C[J];if(!o)for(J=0,H=nt.length;J<H;++J)nt[J]=0;for(J=K=0,H=et.length;J<H;J+=Q){for(Q=1;J+Q<H&&et[J+Q]===et[J];++Q);if(X=Q,0===et[J])if(3>X)for(;0<X--;)rt[K++]=0,nt[0]++;else for(;0<X;)($=138>X?X:138)>X-3&&$<X&&($=X-3),10>=$?(rt[K++]=17,rt[K++]=$-3,nt[17]++):(rt[K++]=18,rt[K++]=$-11,nt[18]++),X-=$;else if(rt[K++]=et[J],nt[et[J]]++,3>--X)for(;0<X--;)rt[K++]=et[J],nt[et[J]]++;else for(;0<X;)($=6>X?X:6)>X-3&&$<X&&($=X-3),rt[K++]=16,rt[K++]=$-3,nt[16]++,X-=$}for(e=o?rt.subarray(0,K):rt.slice(0,K),N=L(nt,7),D=0;19>D;D++)q[D]=N[V[D]];for(P=19;4<P&&0===q[P-1];P--);for(F=B(N),Y.d(_-257,5,i),Y.d(j-1,5,i),Y.d(P-4,4,i),D=0;D<P;D++)Y.d(q[D],3,i);for(D=0,W=e.length;D<W;D++)if(G=e[D],Y.d(F[G],N[G],i),16<=G){switch(D++,G){case 16:z=2;break;case 17:z=3;break;case 18:z=7;break;default:t(\"invalid code: \"+G)}Y.d(e[D],z,i)}var it,ot,at,st,ut,ht,ft,ct,lt=[R,T],pt=[M,C];for(ut=lt[0],ht=lt[1],ft=pt[0],ct=pt[1],it=0,ot=S.length;it<ot;++it)if(at=S[it],Y.d(ut[at],ht[at],i),256<at)Y.d(S[++it],S[++it],i),st=S[++it],Y.d(ft[st],ct[st],i),Y.d(S[++it],S[++it],i);else if(256===at)break;this.a=Y.finish(),this.b=this.a.length;break;default:t(\"invalid compression type\")}return this.a};var O=function(){function e(e){switch(i){case 3===e:return[257,e-3,0];case 4===e:return[258,e-4,0];case 5===e:return[259,e-5,0];case 6===e:return[260,e-6,0];case 7===e:return[261,e-7,0];case 8===e:return[262,e-8,0];case 9===e:return[263,e-9,0];case 10===e:return[264,e-10,0];case 12>=e:return[265,e-11,1];case 14>=e:return[266,e-13,1];case 16>=e:return[267,e-15,1];case 18>=e:return[268,e-17,1];case 22>=e:return[269,e-19,2];case 26>=e:return[270,e-23,2];case 30>=e:return[271,e-27,2];case 34>=e:return[272,e-31,2];case 42>=e:return[273,e-35,3];case 50>=e:return[274,e-43,3];case 58>=e:return[275,e-51,3];case 66>=e:return[276,e-59,3];case 82>=e:return[277,e-67,4];case 98>=e:return[278,e-83,4];case 114>=e:return[279,e-99,4];case 130>=e:return[280,e-115,4];case 162>=e:return[281,e-131,5];case 194>=e:return[282,e-163,5];case 226>=e:return[283,e-195,5];case 257>=e:return[284,e-227,5];case 258===e:return[285,e-258,0];default:t(\"invalid length: \"+e)}}var r,n,o=[];for(r=3;258>=r;r++)n=e(r),o[r]=n[2]<<24|n[1]<<16|n[0];return o}(),I=o?new Uint32Array(O):O;function U(e,n){function a(e,r){var n,o,a,s,u=e.N,h=[],f=0;switch(n=I[e.length],h[f++]=65535&n,h[f++]=n>>16&255,h[f++]=n>>24,i){case 1===u:o=[0,u-1,0];break;case 2===u:o=[1,u-2,0];break;case 3===u:o=[2,u-3,0];break;case 4===u:o=[3,u-4,0];break;case 6>=u:o=[4,u-5,1];break;case 8>=u:o=[5,u-7,1];break;case 12>=u:o=[6,u-9,2];break;case 16>=u:o=[7,u-13,2];break;case 24>=u:o=[8,u-17,3];break;case 32>=u:o=[9,u-25,3];break;case 48>=u:o=[10,u-33,4];break;case 64>=u:o=[11,u-49,4];break;case 96>=u:o=[12,u-65,5];break;case 128>=u:o=[13,u-97,5];break;case 192>=u:o=[14,u-129,6];break;case 256>=u:o=[15,u-193,6];break;case 384>=u:o=[16,u-257,7];break;case 512>=u:o=[17,u-385,7];break;case 768>=u:o=[18,u-513,8];break;case 1024>=u:o=[19,u-769,8];break;case 1536>=u:o=[20,u-1025,9];break;case 2048>=u:o=[21,u-1537,9];break;case 3072>=u:o=[22,u-2049,10];break;case 4096>=u:o=[23,u-3073,10];break;case 6144>=u:o=[24,u-4097,11];break;case 8192>=u:o=[25,u-6145,11];break;case 12288>=u:o=[26,u-8193,12];break;case 16384>=u:o=[27,u-12289,12];break;case 24576>=u:o=[28,u-16385,13];break;case 32768>=u:o=[29,u-24577,13];break;default:t(\"invalid distance\")}for(n=o,h[f++]=n[0],h[f++]=n[1],h[f++]=n[2],a=0,s=h.length;a<s;++a)b[v++]=h[a];m[h[0]]++,A[h[3]]++,w=e.length+r-1,y=null}var s,u,h,f,c,l,p,y,d,g={},b=o?new Uint16Array(2*n.length):[],v=0,w=0,m=new(o?Uint32Array:Array)(286),A=new(o?Uint32Array:Array)(30),E=e.F;if(!o){for(h=0;285>=h;)m[h++]=0;for(h=0;29>=h;)A[h++]=0}for(m[256]=1,s=0,u=n.length;s<u;++s){for(h=c=0,f=3;h<f&&s+h!==u;++h)c=c<<8|n[s+h];if(g[c]===r&&(g[c]=[]),l=g[c],!(0<w--)){for(;0<l.length&&32768<s-l[0];)l.shift();if(s+3>=u){for(y&&a(y,-1),h=0,f=u-s;h<f;++h)d=n[s+h],b[v++]=d,++m[d];break}0<l.length?(p=S(n,s,l),y?y.length<p.length?(d=n[s-1],b[v++]=d,++m[d],a(p,0)):a(y,-1):p.length<E?y=p:a(p,0)):y?a(y,-1):(d=n[s],b[v++]=d,++m[d])}l.push(s)}return b[v++]=256,m[256]++,e.U=m,e.T=A,o?b.subarray(0,v):b}function S(t,e,r){var n,i,o,a,s,u,h=0,f=t.length;a=0,u=r.length;t:for(;a<u;a++){if(n=r[u-a-1],o=3,3<h){for(s=h;3<s;s--)if(t[n+s-1]!==t[e+s-1])continue t;o=h}for(;258>o&&e+o<f&&t[n+o]===t[e+o];)++o;if(o>h&&(i=n,h=o),258===o)break}return new k(h,e-i)}function L(t,e){var r,n,i,a,s,u=t.length,h=new b(572),f=new(o?Uint8Array:Array)(u);if(!o)for(a=0;a<u;a++)f[a]=0;for(a=0;a<u;++a)0<t[a]&&h.push(a,t[a]);if(r=Array(h.length/2),n=new(o?Uint32Array:Array)(h.length/2),1===r.length)return f[h.pop().index]=1,f;for(a=0,s=h.length/2;a<s;++a)r[a]=h.pop(),n[a]=r[a].value;for(i=function(t,e,r){function n(t){var r=y[t][d[t]];r===e?(n(t+1),n(t+1)):--l[r],++d[t]}var i,a,s,u,h,f=new(o?Uint16Array:Array)(r),c=new(o?Uint8Array:Array)(r),l=new(o?Uint8Array:Array)(e),p=Array(r),y=Array(r),d=Array(r),g=(1<<r)-e,b=1<<r-1;for(f[r-1]=e,a=0;a<r;++a)g<b?c[a]=0:(c[a]=1,g-=b),g<<=1,f[r-2-a]=(f[r-1-a]/2|0)+e;for(f[0]=c[0],p[0]=Array(f[0]),y[0]=Array(f[0]),a=1;a<r;++a)f[a]>2*f[a-1]+c[a]&&(f[a]=2*f[a-1]+c[a]),p[a]=Array(f[a]),y[a]=Array(f[a]);for(i=0;i<e;++i)l[i]=r;for(s=0;s<f[r-1];++s)p[r-1][s]=t[s],y[r-1][s]=s;for(i=0;i<r;++i)d[i]=0;for(1===c[r-1]&&(--l[0],++d[r-1]),a=r-2;0<=a;--a){for(u=i=0,h=d[a+1],s=0;s<f[a];s++)(u=p[a+1][h]+p[a+1][h+1])>t[i]?(p[a][s]=u,y[a][s]=e,h+=2):(p[a][s]=t[i],y[a][s]=i,++i);d[a]=0,1===c[a]&&n(a)}return l}(n,n.length,e),a=0,s=r.length;a<s;++a)f[r[a].index]=i[a];return f}function B(t){var e,r,n,i,a=new(o?Uint16Array:Array)(t.length),s=[],u=[],h=0;for(e=0,r=t.length;e<r;e++)s[t[e]]=1+(0|s[t[e]]);for(e=1,r=16;e<=r;e++)u[e]=h,h+=0|s[e],h<<=1;for(e=0,r=t.length;e<r;e++)for(h=u[t[e]],u[t[e]]+=1,n=a[e]=0,i=t[e];n<i;n++)a[e]=a[e]<<1|1&h,h>>>=1;return a}function _(t,e){this.input=t,this.b=this.c=0,this.g={},e&&(e.flags&&(this.g=e.flags),\"string\"==typeof e.filename&&(this.filename=e.filename),\"string\"==typeof e.comment&&(this.w=e.comment),e.deflateOptions&&(this.l=e.deflateOptions)),this.l||(this.l={})}_.prototype.h=function(){var t,e,n,i,a,s,u,h,f=new(o?Uint8Array:Array)(32768),c=0,l=this.input,y=this.c,d=this.filename,g=this.w;if(f[c++]=31,f[c++]=139,f[c++]=8,t=0,this.g.fname&&(t|=T),this.g.fcomment&&(t|=R),this.g.fhcrc&&(t|=P),f[c++]=t,e=(Date.now?Date.now():+new Date)/1e3|0,f[c++]=255&e,f[c++]=e>>>8&255,f[c++]=e>>>16&255,f[c++]=e>>>24&255,f[c++]=0,f[c++]=j,this.g.fname!==r){for(u=0,h=d.length;u<h;++u)255<(s=d.charCodeAt(u))&&(f[c++]=s>>>8&255),f[c++]=255&s;f[c++]=0}if(this.g.comment){for(u=0,h=g.length;u<h;++u)255<(s=g.charCodeAt(u))&&(f[c++]=s>>>8&255),f[c++]=255&s;f[c++]=0}return this.g.fhcrc&&(n=65535&p(f,0,c),f[c++]=255&n,f[c++]=n>>>8&255),this.l.outputBuffer=f,this.l.outputIndex=c,f=(a=new w(l,this.l)).h(),c=a.b,o&&(c+8>f.buffer.byteLength?(this.a=new Uint8Array(c+8),this.a.set(new Uint8Array(f.buffer)),f=this.a):f=new Uint8Array(f.buffer)),i=p(l,r,r),f[c++]=255&i,f[c++]=i>>>8&255,f[c++]=i>>>16&255,f[c++]=i>>>24&255,h=l.length,f[c++]=255&h,f[c++]=h>>>8&255,f[c++]=h>>>16&255,f[c++]=h>>>24&255,this.c=y,o&&c<f.length&&(this.a=f=f.subarray(0,c)),f};var j=255,P=2,T=8,R=16;function C(e,r){switch(this.o=[],this.p=32768,this.e=this.j=this.c=this.s=0,this.input=o?new Uint8Array(e):e,this.u=!1,this.q=N,this.K=!1,!r&&(r={})||(r.index&&(this.c=r.index),r.bufferSize&&(this.p=r.bufferSize),r.bufferType&&(this.q=r.bufferType),r.resize&&(this.K=r.resize)),this.q){case M:this.b=32768,this.a=new(o?Uint8Array:Array)(32768+this.p+258);break;case N:this.b=0,this.a=new(o?Uint8Array:Array)(this.p),this.f=this.S,this.z=this.O,this.r=this.Q;break;default:t(Error(\"invalid inflate mode\"))}}var M=0,N=1;C.prototype.i=function(){for(;!this.u;){var e=nt(this,3);switch(1&e&&(this.u=i),e>>>=1){case 0:var n=this.input,a=this.c,s=this.a,u=this.b,h=n.length,f=r,c=s.length,l=r;switch(this.e=this.j=0,a+1>=h&&t(Error(\"invalid uncompressed block header: LEN\")),f=n[a++]|n[a++]<<8,a+1>=h&&t(Error(\"invalid uncompressed block header: NLEN\")),f===~(n[a++]|n[a++]<<8)&&t(Error(\"invalid uncompressed block header: length verify\")),a+f>n.length&&t(Error(\"input buffer is broken\")),this.q){case M:for(;u+f>s.length;){if(f-=l=c-u,o)s.set(n.subarray(a,a+l),u),u+=l,a+=l;else for(;l--;)s[u++]=n[a++];this.b=u,s=this.f(),u=this.b}break;case N:for(;u+f>s.length;)s=this.f({B:2});break;default:t(Error(\"invalid inflate mode\"))}if(o)s.set(n.subarray(a,a+f),u),u+=f,a+=f;else for(;f--;)s[u++]=n[a++];this.c=a,this.b=u,this.a=s;break;case 1:this.r(tt,rt);break;case 2:var p,y,d,g,b=nt(this,5)+257,w=nt(this,5)+1,m=nt(this,4)+4,A=new(o?Uint8Array:Array)(D.length),E=r,x=r,k=r,O=r,I=r;for(I=0;I<m;++I)A[D[I]]=nt(this,3);if(!o)for(I=m,m=A.length;I<m;++I)A[D[I]]=0;for(p=v(A),E=new(o?Uint8Array:Array)(b+w),I=0,g=b+w;I<g;)switch(x=it(this,p),x){case 16:for(O=3+nt(this,2);O--;)E[I++]=k;break;case 17:for(O=3+nt(this,3);O--;)E[I++]=0;k=0;break;case 18:for(O=11+nt(this,7);O--;)E[I++]=0;k=0;break;default:k=E[I++]=x}y=v(o?E.subarray(0,b):E.slice(0,b)),d=v(o?E.subarray(b):E.slice(b)),this.r(y,d);break;default:t(Error(\"unknown BTYPE: \"+e))}}return this.z()};var F,G,z=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],D=o?new Uint16Array(z):z,W=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],Y=o?new Uint16Array(W):W,V=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],q=o?new Uint8Array(V):V,J=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],Q=o?new Uint16Array(J):J,X=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],H=o?new Uint8Array(X):X,K=new(o?Uint8Array:Array)(288);for(F=0,G=K.length;F<G;++F)K[F]=143>=F?8:255>=F?9:279>=F?7:8;var $,Z,tt=v(K),et=new(o?Uint8Array:Array)(30);for($=0,Z=et.length;$<Z;++$)et[$]=5;var rt=v(et);function nt(e,r){for(var n,i=e.j,o=e.e,a=e.input,s=e.c,u=a.length;o<r;)s>=u&&t(Error(\"input buffer is broken\")),i|=a[s++]<<o,o+=8;return n=i&(1<<r)-1,e.j=i>>>r,e.e=o-r,e.c=s,n}function it(e,r){for(var n,i,o=e.j,a=e.e,s=e.input,u=e.c,h=s.length,f=r[0],c=r[1];a<c&&!(u>=h);)o|=s[u++]<<a,a+=8;return(i=(n=f[o&(1<<c)-1])>>>16)>a&&t(Error(\"invalid code length: \"+i)),e.j=o>>i,e.e=a-i,e.c=u,65535&n}function ot(t){this.input=t,this.c=0,this.G=[],this.R=!1}function at(t){if(\"string\"==typeof t){var e,r,n=t.split(\"\");for(e=0,r=n.length;e<r;e++)n[e]=(255&n[e].charCodeAt(0))>>>0;t=n}for(var i,o=1,a=0,s=t.length,u=0;0<s;){s-=i=1024<s?1024:s;do{a+=o+=t[u++]}while(--i);o%=65521,a%=65521}return(a<<16|o)>>>0}function st(e,r){var n,i;this.input=e,this.c=0,!r&&(r={})||(r.index&&(this.c=r.index),r.verify&&(this.V=r.verify)),n=e[this.c++],i=e[this.c++],(15&n)===ut?this.method=ut:t(Error(\"unsupported compression method\")),0!=((n<<8)+i)%31&&t(Error(\"invalid fcheck flag:\"+((n<<8)+i)%31)),32&i&&t(Error(\"fdict flag is not supported\")),this.J=new C(e,{index:this.c,bufferSize:r.bufferSize,bufferType:r.bufferType,resize:r.resize})}C.prototype.r=function(t,e){var r=this.a,n=this.b;this.A=t;for(var i,o,a,s,u=r.length-258;256!==(i=it(this,t));)if(256>i)n>=u&&(this.b=n,r=this.f(),n=this.b),r[n++]=i;else for(s=Y[o=i-257],0<q[o]&&(s+=nt(this,q[o])),i=it(this,e),a=Q[i],0<H[i]&&(a+=nt(this,H[i])),n>=u&&(this.b=n,r=this.f(),n=this.b);s--;)r[n]=r[n++-a];for(;8<=this.e;)this.e-=8,this.c--;this.b=n},C.prototype.Q=function(t,e){var r=this.a,n=this.b;this.A=t;for(var i,o,a,s,u=r.length;256!==(i=it(this,t));)if(256>i)n>=u&&(u=(r=this.f()).length),r[n++]=i;else for(s=Y[o=i-257],0<q[o]&&(s+=nt(this,q[o])),i=it(this,e),a=Q[i],0<H[i]&&(a+=nt(this,H[i])),n+s>u&&(u=(r=this.f()).length);s--;)r[n]=r[n++-a];for(;8<=this.e;)this.e-=8,this.c--;this.b=n},C.prototype.f=function(){var t,e,r=new(o?Uint8Array:Array)(this.b-32768),n=this.b-32768,i=this.a;if(o)r.set(i.subarray(32768,r.length));else for(t=0,e=r.length;t<e;++t)r[t]=i[t+32768];if(this.o.push(r),this.s+=r.length,o)i.set(i.subarray(n,n+32768));else for(t=0;32768>t;++t)i[t]=i[n+t];return this.b=32768,i},C.prototype.S=function(t){var e,r,n,i=this.input.length/this.c+1|0,a=this.input,s=this.a;return t&&(\"number\"==typeof t.B&&(i=t.B),\"number\"==typeof t.M&&(i+=t.M)),r=2>i?(n=(a.length-this.c)/this.A[2]/2*258|0)<s.length?s.length+n:s.length<<1:s.length*i,o?(e=new Uint8Array(r)).set(s):e=s,this.a=e},C.prototype.z=function(){var t,e,r,n,i,a=0,s=this.a,u=this.o,h=new(o?Uint8Array:Array)(this.s+(this.b-32768));if(0===u.length)return o?this.a.subarray(32768,this.b):this.a.slice(32768,this.b);for(e=0,r=u.length;e<r;++e)for(n=0,i=(t=u[e]).length;n<i;++n)h[a++]=t[n];for(e=32768,r=this.b;e<r;++e)h[a++]=s[e];return this.o=[],this.buffer=h},C.prototype.O=function(){var t,e=this.b;return o?this.K?(t=new Uint8Array(e)).set(this.a.subarray(0,e)):t=this.a.subarray(0,e):(this.a.length>e&&(this.a.length=e),t=this.a),this.buffer=t},ot.prototype.i=function(){for(var e=this.input.length;this.c<e;){var n,a,s=new g,u=r,h=r,f=r,c=r,l=r,y=r,d=r,b=this.input,v=this.c;if(s.C=b[v++],s.D=b[v++],(31!==s.C||139!==s.D)&&t(Error(\"invalid file signature:\"+s.C+\",\"+s.D)),s.v=b[v++],8===s.v||t(Error(\"unknown compression method: \"+s.v)),s.n=b[v++],a=b[v++]|b[v++]<<8|b[v++]<<16|b[v++]<<24,s.$=new Date(1e3*a),s.ba=b[v++],s.aa=b[v++],0<(4&s.n)&&(s.W=b[v++]|b[v++]<<8,v+=s.W),0<(s.n&T)){for(y=[],l=0;0<(c=b[v++]);)y[l++]=String.fromCharCode(c);s.name=y.join(\"\")}if(0<(s.n&R)){for(y=[],l=0;0<(c=b[v++]);)y[l++]=String.fromCharCode(c);s.w=y.join(\"\")}0<(s.n&P)&&(s.P=65535&p(b,0,v),s.P!==(b[v++]|b[v++]<<8)&&t(Error(\"invalid header crc16\"))),u=b[b.length-4]|b[b.length-3]<<8|b[b.length-2]<<16|b[b.length-1]<<24,b.length-v-4-4<512*u&&(f=u),h=new C(b,{index:v,bufferSize:f}),s.data=n=h.i(),v=h.c,s.Y=d=(b[v++]|b[v++]<<8|b[v++]<<16|b[v++]<<24)>>>0,p(n,r,r)!==d&&t(Error(\"invalid CRC-32 checksum: 0x\"+p(n,r,r).toString(16)+\" / 0x\"+d.toString(16))),s.Z=u=(b[v++]|b[v++]<<8|b[v++]<<16|b[v++]<<24)>>>0,(4294967295&n.length)!==u&&t(Error(\"invalid input size: \"+(4294967295&n.length)+\" / \"+u)),this.G.push(s),this.c=v}this.R=i;var w,m,A,E=this.G,x=0,k=0;for(w=0,m=E.length;w<m;++w)k+=E[w].data.length;if(o)for(A=new Uint8Array(k),w=0;w<m;++w)A.set(E[w].data,x),x+=E[w].data.length;else{for(A=[],w=0;w<m;++w)A[w]=E[w].data;A=Array.prototype.concat.apply([],A)}return A},st.prototype.i=function(){var e,r=this.input;return e=this.J.i(),this.c=this.J.c,this.V&&(r[this.c++]<<24|r[this.c++]<<16|r[this.c++]<<8|r[this.c++])>>>0!==at(e)&&t(Error(\"invalid adler-32 checksum\")),e};var ut=8;function ht(t,e){this.input=t,this.a=new(o?Uint8Array:Array)(32768),this.k=ft.t;var r,n={};for(r in!e&&(e={})||\"number\"!=typeof e.compressionType||(this.k=e.compressionType),e)n[r]=e[r];n.outputBuffer=this.a,this.I=new w(this.input,n)}var ft=E;function ct(t,e){var r;return r=new ht(t).h(),e||(e={}),e.H?r:dt(r)}function lt(t,e){var r;return t.subarray=t.slice,r=new st(t).i(),e||(e={}),e.noBuffer?r:dt(r)}function pt(t,e){var r;return t.subarray=t.slice,r=new _(t).h(),e||(e={}),e.H?r:dt(r)}function yt(t,e){var r;return t.subarray=t.slice,r=new ot(t).i(),e||(e={}),e.H?r:dt(r)}function dt(t){var e,r,i=new n(t.length);for(e=0,r=t.length;e<r;++e)i[e]=t[e];return i}ht.prototype.h=function(){var e,r,n,i,a,s,u,h=0;if(u=this.a,(e=ut)===ut?r=Math.LOG2E*Math.log(32768)-8:t(Error(\"invalid compression method\")),n=r<<4|e,u[h++]=n,e===ut)switch(this.k){case ft.NONE:a=0;break;case ft.L:a=1;break;case ft.t:a=2;break;default:t(Error(\"unsupported compression type\"))}else t(Error(\"invalid compression method\"));return i=a<<6,u[h++]=i|31-(256*n+i)%31,s=at(this.input),this.I.b=h,h=(u=this.I.h()).length,o&&((u=new Uint8Array(u.buffer)).length<=h+4&&(this.a=new Uint8Array(u.length+4),this.a.set(u),u=this.a),u=u.subarray(0,h+4)),u[h++]=s>>24&255,u[h++]=s>>16&255,u[h++]=s>>8&255,u[h++]=255&s,u},e.deflate=function(t,e,r){process.nextTick((function(){var n,i;try{i=ct(t,r)}catch(t){n=t}e(n,i)}))},e.deflateSync=ct,e.inflate=function(t,e,r){process.nextTick((function(){var n,i;try{i=lt(t,r)}catch(t){n=t}e(n,i)}))},e.inflateSync=lt,e.gzip=function(t,e,r){process.nextTick((function(){var n,i;try{i=pt(t,r)}catch(t){n=t}e(n,i)}))},e.gzipSync=pt,e.gunzip=function(t,e,r){process.nextTick((function(){var n,i;try{i=yt(t,r)}catch(t){n=t}e(n,i)}))},e.gunzipSync=yt}).call(this)},242:t=>{\"use strict\";const e={bigInt:()=>(async t=>{try{return(await WebAssembly.instantiate(t)).instance.exports.b(BigInt(0))===BigInt(0)}catch(t){return!1}})(new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,1,126,1,126,3,2,1,0,7,5,1,1,98,0,0,10,6,1,4,0,32,0,11])),bulkMemory:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,3,1,0,1,10,14,1,12,0,65,0,65,0,65,0,252,10,0,0,11])),exceptions:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),exceptionsFinal:()=>(async()=>{try{return new WebAssembly.Module(Uint8Array.from(atob(\"AGFzbQEAAAABBAFgAAADAgEAChABDgACaR9AAQMAAAsACxoL\"),(t=>t.codePointAt(0)))),!0}catch(t){return!1}})(),extendedConst:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,5,3,1,0,1,11,9,1,0,65,1,65,2,106,11,0])),gc:()=>(async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,95,1,120,0])))(),jsStringBuiltins:()=>(async()=>{try{return await WebAssembly.instantiate(Uint8Array.from(atob(\"AGFzbQEAAAABBgFgAW8BfwIXAQ53YXNtOmpzLXN0cmluZwR0ZXN0AAA=\"),(t=>t.codePointAt(0))),{},{builtins:[\"js-string\"]}),!0}catch(t){return!1}})(),jspi:()=>(async()=>\"Suspending\"in WebAssembly)(),memory64:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,5,3,1,4,1])),multiMemory:()=>(async()=>{try{return new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,5,5,2,0,0,0,0])),!0}catch(t){return!1}})(),multiValue:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,0,2,127,127,3,2,1,0,10,8,1,6,0,65,0,65,0,11])),mutableGlobals:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,2,8,1,1,97,1,98,3,127,1,6,6,1,127,1,65,0,11,7,5,1,1,97,3,1])),referenceTypes:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,7,1,5,0,208,112,26,11])),relaxedSimd:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),saturatedFloatToInt:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,12,1,10,0,67,0,0,0,0,252,0,26,11])),signExtensions:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,65,0,192,26,11])),simd:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),streamingCompilation:()=>(async()=>\"compileStreaming\"in WebAssembly)(),tailCall:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,6,1,4,0,18,0,11])),threads:()=>(async t=>{try{return\"undefined\"!=typeof MessageChannel&&(new MessageChannel).port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(t)}catch(t){return!1}})(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11])),typeReflection:()=>(async()=>\"Function\"in WebAssembly)(),typedFunctionReferences:()=>(async()=>{try{return new WebAssembly.Module(Uint8Array.from(atob(\"AGFzbQEAAAABEANgAX8Bf2ABZAABf2AAAX8DBAMBAAIJBQEDAAEBChwDCwBBCkEqIAAUAGoLBwAgAEEBagsGANIBEAAL\"),(t=>t.codePointAt(0)))),!0}catch(t){return!1}})()};t.exports=e},258:(t,e,r)=>{\"use strict\";t.exports=r(133).gunzipSync},329:(t,e,r)=>{\"use strict\";var n=r(545).hp;function i(t){return i=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&\"function\"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?\"symbol\":typeof t},i(t)}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){s(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function s(t,e,r){return(e=function(t){var e=function(t){if(\"object\"!=i(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,\"string\");if(\"object\"!=i(r))return r;throw new TypeError(\"@@toPrimitive must return a primitive value.\")}return String(t)}(t);return\"symbol\"==i(e)?e:e+\"\"}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var u=r(450);t.exports=function(t,e,r){var i,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,s=66===r[0]&&77===r[1]||66===r[1]&&77===r[0],h=parseInt(null===(i=r.slice(0,500).join(\" \").match(/1 18 0 3 0 0 0 1 0 (\\d)/))||void 0===i?void 0:i[1],10)||1;if(s){var f=n.from(Array.from(a(a({},r),{},{length:Object.keys(r).length}))),c=u.decode(f);t.FS.writeFile(\"/input\",u.encode(c).data)}else t.FS.writeFile(\"/input\",r);if(1===e.SetImageFile(h,o))throw Error(\"Error attempting to read image.\")}},330:t=>{\"use strict\";t.exports=JSON.parse('{\"El\":{\"QE\":\"^7.0.0\"}}')},334:(t,e,r)=>{\"use strict\";var n=r(535),i=r(54),o=function(t){var e=t.split(\"\\n\");if(\"  \"===e[0].substring(0,2))for(var r=0;r<e.length;r+=1)\"  \"===e[r].substring(0,2)&&(e[r]=e[r].slice(2));return e.join(\"\\n\")};t.exports=function(t,e,r,a){var s,u,h,f,c,l=function(e,r){return Object.keys(t).filter((function(n){return n.startsWith(\"\".concat(r,\"_\"))&&t[n]===e})).map((function(t){return t.slice(r.length+1)}))[0]},p=function(r){e.WriteImage(r,\"/image.png\");var i=t.FS.readFile(\"/image.png\"),o=\"data:image/png;base64,\".concat(n(i.buffer));return t.FS.unlink(\"/image.png\"),o};return{text:r.text?e.GetUTF8Text():null,hocr:r.hocr?o(e.GetHOCRText()):null,tsv:r.tsv?e.GetTSVText():null,box:r.box?e.GetBoxText():null,unlv:r.unlv?e.GetUNLVText():null,osd:r.osd?e.GetOsdText():null,pdf:r.pdf?(h=null!==(s=a.pdfTitle)&&void 0!==s?s:\"Tesseract OCR Result\",f=null!==(u=a.pdfTextOnly)&&void 0!==u&&u,c=new t.TessPDFRenderer(\"tesseract-ocr\",\"/\",f),c.BeginDocument(h),c.AddImage(e),c.EndDocument(),t._free(c),t.FS.readFile(\"/tesseract-ocr.pdf\")):null,imageColor:r.imageColor?p(i.COLOR):null,imageGrey:r.imageGrey?p(i.GREY):null,imageBinary:r.imageBinary?p(i.BINARY):null,confidence:a.skipRecognition?null:e.MeanTextConf(),blocks:r.blocks&&!a.skipRecognition?JSON.parse(e.GetJSONText()).blocks:null,layoutBlocks:r.layoutBlocks&&a.skipRecognition?JSON.parse(e.GetJSONText()).blocks:null,psm:l(e.GetPageSegMode(),\"PSM\"),oem:l(e.oem(),\"OEM\"),version:e.Version(),debug:r.debug?t.FS.readFile(\"/debugInternal.txt\",{encoding:\"utf8\",flags:\"a+\"}):null}}},398:(t,e,r)=>{var n=r(545).hp;function i(t){this.buffer=t.data,this.width=t.width,this.height=t.height,this.extraBytes=this.width%4,this.rgbSize=this.height*(3*this.width+this.extraBytes),this.headerInfoSize=40,this.data=[],this.flag=\"BM\",this.reserved=0,this.offset=54,this.fileSize=this.rgbSize+this.offset,this.planes=1,this.bitPP=24,this.compress=0,this.hr=0,this.vr=0,this.colors=0,this.importantColors=0}i.prototype.encode=function(){var t=new n(this.offset+this.rgbSize);this.pos=0,t.write(this.flag,this.pos,2),this.pos+=2,t.writeUInt32LE(this.fileSize,this.pos),this.pos+=4,t.writeUInt32LE(this.reserved,this.pos),this.pos+=4,t.writeUInt32LE(this.offset,this.pos),this.pos+=4,t.writeUInt32LE(this.headerInfoSize,this.pos),this.pos+=4,t.writeUInt32LE(this.width,this.pos),this.pos+=4,t.writeInt32LE(-this.height,this.pos),this.pos+=4,t.writeUInt16LE(this.planes,this.pos),this.pos+=2,t.writeUInt16LE(this.bitPP,this.pos),this.pos+=2,t.writeUInt32LE(this.compress,this.pos),this.pos+=4,t.writeUInt32LE(this.rgbSize,this.pos),this.pos+=4,t.writeUInt32LE(this.hr,this.pos),this.pos+=4,t.writeUInt32LE(this.vr,this.pos),this.pos+=4,t.writeUInt32LE(this.colors,this.pos),this.pos+=4,t.writeUInt32LE(this.importantColors,this.pos),this.pos+=4;for(var e=0,r=3*this.width+this.extraBytes,i=0;i<this.height;i++){for(var o=0;o<this.width;o++){var a=this.pos+i*r+3*o;e++,t[a]=this.buffer[e++],t[a+1]=this.buffer[e++],t[a+2]=this.buffer[e++]}if(this.extraBytes>0){var s=this.pos+i*r+3*this.width;t.fill(0,s,s+this.extraBytes)}}return t},t.exports=function(t,e){return void 0===e&&(e=100),{data:new i(t).encode(),width:t.width,height:t.height}}},443:t=>{t.exports=function(t){if(\"string\"!=typeof t)return!1;var i=t.match(e);if(!i)return!1;var o=i[1];return!!o&&!(!r.test(o)&&!n.test(o))};var e=/^(?:\\w+:)?\\/\\/(\\S+)$/,r=/^localhost[\\:?\\d]*(?:[^\\:?\\d]\\S*)?$/,n=/^[^\\s\\.]+\\.\\S{2,}$/},450:(t,e,r)=>{var n=r(398),i=r(834);t.exports={encode:n,decode:i}},535:t=>{\"use strict\";t.exports=function(t){for(var e,r=\"\",n=\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\",i=new Uint8Array(t),o=i.byteLength,a=o%3,s=o-a,u=0;u<s;u+=3)r+=n[(16515072&(e=i[u]<<16|i[u+1]<<8|i[u+2]))>>18]+n[(258048&e)>>12]+n[(4032&e)>>6]+n[63&e];return 1===a?(e=i[s],r+=\"\".concat(n[(252&e)>>2]+n[(3&e)<<4],\"==\")):2===a&&(e=i[s]<<8|i[s+1],r+=\"\".concat(n[(64512&e)>>10]+n[(1008&e)>>4]+n[(15&e)<<2],\"=\")),r}},545:(t,e,r)=>{\"use strict\";function n(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,\"value\"in n&&(n.writable=!0),Object.defineProperty(t,i(n.key),n)}}function i(t){var e=function(t){if(\"object\"!=u(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,\"string\");if(\"object\"!=u(r))return r;throw new TypeError(\"@@toPrimitive must return a primitive value.\")}return String(t)}(t);return\"symbol\"==u(e)?e:e+\"\"}function o(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(o=function(){return!!t})()}function a(t){return a=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},a(t)}function s(t,e){return s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},s(t,e)}function u(t){return u=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&\"function\"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?\"symbol\":typeof t},u(t)}var h=r(768),f=r(773),c=\"function\"==typeof Symbol&&\"function\"==typeof Symbol.for?Symbol.for(\"nodejs.util.inspect.custom\"):null;e.hp=y,e.IS=50;var l=2147483647;function p(t){if(t>l)throw new RangeError('The value \"'+t+'\" is invalid for option \"size\"');var e=new Uint8Array(t);return Object.setPrototypeOf(e,y.prototype),e}function y(t,e,r){if(\"number\"==typeof t){if(\"string\"==typeof e)throw new TypeError('The \"string\" argument must be of type string. Received type number');return b(t)}return d(t,e,r)}function d(t,e,r){if(\"string\"==typeof t)return function(t,e){if(\"string\"==typeof e&&\"\"!==e||(e=\"utf8\"),!y.isEncoding(e))throw new TypeError(\"Unknown encoding: \"+e);var r=0|A(t,e),n=p(r),i=n.write(t,e);return i!==r&&(n=n.slice(0,i)),n}(t,e);if(ArrayBuffer.isView(t))return function(t){if(et(t,Uint8Array)){var e=new Uint8Array(t);return w(e.buffer,e.byteOffset,e.byteLength)}return v(t)}(t);if(null==t)throw new TypeError(\"The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type \"+u(t));if(et(t,ArrayBuffer)||t&&et(t.buffer,ArrayBuffer))return w(t,e,r);if(\"undefined\"!=typeof SharedArrayBuffer&&(et(t,SharedArrayBuffer)||t&&et(t.buffer,SharedArrayBuffer)))return w(t,e,r);if(\"number\"==typeof t)throw new TypeError('The \"value\" argument must not be of type number. Received type number');var n=t.valueOf&&t.valueOf();if(null!=n&&n!==t)return y.from(n,e,r);var i=function(t){if(y.isBuffer(t)){var e=0|m(t.length),r=p(e);return 0===r.length||t.copy(r,0,0,e),r}return void 0!==t.length?\"number\"!=typeof t.length||rt(t.length)?p(0):v(t):\"Buffer\"===t.type&&Array.isArray(t.data)?v(t.data):void 0}(t);if(i)return i;if(\"undefined\"!=typeof Symbol&&null!=Symbol.toPrimitive&&\"function\"==typeof t[Symbol.toPrimitive])return y.from(t[Symbol.toPrimitive](\"string\"),e,r);throw new TypeError(\"The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type \"+u(t))}function g(t){if(\"number\"!=typeof t)throw new TypeError('\"size\" argument must be of type number');if(t<0)throw new RangeError('The value \"'+t+'\" is invalid for option \"size\"')}function b(t){return g(t),p(t<0?0:0|m(t))}function v(t){for(var e=t.length<0?0:0|m(t.length),r=p(e),n=0;n<e;n+=1)r[n]=255&t[n];return r}function w(t,e,r){if(e<0||t.byteLength<e)throw new RangeError('\"offset\" is outside of buffer bounds');if(t.byteLength<e+(r||0))throw new RangeError('\"length\" is outside of buffer bounds');var n;return n=void 0===e&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,e):new Uint8Array(t,e,r),Object.setPrototypeOf(n,y.prototype),n}function m(t){if(t>=l)throw new RangeError(\"Attempt to allocate Buffer larger than maximum size: 0x\"+l.toString(16)+\" bytes\");return 0|t}function A(t,e){if(y.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||et(t,ArrayBuffer))return t.byteLength;if(\"string\"!=typeof t)throw new TypeError('The \"string\" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+u(t));var r=t.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;for(var i=!1;;)switch(e){case\"ascii\":case\"latin1\":case\"binary\":return r;case\"utf8\":case\"utf-8\":return $(t).length;case\"ucs2\":case\"ucs-2\":case\"utf16le\":case\"utf-16le\":return 2*r;case\"hex\":return r>>>1;case\"base64\":return Z(t).length;default:if(i)return n?-1:$(t).length;e=(\"\"+e).toLowerCase(),i=!0}}function E(t,e,r){var n=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return\"\";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return\"\";if((r>>>=0)<=(e>>>=0))return\"\";for(t||(t=\"utf8\");;)switch(t){case\"hex\":return C(this,e,r);case\"utf8\":case\"utf-8\":return j(this,e,r);case\"ascii\":return T(this,e,r);case\"latin1\":case\"binary\":return R(this,e,r);case\"base64\":return _(this,e,r);case\"ucs2\":case\"ucs-2\":case\"utf16le\":case\"utf-16le\":return M(this,e,r);default:if(n)throw new TypeError(\"Unknown encoding: \"+t);t=(t+\"\").toLowerCase(),n=!0}}function x(t,e,r){var n=t[e];t[e]=t[r],t[r]=n}function k(t,e,r,n,i){if(0===t.length)return-1;if(\"string\"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),rt(r=+r)&&(r=i?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(i)return-1;r=t.length-1}else if(r<0){if(!i)return-1;r=0}if(\"string\"==typeof e&&(e=y.from(e,n)),y.isBuffer(e))return 0===e.length?-1:O(t,e,r,n,i);if(\"number\"==typeof e)return e&=255,\"function\"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):O(t,[e],r,n,i);throw new TypeError(\"val must be string, number or Buffer\")}function O(t,e,r,n,i){var o,a=1,s=t.length,u=e.length;if(void 0!==n&&(\"ucs2\"===(n=String(n).toLowerCase())||\"ucs-2\"===n||\"utf16le\"===n||\"utf-16le\"===n)){if(t.length<2||e.length<2)return-1;a=2,s/=2,u/=2,r/=2}function h(t,e){return 1===a?t[e]:t.readUInt16BE(e*a)}if(i){var f=-1;for(o=r;o<s;o++)if(h(t,o)===h(e,-1===f?0:o-f)){if(-1===f&&(f=o),o-f+1===u)return f*a}else-1!==f&&(o-=o-f),f=-1}else for(r+u>s&&(r=s-u),o=r;o>=0;o--){for(var c=!0,l=0;l<u;l++)if(h(t,o+l)!==h(e,l)){c=!1;break}if(c)return o}return-1}function I(t,e,r,n){r=Number(r)||0;var i=t.length-r;n?(n=Number(n))>i&&(n=i):n=i;var o,a=e.length;for(n>a/2&&(n=a/2),o=0;o<n;++o){var s=parseInt(e.substr(2*o,2),16);if(rt(s))return o;t[r+o]=s}return o}function U(t,e,r,n){return tt($(e,t.length-r),t,r,n)}function S(t,e,r,n){return tt(function(t){for(var e=[],r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(e),t,r,n)}function L(t,e,r,n){return tt(Z(e),t,r,n)}function B(t,e,r,n){return tt(function(t,e){for(var r,n,i,o=[],a=0;a<t.length&&!((e-=2)<0);++a)n=(r=t.charCodeAt(a))>>8,i=r%256,o.push(i),o.push(n);return o}(e,t.length-r),t,r,n)}function _(t,e,r){return 0===e&&r===t.length?h.fromByteArray(t):h.fromByteArray(t.slice(e,r))}function j(t,e,r){r=Math.min(t.length,r);for(var n=[],i=e;i<r;){var o=t[i],a=null,s=o>239?4:o>223?3:o>191?2:1;if(i+s<=r){var u=void 0,h=void 0,f=void 0,c=void 0;switch(s){case 1:o<128&&(a=o);break;case 2:128==(192&(u=t[i+1]))&&(c=(31&o)<<6|63&u)>127&&(a=c);break;case 3:u=t[i+1],h=t[i+2],128==(192&u)&&128==(192&h)&&(c=(15&o)<<12|(63&u)<<6|63&h)>2047&&(c<55296||c>57343)&&(a=c);break;case 4:u=t[i+1],h=t[i+2],f=t[i+3],128==(192&u)&&128==(192&h)&&128==(192&f)&&(c=(15&o)<<18|(63&u)<<12|(63&h)<<6|63&f)>65535&&c<1114112&&(a=c)}}null===a?(a=65533,s=1):a>65535&&(a-=65536,n.push(a>>>10&1023|55296),a=56320|1023&a),n.push(a),i+=s}return function(t){var e=t.length;if(e<=P)return String.fromCharCode.apply(String,t);for(var r=\"\",n=0;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=P));return r}(n)}y.TYPED_ARRAY_SUPPORT=function(){try{var t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),42===t.foo()}catch(t){return!1}}(),y.TYPED_ARRAY_SUPPORT||\"undefined\"==typeof console||\"function\"!=typeof console.error||console.error(\"This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.\"),Object.defineProperty(y.prototype,\"parent\",{enumerable:!0,get:function(){if(y.isBuffer(this))return this.buffer}}),Object.defineProperty(y.prototype,\"offset\",{enumerable:!0,get:function(){if(y.isBuffer(this))return this.byteOffset}}),y.poolSize=8192,y.from=function(t,e,r){return d(t,e,r)},Object.setPrototypeOf(y.prototype,Uint8Array.prototype),Object.setPrototypeOf(y,Uint8Array),y.alloc=function(t,e,r){return function(t,e,r){return g(t),t<=0?p(t):void 0!==e?\"string\"==typeof r?p(t).fill(e,r):p(t).fill(e):p(t)}(t,e,r)},y.allocUnsafe=function(t){return b(t)},y.allocUnsafeSlow=function(t){return b(t)},y.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==y.prototype},y.compare=function(t,e){if(et(t,Uint8Array)&&(t=y.from(t,t.offset,t.byteLength)),et(e,Uint8Array)&&(e=y.from(e,e.offset,e.byteLength)),!y.isBuffer(t)||!y.isBuffer(e))throw new TypeError('The \"buf1\", \"buf2\" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;for(var r=t.length,n=e.length,i=0,o=Math.min(r,n);i<o;++i)if(t[i]!==e[i]){r=t[i],n=e[i];break}return r<n?-1:n<r?1:0},y.isEncoding=function(t){switch(String(t).toLowerCase()){case\"hex\":case\"utf8\":case\"utf-8\":case\"ascii\":case\"latin1\":case\"binary\":case\"base64\":case\"ucs2\":case\"ucs-2\":case\"utf16le\":case\"utf-16le\":return!0;default:return!1}},y.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('\"list\" argument must be an Array of Buffers');if(0===t.length)return y.alloc(0);var r;if(void 0===e)for(e=0,r=0;r<t.length;++r)e+=t[r].length;var n=y.allocUnsafe(e),i=0;for(r=0;r<t.length;++r){var o=t[r];if(et(o,Uint8Array))i+o.length>n.length?(y.isBuffer(o)||(o=y.from(o)),o.copy(n,i)):Uint8Array.prototype.set.call(n,o,i);else{if(!y.isBuffer(o))throw new TypeError('\"list\" argument must be an Array of Buffers');o.copy(n,i)}i+=o.length}return n},y.byteLength=A,y.prototype._isBuffer=!0,y.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError(\"Buffer size must be a multiple of 16-bits\");for(var e=0;e<t;e+=2)x(this,e,e+1);return this},y.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError(\"Buffer size must be a multiple of 32-bits\");for(var e=0;e<t;e+=4)x(this,e,e+3),x(this,e+1,e+2);return this},y.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError(\"Buffer size must be a multiple of 64-bits\");for(var e=0;e<t;e+=8)x(this,e,e+7),x(this,e+1,e+6),x(this,e+2,e+5),x(this,e+3,e+4);return this},y.prototype.toString=function(){var t=this.length;return 0===t?\"\":0===arguments.length?j(this,0,t):E.apply(this,arguments)},y.prototype.toLocaleString=y.prototype.toString,y.prototype.equals=function(t){if(!y.isBuffer(t))throw new TypeError(\"Argument must be a Buffer\");return this===t||0===y.compare(this,t)},y.prototype.inspect=function(){var t=\"\",r=e.IS;return t=this.toString(\"hex\",0,r).replace(/(.{2})/g,\"$1 \").trim(),this.length>r&&(t+=\" ... \"),\"<Buffer \"+t+\">\"},c&&(y.prototype[c]=y.prototype.inspect),y.prototype.compare=function(t,e,r,n,i){if(et(t,Uint8Array)&&(t=y.from(t,t.offset,t.byteLength)),!y.isBuffer(t))throw new TypeError('The \"target\" argument must be one of type Buffer or Uint8Array. Received type '+u(t));if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),e<0||r>t.length||n<0||i>this.length)throw new RangeError(\"out of range index\");if(n>=i&&e>=r)return 0;if(n>=i)return-1;if(e>=r)return 1;if(this===t)return 0;for(var o=(i>>>=0)-(n>>>=0),a=(r>>>=0)-(e>>>=0),s=Math.min(o,a),h=this.slice(n,i),f=t.slice(e,r),c=0;c<s;++c)if(h[c]!==f[c]){o=h[c],a=f[c];break}return o<a?-1:a<o?1:0},y.prototype.includes=function(t,e,r){return-1!==this.indexOf(t,e,r)},y.prototype.indexOf=function(t,e,r){return k(this,t,e,r,!0)},y.prototype.lastIndexOf=function(t,e,r){return k(this,t,e,r,!1)},y.prototype.write=function(t,e,r,n){if(void 0===e)n=\"utf8\",r=this.length,e=0;else if(void 0===r&&\"string\"==typeof e)n=e,r=this.length,e=0;else{if(!isFinite(e))throw new Error(\"Buffer.write(string, encoding, offset[, length]) is no longer supported\");e>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n=\"utf8\")):(n=r,r=void 0)}var i=this.length-e;if((void 0===r||r>i)&&(r=i),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError(\"Attempt to write outside buffer bounds\");n||(n=\"utf8\");for(var o=!1;;)switch(n){case\"hex\":return I(this,t,e,r);case\"utf8\":case\"utf-8\":return U(this,t,e,r);case\"ascii\":case\"latin1\":case\"binary\":return S(this,t,e,r);case\"base64\":return L(this,t,e,r);case\"ucs2\":case\"ucs-2\":case\"utf16le\":case\"utf-16le\":return B(this,t,e,r);default:if(o)throw new TypeError(\"Unknown encoding: \"+n);n=(\"\"+n).toLowerCase(),o=!0}},y.prototype.toJSON=function(){return{type:\"Buffer\",data:Array.prototype.slice.call(this._arr||this,0)}};var P=4096;function T(t,e,r){var n=\"\";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(127&t[i]);return n}function R(t,e,r){var n=\"\";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(t[i]);return n}function C(t,e,r){var n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);for(var i=\"\",o=e;o<r;++o)i+=nt[t[o]];return i}function M(t,e,r){for(var n=t.slice(e,r),i=\"\",o=0;o<n.length-1;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function N(t,e,r){if(t%1!=0||t<0)throw new RangeError(\"offset is not uint\");if(t+e>r)throw new RangeError(\"Trying to access beyond buffer length\")}function F(t,e,r,n,i,o){if(!y.isBuffer(t))throw new TypeError('\"buffer\" argument must be a Buffer instance');if(e>i||e<o)throw new RangeError('\"value\" argument is out of bounds');if(r+n>t.length)throw new RangeError(\"Index out of range\")}function G(t,e,r,n,i){Q(e,n,i,t,r,7);var o=Number(e&BigInt(4294967295));t[r++]=o,o>>=8,t[r++]=o,o>>=8,t[r++]=o,o>>=8,t[r++]=o;var a=Number(e>>BigInt(32)&BigInt(4294967295));return t[r++]=a,a>>=8,t[r++]=a,a>>=8,t[r++]=a,a>>=8,t[r++]=a,r}function z(t,e,r,n,i){Q(e,n,i,t,r,7);var o=Number(e&BigInt(4294967295));t[r+7]=o,o>>=8,t[r+6]=o,o>>=8,t[r+5]=o,o>>=8,t[r+4]=o;var a=Number(e>>BigInt(32)&BigInt(4294967295));return t[r+3]=a,a>>=8,t[r+2]=a,a>>=8,t[r+1]=a,a>>=8,t[r]=a,r+8}function D(t,e,r,n,i,o){if(r+n>t.length)throw new RangeError(\"Index out of range\");if(r<0)throw new RangeError(\"Index out of range\")}function W(t,e,r,n,i){return e=+e,r>>>=0,i||D(t,0,r,4),f.write(t,e,r,n,23,4),r+4}function Y(t,e,r,n,i){return e=+e,r>>>=0,i||D(t,0,r,8),f.write(t,e,r,n,52,8),r+8}y.prototype.slice=function(t,e){var r=this.length;(t=~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),(e=void 0===e?r:~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),e<t&&(e=t);var n=this.subarray(t,e);return Object.setPrototypeOf(n,y.prototype),n},y.prototype.readUintLE=y.prototype.readUIntLE=function(t,e,r){t>>>=0,e>>>=0,r||N(t,e,this.length);for(var n=this[t],i=1,o=0;++o<e&&(i*=256);)n+=this[t+o]*i;return n},y.prototype.readUintBE=y.prototype.readUIntBE=function(t,e,r){t>>>=0,e>>>=0,r||N(t,e,this.length);for(var n=this[t+--e],i=1;e>0&&(i*=256);)n+=this[t+--e]*i;return n},y.prototype.readUint8=y.prototype.readUInt8=function(t,e){return t>>>=0,e||N(t,1,this.length),this[t]},y.prototype.readUint16LE=y.prototype.readUInt16LE=function(t,e){return t>>>=0,e||N(t,2,this.length),this[t]|this[t+1]<<8},y.prototype.readUint16BE=y.prototype.readUInt16BE=function(t,e){return t>>>=0,e||N(t,2,this.length),this[t]<<8|this[t+1]},y.prototype.readUint32LE=y.prototype.readUInt32LE=function(t,e){return t>>>=0,e||N(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},y.prototype.readUint32BE=y.prototype.readUInt32BE=function(t,e){return t>>>=0,e||N(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},y.prototype.readBigUInt64LE=it((function(t){X(t>>>=0,\"offset\");var e=this[t],r=this[t+7];void 0!==e&&void 0!==r||H(t,this.length-8);var n=e+this[++t]*Math.pow(2,8)+this[++t]*Math.pow(2,16)+this[++t]*Math.pow(2,24),i=this[++t]+this[++t]*Math.pow(2,8)+this[++t]*Math.pow(2,16)+r*Math.pow(2,24);return BigInt(n)+(BigInt(i)<<BigInt(32))})),y.prototype.readBigUInt64BE=it((function(t){X(t>>>=0,\"offset\");var e=this[t],r=this[t+7];void 0!==e&&void 0!==r||H(t,this.length-8);var n=e*Math.pow(2,24)+this[++t]*Math.pow(2,16)+this[++t]*Math.pow(2,8)+this[++t],i=this[++t]*Math.pow(2,24)+this[++t]*Math.pow(2,16)+this[++t]*Math.pow(2,8)+r;return(BigInt(n)<<BigInt(32))+BigInt(i)})),y.prototype.readIntLE=function(t,e,r){t>>>=0,e>>>=0,r||N(t,e,this.length);for(var n=this[t],i=1,o=0;++o<e&&(i*=256);)n+=this[t+o]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*e)),n},y.prototype.readIntBE=function(t,e,r){t>>>=0,e>>>=0,r||N(t,e,this.length);for(var n=e,i=1,o=this[t+--n];n>0&&(i*=256);)o+=this[t+--n]*i;return o>=(i*=128)&&(o-=Math.pow(2,8*e)),o},y.prototype.readInt8=function(t,e){return t>>>=0,e||N(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},y.prototype.readInt16LE=function(t,e){t>>>=0,e||N(t,2,this.length);var r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},y.prototype.readInt16BE=function(t,e){t>>>=0,e||N(t,2,this.length);var r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},y.prototype.readInt32LE=function(t,e){return t>>>=0,e||N(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},y.prototype.readInt32BE=function(t,e){return t>>>=0,e||N(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},y.prototype.readBigInt64LE=it((function(t){X(t>>>=0,\"offset\");var e=this[t],r=this[t+7];void 0!==e&&void 0!==r||H(t,this.length-8);var n=this[t+4]+this[t+5]*Math.pow(2,8)+this[t+6]*Math.pow(2,16)+(r<<24);return(BigInt(n)<<BigInt(32))+BigInt(e+this[++t]*Math.pow(2,8)+this[++t]*Math.pow(2,16)+this[++t]*Math.pow(2,24))})),y.prototype.readBigInt64BE=it((function(t){X(t>>>=0,\"offset\");var e=this[t],r=this[t+7];void 0!==e&&void 0!==r||H(t,this.length-8);var n=(e<<24)+this[++t]*Math.pow(2,16)+this[++t]*Math.pow(2,8)+this[++t];return(BigInt(n)<<BigInt(32))+BigInt(this[++t]*Math.pow(2,24)+this[++t]*Math.pow(2,16)+this[++t]*Math.pow(2,8)+r)})),y.prototype.readFloatLE=function(t,e){return t>>>=0,e||N(t,4,this.length),f.read(this,t,!0,23,4)},y.prototype.readFloatBE=function(t,e){return t>>>=0,e||N(t,4,this.length),f.read(this,t,!1,23,4)},y.prototype.readDoubleLE=function(t,e){return t>>>=0,e||N(t,8,this.length),f.read(this,t,!0,52,8)},y.prototype.readDoubleBE=function(t,e){return t>>>=0,e||N(t,8,this.length),f.read(this,t,!1,52,8)},y.prototype.writeUintLE=y.prototype.writeUIntLE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||F(this,t,e,r,Math.pow(2,8*r)-1,0);var i=1,o=0;for(this[e]=255&t;++o<r&&(i*=256);)this[e+o]=t/i&255;return e+r},y.prototype.writeUintBE=y.prototype.writeUIntBE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||F(this,t,e,r,Math.pow(2,8*r)-1,0);var i=r-1,o=1;for(this[e+i]=255&t;--i>=0&&(o*=256);)this[e+i]=t/o&255;return e+r},y.prototype.writeUint8=y.prototype.writeUInt8=function(t,e,r){return t=+t,e>>>=0,r||F(this,t,e,1,255,0),this[e]=255&t,e+1},y.prototype.writeUint16LE=y.prototype.writeUInt16LE=function(t,e,r){return t=+t,e>>>=0,r||F(this,t,e,2,65535,0),this[e]=255&t,this[e+1]=t>>>8,e+2},y.prototype.writeUint16BE=y.prototype.writeUInt16BE=function(t,e,r){return t=+t,e>>>=0,r||F(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=255&t,e+2},y.prototype.writeUint32LE=y.prototype.writeUInt32LE=function(t,e,r){return t=+t,e>>>=0,r||F(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t,e+4},y.prototype.writeUint32BE=y.prototype.writeUInt32BE=function(t,e,r){return t=+t,e>>>=0,r||F(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},y.prototype.writeBigUInt64LE=it((function(t){return G(this,t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,BigInt(0),BigInt(\"0xffffffffffffffff\"))})),y.prototype.writeBigUInt64BE=it((function(t){return z(this,t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,BigInt(0),BigInt(\"0xffffffffffffffff\"))})),y.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e>>>=0,!n){var i=Math.pow(2,8*r-1);F(this,t,e,r,i-1,-i)}var o=0,a=1,s=0;for(this[e]=255&t;++o<r&&(a*=256);)t<0&&0===s&&0!==this[e+o-1]&&(s=1),this[e+o]=(t/a|0)-s&255;return e+r},y.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e>>>=0,!n){var i=Math.pow(2,8*r-1);F(this,t,e,r,i-1,-i)}var o=r-1,a=1,s=0;for(this[e+o]=255&t;--o>=0&&(a*=256);)t<0&&0===s&&0!==this[e+o+1]&&(s=1),this[e+o]=(t/a|0)-s&255;return e+r},y.prototype.writeInt8=function(t,e,r){return t=+t,e>>>=0,r||F(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=255&t,e+1},y.prototype.writeInt16LE=function(t,e,r){return t=+t,e>>>=0,r||F(this,t,e,2,32767,-32768),this[e]=255&t,this[e+1]=t>>>8,e+2},y.prototype.writeInt16BE=function(t,e,r){return t=+t,e>>>=0,r||F(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=255&t,e+2},y.prototype.writeInt32LE=function(t,e,r){return t=+t,e>>>=0,r||F(this,t,e,4,2147483647,-2147483648),this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4},y.prototype.writeInt32BE=function(t,e,r){return t=+t,e>>>=0,r||F(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},y.prototype.writeBigInt64LE=it((function(t){return G(this,t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,-BigInt(\"0x8000000000000000\"),BigInt(\"0x7fffffffffffffff\"))})),y.prototype.writeBigInt64BE=it((function(t){return z(this,t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,-BigInt(\"0x8000000000000000\"),BigInt(\"0x7fffffffffffffff\"))})),y.prototype.writeFloatLE=function(t,e,r){return W(this,t,e,!0,r)},y.prototype.writeFloatBE=function(t,e,r){return W(this,t,e,!1,r)},y.prototype.writeDoubleLE=function(t,e,r){return Y(this,t,e,!0,r)},y.prototype.writeDoubleBE=function(t,e,r){return Y(this,t,e,!1,r)},y.prototype.copy=function(t,e,r,n){if(!y.isBuffer(t))throw new TypeError(\"argument should be a Buffer\");if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError(\"targetStart out of bounds\");if(r<0||r>=this.length)throw new RangeError(\"Index out of range\");if(n<0)throw new RangeError(\"sourceEnd out of bounds\");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);var i=n-r;return this===t&&\"function\"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(e,r,n):Uint8Array.prototype.set.call(t,this.subarray(r,n),e),i},y.prototype.fill=function(t,e,r,n){if(\"string\"==typeof t){if(\"string\"==typeof e?(n=e,e=0,r=this.length):\"string\"==typeof r&&(n=r,r=this.length),void 0!==n&&\"string\"!=typeof n)throw new TypeError(\"encoding must be a string\");if(\"string\"==typeof n&&!y.isEncoding(n))throw new TypeError(\"Unknown encoding: \"+n);if(1===t.length){var i=t.charCodeAt(0);(\"utf8\"===n&&i<128||\"latin1\"===n)&&(t=i)}}else\"number\"==typeof t?t&=255:\"boolean\"==typeof t&&(t=Number(t));if(e<0||this.length<e||this.length<r)throw new RangeError(\"Out of range index\");if(r<=e)return this;var o;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),\"number\"==typeof t)for(o=e;o<r;++o)this[o]=t;else{var a=y.isBuffer(t)?t:y.from(t,n),s=a.length;if(0===s)throw new TypeError('The value \"'+t+'\" is invalid for argument \"value\"');for(o=0;o<r-e;++o)this[o+e]=a[o%s]}return this};var V={};function q(t,e,r){V[t]=function(r){function i(){var r;return function(t,e){if(!(t instanceof e))throw new TypeError(\"Cannot call a class as a function\")}(this,i),r=function(t,e,r){return e=a(e),function(t,e){if(e&&(\"object\"==u(e)||\"function\"==typeof e))return e;if(void 0!==e)throw new TypeError(\"Derived constructors may only return object or undefined\");return function(t){if(void 0===t)throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");return t}(t)}(t,o()?Reflect.construct(e,r||[],a(t).constructor):e.apply(t,r))}(this,i),Object.defineProperty(r,\"message\",{value:e.apply(r,arguments),writable:!0,configurable:!0}),r.name=\"\".concat(r.name,\" [\").concat(t,\"]\"),r.stack,delete r.name,r}return function(t,e){if(\"function\"!=typeof e&&null!==e)throw new TypeError(\"Super expression must either be null or a function\");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,\"prototype\",{writable:!1}),e&&s(t,e)}(i,r),h=i,(f=[{key:\"code\",get:function(){return t},set:function(t){Object.defineProperty(this,\"code\",{configurable:!0,enumerable:!0,value:t,writable:!0})}},{key:\"toString\",value:function(){return\"\".concat(this.name,\" [\").concat(t,\"]: \").concat(this.message)}}])&&n(h.prototype,f),Object.defineProperty(h,\"prototype\",{writable:!1}),h;var h,f}(r)}function J(t){for(var e=\"\",r=t.length,n=\"-\"===t[0]?1:0;r>=n+4;r-=3)e=\"_\".concat(t.slice(r-3,r)).concat(e);return\"\".concat(t.slice(0,r)).concat(e)}function Q(t,e,r,n,i,o){if(t>r||t<e){var a,s=\"bigint\"==typeof e?\"n\":\"\";throw a=o>3?0===e||e===BigInt(0)?\">= 0\".concat(s,\" and < 2\").concat(s,\" ** \").concat(8*(o+1)).concat(s):\">= -(2\".concat(s,\" ** \").concat(8*(o+1)-1).concat(s,\") and < 2 ** \")+\"\".concat(8*(o+1)-1).concat(s):\">= \".concat(e).concat(s,\" and <= \").concat(r).concat(s),new V.ERR_OUT_OF_RANGE(\"value\",a,t)}!function(t,e,r){X(e,\"offset\"),void 0!==t[e]&&void 0!==t[e+r]||H(e,t.length-(r+1))}(n,i,o)}function X(t,e){if(\"number\"!=typeof t)throw new V.ERR_INVALID_ARG_TYPE(e,\"number\",t)}function H(t,e,r){if(Math.floor(t)!==t)throw X(t,r),new V.ERR_OUT_OF_RANGE(r||\"offset\",\"an integer\",t);if(e<0)throw new V.ERR_BUFFER_OUT_OF_BOUNDS;throw new V.ERR_OUT_OF_RANGE(r||\"offset\",\">= \".concat(r?1:0,\" and <= \").concat(e),t)}q(\"ERR_BUFFER_OUT_OF_BOUNDS\",(function(t){return t?\"\".concat(t,\" is outside of buffer bounds\"):\"Attempt to access memory outside buffer bounds\"}),RangeError),q(\"ERR_INVALID_ARG_TYPE\",(function(t,e){return'The \"'.concat(t,'\" argument must be of type number. Received type ').concat(u(e))}),TypeError),q(\"ERR_OUT_OF_RANGE\",(function(t,e,r){var n='The value of \"'.concat(t,'\" is out of range.'),i=r;return Number.isInteger(r)&&Math.abs(r)>Math.pow(2,32)?i=J(String(r)):\"bigint\"==typeof r&&(i=String(r),(r>Math.pow(BigInt(2),BigInt(32))||r<-Math.pow(BigInt(2),BigInt(32)))&&(i=J(i)),i+=\"n\"),n+\" It must be \".concat(e,\". Received \").concat(i)}),RangeError);var K=/[^+/0-9A-Za-z-_]/g;function $(t,e){var r;e=e||1/0;for(var n=t.length,i=null,o=[],a=0;a<n;++a){if((r=t.charCodeAt(a))>55295&&r<57344){if(!i){if(r>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(a+1===n){(e-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(e-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((e-=1)<0)break;o.push(r)}else if(r<2048){if((e-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error(\"Invalid code point\");if((e-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function Z(t){return h.toByteArray(function(t){if((t=(t=t.split(\"=\")[0]).trim().replace(K,\"\")).length<2)return\"\";for(;t.length%4!=0;)t+=\"=\";return t}(t))}function tt(t,e,r,n){var i;for(i=0;i<n&&!(i+r>=e.length||i>=t.length);++i)e[i+r]=t[i];return i}function et(t,e){return t instanceof e||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===e.name}function rt(t){return t!=t}var nt=function(){for(var t=\"0123456789abcdef\",e=new Array(256),r=0;r<16;++r)for(var n=16*r,i=0;i<16;++i)e[n+i]=t[r]+t[i];return e}();function it(t){return\"undefined\"==typeof BigInt?ot:t}function ot(){throw new Error(\"BigInt not supported\")}},613:(t,e,r)=>{\"use strict\";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function i(t){return new Promise((function(e,r){t.oncomplete=t.onsuccess=function(){return e(t.result)},t.onabort=t.onerror=function(){return r(t.error)}}))}function o(t,e){var r=indexedDB.open(t);r.onupgradeneeded=function(){return r.result.createObjectStore(e)};var n=i(r);return function(t,r){return n.then((function(n){return r(n.transaction(e,t).objectStore(e))}))}}var a;function s(){return a||(a=o(\"keyval-store\",\"keyval\")),a}function u(t){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:s())(\"readonly\",(function(e){return i(e.get(t))}))}function h(t,e){return(arguments.length>2&&void 0!==arguments[2]?arguments[2]:s())(\"readwrite\",(function(r){return r.put(e,t),i(r.transaction)}))}function f(t){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:s())(\"readwrite\",(function(e){return t.forEach((function(t){return e.put(t[1],t[0])})),i(e.transaction)}))}function c(t){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:s())(\"readonly\",(function(e){return Promise.all(t.map((function(t){return i(e.get(t))})))}))}function l(t,e){return(arguments.length>2&&void 0!==arguments[2]?arguments[2]:s())(\"readwrite\",(function(r){return new Promise((function(n,o){r.get(t).onsuccess=function(){try{r.put(e(this.result),t),n(i(r.transaction))}catch(t){o(t)}}}))}))}function p(t){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:s())(\"readwrite\",(function(e){return e.delete(t),i(e.transaction)}))}function y(t){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:s())(\"readwrite\",(function(e){return t.forEach((function(t){return e.delete(t)})),i(e.transaction)}))}function d(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:s())(\"readwrite\",(function(t){return t.clear(),i(t.transaction)}))}function g(t,e){return t.openCursor().onsuccess=function(){this.result&&(e(this.result),this.result.continue())},i(t.transaction)}function b(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:s())(\"readonly\",(function(t){if(t.getAllKeys)return i(t.getAllKeys());var e=[];return g(t,(function(t){return e.push(t.key)})).then((function(){return e}))}))}function v(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:s())(\"readonly\",(function(t){if(t.getAll)return i(t.getAll());var e=[];return g(t,(function(t){return e.push(t.value)})).then((function(){return e}))}))}function w(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s();return t(\"readonly\",(function(e){if(e.getAll&&e.getAllKeys)return Promise.all([i(e.getAllKeys()),i(e.getAll())]).then((function(t){var e,r,i=(r=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var r=null==t?null:\"undefined\"!=typeof Symbol&&t[Symbol.iterator]||t[\"@@iterator\"];if(null!=r){var n,i,o,a,s=[],u=!0,h=!1;try{if(o=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=o.call(r)).done)&&(s.push(n.value),s.length!==e);u=!0);}catch(t){h=!0,i=t}finally{try{if(!u&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(h)throw i}}return s}}(e,r)||function(t,e){if(t){if(\"string\"==typeof t)return n(t,e);var r={}.toString.call(t).slice(8,-1);return\"Object\"===r&&t.constructor&&(r=t.constructor.name),\"Map\"===r||\"Set\"===r?Array.from(t):\"Arguments\"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(e,r)||function(){throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\")}()),o=i[0],a=i[1];return o.map((function(t,e){return[t,a[e]]}))}));var r=[];return t(\"readonly\",(function(t){return g(t,(function(t){return r.push([t.key,t.value])})).then((function(){return r}))}))}))}r.r(e),r.d(e,{clear:()=>d,createStore:()=>o,del:()=>p,delMany:()=>y,entries:()=>w,get:()=>u,getMany:()=>c,keys:()=>b,promisifyRequest:()=>i,set:()=>h,setMany:()=>f,update:()=>l,values:()=>v})},670:t=>{\"use strict\";t.exports={text:!0,blocks:!1,layoutBlocks:!1,hocr:!1,tsv:!1,box:!1,unlv:!1,osd:!1,pdf:!1,imageColor:!1,imageGrey:!1,imageBinary:!1,debug:!1}},768:(t,e)=>{\"use strict\";e.byteLength=function(t){var e=s(t),r=e[0],n=e[1];return 3*(r+n)/4-n},e.toByteArray=function(t){var e,r,o=s(t),a=o[0],u=o[1],h=new i(function(t,e,r){return 3*(e+r)/4-r}(0,a,u)),f=0,c=u>0?a-4:a;for(r=0;r<c;r+=4)e=n[t.charCodeAt(r)]<<18|n[t.charCodeAt(r+1)]<<12|n[t.charCodeAt(r+2)]<<6|n[t.charCodeAt(r+3)],h[f++]=e>>16&255,h[f++]=e>>8&255,h[f++]=255&e;return 2===u&&(e=n[t.charCodeAt(r)]<<2|n[t.charCodeAt(r+1)]>>4,h[f++]=255&e),1===u&&(e=n[t.charCodeAt(r)]<<10|n[t.charCodeAt(r+1)]<<4|n[t.charCodeAt(r+2)]>>2,h[f++]=e>>8&255,h[f++]=255&e),h},e.fromByteArray=function(t){for(var e,n=t.length,i=n%3,o=[],a=16383,s=0,h=n-i;s<h;s+=a)o.push(u(t,s,s+a>h?h:s+a));return 1===i?(e=t[n-1],o.push(r[e>>2]+r[e<<4&63]+\"==\")):2===i&&(e=(t[n-2]<<8)+t[n-1],o.push(r[e>>10]+r[e>>4&63]+r[e<<2&63]+\"=\")),o.join(\"\")};for(var r=[],n=[],i=\"undefined\"!=typeof Uint8Array?Uint8Array:Array,o=\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\",a=0;a<64;++a)r[a]=o[a],n[o.charCodeAt(a)]=a;function s(t){var e=t.length;if(e%4>0)throw new Error(\"Invalid string. Length must be a multiple of 4\");var r=t.indexOf(\"=\");return-1===r&&(r=e),[r,r===e?0:4-r%4]}function u(t,e,n){for(var i,o,a=[],s=e;s<n;s+=3)i=(t[s]<<16&16711680)+(t[s+1]<<8&65280)+(255&t[s+2]),a.push(r[(o=i)>>18&63]+r[o>>12&63]+r[o>>6&63]+r[63&o]);return a.join(\"\")}n[\"-\".charCodeAt(0)]=62,n[\"_\".charCodeAt(0)]=63},773:(t,e)=>{e.read=function(t,e,r,n,i){var o,a,s=8*i-n-1,u=(1<<s)-1,h=u>>1,f=-7,c=r?i-1:0,l=r?-1:1,p=t[e+c];for(c+=l,o=p&(1<<-f)-1,p>>=-f,f+=s;f>0;o=256*o+t[e+c],c+=l,f-=8);for(a=o&(1<<-f)-1,o>>=-f,f+=n;f>0;a=256*a+t[e+c],c+=l,f-=8);if(0===o)o=1-h;else{if(o===u)return a?NaN:1/0*(p?-1:1);a+=Math.pow(2,n),o-=h}return(p?-1:1)*a*Math.pow(2,o-n)},e.write=function(t,e,r,n,i,o){var a,s,u,h=8*o-i-1,f=(1<<h)-1,c=f>>1,l=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,p=n?0:o-1,y=n?1:-1,d=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(s=isNaN(e)?1:0,a=f):(a=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-a))<1&&(a--,u*=2),(e+=a+c>=1?l/u:l*Math.pow(2,1-c))*u>=2&&(a++,u/=2),a+c>=f?(s=0,a=f):a+c>=1?(s=(e*u-1)*Math.pow(2,i),a+=c):(s=e*Math.pow(2,c-1)*Math.pow(2,i),a=0));i>=8;t[r+p]=255&s,p+=y,s/=256,i-=8);for(a=a<<i|s,h+=i;h>0;t[r+p]=255&a,p+=y,a/=256,h-=8);t[r+p-y]|=128*d}},797:(t,e,r)=>{\"use strict\";var n=r(613),i=n.set,o=n.get,a=n.del;t.exports={readCache:o,writeCache:i,deleteCache:a,checkCache:function(t){return o(t).then((function(t){return void 0!==t}))}}},834:(t,e,r)=>{var n=r(545).hp;function i(t,e){if(this.pos=0,this.buffer=t,this.is_with_alpha=!!e,this.bottom_up=!0,this.flag=this.buffer.toString(\"utf-8\",0,this.pos+=2),\"BM\"!=this.flag)throw new Error(\"Invalid BMP File\");this.parseHeader(),this.parseRGBA()}i.prototype.parseHeader=function(){if(this.fileSize=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.reserved=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.offset=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.headerSize=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.width=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.height=this.buffer.readInt32LE(this.pos),this.pos+=4,this.planes=this.buffer.readUInt16LE(this.pos),this.pos+=2,this.bitPP=this.buffer.readUInt16LE(this.pos),this.pos+=2,this.compress=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.rawSize=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.hr=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.vr=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.colors=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.importantColors=this.buffer.readUInt32LE(this.pos),this.pos+=4,16===this.bitPP&&this.is_with_alpha&&(this.bitPP=15),this.bitPP<15){var t=0===this.colors?1<<this.bitPP:this.colors;this.palette=new Array(t);for(var e=0;e<t;e++){var r=this.buffer.readUInt8(this.pos++),n=this.buffer.readUInt8(this.pos++),i=this.buffer.readUInt8(this.pos++),o=this.buffer.readUInt8(this.pos++);this.palette[e]={red:i,green:n,blue:r,quad:o}}}this.height<0&&(this.height*=-1,this.bottom_up=!1)},i.prototype.parseRGBA=function(){var t=\"bit\"+this.bitPP,e=this.width*this.height*4;this.data=new n(e),this[t]()},i.prototype.bit1=function(){var t=Math.ceil(this.width/8),e=t%4,r=this.height>=0?this.height-1:-this.height;for(r=this.height-1;r>=0;r--){for(var n=this.bottom_up?r:this.height-1-r,i=0;i<t;i++)for(var o=this.buffer.readUInt8(this.pos++),a=n*this.width*4+8*i*4,s=0;s<8&&8*i+s<this.width;s++){var u=this.palette[o>>7-s&1];this.data[a+4*s]=0,this.data[a+4*s+1]=u.blue,this.data[a+4*s+2]=u.green,this.data[a+4*s+3]=u.red}0!=e&&(this.pos+=4-e)}},i.prototype.bit4=function(){if(2==this.compress){var t=function(t){var r=this.palette[t];this.data[e]=0,this.data[e+1]=r.blue,this.data[e+2]=r.green,this.data[e+3]=r.red,e+=4};this.data.fill(255);for(var e=0,r=this.bottom_up?this.height-1:0,n=!1;e<this.data.length;){var i=this.buffer.readUInt8(this.pos++),o=this.buffer.readUInt8(this.pos++);if(0==i){if(0==o){this.bottom_up?r--:r++,e=r*this.width*4,n=!1;continue}if(1==o)break;if(2==o){var a=this.buffer.readUInt8(this.pos++),s=this.buffer.readUInt8(this.pos++);this.bottom_up?r-=s:r+=s,e+=s*this.width*4+4*a}else{for(var u=this.buffer.readUInt8(this.pos++),h=0;h<o;h++)t.call(this,n?15&u:(240&u)>>4),1&h&&h+1<o&&(u=this.buffer.readUInt8(this.pos++)),n=!n;1==(o+1>>1&1)&&this.pos++}}else for(h=0;h<i;h++)t.call(this,n?15&o:(240&o)>>4),n=!n}}else{var f=Math.ceil(this.width/2),c=f%4;for(s=this.height-1;s>=0;s--){var l=this.bottom_up?s:this.height-1-s;for(a=0;a<f;a++){o=this.buffer.readUInt8(this.pos++),e=l*this.width*4+2*a*4;var p=o>>4,y=15&o,d=this.palette[p];if(this.data[e]=0,this.data[e+1]=d.blue,this.data[e+2]=d.green,this.data[e+3]=d.red,2*a+1>=this.width)break;d=this.palette[y],this.data[e+4]=0,this.data[e+4+1]=d.blue,this.data[e+4+2]=d.green,this.data[e+4+3]=d.red}0!=c&&(this.pos+=4-c)}}},i.prototype.bit8=function(){if(1==this.compress){var t=function(t){var r=this.palette[t];this.data[e]=0,this.data[e+1]=r.blue,this.data[e+2]=r.green,this.data[e+3]=r.red,e+=4};this.data.fill(255);for(var e=0,r=this.bottom_up?this.height-1:0;e<this.data.length;){var n=this.buffer.readUInt8(this.pos++),i=this.buffer.readUInt8(this.pos++);if(0==n){if(0==i){this.bottom_up?r--:r++,e=r*this.width*4;continue}if(1==i)break;if(2==i){var o=this.buffer.readUInt8(this.pos++),a=this.buffer.readUInt8(this.pos++);this.bottom_up?r-=a:r+=a,e+=a*this.width*4+4*o}else{for(var s=0;s<i;s++){var u=this.buffer.readUInt8(this.pos++);t.call(this,u)}!0&i&&this.pos++}}else for(s=0;s<n;s++)t.call(this,i)}}else{var h=this.width%4;for(a=this.height-1;a>=0;a--){var f=this.bottom_up?a:this.height-1-a;for(o=0;o<this.width;o++)if(i=this.buffer.readUInt8(this.pos++),e=f*this.width*4+4*o,i<this.palette.length){var c=this.palette[i];this.data[e]=0,this.data[e+1]=c.blue,this.data[e+2]=c.green,this.data[e+3]=c.red}else this.data[e]=0,this.data[e+1]=255,this.data[e+2]=255,this.data[e+3]=255;0!=h&&(this.pos+=4-h)}}},i.prototype.bit15=function(){for(var t=this.width%3,e=parseInt(\"11111\",2),r=this.height-1;r>=0;r--){for(var n=this.bottom_up?r:this.height-1-r,i=0;i<this.width;i++){var o=this.buffer.readUInt16LE(this.pos);this.pos+=2;var a=(o&e)/e*255|0,s=(o>>5&e)/e*255|0,u=(o>>10&e)/e*255|0,h=o>>15?255:0,f=n*this.width*4+4*i;this.data[f]=h,this.data[f+1]=a,this.data[f+2]=s,this.data[f+3]=u}this.pos+=t}},i.prototype.bit16=function(){var t=this.width%2*2;this.maskRed=31744,this.maskGreen=992,this.maskBlue=31,this.mask0=0,3==this.compress&&(this.maskRed=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.maskGreen=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.maskBlue=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.mask0=this.buffer.readUInt32LE(this.pos),this.pos+=4);for(var e=[0,0,0],r=0;r<16;r++)this.maskRed>>r&1&&e[0]++,this.maskGreen>>r&1&&e[1]++,this.maskBlue>>r&1&&e[2]++;e[1]+=e[0],e[2]+=e[1],e[0]=8-e[0],e[1]-=8,e[2]-=8;for(var n=this.height-1;n>=0;n--){for(var i=this.bottom_up?n:this.height-1-n,o=0;o<this.width;o++){var a=this.buffer.readUInt16LE(this.pos);this.pos+=2;var s=(a&this.maskBlue)<<e[0],u=(a&this.maskGreen)>>e[1],h=(a&this.maskRed)>>e[2],f=i*this.width*4+4*o;this.data[f]=0,this.data[f+1]=s,this.data[f+2]=u,this.data[f+3]=h}this.pos+=t}},i.prototype.bit24=function(){for(var t=this.height-1;t>=0;t--){for(var e=this.bottom_up?t:this.height-1-t,r=0;r<this.width;r++){var n=this.buffer.readUInt8(this.pos++),i=this.buffer.readUInt8(this.pos++),o=this.buffer.readUInt8(this.pos++),a=e*this.width*4+4*r;this.data[a]=0,this.data[a+1]=n,this.data[a+2]=i,this.data[a+3]=o}this.pos+=this.width%4}},i.prototype.bit32=function(){if(3==this.compress){this.maskRed=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.maskGreen=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.maskBlue=this.buffer.readUInt32LE(this.pos),this.pos+=4,this.mask0=this.buffer.readUInt32LE(this.pos),this.pos+=4;for(var t=this.height-1;t>=0;t--)for(var e=this.bottom_up?t:this.height-1-t,r=0;r<this.width;r++){var n=this.buffer.readUInt8(this.pos++),i=this.buffer.readUInt8(this.pos++),o=this.buffer.readUInt8(this.pos++),a=this.buffer.readUInt8(this.pos++),s=e*this.width*4+4*r;this.data[s]=n,this.data[s+1]=i,this.data[s+2]=o,this.data[s+3]=a}}else for(t=this.height-1;t>=0;t--)for(e=this.bottom_up?t:this.height-1-t,r=0;r<this.width;r++)i=this.buffer.readUInt8(this.pos++),o=this.buffer.readUInt8(this.pos++),a=this.buffer.readUInt8(this.pos++),n=this.buffer.readUInt8(this.pos++),s=e*this.width*4+4*r,this.data[s]=n,this.data[s+1]=i,this.data[s+2]=o,this.data[s+3]=a},i.prototype.getData=function(){return this.data},t.exports=function(t){return new i(t)}},938:t=>{\"use strict\";function e(t){return e=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&\"function\"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?\"symbol\":typeof t},e(t)}t.exports=function(t){var r={};return\"undefined\"!=typeof WorkerGlobalScope?r.type=\"webworker\":\"object\"===(\"undefined\"==typeof document?\"undefined\":e(document))?r.type=\"browser\":\"object\"===(\"undefined\"==typeof process?\"undefined\":e(process))&&(r.type=\"node\"),void 0===t?r:r[t]}},968:function(t,e,r){\"use strict\";var n=this;function i(t){return i=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&\"function\"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?\"symbol\":typeof t},i(t)}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){s(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function s(t,e,r){return(e=function(t){var e=function(t){if(\"object\"!=i(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,\"string\");if(\"object\"!=i(r))return r;throw new TypeError(\"@@toPrimitive must return a primitive value.\")}return String(t)}(t);return\"symbol\"==i(e)?e:e+\"\"}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function h(){h=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},a=\"function\"==typeof Symbol?Symbol:{},s=a.iterator||\"@@iterator\",u=a.asyncIterator||\"@@asyncIterator\",f=a.toStringTag||\"@@toStringTag\";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},\"\")}catch(t){c=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var i=e&&e.prototype instanceof w?e:w,a=Object.create(i.prototype),s=new j(n||[]);return o(a,\"_invoke\",{value:S(t,r,s)}),a}function p(t,e,r){try{return{type:\"normal\",arg:t.call(e,r)}}catch(t){return{type:\"throw\",arg:t}}}e.wrap=l;var y=\"suspendedStart\",d=\"suspendedYield\",g=\"executing\",b=\"completed\",v={};function w(){}function m(){}function A(){}var E={};c(E,s,(function(){return this}));var x=Object.getPrototypeOf,k=x&&x(x(P([])));k&&k!==r&&n.call(k,s)&&(E=k);var O=A.prototype=w.prototype=Object.create(E);function I(t){[\"next\",\"throw\",\"return\"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function U(t,e){function r(o,a,s,u){var h=p(t[o],t,a);if(\"throw\"!==h.type){var f=h.arg,c=f.value;return c&&\"object\"==i(c)&&n.call(c,\"__await\")?e.resolve(c.__await).then((function(t){r(\"next\",t,s,u)}),(function(t){r(\"throw\",t,s,u)})):e.resolve(c).then((function(t){f.value=t,s(f)}),(function(t){return r(\"throw\",t,s,u)}))}u(h.arg)}var a;o(this,\"_invoke\",{value:function(t,n){function i(){return new e((function(e,i){r(t,n,e,i)}))}return a=a?a.then(i,i):i()}})}function S(e,r,n){var i=y;return function(o,a){if(i===g)throw Error(\"Generator is already running\");if(i===b){if(\"throw\"===o)throw a;return{value:t,done:!0}}for(n.method=o,n.arg=a;;){var s=n.delegate;if(s){var u=L(s,n);if(u){if(u===v)continue;return u}}if(\"next\"===n.method)n.sent=n._sent=n.arg;else if(\"throw\"===n.method){if(i===y)throw i=b,n.arg;n.dispatchException(n.arg)}else\"return\"===n.method&&n.abrupt(\"return\",n.arg);i=g;var h=p(e,r,n);if(\"normal\"===h.type){if(i=n.done?b:d,h.arg===v)continue;return{value:h.arg,done:n.done}}\"throw\"===h.type&&(i=b,n.method=\"throw\",n.arg=h.arg)}}}function L(e,r){var n=r.method,i=e.iterator[n];if(i===t)return r.delegate=null,\"throw\"===n&&e.iterator.return&&(r.method=\"return\",r.arg=t,L(e,r),\"throw\"===r.method)||\"return\"!==n&&(r.method=\"throw\",r.arg=new TypeError(\"The iterator does not provide a '\"+n+\"' method\")),v;var o=p(i,e.iterator,r.arg);if(\"throw\"===o.type)return r.method=\"throw\",r.arg=o.arg,r.delegate=null,v;var a=o.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,\"return\"!==r.method&&(r.method=\"next\",r.arg=t),r.delegate=null,v):a:(r.method=\"throw\",r.arg=new TypeError(\"iterator result is not an object\"),r.delegate=null,v)}function B(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type=\"normal\",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:\"root\"}],t.forEach(B,this),this.reset(!0)}function P(e){if(e||\"\"===e){var r=e[s];if(r)return r.call(e);if(\"function\"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}throw new TypeError(i(e)+\" is not iterable\")}return m.prototype=A,o(O,\"constructor\",{value:A,configurable:!0}),o(A,\"constructor\",{value:m,configurable:!0}),m.displayName=c(A,f,\"GeneratorFunction\"),e.isGeneratorFunction=function(t){var e=\"function\"==typeof t&&t.constructor;return!!e&&(e===m||\"GeneratorFunction\"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,A):(t.__proto__=A,c(t,f,\"GeneratorFunction\")),t.prototype=Object.create(O),t},e.awrap=function(t){return{__await:t}},I(U.prototype),c(U.prototype,u,(function(){return this})),e.AsyncIterator=U,e.async=function(t,r,n,i,o){void 0===o&&(o=Promise);var a=new U(l(t,r,n,i),o);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},I(O),c(O,f,\"Generator\"),c(O,s,(function(){return this})),c(O,\"toString\",(function(){return\"[object Generator]\"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=P,j.prototype={constructor:j,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method=\"next\",this.arg=t,this.tryEntries.forEach(_),!e)for(var r in this)\"t\"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if(\"throw\"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function i(n,i){return s.type=\"throw\",s.arg=e,r.next=n,i&&(r.method=\"next\",r.arg=t),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if(\"root\"===a.tryLoc)return i(\"end\");if(a.tryLoc<=this.prev){var u=n.call(a,\"catchLoc\"),h=n.call(a,\"finallyLoc\");if(u&&h){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!h)throw Error(\"try statement without catch or finally\");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,\"finallyLoc\")&&this.prev<i.finallyLoc){var o=i;break}}o&&(\"break\"===t||\"continue\"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method=\"next\",this.next=o.finallyLoc,v):this.complete(a)},complete:function(t,e){if(\"throw\"===t.type)throw t.arg;return\"break\"===t.type||\"continue\"===t.type?this.next=t.arg:\"return\"===t.type?(this.rval=this.arg=t.arg,this.method=\"return\",this.next=\"end\"):\"normal\"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if(\"throw\"===n.type){var i=n.arg;_(r)}return i}}throw Error(\"illegal catch attempt\")},delegateYield:function(e,r,n){return this.delegate={iterator:P(e),resultName:r,nextLoc:n},\"next\"===this.method&&(this.arg=t),v}},e}function f(t,e,r,n,i,o,a){try{var s=t[o](a),u=s.value}catch(t){return void r(t)}s.done?e(u):Promise.resolve(u).then(n,i)}function c(t){return function(){var e=this,r=arguments;return new Promise((function(n,i){var o=t.apply(e,r);function a(t){f(o,n,i,a,s,\"next\",t)}function s(t){f(o,n,i,a,s,\"throw\",t)}a(void 0)}))}}r(30);var l,p,y,d,g=r(443),b=r(334),v=r(938)(\"type\"),w=r(329),m=r(670),A=r(65),E=A.log,x=A.setLogging,k=r(971),O=null,I={},U={},S=!1,L=function(){var t=c(h().mark((function t(e,r){var n,i,o,a,s,u,f,c;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.workerId,i=e.jobId,o=e.payload.options,a=o.lstmOnly,s=o.corePath,u=o.logging,x(u),f=\"initializing tesseract\",l){t.next=11;break}return t.next=6,I.getCore(a,s,r);case 6:c=t.sent,r.progress({workerId:n,status:f,progress:0}),c({TesseractProgress:function(t){p.progress({workerId:n,jobId:i,status:\"recognizing text\",progress:Math.max(0,(t-30)/70)})}}).then((function(t){l=t,r.progress({workerId:n,status:f,progress:1}),r.resolve({loaded:!0})})),t.next=12;break;case 11:r.resolve({loaded:!0});case 12:case\"end\":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),B=function(){var t=c(h().mark((function t(e,r){var n,i,o,a,s;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:i=e.workerId,o=e.payload,a=o.method,s=o.args,E(\"[\".concat(i,\"]: FS.\").concat(a)),r.resolve((n=l.FS)[a].apply(n,function(t){if(Array.isArray(t))return u(t)}(h=s)||function(t){if(\"undefined\"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t[\"@@iterator\"])return Array.from(t)}(h)||function(t,e){if(t){if(\"string\"==typeof t)return u(t,e);var r={}.toString.call(t).slice(8,-1);return\"Object\"===r&&t.constructor&&(r=t.constructor.name),\"Map\"===r||\"Set\"===r?Array.from(t):\"Arguments\"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(t,e):void 0}}(h)||function(){throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\")}()));case 3:case\"end\":return t.stop()}var h}),t)})));return function(e,r){return t.apply(this,arguments)}}(),_=function(){var t=c(h().mark((function t(e,r){var n,i,o,a,s,u,f,p,b,w,m,A,x,k,O;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.workerId,i=e.payload,o=i.langs,a=i.options,s=a.langPath,u=a.dataPath,f=a.cachePath,p=a.cacheMethod,b=a.gzip,w=void 0===b||b,m=a.lstmOnly,y=o,d={langPath:s,dataPath:u,cachePath:f,cacheMethod:p,gzip:w,lstmOnly:m},A=\"loading language traineddata\",x=\"string\"==typeof o?o.split(\"+\"):o,k=0,O=function(){var t=c(h().mark((function t(e){var i,o,a,c,y,d,b,O,U;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=\"string\"==typeof e?e:e.code,o=[\"refresh\",\"none\"].includes(p)?function(){return Promise.resolve()}:I.readCache,a=null,c=!1,t.prev=4,t.next=7,o(\"\".concat(f||\".\",\"/\").concat(i,\".traineddata\"));case 7:if(void 0===(y=t.sent)){t.next=14;break}E(\"[\".concat(n,\"]: Load \").concat(i,\".traineddata from cache\")),a=y,S=!0,t.next=15;break;case 14:throw Error(\"Not found in cache\");case 15:t.next=45;break;case 17:if(t.prev=17,t.t0=t.catch(4),c=!0,E(\"[\".concat(n,\"]: Load \").concat(i,\".traineddata from \").concat(s)),\"string\"!=typeof e){t.next=44;break}if(d=null,b=s||\"https://cdn.jsdelivr.net/npm/@tesseract.js-data/\".concat(i,m?\"/4.0.0_best_int\":\"/4.0.0\"),(\"node\"!==v||g(b)||b.startsWith(\"moz-extension://\")||b.startsWith(\"chrome-extension://\")||b.startsWith(\"file://\"))&&(d=b.replace(/\\/$/,\"\")),null===d){t.next=39;break}return O=\"\".concat(d,\"/\").concat(i,\".traineddata\").concat(w?\".gz\":\"\"),t.next=29,(\"webworker\"===v?fetch:I.fetch)(O);case 29:if((U=t.sent).ok){t.next=32;break}throw Error(\"Network error while fetching \".concat(O,\". Response code: \").concat(U.status));case 32:return t.t1=Uint8Array,t.next=35,U.arrayBuffer();case 35:t.t2=t.sent,a=new t.t1(t.t2),t.next=42;break;case 39:return t.next=41,I.readCache(\"\".concat(b,\"/\").concat(i,\".traineddata\").concat(w?\".gz\":\"\"));case 41:a=t.sent;case 42:t.next=45;break;case 44:a=e.data;case 45:if(k+=.5/x.length,r&&r.progress({workerId:n,status:A,progress:k}),(31===a[0]&&139===a[1]||31===a[1]&&139===a[0])&&(a=I.gunzip(a)),l){if(u)try{l.FS.mkdir(u)}catch(t){r&&r.reject(t.toString())}l.FS.writeFile(\"\".concat(u||\".\",\"/\").concat(i,\".traineddata\"),a)}if(!c||![\"write\",\"refresh\",void 0].includes(p)){t.next=60;break}return t.prev=51,t.next=54,I.writeCache(\"\".concat(f||\".\",\"/\").concat(i,\".traineddata\"),a);case 54:t.next=60;break;case 56:t.prev=56,t.t3=t.catch(51),E(\"[\".concat(n,\"]: Failed to write \").concat(i,\".traineddata to cache due to error:\")),E(t.t3.toString());case 60:k+=.5/x.length,100===Math.round(100*k)&&(k=1),r&&r.progress({workerId:n,status:A,progress:k});case 63:case\"end\":return t.stop()}}),t,null,[[4,17],[51,56]])})));return function(e){return t.apply(this,arguments)}}(),r&&r.progress({workerId:n,status:A,progress:0}),t.prev=8,t.next=11,Promise.all(x.map(O));case 11:r&&r.resolve(o),t.next=17;break;case 14:t.prev=14,t.t0=t.catch(8),r&&r.reject(t.t0.toString());case 17:case\"end\":return t.stop()}}),t,null,[[8,14]])})));return function(e,r){return t.apply(this,arguments)}}(),j=function(){var t=c(h().mark((function t(e,r){var n,i,o;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=e.payload.params,i=[\"ambigs_debug_level\",\"user_words_suffix\",\"user_patterns_suffix\",\"user_patterns_suffix\",\"load_system_dawg\",\"load_freq_dawg\",\"load_unambig_dawg\",\"load_punc_dawg\",\"load_number_dawg\",\"load_bigram_dawg\",\"tessedit_ocr_engine_mode\",\"tessedit_init_config_only\",\"language_model_ngram_on\",\"language_model_use_sigmoidal_certainty\"],(o=Object.keys(n).filter((function(t){return i.includes(t)})).join(\", \")).length>0&&console.log(\"Attempted to set parameters that can only be set during initialization: \".concat(o)),Object.keys(n).filter((function(t){return!t.startsWith(\"tessjs_\")})).forEach((function(t){O.SetVariable(t,n[t])})),U=a(a({},U),n),void 0!==r&&r.resolve(U);case 7:case\"end\":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),P=function(){var t=c(h().mark((function t(e,r){var n,o,a,s,u,f,c,p,g,b,v,w,m,A;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.workerId,o=e.payload,a=o.langs,s=o.oem,u=o.config,f=\"string\"==typeof a?a:a.map((function(t){return\"string\"==typeof t?t:t.data})).join(\"+\"),c=\"initializing api\",t.prev=3,r.progress({workerId:n,status:c,progress:0}),null!==O&&O.End(),u&&\"object\"===i(u)&&Object.keys(u).length>0?g=JSON.stringify(u).replace(/,/g,\"\\n\").replace(/:/g,\" \").replace(/[\"'{}]/g,\"\"):u&&\"string\"==typeof u&&(g=u),\"string\"==typeof g&&(p=\"/config\",l.FS.writeFile(p,g)),O=new l.TessBaseAPI,-1!==(b=O.Init(null,f,s,p))){t.next=30;break}if(![\"write\",\"refresh\",void 0].includes(d.cacheMethod)){t.next=30;break}return v=f.split(\"+\"),w=v.map((function(t){return I.deleteCache(\"\".concat(d.cachePath||\".\",\"/\").concat(t,\".traineddata\"))})),t.next=16,Promise.all(w);case 16:if(m=l.FS.readFile(\"/debugDev.txt\",{encoding:\"utf8\",flags:\"a+\"}),!S||!/components are not present/.test(m)){t.next=30;break}return E(\"Data from cache missing requested OEM model. Attempting to refresh cache with new language data.\"),t.next=21,_({workerId:n,payload:{langs:y,options:d}});case 21:if(-1!==(b=O.Init(null,f,s,p))){t.next=29;break}return E(\"Language data refresh failed.\"),A=v.map((function(t){return I.deleteCache(\"\".concat(d.cachePath||\".\",\"/\").concat(t,\".traineddata\"))})),t.next=27,Promise.all(A);case 27:t.next=30;break;case 29:E(\"Language data refresh successful.\");case 30:-1===b&&r.reject(\"initialization failed\"),r.progress({workerId:n,status:c,progress:1}),r.resolve(),t.next=38;break;case 35:t.prev=35,t.t0=t.catch(3),r.reject(t.t0.toString());case 38:case\"end\":return t.stop()}}),t,null,[[3,35]])})));return function(e,r){return t.apply(this,arguments)}}(),T=function(t){for(var e=JSON.parse(JSON.stringify(m)),r=[\"imageColor\",\"imageGrey\",\"imageBinary\",\"layoutBlocks\",\"debug\"],n=0,i=0,o=Object.keys(t);i<o.length;i++){var a=o[i];e[a]=t[a]}for(var s=0,u=Object.keys(e);s<u.length;s++){var h=u[s];e[h]&&(r.includes(h)||(n+=1))}return{workingOutput:e,skipRecognition:0===n}},R=[\"rectangle\",\"pdfTitle\",\"pdfTextOnly\",\"rotateAuto\",\"rotateRadians\"],C=function(){var t=c(h().mark((function t(e,r){var n,o,a,s,u,f,c,p,y,d,g,v,m,A,x,I,U,S,L,B,_,j;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=e.payload,o=n.image,a=n.options,s=n.output;try{if(u={},\"object\"===i(a)&&Object.keys(a).length>0)for(f=0,c=Object.keys(a);f<c.length;f++)(p=c[f]).startsWith(\"tessjs_\")||R.includes(p)||(u[p]=a[p]);if(s.debug&&(u.debug_file=\"/debugInternal.txt\",l.FS.writeFile(\"/debugInternal.txt\",\"\")),Object.keys(u).length>0)for(O.SaveParameters(),y=0,d=Object.keys(u);y<d.length;y++)g=d[y],O.SetVariable(g,u[g]);v=T(s),m=v.workingOutput,A=v.skipRecognition,a.rotateAuto?(I=O.GetPageSegMode(),U=!1,[k.AUTO,k.AUTO_ONLY,k.OSD].includes(String(I))||(U=!0,O.SetVariable(\"tessedit_pageseg_mode\",String(k.AUTO))),w(l,O,o),O.FindLines(),S=O.GetGradient?O.GetGradient():O.GetAngle(),U&&O.SetVariable(\"tessedit_pageseg_mode\",String(I)),Math.abs(S)>=.005?w(l,O,o,x=S):(U&&w(l,O,o),x=0)):(x=a.rotateRadians||0,w(l,O,o,x)),\"object\"===i(L=a.rectangle)&&O.SetRectangle(L.left,L.top,L.width,L.height),A?(s.layoutBlocks&&O.AnalyseLayout(),E(\"Skipping recognition: all output options requiring recognition are disabled.\")):O.Recognize(null),B=a.pdfTitle,_=a.pdfTextOnly,(j=b(l,O,m,{pdfTitle:B,pdfTextOnly:_,skipRecognition:A})).rotateRadians=x,s.debug&&l.FS.unlink(\"/debugInternal.txt\"),Object.keys(u).length>0&&O.RestoreParameters(),r.resolve(j)}catch(t){r.reject(t.toString())}case 2:case\"end\":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),M=function(){var t=c(h().mark((function t(e,r){var n,i,o,a,s;return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=e.payload.image;try{w(l,O,n),i=new l.OSResults,O.DetectOS(i)?(o=i.best_result,a=o.orientation_id,s=o.script_id,r.resolve({tesseract_script_id:s,script:i.unicharset.get_script_from_script_id(s),script_confidence:o.sconfidence,orientation_degrees:[0,270,180,90][a],orientation_confidence:o.oconfidence})):r.resolve({tesseract_script_id:null,script:null,script_confidence:null,orientation_degrees:null,orientation_confidence:null})}catch(t){r.reject(t.toString())}case 2:case\"end\":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),N=function(){var t=c(h().mark((function t(e,r){return h().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{null!==O&&O.End(),r.resolve({terminated:!0})}catch(t){r.reject(t.toString())}case 1:case\"end\":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}();e.dispatchHandlers=function(t,e){var r=function(r,n){var i={jobId:t.jobId,workerId:t.workerId,action:t.action};e(a(a({},i),{},{status:r,data:n}))};r.resolve=r.bind(n,\"resolve\"),r.reject=r.bind(n,\"reject\"),r.progress=r.bind(n,\"progress\"),p=r,{load:L,FS:B,loadLanguage:_,initialize:P,setParameters:j,recognize:C,detect:M,terminate:N}[t.action](t,r).catch((function(t){return r.reject(t.toString())}))},e.setAdapter=function(t){I=t}},971:t=>{\"use strict\";t.exports={OSD_ONLY:\"0\",AUTO_OSD:\"1\",AUTO_ONLY:\"2\",AUTO:\"3\",SINGLE_COLUMN:\"4\",SINGLE_BLOCK_VERT_TEXT:\"5\",SINGLE_BLOCK:\"6\",SINGLE_LINE:\"7\",SINGLE_WORD:\"8\",CIRCLE_WORD:\"9\",SINGLE_CHAR:\"10\",SPARSE_TEXT:\"11\",SPARSE_TEXT_OSD:\"12\",RAW_LINE:\"13\"}},976:(t,e,r)=>{\"use strict\";function n(){n=function(){return e};var t,e={},r=Object.prototype,o=r.hasOwnProperty,a=Object.defineProperty||function(t,e,r){t[e]=r.value},s=\"function\"==typeof Symbol?Symbol:{},u=s.iterator||\"@@iterator\",h=s.asyncIterator||\"@@asyncIterator\",f=s.toStringTag||\"@@toStringTag\";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},\"\")}catch(t){c=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var i=e&&e.prototype instanceof w?e:w,o=Object.create(i.prototype),s=new j(n||[]);return a(o,\"_invoke\",{value:S(t,r,s)}),o}function p(t,e,r){try{return{type:\"normal\",arg:t.call(e,r)}}catch(t){return{type:\"throw\",arg:t}}}e.wrap=l;var y=\"suspendedStart\",d=\"suspendedYield\",g=\"executing\",b=\"completed\",v={};function w(){}function m(){}function A(){}var E={};c(E,u,(function(){return this}));var x=Object.getPrototypeOf,k=x&&x(x(P([])));k&&k!==r&&o.call(k,u)&&(E=k);var O=A.prototype=w.prototype=Object.create(E);function I(t){[\"next\",\"throw\",\"return\"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function U(t,e){function r(n,a,s,u){var h=p(t[n],t,a);if(\"throw\"!==h.type){var f=h.arg,c=f.value;return c&&\"object\"==i(c)&&o.call(c,\"__await\")?e.resolve(c.__await).then((function(t){r(\"next\",t,s,u)}),(function(t){r(\"throw\",t,s,u)})):e.resolve(c).then((function(t){f.value=t,s(f)}),(function(t){return r(\"throw\",t,s,u)}))}u(h.arg)}var n;a(this,\"_invoke\",{value:function(t,i){function o(){return new e((function(e,n){r(t,i,e,n)}))}return n=n?n.then(o,o):o()}})}function S(e,r,n){var i=y;return function(o,a){if(i===g)throw Error(\"Generator is already running\");if(i===b){if(\"throw\"===o)throw a;return{value:t,done:!0}}for(n.method=o,n.arg=a;;){var s=n.delegate;if(s){var u=L(s,n);if(u){if(u===v)continue;return u}}if(\"next\"===n.method)n.sent=n._sent=n.arg;else if(\"throw\"===n.method){if(i===y)throw i=b,n.arg;n.dispatchException(n.arg)}else\"return\"===n.method&&n.abrupt(\"return\",n.arg);i=g;var h=p(e,r,n);if(\"normal\"===h.type){if(i=n.done?b:d,h.arg===v)continue;return{value:h.arg,done:n.done}}\"throw\"===h.type&&(i=b,n.method=\"throw\",n.arg=h.arg)}}}function L(e,r){var n=r.method,i=e.iterator[n];if(i===t)return r.delegate=null,\"throw\"===n&&e.iterator.return&&(r.method=\"return\",r.arg=t,L(e,r),\"throw\"===r.method)||\"return\"!==n&&(r.method=\"throw\",r.arg=new TypeError(\"The iterator does not provide a '\"+n+\"' method\")),v;var o=p(i,e.iterator,r.arg);if(\"throw\"===o.type)return r.method=\"throw\",r.arg=o.arg,r.delegate=null,v;var a=o.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,\"return\"!==r.method&&(r.method=\"next\",r.arg=t),r.delegate=null,v):a:(r.method=\"throw\",r.arg=new TypeError(\"iterator result is not an object\"),r.delegate=null,v)}function B(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type=\"normal\",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:\"root\"}],t.forEach(B,this),this.reset(!0)}function P(e){if(e||\"\"===e){var r=e[u];if(r)return r.call(e);if(\"function\"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,a=function r(){for(;++n<e.length;)if(o.call(e,n))return r.value=e[n],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}throw new TypeError(i(e)+\" is not iterable\")}return m.prototype=A,a(O,\"constructor\",{value:A,configurable:!0}),a(A,\"constructor\",{value:m,configurable:!0}),m.displayName=c(A,f,\"GeneratorFunction\"),e.isGeneratorFunction=function(t){var e=\"function\"==typeof t&&t.constructor;return!!e&&(e===m||\"GeneratorFunction\"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,A):(t.__proto__=A,c(t,f,\"GeneratorFunction\")),t.prototype=Object.create(O),t},e.awrap=function(t){return{__await:t}},I(U.prototype),c(U.prototype,h,(function(){return this})),e.AsyncIterator=U,e.async=function(t,r,n,i,o){void 0===o&&(o=Promise);var a=new U(l(t,r,n,i),o);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},I(O),c(O,f,\"Generator\"),c(O,u,(function(){return this})),c(O,\"toString\",(function(){return\"[object Generator]\"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=P,j.prototype={constructor:j,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method=\"next\",this.arg=t,this.tryEntries.forEach(_),!e)for(var r in this)\"t\"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if(\"throw\"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function n(n,i){return s.type=\"throw\",s.arg=e,r.next=n,i&&(r.method=\"next\",r.arg=t),!!i}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if(\"root\"===a.tryLoc)return n(\"end\");if(a.tryLoc<=this.prev){var u=o.call(a,\"catchLoc\"),h=o.call(a,\"finallyLoc\");if(u&&h){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!h)throw Error(\"try statement without catch or finally\");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,\"finallyLoc\")&&this.prev<n.finallyLoc){var i=n;break}}i&&(\"break\"===t||\"continue\"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method=\"next\",this.next=i.finallyLoc,v):this.complete(a)},complete:function(t,e){if(\"throw\"===t.type)throw t.arg;return\"break\"===t.type||\"continue\"===t.type?this.next=t.arg:\"return\"===t.type?(this.rval=this.arg=t.arg,this.method=\"return\",this.next=\"end\"):\"normal\"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if(\"throw\"===n.type){var i=n.arg;_(r)}return i}}throw Error(\"illegal catch attempt\")},delegateYield:function(e,r,n){return this.delegate={iterator:P(e),resultName:r,nextLoc:n},\"next\"===this.method&&(this.arg=t),v}},e}function i(t){return i=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&\"function\"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?\"symbol\":typeof t},i(t)}function o(t,e,r,n,i,o,a){try{var s=t[o](a),u=s.value}catch(t){return void r(t)}s.done?e(u):Promise.resolve(u).then(n,i)}var a=r(242),s=a.simd,u=a.relaxedSimd,h=r(330).El.QE;t.exports=function(){var t,e=(t=n().mark((function t(e,o,a){var f,c,l,p,y;return n().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(void 0!==r.g.TesseractCore){t.next=23;break}if(f=\"loading tesseract core\",a.progress({status:f,progress:0}),\"js\"!==(c=o||\"https://cdn.jsdelivr.net/npm/tesseract.js-core@v\".concat(h.substring(1))).slice(-2)){t.next=8;break}l=c,t.next=15;break;case 8:return t.next=10,s();case 10:return p=t.sent,t.next=13,u();case 13:y=t.sent,l=\"\".concat(c.replace(/\\/$/,\"\"),y?e?\"/tesseract-core-relaxedsimd-lstm.wasm.js\":\"/tesseract-core-relaxedsimd.wasm.js\":p?e?\"/tesseract-core-simd-lstm.wasm.js\":\"/tesseract-core-simd.wasm.js\":e?\"/tesseract-core-lstm.wasm.js\":\"/tesseract-core.wasm.js\");case 15:if(r.g.importScripts(l),void 0!==r.g.TesseractCore||void 0===r.g.TesseractCoreWASM||\"object\"!==(\"undefined\"==typeof WebAssembly?\"undefined\":i(WebAssembly))){t.next=20;break}r.g.TesseractCore=r.g.TesseractCoreWASM,t.next=22;break;case 20:if(void 0!==r.g.TesseractCore){t.next=22;break}throw Error(\"Failed to load TesseractCore\");case 22:a.progress({status:f,progress:1});case 23:return t.abrupt(\"return\",r.g.TesseractCore);case 24:case\"end\":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,i){var a=t.apply(e,r);function s(t){o(a,n,i,s,u,\"next\",t)}function u(t){o(a,n,i,s,u,\"throw\",t)}s(void 0)}))});return function(t,r,n){return e.apply(this,arguments)}}()}},e={};function r(n){var i=e[n];if(void 0!==i)return i.exports;var o=e[n]={id:n,loaded:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.g=function(){if(\"object\"==typeof globalThis)return globalThis;try{return this||new Function(\"return this\")()}catch(t){if(\"object\"==typeof window)return window}}(),r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(t,\"__esModule\",{value:!0})},r.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),(()=>{\"use strict\";function t(e){return t=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&\"function\"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?\"symbol\":typeof t},t(e)}function e(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function n(e,r,n){return(r=function(e){var r=function(e){if(\"object\"!=t(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,\"string\");if(\"object\"!=t(n))return n;throw new TypeError(\"@@toPrimitive must return a primitive value.\")}return String(e)}(e);return\"symbol\"==t(r)?r:r+\"\"}(r))in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}var i=r(968),o=r(976),a=r(258),s=r(797);r.g.addEventListener(\"message\",(function(t){var e=t.data;i.dispatchHandlers(e,(function(t){return postMessage(t)}))})),i.setAdapter(function(t){for(var r=1;r<arguments.length;r++){var i=null!=arguments[r]?arguments[r]:{};r%2?e(Object(i),!0).forEach((function(e){n(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):e(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}({getCore:o,gunzip:a,fetch:function(){}},s))})()})();\n//# sourceMappingURL=worker.min.js.map";

const __obsidian = require("obsidian");
const Plugin = __obsidian.Plugin;
const ItemView = __obsidian.ItemView;
const WorkspaceLeaf = __obsidian.WorkspaceLeaf;
const Modal = __obsidian.Modal;
const Notice = __obsidian.Notice;
const PluginSettingTab = __obsidian.PluginSettingTab;
const Setting = __obsidian.Setting;
const Platform = __obsidian.Platform;
const normalizePath = __obsidian.normalizePath;
const requestUrl = __obsidian.requestUrl;
const setCssProps = __obsidian.setCssProps;
const setCssStyles = __obsidian.setCssStyles;
const addIcon = __obsidian.addIcon;

function setSvgContent(el, svg) {
  if (!el) return;
  if (typeof el.empty === "function") el.empty();
  else el.replaceChildren();
  const raw = String(svg || "").trim();
  if (!raw) return;
  const doc = new DOMParser().parseFromString(raw, "image/svg+xml");
  const node = doc.documentElement;
  if (node && node.nodeName.toLowerCase() === "svg") {
    el.appendChild(document.importNode(node, true));
  }
}

function applyCssProps(el, props) {
  if (!el || !props) return;
  try {
    if (typeof setCssProps === "function") {
      setCssProps(el, props);
      return;
    }
  } catch (_) { /* fall through */ }
  try {
    if (typeof el.setCssProps === "function") {
      el.setCssProps(props);
      return;
    }
  } catch (_) { /* fall through */ }
  Object.keys(props).forEach((name) => {
    const value = props[name];
    if (value == null || value === "") el.style.removeProperty(name);
    else el.style.setProperty(name, String(value));
  });
}

function applyCssStyles(el, styles) {
  if (!el || !styles) return;
  try {
    if (typeof setCssStyles === "function") {
      setCssStyles(el, styles);
      return;
    }
  } catch (_) { /* fall through */ }
  try {
    if (typeof el.setCssStyles === "function") {
      el.setCssStyles(styles);
      return;
    }
  } catch (_) { /* fall through */ }
  Object.keys(styles).forEach((name) => {
    const value = styles[name];
    const cssName = name.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
    if (value == null || value === "") el.style.removeProperty(cssName);
    else el.style.setProperty(cssName, String(value));
  });
}

const PLUGIN_EDITION = "trial24h";
const PLUGIN_REQUIRE_LICENSE = true;
const PLUGIN_TRIAL_HOURS = 48;
const PLUGIN_BUNDLED_SAMPLE_HINT = "完整保留个人版全部分类，仅 6 笔示意账单（48 小时体验）";

function isLicenseRequired() {
  return typeof PLUGIN_REQUIRE_LICENSE === "undefined" ? false : !!PLUGIN_REQUIRE_LICENSE;
}

function isTrialEdition() {
  const hours = Number(typeof PLUGIN_TRIAL_HOURS !== "undefined" ? PLUGIN_TRIAL_HOURS : 0);
  return hours > 0 && isLicenseRequired();
}

function getTrialHoursLabel() {
  const h = Number(typeof PLUGIN_TRIAL_HOURS !== "undefined" ? PLUGIN_TRIAL_HOURS : 0);
  return h > 0 ? `${h} 小时` : "";
}

function getVaultScopedStorageKey(app, suffix) {
  const vaultName = app.vault?.getName?.() || "UnknownVault";
  return `plain-ledger:${vaultName}:${suffix}`;
}

function ensureTrialStarted(app, settings, force = false) {
  if (!isTrialEdition() || syncLicenseState(app, settings)) return;
  if (!force && !settings.trialWelcomeSeen) return;
  const storageKey = getVaultScopedStorageKey(app, "trialStartedAt");
  let started = settings.trialStartedAt || "";
  if (!started) {
    try { started = localStorage.getItem(storageKey) || ""; } catch { /* ignore */ }
  }
  if (!started) {
    started = new Date().toISOString();
    try { localStorage.setItem(storageKey, started); } catch { /* ignore */ }
  }
  if (settings.trialStartedAt !== started) settings.trialStartedAt = started;
}

function getTrialRemainingMs(app, settings) {
  if (!isTrialEdition() || syncLicenseState(app, settings)) return 0;
  ensureTrialStarted(app, settings);
  const started = settings.trialStartedAt;
  if (!started) return 0;
  const elapsed = Date.now() - new Date(started).getTime();
  const total = Number(PLUGIN_TRIAL_HOURS) * 60 * 60 * 1000;
  return Math.max(0, total - elapsed);
}

function isTrialActive(app, settings) {
  return isTrialEdition() && getTrialRemainingMs(app, settings) > 0;
}

function isPluginAccessAllowed(app, settings) {
  if (!isLicenseRequired()) return true;
  if (syncLicenseState(app, settings)) return true;
  return isTrialActive(app, settings);
}

function hashStringToHex(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).toUpperCase();
}

function getVaultFingerprint(app) {
  const vaultName = app.vault?.getName?.() || "UnknownVault";
  return "PLG-" + hashStringToHex(String(vaultName));
}

function computeExpectedLicenseKeyFromFingerprint(fp) {
  let hash = 0;
  for (let i = 0; i < fp.length; i++) {
    hash = (hash << 5) - hash + fp.charCodeAt(i);
    hash |= 0;
  }
  return "KEY-" + Math.abs(hash ^ 0x8899).toString(16).toUpperCase();
}

function isLicenseValid(app, key) {
  if (!key || !String(key).trim()) return false;
  const normalized = String(key).trim().toUpperCase();
  const expected = computeExpectedLicenseKeyFromFingerprint(getVaultFingerprint(app));
  return normalized === expected;
}

function syncLicenseState(app, settings) {
  const ok = isLicenseValid(app, settings.licenseKey);
  settings.licenseActivated = ok;
  return ok;
}

function isPluginLicensed(app, settings) {
  return isPluginAccessAllowed(app, settings);
}

function bundledSampleHint() {
  return typeof PLUGIN_BUNDLED_SAMPLE_HINT !== "undefined"
    ? PLUGIN_BUNDLED_SAMPLE_HINT
    : "内置示例账单";
}

const LICENSE_FINGERPRINT_LABEL = "PLG-XXXXXXXX";
const LICENSE_FINGERPRINT_HINT = "复制设备专属指纹，发给作者获取激活码。";

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.className = "plg-clipboard-ghost";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

const LIFEOS_UI_STYLE_ID = "lifeos-ui-shared-styles-v9";
const LIFEOS_MOBILE_TOP_INSET_PX = 41;
const LIFEOS_RELEASE = "2026.07.16";

function getLifeOsReleaseLabel() {
  return LIFEOS_RELEASE;
}

function getEditionDisplayName(settings) {
  if (typeof isTrialEdition === "function" && isTrialEdition()) {
    if (settings?.licenseActivated) return "公版";
    const h = typeof getTrialHoursLabel === "function" ? getTrialHoursLabel() : "";
    return h ? `${h}体验版` : "48小时体验版";
  }
  if (typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public") return "公版";
  if (typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "personal") return "个人版";
  return "";
}

function formatLifeOsVersionLine(version, editionLabel) {
  const v = String(version || "").trim() || "0.0.0";
  const ed = editionLabel ? ` · ${editionLabel}` : "";
  return `LifeOS ${LIFEOS_RELEASE} · v${v}${ed}`;
}

function formatPluginSettingsTitle(baseTitle, editionLabel) {
  const edition = editionLabel ? ` · ${editionLabel}` : "";
  const v = typeof PLUGIN_VERSION === "string" ? PLUGIN_VERSION.trim() : "";
  return v ? `${baseTitle}${edition} v${v}` : `${baseTitle}${edition}`;
}

function getPluginVersionDisplayLine() {
  const v = typeof PLUGIN_VERSION === "string" ? PLUGIN_VERSION : "0.0.0";
  return formatLifeOsVersionLine(v, getEditionDisplayName());
}

function injectLifeOsSharedStyles() {
  /* CSS lives in styles.css (community plugin: no runtime <style> injection). */
}

function renderLifeOsEmptyState(parent, options = {}) {
  injectLifeOsSharedStyles();
  parent.empty();
  const wrap = parent.createDiv({ cls: "lifeos-empty-state" });
  if (options.icon) wrap.createDiv({ cls: "lifeos-empty-icon", text: options.icon });
  wrap.createEl("p", { cls: "lifeos-empty-msg", text: options.message || "暂无内容" });
  if (options.ctaLabel && typeof options.onCta === "function") {
    const btn = wrap.createEl("button", { cls: "lifeos-empty-cta", text: options.ctaLabel, type: "button" });
    btn.onclick = () => void options.onCta();
  }
  return wrap;
}

function showLifeOsFirstRunCard(container, app, storageKey, options = {}) {
  injectLifeOsSharedStyles();
  try {
    const seen = typeof app?.loadLocalStorage === "function"
      ? app.loadLocalStorage(storageKey)
      : localStorage.getItem(storageKey);
    if (seen === "1") return null;
  } catch { /* ignore */ }
  const card = container.createDiv({ cls: "lifeos-first-run-card" });
  card.createEl("p", { cls: "lifeos-first-run-title", text: options.title || "欢迎使用 LifeOS" });
  const list = card.createEl("ul", { cls: "lifeos-first-run-list" });
  (options.bullets || []).forEach((line) => list.createEl("li", { text: line }));
  const actions = card.createDiv({ cls: "lifeos-first-run-actions" });
  const dismiss = () => {
    try {
      if (typeof app?.saveLocalStorage === "function") app.saveLocalStorage(storageKey, "1");
      else localStorage.setItem(storageKey, "1");
    } catch { /* ignore */ }
    card.remove();
  };
  if (options.primaryLabel) {
    const primary = actions.createEl("button", {
      cls: "lifeos-first-run-primary",
      text: options.primaryLabel,
      type: "button",
    });
    primary.onclick = () => {
      dismiss();
      if (typeof options.onPrimary === "function") void options.onPrimary();
    };
  }
  if (options.secondaryLabel) {
    const secondary = actions.createEl("button", {
      cls: "lifeos-first-run-secondary",
      text: options.secondaryLabel,
      type: "button",
    });
    secondary.onclick = () => {
      dismiss();
      if (typeof options.onSecondary === "function") void options.onSecondary();
    };
  }
  const later = actions.createEl("button", { text: options.laterLabel || "知道了", type: "button" });
  later.onclick = dismiss;
  return card;
}

function renderLifeOsActivationPreview(card, rows, note) {
  injectLifeOsSharedStyles();
  const preview = card.createDiv({ cls: "plg-activation-preview lifeos-activation-preview" });
  (rows || []).forEach((row) => {
    const line = preview.createDiv({ cls: "plg-activation-preview-row" });
    line.createSpan({ text: row.label });
    line.createEl("strong", { text: row.value });
  });
  if (note) preview.createEl("p", { cls: "plg-activation-preview-note", text: note });
  return preview;
}

function openLifeOsPluginSettings(app, pluginId) {
  if (!app?.setting) return;
  const openTab = () => {
    try {
      if (typeof app.setting.openTabById === "function") {
        app.setting.openTabById(pluginId);
        return true;
      }
      const tab = app.setting.pluginTabs?.find?.((t) => t.id === pluginId);
      if (tab && typeof app.setting.openTab === "function") {
        app.setting.openTab(tab);
        return true;
      }
    } catch { /* ignore */ }
    return false;
  };
  try { app.setting.open(); } catch { /* ignore */ }
  if (openTab()) return;
  window.setTimeout(() => {
    if (!openTab()) new Notice(`无法打开插件设置，请手动进入 设置 → 第三方插件`);
  }, 80);
}

function renderLifeOsFamilyFoot(_container, _app, _selfId) {
  /* 已迁移至「关于 → 所有作品」，保留空实现避免旧调用报错 */
}

function formatTrialRemaining(ms) {
  if (ms <= 0) return "0 分钟";
  const totalMin = Math.ceil(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h > 0) return `${h} 小时 ${m} 分钟`;
  return `${m} 分钟`;
}

function injectLifeOsTrialStyles() {
  /* CSS lives in styles.css (community plugin: no runtime <style> injection). */
}

function maybeShowTrialWelcomeModal(plugin, onDone) {
  if (!isTrialEdition() || plugin.settings.trialWelcomeSeen || plugin.settings.licenseActivated) {
    if (typeof onDone === "function") onDone();
    return;
  }
  injectLifeOsSharedStyles();
  injectLifeOsTrialStyles();
  const modal = new Modal(plugin.app);
  modal.modalEl.addClass("lifeos-modal");
  modal.modalEl.addClass("lifeos-trial-modal");
  modal.modalEl.addClass("plg-trial-modal");
  modal.titleEl.setText("开始免费试用");
  modal.contentEl.createEl("p", {
    cls: "setting-item-description",
    text: `您正在使用 PlainLedger ${getTrialHoursLabel()}体验版。确认后将开始全功能试用，到期须激活才能继续记账。`,
  });
  modal.contentEl.createEl("p", {
    cls: "setting-item-description",
    text: "试用期间可随时输入激活码永久绑定本设备；库内账单数据不会丢失。",
  });
  const row = modal.contentEl.createDiv({ cls: "lifeos-trial-actions" });
  const startBtn = row.createEl("button", { text: "开始试用", cls: "mod-cta lifeos-modal-primary" });
  const laterBtn = row.createEl("button", { text: "稍后再说" });
  const finish = async (start) => {
    if (start) {
      plugin.settings.trialWelcomeSeen = true;
      ensureTrialStarted(plugin.app, plugin.settings, true);
      await plugin.saveSettings();
      if (typeof PLUGIN_EDITION === "string" && (PLUGIN_EDITION === "public" || PLUGIN_EDITION === "trial24h")) {
        const seeded = await plugin.store.ensurePublicEditionDefaults();
        plugin.settings.onboardingComplete = true;
        plugin.settings.onboardingChoice = "sample";
        plugin.settings.initialized = true;
        await plugin.saveSettings();
        if (seeded) {
          const cats = plugin.store.data.categories?.length || 0;
          const subs = (plugin.store.data.categories || []).reduce((n, c) => n + (c.subcategories?.length || 0), 0);
          const tx = plugin.store.data.transactions?.length || 0;
          new Notice(`已加载 ${tx} 笔示意账单 · ${cats} 类 · ${subs} 二级`);
        }
      }
      new Notice(`已开始 ${getTrialHoursLabel()} 试用`);
      plugin.refreshView(true);
    }
    modal.close();
    if (typeof onDone === "function") onDone();
  };
  startBtn.onclick = () => void finish(true);
  laterBtn.onclick = () => void finish(false);
  modal.open();
}

function checkTrialExpiryReminders(plugin) {
  if (!isTrialEdition() || plugin.settings.licenseActivated) return;
  if (plugin.settings.trialWelcomeSeen) ensureTrialStarted(plugin.app, plugin.settings, true);
  const remain = getTrialRemainingMs(plugin.app, plugin.settings);
  if (remain <= 0 && plugin.settings.trialStartedAt && plugin.settings.trialWelcomeSeen) {
    maybeShowTrialExpiredModal(plugin);
    return;
  }
  if (remain <= 0) return;
  const twoHours = 2 * 60 * 60 * 1000;
  const thirtyMin = 30 * 60 * 1000;
  if (remain <= twoHours && !plugin.settings.trialReminder2hSeen) {
    plugin.settings.trialReminder2hSeen = true;
    plugin.saveSettings();
    maybeShowTrialRenewModal(plugin, remain, "2h");
  } else if (remain <= thirtyMin && !plugin.settings.trialReminder30mSeen) {
    plugin.settings.trialReminder30mSeen = true;
    plugin.saveSettings();
    maybeShowTrialRenewModal(plugin, remain, "30m");
  }
}

function maybeShowTrialRenewModal(plugin, remainMs, kind) {
  injectLifeOsSharedStyles();
  injectLifeOsTrialStyles();
  const modal = new Modal(plugin.app);
  modal.modalEl.addClass("lifeos-modal");
  modal.modalEl.addClass("lifeos-trial-modal");
  modal.titleEl.setText(kind === "30m" ? "试用即将结束" : "试用剩余不足 2 小时");
  modal.contentEl.createEl("p", {
    cls: "setting-item-description",
    text: `试用剩余 ${formatTrialRemaining(remainMs)}。到期后记账、导入等功能将暂停，库内账单不会丢失。`,
  });
  const row = modal.contentEl.createDiv({ cls: "lifeos-trial-actions" });
  const actBtn = row.createEl("button", { text: "去激活", cls: "mod-cta lifeos-modal-primary" });
  actBtn.onclick = () => {
    modal.close();
    plugin.openDashboard();
  };
  row.createEl("button", { text: "知道了" }).onclick = () => modal.close();
  modal.open();
}

function maybeShowTrialExpiredModal(plugin) {
  if (plugin._trialExpiredModalShown) return;
  if (!isTrialEdition() || isPluginAccessAllowed(plugin.app, plugin.settings)) return;
  plugin._trialExpiredModalShown = true;
  injectLifeOsSharedStyles();
  injectLifeOsTrialStyles();
  const modal = new Modal(plugin.app);
  modal.modalEl.addClass("lifeos-modal");
  modal.modalEl.addClass("lifeos-trial-modal");
  modal.titleEl.setText("试用已到期");
  modal.contentEl.createEl("p", {
    cls: "setting-item-description",
    text: `${getTrialHoursLabel()}免费试用已结束。您的账单与分类均保留在库中，激活后即可继续记账。`,
  });
  const row = modal.contentEl.createDiv({ cls: "lifeos-trial-actions" });
  const actBtn = row.createEl("button", { text: "立即激活", cls: "mod-cta lifeos-modal-primary" });
  actBtn.onclick = () => {
    modal.close();
    plugin.openDashboard();
  };
  row.createEl("button", { text: "稍后" }).onclick = () => modal.close();
  modal.open();
}

function renderTrialBanner(container, plugin) {
  if (!isTrialEdition() || plugin.settings.licenseActivated) return;
  if (!isTrialActive(plugin.app, plugin.settings)) return;
  injectLifeOsSharedStyles();
  injectLifeOsTrialStyles();
  const remain = getTrialRemainingMs(plugin.app, plugin.settings);
  const banner = container.createDiv({ cls: "lifeos-trial-banner" });
  banner.setText(`试用中，剩余 ${formatTrialRemaining(remain)} · 点此激活永久使用`);
  banner.onclick = () => plugin.openDashboardSettings({ section: "license" });
}

async function startTrialFromActivationPanel(plugin) {
  if (!isTrialEdition() || plugin.settings.licenseActivated || plugin.settings.trialWelcomeSeen) return;
  plugin.settings.trialWelcomeSeen = true;
  ensureTrialStarted(plugin.app, plugin.settings, true);
  await plugin.saveSettings();
  if (typeof PLUGIN_EDITION === "string" && (PLUGIN_EDITION === "public" || PLUGIN_EDITION === "trial24h")) {
    const seeded = await plugin.store.ensurePublicEditionDefaults();
    plugin.settings.onboardingComplete = true;
    plugin.settings.onboardingChoice = "sample";
    plugin.settings.initialized = true;
    await plugin.saveSettings();
    if (seeded) {
      const cats = plugin.store.data.categories?.length || 0;
      const subs = (plugin.store.data.categories || []).reduce((n, c) => n + (c.subcategories?.length || 0), 0);
      const tx = plugin.store.data.transactions?.length || 0;
      new Notice(`已加载 ${tx} 笔示意账单 · ${cats} 类 · ${subs} 二级`);
    }
  }
  new Notice(`已开始 ${getTrialHoursLabel()} 试用`);
  plugin.refreshView(true);
}

function runPlainLedgerTrialStartup(plugin, onDone) {
  checkTrialExpiryReminders(plugin);
  if (typeof onDone === "function") onDone();
}

function requirePlainLedgerAccess(plugin, hint) {
  if (!isLicenseRequired()) return true;
  if (plugin.settings.trialWelcomeSeen || !isTrialEdition()) {
    ensureTrialStarted(plugin.app, plugin.settings, !!plugin.settings.trialWelcomeSeen);
  }
  syncLicenseState(plugin.app, plugin.settings);
  if (isPluginAccessAllowed(plugin.app, plugin.settings)) return true;
  if (isTrialEdition() && !plugin.settings.trialWelcomeSeen) {
    new Notice(hint || "请先点击「开启试用」或输入激活码");
  } else if (isTrialEdition() && getTrialRemainingMs(plugin.app, plugin.settings) <= 0) {
    new Notice("试用已到期，请在面板输入激活码");
  } else {
    new Notice(hint || "请先激活 PlainLedger");
  }
  plugin.openDashboard();
  return false;
}

const LIFEOS_PLUGIN_CATALOG = [
  {
    id: "plain-ledger",
    name: "PlainLedger",
    intro: "专为 Obsidian 开发的记账软件",
    philosophy: "记账不必离开笔记——PlainLedger 把账单、分类、订阅规则保存在 Obsidian 库内，随 iCloud / Git 同步，和日记、复盘同屏共存",
    price: "¥39.9",
    repoUrl: "https://github.com/xileshuo/plain-ledger-obsidian",
  },
  {
    id: "jinianri",
    name: "纪念日",
    intro: "专为 Obsidian 开发的纪念日管理软件",
    philosophy: "记录生日、恋爱、婚姻等重要日期，自动计算「已过时长」与「距离下次还有几天」，支持三档提醒与 iCal 导出",
    price: "¥29.9",
    repoUrl: "https://github.com/xileshuo/jinianri",
  },
  {
    id: "braincore-lifeos",
    name: "BrainCore LifeOS",
    intro: "专为 Obsidian 开发的生活管理控制台",
    philosophy: "Obsidian 知识库的「核心呼吸机」，它由 7 大模块组成，涵盖了时间感知、极速收集、工作流转、习惯养成与知识内化。一切信息从这里输入，最终也会在这里沉淀",
    price: "¥49.9",
    repoUrl: "https://github.com/xileshuo/BrainCore-LifeOS",
  },
];

const LIFEOS_AUTHOR_NAME = "囍樂";
const LIFEOS_COPYRIGHT = "所有版权©囍樂說。保留所有权利。";
const LIFEOS_AUTHOR_HOMEPAGE = "https://xhslink.com/m/3uOoUHv2rI1";

function getLifeOsVaultKey(app, suffix) {
  const vaultName = app.vault?.getName?.() || "UnknownVault";
  return `lifeos:${vaultName}:${suffix}`;
}

function getEnabledLifeOsPlugins(app) {
  const plugins = app.plugins?.plugins || {};
  return LIFEOS_PLUGIN_CATALOG.filter((p) => {
    const inst =
      plugins[p.id] ||
      (p.id === "braincore-lifeos"
        ? plugins["braincore-lifeos-personal"] || plugins["braincore-dashboard"]
        : null);
    return inst && inst._loaded !== false;
  });
}

function getLifeOsPeerNames(app, selfId) {
  const braincoreFamily = new Set(["braincore-lifeos", "braincore-lifeos-personal", "braincore-dashboard"]);
  return getEnabledLifeOsPlugins(app)
    .filter((p) => {
      if (p.id === selfId) return false;
      if (braincoreFamily.has(selfId) && p.id === "braincore-lifeos") return false;
      return true;
    })
    .map((p) => p.name);
}

function maybeShowLifeOsSuitePrompt(app, selfId, selfName) {
  const peers = getLifeOsPeerNames(app, selfId);
  if (peers.length === 0) return;
  const storageKey = getLifeOsVaultKey(app, "suitePromptSeen");
  try {
    if (localStorage.getItem(storageKey) === "1") return;
  } catch { /* ignore */ }
  const peerText = peers.join("、");
  window.setTimeout(() => {
    try {
      if (localStorage.getItem(storageKey) === "1") return;
    } catch { /* ignore */ }
    const markSeen = () => {
      try { localStorage.setItem(storageKey, "1"); } catch { /* ignore */ }
    };
    try {
      const modal = new Modal(app);
      modal.setTitle("LifeOS 套装");
      modal.contentEl.createEl("p", {
        text: `${selfName} 可与 ${peerText} 并排使用，数据均保存在同一 Obsidian 库内。`,
      });
      const row = modal.contentEl.createDiv({ cls: "modal-button-container" });
      const btn = row.createEl("button", { text: "知道了", cls: "mod-cta", type: "button" });
      btn.onclick = () => {
        markSeen();
        modal.close();
      };
      modal.open();
    } catch (_) {
      new Notice(`${selfName} 可与 ${peerText} 并排使用，数据均保存在同一 Obsidian 库内。`, 8000);
      markSeen();
    }
  }, 2200);
}

function openLifeOsExternalUrl(url) {
  if (!url) return;
  try {
    window.open(url, "_blank");
  } catch (err) {
    console.warn("[LifeOS] open external url", err);
    try { new Notice("无法打开链接"); } catch { /* ignore */ }
  }
}

function injectLifeOsActivationStyles() {
  /* CSS lives in styles.css (community plugin: no runtime <style> injection). */
}

function renderLifeOsActivationPanel(container, config) {
  injectLifeOsActivationStyles();
  container.empty();
  container.addClass("lifeos-act-panel");
  if (config.extraPanelClass) container.addClass(config.extraPanelClass);

  const wrap = container.createDiv({ cls: "lifeos-act-wrap" });
  const card = wrap.createDiv({ cls: "lifeos-act-card" });

  card.createEl("h2", { cls: "lifeos-act-title", text: config.pluginName || "LifeOS" });

  const statusText = typeof config.getStatusText === "function" ? config.getStatusText() : "";
  if (statusText) {
    card.createEl("p", { cls: "lifeos-act-status", text: statusText });
  }

  if (config.philosophy) {
    const phil = card.createEl("p", { cls: "lifeos-act-philosophy lifeos-philosophy-intro", text: config.philosophy });
    phil.addClass("lifeos-philosophy-intro");
  }

  if (config.activationPreviewRows?.length) {
    renderLifeOsActivationPreview(card, config.activationPreviewRows, config.activationPreviewNote);
  }

  if (config.showTrialButton && typeof config.onTrialStart === "function") {
    const trialBtn = card.createEl("button", {
      cls: "lifeos-act-trial-btn mod-cta",
      text: config.trialButtonLabel || "开启试用",
      type: "button",
    });
    trialBtn.onclick = () => void config.onTrialStart();
  }

  const fp = typeof config.getFingerprint === "function" ? config.getFingerprint() : "";
  const fpRow = card.createDiv({ cls: "lifeos-act-row" });
  const fpInput = fpRow.createEl("input", {
    type: "text",
    cls: "lifeos-act-input lifeos-act-fp",
    attr: { readonly: "readonly", value: fp, "aria-label": "设备指纹" },
  });
  fpInput.onclick = () => fpInput.select();
  const copyBtn = fpRow.createEl("button", {
    cls: "lifeos-act-btn",
    text: "复制",
    type: "button",
  });
  copyBtn.onclick = () => {
    if (typeof config.onCopyFingerprint === "function") void config.onCopyFingerprint(fp);
  };

  const keyRow = card.createDiv({ cls: "lifeos-act-row" });
  const keyInput = keyRow.createEl("input", {
    type: "text",
    cls: "lifeos-act-input lifeos-act-key",
    attr: { placeholder: "输入激活码", "aria-label": "激活码" },
  });
  if (config.licenseKey) keyInput.value = config.licenseKey;
  const activateBtn = keyRow.createEl("button", {
    cls: "lifeos-act-btn lifeos-act-btn-primary",
    text: config.activateShortLabel || "激活",
    type: "button",
  });

  const msgEl = card.createDiv({ cls: "lifeos-act-msg" });

  const nav = card.createDiv({ cls: "lifeos-act-nav" });
  const row1 = nav.createDiv({ cls: "lifeos-act-nav-row" });
  const row2 = nav.createDiv({ cls: "lifeos-act-nav-row" });
  const mkNav = (parent, label, onClick) => {
    const btn = parent.createEl("button", { cls: "lifeos-act-nav-btn", text: label, type: "button" });
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      void onClick();
    };
  };
  mkNav(row1, "使用说明", () => config.openUsageGuide?.());
  mkNav(row1, "更新日志", () => openLifeOsUpdateNoticeFromPlugin(config.updateNoticeTarget));
  mkNav(row2, "配置", () => config.openSettings?.());

  const activate = () => {
    const key = keyInput.value.trim();
    if (typeof config.onActivate === "function") void config.onActivate(key, msgEl, keyInput);
  };
  activateBtn.onclick = activate;
  keyInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") activate();
  });

  return { keyInput, msgEl, fpInput };
}

function injectLifeOsSettingsSharedStyles() {
  /* CSS lives in styles.css (community plugin: no runtime <style> injection). */
}

function injectLifeOsAboutStyles() {
  injectLifeOsSettingsSharedStyles();
}

const PLAINLEDGER_SHORTCUT_CAPTURE_URL = "obsidian://plainledger?action=capture";
const PLAINLEDGER_SHORTCUTS_GUIDE_PATH = "PlainLedger快捷指令使用指南.md";
const PLAINLEDGER_SHORTCUTS_GUIDE_BODY = `用 iOS「快捷指令」从主屏幕或背面轻点一键打开 PlainLedger「记一笔」，无需先翻找面板。

链接（复制到「打开 URL」）：

\`\`\`text
${PLAINLEDGER_SHORTCUT_CAPTURE_URL}
\`\`\`

---

## 一、部署（装到主屏幕）

在 iPhone 上打开「快捷指令」App：

1. 新建快捷指令
2. 添加操作 **打开 URL**
3. 粘贴上面的链接
4. （可选）名称改成「记一笔」或「PlainLedger」
5. **分享 → 添加到主屏幕**

只需「打开 URL」，不必再套「打开 App → Obsidian」。

链接也可在 Obsidian → 设置 → PlainLedger → **快捷指令** 一键复制。

---

## 二、使用

- **主屏幕图标**：点快捷指令，即可打开「记一笔」面板（默认智能录入）。
- **背面轻点**（免找图标，更快）：
  1. iPhone **设置 → 无障碍 → 触控 → 轻点背面**
  2. 选择 **轻点两下** 或 **轻点三下**
  3. 选中刚建好的快捷指令

---

## 三、说明

- 需已启用 PlainLedger；公版/体验版需在试用期内或已激活。
- 也可绑定 Obsidian 手机「下拉快捷命令」到命令 **记一笔**（与本链接效果类似）。
`;

async function openPlainLedgerShortcutsGuide(plugin) {
  const app = plugin?.app;
  if (!app?.vault) {
    new Notice("无法打开快捷指令说明");
    return;
  }
  try {
    const content = PLAINLEDGER_SHORTCUTS_GUIDE_BODY.endsWith("\n")
      ? PLAINLEDGER_SHORTCUTS_GUIDE_BODY
      : PLAINLEDGER_SHORTCUTS_GUIDE_BODY + "\n";
    let file = app.vault.getAbstractFileByPath(PLAINLEDGER_SHORTCUTS_GUIDE_PATH);
    if (!file) {
      const byName = (app.vault.getMarkdownFiles?.() || []).find((f) => f.basename === "PlainLedger快捷指令使用指南");
      if (byName) file = byName;
    }
    if (!file) {
      file = await app.vault.create(PLAINLEDGER_SHORTCUTS_GUIDE_PATH, content);
    } else {
      const old = await app.vault.read(file);
      if (old.trim() !== content.trim()) await app.vault.modify(file, content);
    }
    const leaf = app.workspace.getLeaf("tab");
    await leaf.openFile(file);
    app.workspace.revealLeaf(leaf);
  } catch (e) {
    console.warn("PlainLedger 快捷指令说明打开失败：", e);
    new Notice("无法打开快捷指令使用说明");
  }
}

/** 设置 → 快捷指令 Tab（对齐 BrainCore） */
function renderPlainLedgerShortcutsSettingsPanel(panel, plugin) {
  injectLifeOsSettingsSharedStyles();
  panel.empty();
  const wrap = panel.createDiv({ cls: "lifeos-about-panel lifeos-settings-grid" });
  const block = wrap.createDiv({ cls: "lifeos-settings-block" });
  new Setting(block).setName("快捷指令（iOS）").setHeading();
  block.createEl("p", {
    cls: "lifeos-settings-desc",
    text: "部署：在你的 iPhone 上打开「快捷指令」App：新建→「打开 URL」→粘贴链接→添加到主屏幕（具体可见使用指南）",
  });
  block.createEl("p", {
    cls: "lifeos-settings-desc",
    text: "使用：点击快捷指令，可快速打开「记一笔」；也可在 iPhone：设置→无障碍→触控→轻点背面→绑定该快捷指令",
  });

  const helpRows = block.createDiv();
  const guideRow = helpRows.createDiv({ cls: "lifeos-about-link-row" });
  guideRow.createSpan({ text: "快捷指令使用说明" });
  const guideBtn = guideRow.createEl("button", { cls: "lifeos-act-btn", text: "打开", type: "button" });
  guideBtn.onclick = () => void openPlainLedgerShortcutsGuide(plugin);

  const copyShortcutUrl = async (url) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        new Notice("链接已复制");
        return;
      }
    } catch (_) { /* fall through */ }
    new Notice("请手动全选复制链接");
  };
  block.createEl("p", { cls: "lifeos-about-meta", text: "记一笔链接" });
  const row = block.createDiv({ cls: "lifeos-act-row" });
  const input = row.createEl("input", {
    type: "text",
    cls: "lifeos-act-input",
    attr: { readonly: "readonly", value: PLAINLEDGER_SHORTCUT_CAPTURE_URL, "aria-label": "记一笔链接" },
  });
  input.onclick = () => input.select();
  const btn = row.createEl("button", { cls: "lifeos-act-btn", text: "复制", type: "button" });
  btn.onclick = () => void copyShortcutUrl(PLAINLEDGER_SHORTCUT_CAPTURE_URL);
}

function renderLifeOsAboutPanel(panel, plugin, options = {}) {
  injectLifeOsAboutStyles();
  panel.empty();
  const wrap = panel.createDiv({ cls: "lifeos-about-panel lifeos-settings-grid" });

  const helpBlock = wrap.createDiv({ cls: "lifeos-settings-block" });
  new Setting(helpBlock).setName("文档").setHeading();
  const helpRows = helpBlock.createDiv();
  const addLinkRow = (parent, label, onClick) => {
    const row = parent.createDiv({ cls: "lifeos-about-link-row" });
    row.createSpan({ text: label });
    const btn = row.createEl("button", { text: "打开", type: "button" });
    btn.onclick = () => void onClick();
  };
  addLinkRow(helpRows, "使用说明", () => {
    if (typeof options.openUsageGuide === "function") void options.openUsageGuide();
  });
  addLinkRow(helpRows, "更新日志", () => openLifeOsUpdateNoticeFromPlugin(plugin));

  const authorBlock = wrap.createDiv({ cls: "lifeos-settings-block" });
  new Setting(authorBlock).setName("作者").setHeading();
  authorBlock.createEl("p", { cls: "lifeos-about-meta", text: `作者：${LIFEOS_AUTHOR_NAME}` });
  authorBlock.createEl("p", { cls: "lifeos-about-meta", text: `版权信息：${LIFEOS_COPYRIGHT}` });
  const homeRow = authorBlock.createDiv({ cls: "lifeos-about-home-row" });
  homeRow.createSpan({ text: "主页：" });
  const homeLink = homeRow.createEl("a", {
    cls: "lifeos-about-home-link",
    text: LIFEOS_AUTHOR_HOMEPAGE,
    href: LIFEOS_AUTHOR_HOMEPAGE,
  });
  homeLink.onclick = (e) => {
    e.preventDefault();
    openLifeOsExternalUrl(LIFEOS_AUTHOR_HOMEPAGE);
  };

  const worksBlock = wrap.createDiv({ cls: "lifeos-settings-block" });
  new Setting(worksBlock).setName("所有作品").setHeading();
  const enabled = getEnabledLifeOsPlugins(plugin.app);
  const selfId = plugin?.manifest?.id || options.selfId || "";
  worksBlock.createEl("p", {
    cls: "lifeos-suite-badge",
    text: `LifeOS 套装已安装 ${enabled.length}/3`,
  });
  const works = worksBlock.createDiv({ cls: "lifeos-about-works" });
  LIFEOS_PLUGIN_CATALOG.forEach((item) => {
    const itemEl = works.createDiv({ cls: "lifeos-about-work-item" });
    itemEl.createEl("p", { cls: "lifeos-about-work-name", text: item.name });
    itemEl.createEl("p", { cls: "lifeos-about-work-intro", text: item.intro });
    if (item.price) {
      itemEl.createEl("p", {
        cls: "lifeos-about-work-price",
        text: `48 小时试用 · ${item.price} 永久激活`,
      });
    }
    if (item.philosophy) {
      itemEl.createEl("p", { cls: "lifeos-about-work-philosophy", text: item.philosophy });
    }
    const actions = itemEl.createDiv({ cls: "lifeos-about-work-actions" });
    const installed = !!(
      plugin.app?.plugins?.plugins?.[item.id] ||
      (item.id === "braincore-lifeos" &&
        (plugin.app?.plugins?.plugins?.["braincore-lifeos-personal"] ||
          plugin.app?.plugins?.plugins?.["braincore-dashboard"]))
    );
    if (item.id === selfId) {
      actions.createEl("button", { text: "当前插件", type: "button", cls: "is-self" });
    } else if (installed) {
      const btn = actions.createEl("button", { text: "打开设置", type: "button" });
      btn.onclick = () => openLifeOsPluginSettings(plugin.app, item.id);
    } else {
      const btn = actions.createEl("button", { text: "去了解", type: "button" });
      btn.onclick = () => {
        if (item.repoUrl) openLifeOsExternalUrl(item.repoUrl);
        else new Notice(`请先在 Obsidian 设置 → 第三方插件 中启用 ${item.name}`);
      };
    }
  });
}

function renderLifeOsLicenseSettingsPanel(panel, config) {
  injectLifeOsSettingsSharedStyles();
  panel.empty();
  const grid = panel.createDiv({ cls: "lifeos-settings-grid" });
  const card = grid.createDiv({ cls: "lifeos-settings-block" });
  const heading = new Setting(card).setName("授权激活").setHeading();
  if (config.desc) heading.setDesc(config.desc);
  if (config.trialHint) card.createEl("p", { cls: "lifeos-license-trial-hint", text: config.trialHint });

  const fp = config.getFingerprint?.() || "";
  const fpRow = card.createDiv({ cls: "lifeos-act-row" });
  const fpInput = fpRow.createEl("input", {
    type: "text",
    cls: "lifeos-act-input lifeos-act-fp",
    attr: { readonly: "readonly", value: fp, "aria-label": "设备指纹" },
  });
  fpInput.onclick = () => fpInput.select();
  const copyBtn = fpRow.createEl("button", { cls: "lifeos-act-btn", text: "复制", type: "button" });
  copyBtn.onclick = () => void config.onCopyFingerprint?.(fp);

  let keyValue = config.licenseKey || "";
  const keyRow = card.createDiv({ cls: "lifeos-act-row" });
  const keyInput = keyRow.createEl("input", {
    type: "text",
    cls: "lifeos-act-input lifeos-act-key",
    attr: { placeholder: "输入激活码", "aria-label": "激活码" },
  });
  keyInput.value = keyValue;
  keyInput.addEventListener("input", () => { keyValue = keyInput.value.trim(); });
  const activateBtn = keyRow.createEl("button", {
    cls: "lifeos-act-btn lifeos-act-btn-primary",
    text: "激活",
    type: "button",
  });
  activateBtn.onclick = () => void config.onActivate?.(keyValue.trim());
  keyInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") void config.onActivate?.(keyValue.trim());
  });

  if (config.activated) {
    card.createEl("p", { cls: "lifeos-license-status", text: "已激活，永久有效" });
  }
}

function getLifeOsMaxOverlayZIndex() {
  let max = 100000;
  const nodes = document.querySelectorAll(
    ".modal-container, .modal-bg, .modal, .vertical-tab-content, .vertical-tab-header, .menu, .suggestion-container, .popover, .workspace-leaf-content, .plg-overlay, .lifeos-overlay"
  );
  nodes.forEach((el) => {
    try {
      const raw = el.style?.zIndex || window.getComputedStyle(el).zIndex || "0";
      const z = parseInt(raw, 10);
      if (!Number.isNaN(z) && z > max) max = z;
    } catch (_) { /* ignore */ }
  });
  // 设置页打开时再抬一档，避免个别主题 / 手机端模态 z-index 读偏导致二级弹层被盖
  try {
    if (document.querySelector(".modal-container .vertical-tab-header, .modal-container .vertical-tab-content")) {
      max = Math.max(max, 5000000);
    }
  } catch (_) { /* ignore */ }
  return max + 500;
}

function isObsidianSettingsOpen(app) {
  try {
    const setting = app?.setting;
    if (!setting) return false;
    if (setting.activeTab) return true;
    const el = setting.containerEl;
    if (el?.isConnected && el.offsetParent !== null) return true;
  } catch (_) { /* ignore */ }
  for (const c of document.querySelectorAll(".modal-container")) {
    if (c.querySelector(".vertical-tab-content, .vertical-tab-header")) return true;
  }
  return false;
}

function runLifeOsUpdateNotice(plugin) {
  if (!plugin) return;
  if (typeof plugin.showUpdateNoticeForce === "function") {
    plugin.showUpdateNoticeForce();
    return;
  }
  if (typeof plugin.showUpdateNotice === "function") {
    plugin.showUpdateNotice(true);
    return;
  }
  if (typeof plugin.maybeShowUpdateNotice === "function") {
    plugin.maybeShowUpdateNotice(undefined, true);
  }
}

function openLifeOsUpdateNoticeFromPlugin(plugin) {
  if (!plugin) return;
  const app = plugin.app;
  if (app && isObsidianSettingsOpen(app)) {
    try { app.setting.close(); } catch (_) { /* ignore */ }
    window.setTimeout(() => runLifeOsUpdateNotice(plugin), 120);
    return;
  }
  runLifeOsUpdateNotice(plugin);
}

function elevateLifeOsUpdateModal(modal) {
  const apply = () => {
    if (!modal?.modalEl) return;
    const z = String(getLifeOsMaxOverlayZIndex());
    const container = modal.modalEl.closest(".modal-container");
    if (!container) return;
    container.addClass("lifeos-update-modal-host");
    applyCssProps(container, { "--lifeos-update-z": z });
    const bg = container.querySelector(".modal-bg");
    if (bg) {
      bg.addClass("lifeos-update-modal-bg");
      applyCssProps(bg, { "--lifeos-update-z": z });
    }
    applyCssProps(modal.modalEl, { "--lifeos-update-z": z });
  };
  window.requestAnimationFrame(() => {
    apply();
    window.requestAnimationFrame(apply);
  });
  window.setTimeout(apply, 50);
  window.setTimeout(apply, 180);
}

const USAGE_GUIDE_PATH = "PlainLedger 使用说明.md";
const USAGE_GUIDE_VERSION = "2026-08-28-plainledger-v9";

const USAGE_GUIDE_CONTENT = `> **PlainLedger** 是运行在 Obsidian 里的独立记账面板——账单、分类、订阅规则都保存在**你的库内 JSON**，随 Obsidian / iCloud / Git 同步，不依赖第三方账 App，也不把数据上传到云端服务。

**和记帐 App 的区别：**

\`\`\`text
记帐 App：数据在 App 里，和笔记割裂
PlainLedger：数据在库里，和日记 / 项目 / 复盘同屏共存
\`\`\`

**核心优势一览：**

| 能力 | 说明 |
|------|------|
| 库内自持 | \`Finance/PlainLedger/ledger.json\` 纯文本，可备份、可 diff、可脚本处理 |
| 三种录入 | 智能一句话、手动表单、截图 OCR（支付宝 / 微信账单截图） |
| 订阅 & 周期 | 续费提醒、待入账、分期 / 周期规则，到期一键入账 |
| 月结结转 | 每月 1 日自动将当年累计净收支结转至当月（可关） |
| 多维视图 | 账本 / 统计 / 报表 五 Tab，口径统一；日历在账本内切换 |
| 日记联动 | 记账后可选追加一行到当日 \`.md\` 笔记 |
| 全平台 | Mac / Windows / iOS / Android Obsidian 同库同步 |

---

## 目录

- [[#一、PlainLedger 适合谁]]
- [[#二、安装与文件说明]]
- [[#三、如何打开面板]]
- [[#四、公版与体验版激活]]
- [[#五、记一笔：三种方式]]
- [[#六、账本：一眼看懂本月]]
- [[#七、账本 · 统计 · 报表]]
- [[#八、订阅 · 待入账 · 周期]]
- [[#九、设置页说明]]
- [[#十、数据文件与备份]]
- [[#十一、更新说明]]
- [[#十二、常见问题]]

---

## 一、PlainLedger 适合谁

- 已经在用 Obsidian 管理生活 / 工作，希望**记账和笔记在同一体系**
- 不想 monthly 再开一个 App，又希望有**预算、趋势、报表、日历**
- 需要**订阅 / 续费 / 分期**提醒，而不是只记流水
- 重视**数据所有权**——JSON 在本地，导出 Excel / CSV 随时可做

---

## 二、安装与文件说明

**最小安装（推荐）：**

\`\`\`text
你的库/.obsidian/plugins/plain-ledger/
├── main.js
├── manifest.json
├── styles.css
└── default-ledger.json   ← 公版样例 / 可选
\`\`\`

**可选：** \`vendor/lang/\` 仅在使用**截图 OCR** 且希望离线识别时需要；不用截图可省略。

**自动生成（无需打包）：**

| 文件 | 说明 |
|------|------|
| \`.obsidian/plugins/plain-ledger/data.json\` | 插件设置（预算、激活码等），Obsidian 首次保存时自动创建 |
| \`Finance/PlainLedger/ledger.json\` | 真实账单数据，首次记账或导入后生成 |

安装后在 **设置 → 第三方插件** 启用 PlainLedger，建议重载一次。

---

## 三、如何打开面板

- 左侧 Ribbon **钱包图标**
- 命令面板：**打开 PlainLedger 面板** / **记一笔**
- 底部 Tab：**账本 · 统计 · 记一笔 · 报表 · 设置**（记一笔为底栏居中按钮）
- **iOS 快捷指令**：主屏幕或背面轻点 → 打开 URL \`obsidian://plainledger?action=capture\`（设置 → **快捷指令** 可复制；说明见《PlainLedger快捷指令使用指南》）

---

## 四、公版与体验版激活

个人版无需激活，首次打开即可使用。

### 公版（需激活码）

1. 安装并启用插件后，**首次打开会自动加载**完整分类（18 类 · 117 二级）与 **6 笔示意账单**
2. 在侧边栏激活页复制设备指纹 \`PLG-XXXXXXXX\`（绑定 **Obsidian 库名称**）
3. 发给作者获取 \`KEY-XXXXXXXX\`，输入激活码并点击 **激活**
4. 激活成功后 **永久有效**（同一库 Mac / iPhone 共享）

### 体验版（48 小时试用）

1. 安装并启用后，在侧边栏激活页点击 **「开启 48 小时试用」**
2. 点击后 **自动注入** 完整分类（18 类 · 117 二级）与 **6 笔示意账单**，无需手动恢复样例
3. 试用期间全功能可用；到期后须输入激活码才能继续记账，**库内数据不会丢失**
4. 试用中可随时输入激活码转为永久版

> **更新日志**与**完整使用说明**不会在启动时自动弹出；请在激活页或 **设置 → 关于** 手动打开。

---

## 五、记一笔：三种方式

### 智能录入（推荐）

输入自然语言，例如：

\`\`\`text
午餐 28 餐饮
打车 35 交通
工资 15000 工作收入
\`\`\`

支持金额、分类关键词、时间词（昨天 / 上周三等）。可在 **设置 → 全局关键词** 定制映射。

### 手动录入

选一级 / 二级分类、金额、时间、备注、是否报销等，适合精确补账。

### 截图 OCR

粘贴支付宝 / 微信账单截图，自动识别金额与商户（首次需准备 OCR 语言包，可离线 \`vendor/lang\` 或联网下载）。

---

## 六、账本：一眼看懂本月

- **本月支出**：当前自然月支出合计，右侧显示收入与月度结余；支出旁显示较上月环比
- **月度结余**：当月真实收支（**不含**月结结转行）
- **年累计结余**：当年 1 月起累计（**不含**结转）
- **预算环**：设置本月预算后显示进度，超支高亮
- **待入账**：订阅 / 周期到期项，一点入账
- **账单列表**：按日分组，支持搜索、分类筛选、报销筛选

**月结行：** 每月 1 日系统自动生成，只读；日合计「支」不含月结。可在 **设置 → 基础与预算 → 月结自动结转** 关闭。

---

## 七、账本 · 统计 · 报表

| Tab | 你能看到什么 |
|-----|----------------|
| **账本** | 本月横幅、预算、待入账、账单列表；可切换 **日历** 热力视图 |
| **统计** | 汇总表（10 行滚动 + 表底总计同/环）· 时间行 ⓘ 提示 · 消费洞察 |
| **记一笔** | 底栏居中按钮，智能 / 手动 / 截图记账 |
| **报表** | 分类占比环图（含「其他」桶）、主题筛选、分类明细；筛选状态会记住；手机端搜索框与收入/支出、一级/二级下拉同排显示 |

各页「结余 / 支出」口径与账本一致，避免不同 Tab 数字对不上。

---

## 八、订阅 · 待入账 · 周期

在 **设置 → 规则** Tab（与常用、分类、数据并列）：

- **订阅服务**：Netflix、iCloud+ 等续费周期，到期进入待入账
- **周期 / 分期**：固定周期扣款或分期计划
- **待入账**：首页与设置均可一键确认入账

适合管理「还没扣款但已知将要发生」的支出，避免月底才发现漏记。

---

## 九、设置页说明

Obsidian **设置 → 第三方插件 → PlainLedger** 与面板激活页 **高级配置** 为同一入口。桌面端标题格式为 **PlainLedger 配置 · 个人版 v4.0.4**（版本号在标题末尾）。

| Tab | 内容 |
|------|------|
| 授权 | 公版 / 体验版指纹 + 激活码（个人版无此项） |
| **常用** | 基础与预算、日记联动 |
| **分类** | 一级 / 二级分类管理 |
| **规则** | 待入账、订阅、周期、全局关键词（点标题折叠 / 展开） |
| **数据** | 导入导出、数据目录、数据文件路径 |
| **快捷指令** | iOS 主屏 / 背面轻点：复制记一笔链接 |
| **关于** | 更新日志、使用说明、作者与套装作品 |

公版首次打开或体验版 **开启试用** 后，内置完整分类体系（18 类 · 117 二级）与 6 笔示意账单；激活后 **分类** Tab 默认展开。

---

## 十、数据文件与备份

| 路径 | 内容 |
|------|------|
| \`Finance/PlainLedger/ledger.json\` | 账单、分类、订阅、周期规则 |
| \`.obsidian/plugins/plain-ledger/data.json\` | 插件设置 |

**建议：** 定期 **设置 → 数据管理 → 导出 JSON**；大改前先导出一版。

导入支持 **PlainLedger JSON**（整包替换）与 **Excel**（默认合并流水，保留订阅 / 周期规则）。

---

## 十一、更新日志

升级后**不会**在启动时自动弹出更新日志。

随时可在 **设置 → 关于 → 更新日志** 或激活页手动打开（本次更新默认展开，历史版本折叠）。

---

## 十二、常见问题

### Q：体验版需要手动导入样例吗？

不需要。点击 **「开启 48 小时试用」** 后会自动写入分类与 6 笔示意账单。

### Q：公版样例数据能删吗？

可以。激活后清空或导入自己的 Excel / JSON 即可。

### Q：为什么没有 data.json？

\`data.json\` 是 Obsidian 在保存设置时**自动生成**的，安装包里没有是正常的。

### Q：vendor 文件夹必须吗？

不必须。只有截图 OCR 且希望离线识别时才需要 \`vendor/lang/\`。

### Q：升级后还会自动弹使用说明或更新日志吗？

不会。启动时不再自动弹出任何引导或更新弹窗；**使用说明**、**更新日志**均在激活页或 **设置 → 关于** 手动打开。

---

## 一句话总结

**Obsidian 是你的知识库，PlainLedger 是你的账本——数据留在库里，记一笔、看统计、管订阅，都在同一个面板完成。**
`;

async function ensureWelcomeGuideFile(app, settings, saveSettings) {
  try {
    const alreadyCurrent = settings?.welcomeGuideVersion === USAGE_GUIDE_VERSION;
    let guideFile = app.vault.getAbstractFileByPath(USAGE_GUIDE_PATH);
    if (!guideFile) {
      guideFile = await app.vault.create(USAGE_GUIDE_PATH, USAGE_GUIDE_CONTENT);
    } else if (!alreadyCurrent) {
      await app.vault.modify(guideFile, USAGE_GUIDE_CONTENT);
    }
    if (settings && saveSettings && !alreadyCurrent) {
      settings.welcomeGuideVersion = USAGE_GUIDE_VERSION;
      await saveSettings();
    }
    return guideFile;
  } catch (err) {
    console.warn("[PlainLedger] usage guide file", err);
    return null;
  }
}

async function openUsageGuideInNewTab(app, settings, saveSettings) {
  await ensureWelcomeGuideFile(app, settings, saveSettings);
  try {
    const file = app.vault.getAbstractFileByPath(USAGE_GUIDE_PATH);
    if (!file) return;
    const leaf = app.workspace.getLeaf("tab");
    await leaf.openFile(file);
    app.workspace.revealLeaf(leaf);
  } catch (err) {
    console.warn("[PlainLedger] open usage guide", err);
  }
}

const WELCOME_GUIDE_DISMISSED = "dismissed";

function showWelcomeGuideModal(app, plugin, options = {}) {
  if (!options.force && plugin.settings.welcomeGuideVersion === WELCOME_GUIDE_DISMISSED) return;
  plugin._welcomeShownThisSession = true;
  if (typeof injectUpdateNoticeStyles === "function") injectUpdateNoticeStyles();

  const modal = new Modal(app);
  modal.modalEl.addClass("plg-update-modal");
  modal.titleEl.hide();
  modal.contentEl.empty();

  const wrap = modal.contentEl.createDiv({ cls: "plg-update-wrap" });
  const hero = wrap.createDiv({ cls: "plg-update-hero" });
  hero.createDiv({ cls: "plg-update-badge", text: "指南" });
  hero.createEl("h2", { cls: "plg-update-title", text: "PlainLedger 快速上手" });
  hero.createEl("p", {
    cls: "plg-update-subtitle",
    text: "快速上手弹窗，需手动打开；完整文档见《PlainLedger 使用说明》。",
  });

  const body = wrap.createDiv({ cls: "plg-update-body" });
  const block = body.createDiv({ cls: "plg-update-section" });
  block.createDiv({ cls: "plg-update-section-head", text: "快速上手" });
  const list = block.createEl("ul", { cls: "plg-update-list" });
  const tips = typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "trial24h"
    ? [
      "左侧钱包图标打开 PlainLedger 面板",
      "侧边栏点击「开启 48 小时试用」后自动加载 18 类 · 117 二级与 6 笔示意账单",
      "三种记一笔：智能一句话、手动表单、截图 OCR",
      "试用到期后输入激活码即可永久使用，库内数据不丢失",
      "分类 / 订阅 / 周期在设置页管理；完整说明可在设置中打开",
    ]
    : typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public"
    ? [
      "左侧钱包图标打开 PlainLedger 面板",
      "公版已内置 18 类 · 117 个二级分类，仅 6 笔示意账单",
      "三种记一笔：智能一句话、手动表单、截图 OCR",
      "公版需激活码；激活后永久有效，同库 Mac / iPhone 共享",
      "分类 / 订阅 / 周期在设置页管理；完整说明可在设置中打开",
    ]
    : [
      "左侧钱包图标打开 PlainLedger 面板",
      "三种记一笔：智能一句话、手动表单、截图 OCR",
      "账本 / 统计 / 报表 五 Tab 口径统一",
      "分类 / 订阅 / 周期在设置页管理",
      "数据保存在库内 JSON，随 iCloud / Git 同步",
    ];
  tips.forEach((note, idx) => {
    const item = list.createEl("li", { cls: "plg-update-item" });
    item.createSpan({ cls: "plg-update-num", text: String(idx + 1) });
    item.createSpan({ text: note });
  });

  const foot = wrap.createDiv({ cls: "plg-update-foot" });
  const btn = foot.createEl("button", { cls: "plg-update-btn", text: "知道了" });
  btn.onclick = async () => {
    plugin.settings.welcomeGuideVersion = WELCOME_GUIDE_DISMISSED;
    await plugin.saveSettings();
    modal.close();
  };

  modal.open();
  if (typeof elevateUpdateModalLayer === "function") elevateUpdateModalLayer(modal);
}

/** 设置页 / 激活页手动打开完整 Markdown 说明 */
async function openWelcomeGuideOnce(app, settings, saveSettings, options = {}) {
  void options;
  await openUsageGuideInNewTab(app, settings, saveSettings);
}

function getPlgPluginDisplayName() {
  return typeof PLUGIN_DISPLAY_NAME === "string" && PLUGIN_DISPLAY_NAME ? PLUGIN_DISPLAY_NAME : "PlainLedger";
}

function getPlgActivationStatusText(plugin) {
  if (isTrialEdition() && isTrialActive(plugin.app, plugin.settings)) {
    return `试用中 · 剩余 ${formatTrialRemaining(getTrialRemainingMs(plugin.app, plugin.settings))}`;
  }
  if (isTrialEdition() && plugin.settings.trialWelcomeSeen && getTrialRemainingMs(plugin.app, plugin.settings) <= 0) {
    return `${getTrialHoursLabel()}试用已到期，请输入激活码`;
  }
  return "";
}

function renderActivationPanel(container, plugin) {
  const isPublic = typeof PLUGIN_EDITION === "string" && (PLUGIN_EDITION === "public" || PLUGIN_EDITION === "trial24h");
  const previewRows = isPublic
    ? [
        { label: "示意账单", value: "6 笔" },
        { label: "分类", value: "18 类" },
        { label: "二级分类", value: "117 项" },
      ]
    : null;
  renderLifeOsActivationPanel(container, {
    extraPanelClass: "plg-activation-panel",
    pluginName: getPlgPluginDisplayName(),
    philosophy: typeof PLUGIN_PHILOSOPHY_SUBTITLE !== "undefined" ? PLUGIN_PHILOSOPHY_SUBTITLE : "",
    getStatusText: () => getPlgActivationStatusText(plugin),
    activationPreviewRows: previewRows,
    activationPreviewNote: previewRows ? "激活后可加载公版示意数据，便于体验报表与统计" : undefined,
    showTrialButton: isTrialEdition() && !plugin.settings.trialWelcomeSeen && !plugin.settings.licenseActivated,
    trialButtonLabel: `开启 ${getTrialHoursLabel()} 试用`,
    onTrialStart: () => startTrialFromActivationPanel(plugin),
    getFingerprint: () => getVaultFingerprint(plugin.app),
    licenseKey: plugin.settings.licenseKey,
    activateShortLabel: "激活",
    onCopyFingerprint: async (fp) => {
      const ok = await copyTextToClipboard(fp);
      new Notice(ok ? "设备指纹已复制" : "请手动全选复制指纹");
    },
    onActivate: async (key, msgEl) => {
      if (!key) {
        msgEl.setText("请输入激活码");
        msgEl.addClass("error");
        return;
      }
      msgEl.removeClass("error");
      plugin.settings.licenseKey = key;
      syncLicenseState(plugin.app, plugin.settings);
      if (plugin.settings.licenseActivated) {
        await plugin.saveSettings();
        new Notice("激活成功，之后将永久有效");
        await plugin.onLicenseActivated();
      } else {
        plugin.settings.licenseActivated = false;
        await plugin.saveSettings();
        msgEl.setText("激活码不正确，请核对后再试");
        msgEl.addClass("error");
      }
    },
    openUsageGuide: () => openUsageGuideInNewTab(plugin.app),
    openSettings: () => plugin.openDashboardSettings(),
    updateNoticeTarget: plugin,
  });
}

function injectActivationPanelStyles() {
  injectLifeOsActivationStyles();
}

/** 插件显示名（更新日志标题等） */
const PLUGIN_DISPLAY_NAME = "PlainLedger";

/** 一句话介绍（更新日志 / 关于页首段） */
const PLUGIN_INTRO = "这是一个专为 Obsidian 开发的记账软件。";

/** 更新弹窗理念文案 */
const PLUGIN_PHILOSOPHY_SUBTITLE =
  "记账不必离开笔记——PlainLedger 把账单、分类、订阅规则保存在 Obsidian 库内，随 iCloud / Git 同步，和日记、复盘同屏共存。";

/** 按版本维护；弹窗默认展开最新版，历史版本点击展开 */
const PLUGIN_CHANGELOG = {
  "4.0.27": [
    "恢复：iconfont 在线搜索、订阅 favicon、OCR 语言包 CDN（产品能力保留）",
    "保留：设置页无 inline !important、英文 description、CSS 审核清理",
  ],
  "4.0.26": [
    "审核：设置页 inline !important 清理与英文 description（Scorecard）",
    "审核：CSS 去掉 !important / :has",
  ],
  "4.0.25": [
    "体验：首启 / 套装提示可点「去了解」打开套装说明，不再误关卡片",
    "设置：数据文件行不再被 Setting 控件挡字；锁定提示与中文 Notice 对齐",
    "外观：手机底栏 inset 滞回更稳；设置页顶距与 LifeOS 一致",
  ],
  "4.0.24": [
    "外观：设置内二级弹层标题左右内边距，避免贴边",
  ],
  "4.0.23": [
    "修复：设置里点编辑/iconfont 被设置窗盖住（改用 Obsidian 原生 Modal 叠层）",
    "外观：设置页与相关滚动区统一无痕滚动（隐藏滚动条）",
  ],
  "4.0.22": [
    "修复：Obsidian 设置里点编辑/iconfont 时二级面板被设置窗盖住（Popover 顶层 + 挂进 .modal）",
  ],
  "4.0.21": [
    "修复：侧栏切到 PlainLedger 时 inset 观察过宽导致界面卡顿",
    "修复：设置内更换图标时二级面板挂到设置模态最上层（对齐折柳叠层逻辑）",
    "外观：导航彩色图标与侧栏钱包图标恢复为 4.0.3",
  ],
  "4.0.20": [
    "修复：手机端账本本年/本月/本周与预算区网格未占满整行导致数字叠在一起",
    "修复：设置内 iconfont 二级面板在部分库/主题下被一级设置窗盖住（z-index 再抬高）",
  ],
  "4.0.19": [
    "恢复：iconfont 在线搜索、订阅 favicon（DuckDuckGo / Google）与 OCR CDN 原逻辑",
    "修复：设置内 iconfont 二级面板 z-index，挂到 body 并压过一级设置窗",
    "外观：导航默认图标按 vendor 最初彩色 SVG 对齐",
  ],
  "4.0.18": [
    "审核：去掉 iconfont / favicon / OCR CDN 外网请求，降低 Scorecard 风险披露",
  ],
  "4.0.17": [
    "审核：manifest.description 改以英文句号结尾（Scorecard 不认中文 。）",
  ],
  "4.0.16": [
    "设置：体验包激活后标题显示「公版」，不再写「48小时体验版」",
  ],
    "4.0.15": [
    "审核：去掉记一笔 Tab 的 !important；build 默认 trial48h；package license=MIT",
    "审核：manifest 英文 description；README 版本对齐；新增 release-check",
  ],
  "4.0.14": [
    "修复：记一笔三 Tab 叠层显示（截图页串入智能/手动内容）",
    "修复：侧栏图标改回钱包；主面板无痕滚动（隐藏滚动条）",
  ],
  "4.0.13": [
    "修复：插件启用加载失败（日历热力 CSS 属性语法错误）",
  ],
  "4.0.12": [
    "公开 README：中文在前、英文在后；上传账单/智能/手动/订阅截图",
  ],
  "4.0.11": [
        "社区 CSS lint：去掉 !important、text-indent、column-gap、display:contents 等审核警告",
        "文档：公开 README 恢复中文说明（英文 Installation 仍在文首）",
    ],
    "4.0.10": [
        "社区审核：OCR 语言包改用 vault.adapter.readBinary 读取（去掉 require(\"fs\") Behavior Warning）",
        "文档：README 保持英文短说明；中文说明移至 README.zh.md",
    ],
    "4.0.9": [
        "社区审核：minAppVersion 升至 1.7.2（workspace.revealLeaf）",
        "文档：README 英中双语（Installation / Usage）",
    ],
    "4.0.8": [
        "社区审核：设置页区块标题统一 Setting.setHeading()，消除 scorecard heading Error",
        "社区审核：关于/授权/快捷指令与布局 helper 同步改用 setHeading",
    ],
    "4.0.7": [
        "社区审核：去掉运行时注入 style / 内联样式 / innerHTML，满足目录 Error 规则",
        "构建：公开包 build 固定 trial 版，与 Release main.js 一致",
    ],
    "4.0.6": [
        "社区审核：补充 TypeScript 模块入口（src/main.ts），满足目录源码检测",
        "文档：公开 README 英文 Installation / Usage 前置",
    ],
  "4.0.5": [
    "社区分发：公开包改为 48 小时试用，到期后 ¥39.9 永久激活",
    "关于：所有作品互相介绍售价，未安装可跳转 GitHub 了解/安装",
    "体验版：试用时长统一为 48 小时（与 BrainCore / 纪念日对齐）",
  ],
  "4.0.4": [
    "iOS：新增快捷指令入口 obsidian://plainledger?action=capture，一点打开「记一笔」",
    "设置：新增「快捷指令」Tab（复制链接 + 使用说明）",
  ],
  "4.0.3": [
    "设置·规则：待入账 / 订阅 / 周期 / 关键词恢复点标题折叠，无折叠箭头",
    "设置·规则：订阅与周期卡片改为上信息、下操作；指标卡宽窄屏自适应列数",
    "关于：所有作品改为纵向排列",
    "设置·数据：移除与关于重复的「帮助与更新」；折叠区块去掉箭头、点标题仍可展开收起",
    "文档：使用说明中更新日志入口改为「设置 → 关于」",
  ],
  "4.0.2": [
    "导入：Excel 取消「合并」时与 JSON 一样需危险确认，避免误清空订阅/周期",
    "订阅/周期：补账去重命中后继续追后续期次，不再一次只追一期",
    "手机：底 Tab 恢复避让 Obsidian 悬浮导航（safe-area + 导航高度），不再与系统底栏重叠",
    "记一笔：手动底栏恢复 Home Indicator safe-area 内边距",
    "手机顶距：LIFEOS / 设置统一固定 41px spacer（host 负责 safe-area）",
    "设置浮层与账本：safe-area 顶底/左右；窄屏 action-row 可换行；分类 4 列、触控加大",
  ],
  "4.0.1": [
    "设置·分类：支出/收入改为矮胶囊左右切换",
    "设置·分类编辑：去掉顶部大片空白，弹层按内容贴底",
    "设置·全局关键词：文案精简，添加行改为一行网格排布",
    "设置·数据：导入/导出/打开等按钮右对齐",
  ],
  "3.0.5": [
    "设置：版本号并入标题行（如 PlainLedger 配置 · 个人版 v3.0.5），移除 LifeOS 副标题行",
    "LifeOS：About「打开设置」跳转修复；About 桌面三列卡片布局",
    "记一笔：移除旧 plg-capture-modal-mobile CSS，统一 overlay 路径",
    "BrainCore：使用说明改为库内 .md；修复加载失败",
  ],
  "3.0.4": [
    "LifeOS：About 套装打开设置、桌面作品卡片布局",
    "纪念日：移除移动端顶栏「+」；底部提示增删改说明",
  ],
  "3.0.3": [
    "LifeOS：统一 onboarding / 空状态 / About 套装计数 / 激活文案「验证并激活」",
    "账本：恢复个人版首次引导；首页软刷新同步预算环与横幅",
    "记一笔：移动端默认隐藏截图 OCR；公版激活页示意预览",
    "文档：README / Design Tokens 同步至 3.0.3",
  ],
  "3.0.2": [
    "LifeOS：三插件版本统一至 3.0.2",
  ],
  "3.0.1": [
    "关于：所有作品理念行与简介同字号同色，去掉句末句号",
  ],
  "3.0.0": [
    "LifeOS 3.0 统一发布：统计/报表 Tab 增量刷新，保留工具栏与滚动位置",
    "关于：所有作品展示简介 + 理念双行；移除底部插件互链",
    "性能：stats/reports 仅替换数据区 DOM，减少侧边栏打开时的重建开销",
  ],
  "2.53.0": [
    "LifeOS 2026.07.16：同步轮询 30s、无变化跳过月结重算与 DOM 重建",
    "性能：账单搜索 debounce；统一 LifeOS 强调色与版本展示格式",
    "文档：移除启动弹窗描述，使用说明/更新日志改由激活页与设置打开",
  ],
  "2.52.48": [
    "账本：手机端「本月预算」与「本年」列对齐，预算金额与「本周」列对齐",
  ],
  "2.52.47": [
    "修复：手机端预算列对齐改动导致插件无法加载（重复变量声明）",
  ],
  "2.52.46": [
    "账本：手机端预算三栏与上方本年/本月/本周三卡共用列轨道，垂直对齐",
  ],
  "2.52.45": [
    "账本：手机端预算区文案改单行（已消费/日均/每日可消费），剩余额度标签在上",
    "账本：手机端预算输入框缩短且金额居中",
  ],
  "2.52.44": [
    "账本：手机端预算金额移至「本月预算」标题行右侧（带底色），三栏等分对齐",
    "账本：手机端待入账与账单列表间距收紧",
  ],
  "2.52.43": [
    "账本：手机端预算区三栏右对齐、字号收紧，预算输入框缩小并与剩余额度对齐",
    "账本：手机端待入账展开改为标题在上、明细向下展开",
  ],
  "2.52.42": [
    "账本：手机端预算区恢复「本月预算」标题，三栏对齐为环图 / 预算·剩余 / 日均·每日可消费",
    "账本：手机端待入账移至预算区底部横条，点击展开逻辑不变",
  ],
  "2.52.41": [
    "账本：手机端首页纵向间距压缩，预算区改为环图 + 预算/剩余 + 待入账三栏同排",
    "账本：手机端待入账点击展开逻辑不变，列表在预算区下方全宽展示",
  ],
  "2.52.40": [
    "修复：手机端每次打开 PlainLedger 误删后台标签并新建空 Dashboard 标签页",
    "打开面板：下拉与侧边栏统一复用已有标签，默认进入账本列表页",
  ],
  "2.52.39": [
    "报表：手机端筛选行下拉固定 60px 右对齐，搜索框占满剩余宽度",
  ],
  "2.52.38": [
    "报表：手机端筛选行搜索框缩短，收入/支出与一级/二级下拉加宽、间距放宽",
    "体验版：点击「开启试用」后自动注入完整分类与 6 笔示意账单，无需手动恢复样例",
    "文档：使用说明与快速上手文案同步公版/体验版激活与样例注入说明",
  ],
  "2.52.37": [
    "外观：导航图标槽位工具栏控件间距调整为 15px",
  ],
  "2.52.36": [
    "外观：Emoji / 上传 / iconfont / 默认 控件间距加大，行内更疏朗",
  ],
  "2.52.35": [
    "外观：导航图标设置改为紧凑卡片排版，预览缩至 22px 并严格限尺寸",
  ],
  "2.52.34": [
    "设置新增「外观」页：14 个导航图标槽位可自定义（Emoji / 上传 / iconfont）",
    "未自定义时沿用内置彩色 SVG；支持单项与全部恢复默认",
  ],
  "2.52.33": [
    "底栏：记一笔 FAB 标签移出按钮、去除阴影重影，图标与按钮尺寸对齐",
    "账本/报表：本年·本月·本周与收入·支出·结余三卡图标与文字居中对齐",
  ],
  "2.52.32": [
    "导航图标：接入用户提供的 iconfont 彩色 SVG（账本/统计/记一笔/报表/设置等 14 枚）",
    "记一笔 FAB 改为使用彩色圆形加号图标，底栏/三卡/子导航统一 SVG 渲染",
  ],
  "2.52.31": [
    "手机端：标签页独立布局，左右边距 16px、字号与控件整体放大（区别于侧边栏 10px）",
    "图标：恢复彩色 emoji，底栏/子导航/三卡/洞察等重新适配",
  ],
  "2.52.30": [
    "文档：README / 使用说明 / 欢迎弹窗对齐五 Tab IA，移除年度回顾描述",
    "统计：收入行同/环比按涨跌语义着色（收入涨绿、支出涨红）",
    "报表：窄栏筛选改两行布局；筛选状态持久化；摘要文案加「·」分隔",
    "报表：环图 Top 8 之外合并为「其他」桶",
    "账本：本月支出旁显示较上月环比标签",
    "全局：底栏与子导航换统一 SVG 图标；顶栏首行高度对齐",
    "清理：移除未挂载的年度回顾代码",
  ],
  "2.52.29": [
    "账本：收入、月度结余移至本月支出右侧，分两行对齐显示",
  ],
  "2.52.28": [
    "报表：收入/支出改为下拉，与一级/二级同风格，适配窄侧边栏",
    "统计/报表：顶栏与账本统一零内边距，顶栏距上沿间距对齐",
  ],
  "2.52.27": [
    "报表：收入/支出从顶栏移至筛选行，与搜索框、一级/二级下拉同排；顶栏仅保留总/年/月/周",
  ],
  "2.52.26": [
    "报表：总视图隐藏 ⓘ；分类搜索框缩短，右侧下拉选一级/二级",
    "报表：保险/餐饮/交通/订阅四个快捷标签改为一行",
  ],
  "2.52.25": [
    "统计：表格金额统一四舍五入整数",
    "统计：日期列收窄、列间距收紧，收入/支出/结余列加宽",
  ],
  "2.52.24": [
    "统计：下钻 › 紧跟日期；年/月/周表格金额显示两位小数，总视图四舍五入整数",
    "统计：明细默认显示 10 行后再滚动",
  ],
  "2.52.23": [
    "统计：表底总计恢复 v2.52.20 双行样式并融入表格，同比/环比缩写与红涨绿跌保留",
    "全局：账本/统计/报表顶栏筛选高度统一压缩约三分之一（22px）",
    "统计：日期列加宽，周视图日期不再挤换行",
    "报表：筛选提示改为时间行 ⓘ；顶栏/三卡/分类筛选整合为一块并收紧间距",
  ],
  "2.52.22": [
    "统计：表底总计改为收入/支出两行小字，同比/环比缩写与红涨绿跌配色保留",
    "统计：ⓘ 提示分两行展示",
  ],
  "2.52.21": [
    "统计：表底总计并入表格「总计」行；总视图增加「总结余」行；同比/环比缩写为同+12%·环-5%，正红负绿",
    "统计：进行中的月/年/周按截至今日同期对比；ⓘ 提示补充说明；明细行加 › 下钻提示",
    "统计：消费洞察去掉累计/同期总计类文案，只保留分类与结构洞察",
    "报表：加「按分类筛选查看」提示；环形图缩小",
  ],
  "2.52.20": [
    "全局：金额四舍五入整数展示，百分比统一 1 位小数",
  ],
  "2.52.19": [
    "统计：表底总计改为收入/支出两行，按周期显示同比/环比（总无%、年无同比、月双比、周环比）",
    "日历：月汇总收入支出一行，超支金额与百分比一行",
    "报表：移除年度回顾与最大单笔，总/年/月/周统一收入·支出·结余三卡",
    "全局：工具栏上下内边距统一",
  ],
  "2.52.18": [
    "侧边栏：外边距统一 10px，卡片内边距去除，板块间距收紧",
    "账本/统计/报表：顶栏 Tab 统一高度 32px；说明文案改为时间行 ⓘ 提示",
    "日历：日详情收入支出一行、结余笔数一行；收起按钮不再被裁切",
    "统计：明细表最多显示 7 行；总计区改为笔数/金额及同比小字双行",
  ],
  "2.52.17": [
    "统计：移除收支总览与收入/支出切换，仅保留汇总表",
    "统计：表底总计行融入金额、笔数及金额/笔数环比",
    "工具栏：总/年/月/周与收入/支出随侧边栏等宽自适应，两组间距 5 倍",
  ],
  "2.52.16": [
    "统计：恢复收支总览并与明细汇总表融合为同一卡片；移除重复总计/月均/日均行",
    "统计：年/月明细超过 10 条时无痕滚动；去掉年/月账单汇总标题",
    "账本：同步按钮回到标题行右侧，节省首块空间",
    "全局：总/年/月/周与收入/支出按钮等宽等距；侧边栏左右留白压缩至 4px",
  ],
  "2.52.15": [
    "统计：总/年/月/周改为账单汇总表（收入·支出·结余），支持点击下钻",
    "统计：周期切换与汇总表融入同一沉浸卡片，控件加大加粗",
    "账本：账单/日历切换与首块内容融合为同一卡片",
    "记一笔：底栏 FAB 增加品牌底色，加号加粗",
    "全局：底栏 Tab 与切换按钮字体加深加粗",
  ],
  "2.52.14": [
    "重构：底部 5 Tab（账本 / 统计 / 记一笔 / 报表 / 设置），记一笔改为居中凸起 FAB",
    "账本：合并原首页与日历入口（账单 / 日历切换），移除横幅记一笔按钮",
    "统计：原趋势页，负责收支总览、走势与环比",
    "报表：周期选「年」时展示年度回顾摘要（同比、最大单笔等），移除独立年度 Tab",
  ],
  "2.52.13": [
    "三插件统一 .lifeos-sidebar-inset 单层 10px 留白，避免纪念日与记账边距不一致",
  ],
  "2.52.12": [
    "修复：侧边栏 10px 留白改为仅作用于提示条与内容区，避免误伤 Tab 栏与卡片宽度",
  ],
  "2.52.11": [
    "侧边栏：主界面与试用提示统一上/左/右 10px 留白；提示文案首行缩进",
  ],
  "2.52.10": [
    "修复：侧边栏「更新日志」点击无响应（弹窗层级与统一入口）",
    "激活页：底部导航改为两行（使用说明·更新日志 / 配置）",
    "设置：授权 Tab 统一 UI，移除「打开使用说明」；关于页字体层级与间距对齐",
  ],
  "2.52.9": [
    "激活页 UI 统一：插件名标题、指纹/复制与激活码/激活同行、底部三链一行",
    "关于页：所有作品展示简介；作者主页合并至作者栏；移除锁定提示",
  ],
  "2.52.8": [
    "体验版：侧边栏激活页增加「开启试用」；统一使用说明 / 更新日志入口，取消启动弹窗",
    "设置：新增「关于」Tab（作者、版权、其他作品、作者主页）；更新日志标题补充插件名",
  ],
  "2.52.7": [
    "首页 / 年度回顾：本年·本月·本周、收入·结余·笔数 固定一行三列，侧边栏不再换行",
  ],
  "2.52.6": [
    "年度回顾：口径说明改为金额后 ⓘ 提示符（对齐 BrainCore 待办总览）",
    "修复：升级后更新日志弹窗使用 semver 比对，统一 PLUGIN_VERSION 判定",
  ],
  "2.52.5": [
    "移动端设置页去掉重复紧凑标题（Obsidian 顶栏已显示插件名）",
    "CSS 命名空间 plg-* 全面迁移为 plg-*",
  ],
  "2.52.4": [
    "体验版：统一 24 小时试用流程（欢迎弹窗 → 倒计时 → 到期提醒）",
    "公版激活页增加账单示意预览；设置页底部增加 LifeOS 插件族标识",
    "修复面板 data-type 与 CSS 不匹配导致手机布局异常",
    "记一笔命令与导入需激活后可用；记一笔 Tab 增加无障碍属性",
    "使用说明同步标签页设置结构；统一顶栏 41px 与 LifeOS 主色",
  ],
  "2.52.3": [
    "设置：手机端顶栏下沉改为 40px；理念文案首行缩进 2 字",
    "设置「规则 / 数据」页各板块支持点击折叠 / 展开，状态会记住",
    "手机记一笔「智能」Tab：粘贴/识别贴底，去掉下方空白；三 Tab 等高撑满",
  ],
  "2.52.2": [
    "修复设置 Tab 选中态：选中项显示 accent 浅底 + 深色文字，不再白字空白",
    "修复手机端设置页：顶部 39px 下沉间距 + Tab 四等分居中",
  ],
  "2.52.1": [
    "设置页对齐纪念日 / BrainCore：标签页（授权 / 常用 / 分类 / 规则 / 数据）+ 卡片块 + 紧凑 Setting 行",
    "授权页：设备指纹复制 +「验证激活」按钮；未激活时仅开放「授权」与「数据」页",
    "设置入口统一为 Obsidian 原生设置 Tab（面板 Tab、激活页「高级配置」同入口）",
    "「数据」页集中：导入导出、数据目录、ledger.json / data.json 路径与打开按钮",
  ],
  "2.52.0": [
    "设置页重构：常用 / 高级两级（对齐纪念日），取消「高级功能」隐藏开关",
    "统一设置入口：面板 Tab、激活页「高级配置」均打开同一设置浮层",
    "公版激活后自动展开「分类管理」并提示；底部统计改为「N 笔示意 · N 类 · N 二级」",
    "帮助区分：「快速上手」弹窗 vs《完整使用说明》Markdown；恢复样例移入危险操作区",
    "同一会话内避免更新日志与快速上手重复弹出",
    "修复：设置内打开更新日志弹窗叠在设置层之上",
  ],
  "2.51.16": [
    "修复：设置面板内点「更新日志 → 打开」时弹窗被设置层遮挡，现叠在设置面板之上",
  ],
  "2.51.15": [
    "分类：同步最新个人版分类（18 类 · 117 二级，移除「上月超支」，优化医疗保健/月结图标）",
    "修复：更新日志弹窗从设置打开时沉底，改为靠上居中显示",
  ],
  "2.51.14": [
    "公版：完整分类体系内嵌进 main.js，iOS 无需读文件即可自动补全",
    "公版：分类树不完整时（如仅 1 类）启动/打开设置即自动修复",
    "安装后不再自动打开 PlainLedger 面板，需手动点 Ribbon 图标",
  ],
  "2.51.13": [
    "公版：插件加载即内置完整分类体系 + 6 笔示意账单，无需手动导入",
    "使用说明：改为简要弹窗 +「知道了」后永久不再自动弹出（对齐纪念日）",
    "首次启用：更新日志 → 使用说明弹窗；激活成功后若未读也会弹出",
  ],
  "2.51.12": [
    "公版样例：完整复制个人版全部一级/二级分类（含关键词、图标等），账单仅 6 笔示意",
    "公版样例：清空订阅与周期规则，避免待入账被当成真实账单",
    "激活/恢复内置数据：分类全保留，只写入示意账单",
  ],
  "2.51.11": [
    "公版样例：激活或「恢复内置数据」时完整加载个人版全部分类，仅保留 6 笔示意账单",
    "修复：iOS / 移动端无法读取插件目录 default-ledger.json 导致分类缺失",
    "更新日志对齐纪念日：顶部理念介绍 + 默认仅展示本次更新，历史版本折叠",
  ],
  "2.51.10": [
    "修复公版加载失败：使用说明模板字符串中反引号未转义导致 main.js 语法错误",
  ],
  "2.51.9": [
    "设置页授权改用 Obsidian Setting 行：激活码输入 + 打开操作指南按钮上下对齐",
    "主界面激活改为「PlainLedger 初始化向导」（纪念日同款竖向流程）",
    "首次启动：更新说明 → 1.2 秒后自动打开使用说明（与纪念日一致）",
    "公版样例数据：保留个人版 19 个完整分类，仅 6 笔示意账单 + 3 订阅",
  ],
  "2.51.8": [
    "恢复主界面激活页原有竖向布局（仅设置页授权区优化）",
    "修复激活后激活页与首页同时显示的界面错乱",
  ],
  "2.51.7": [
    "新增更新说明弹窗（BrainCore / 纪念日同款）",
    "使用说明重写；设置页移除旧品牌文案",
    "公版需激活码：设备指纹 PLG-xxx → 作者离线算号 → KEY-xxx",
  ],
  "2.51.0": [
    "首页统一「月度结余 / 年累计结余」口径，ⓘ 可查看结余说明",
    "月结自动结转：每月 1 日将当年累计净收支结转至当月（可关闭）",
    "趋势 / 报表 / 日历 / 年度回顾口径对齐",
    "设置分组：基础与预算 → 数据管理 → 日记联动 → 显示 → 高级功能",
    "三种记一笔：智能自然语言、手动表单、截图 OCR",
    "订阅 / 周期 / 分期 / 待入账；日记联动追加一行到当日笔记",
    "导入 Excel / PlainLedger JSON；导出 JSON / CSV 备份",
  ],
};

/** @deprecated 已由 PLUGIN_CHANGELOG 替代 */
const PLUGIN_UPDATE_SECTIONS = [];

const UPDATE_NOTICE_STYLE_ID = "plg-update-notice-styles";

function getPluginVersionLabel() {
  const v = typeof PLUGIN_VERSION === "string" ? PLUGIN_VERSION : "0.0.0";
  const ed = typeof getEditionDisplayName === "function" ? getEditionDisplayName() : "";
  if (typeof formatLifeOsVersionLine === "function") return formatLifeOsVersionLine(v, ed);
  return `v${v}`;
}

function getPluginVersionSemver() {
  return typeof PLUGIN_VERSION === "string" ? PLUGIN_VERSION : "0.0.0";
}

function getChangelog() {
  return typeof PLUGIN_CHANGELOG !== "undefined" && PLUGIN_CHANGELOG ? PLUGIN_CHANGELOG : {};
}

function compareVersions(a, b) {
  const pa = String(a).split(".").map((x) => parseInt(x, 10) || 0);
  const pb = String(b).split(".").map((x) => parseInt(x, 10) || 0);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i += 1) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function getPhilosophySubtitle() {
  return typeof PLUGIN_PHILOSOPHY_SUBTITLE === "string" && PLUGIN_PHILOSOPHY_SUBTITLE
    ? PLUGIN_PHILOSOPHY_SUBTITLE
    : "PlainLedger — Obsidian 库内独立记账，数据随库同步。";
}

function getUpdateNoticeTitle() {
  const name = typeof PLUGIN_DISPLAY_NAME === "string" && PLUGIN_DISPLAY_NAME
    ? PLUGIN_DISPLAY_NAME
    : "PlainLedger";
  return `${name} 更新日志`;
}

function renderUpdateNoticeHero(hero) {
  const version = getPluginVersionLabel();
  hero.createDiv({ cls: "plg-update-badge", text: version });
  hero.createEl("h2", { cls: "plg-update-title", text: getUpdateNoticeTitle() });
  const intro = typeof PLUGIN_INTRO === "string" ? PLUGIN_INTRO.trim() : "";
  if (intro) {
    const introEl = hero.createEl("p", { text: intro });
    addClasses(introEl, "plg-update-subtitle", "lifeos-philosophy-intro");
  }
  const philosophy = getPhilosophySubtitle();
  if (philosophy) {
    const subEl = hero.createEl("p", { text: philosophy });
    addClasses(subEl, "plg-update-subtitle", "lifeos-philosophy-intro");
  }
}

function injectUpdateNoticeStyles() {
  /* CSS lives in styles.css (community plugin: no runtime <style> injection). */
}

function renderChangelogBody(body, currentVersion) {
  const changelog = getChangelog();
  const versions = Object.keys(changelog)
    .filter((v) => changelog[v]?.length)
    .sort((a, b) => compareVersions(b, a));

  if (!versions.length) {
    body.createEl("p", { text: "暂无更新记录。", cls: "plg-update-subtitle" });
    return;
  }

  for (const ver of versions) {
    const items = changelog[ver];
    if (!items?.length) continue;
    const isLatest = ver === currentVersion;
    const block = body.createDiv({
      cls: `plg-update-version${isLatest ? " is-open is-latest" : ""}`,
    });
    const head = block.createDiv({ cls: "plg-update-version-head" });
    head.createSpan({
      text: isLatest ? `✨ 本次更新 · v${ver}` : `v${ver}`,
    });
    head.createSpan({ cls: "plg-update-version-chevron", text: "›" });
    const content = block.createDiv({ cls: "plg-update-version-body" });
    const list = content.createEl("ul", { cls: "plg-update-list" });
    items.forEach((note, idx) => {
      const item = list.createEl("li", { cls: "plg-update-item" });
      item.createSpan({ cls: "plg-update-num", text: String(idx + 1) });
      item.createSpan({ text: note });
    });
    if (!isLatest) {
      head.onclick = () => {
        block.toggleClass("is-open", !block.hasClass("is-open"));
      };
    }
  }
}

function getTopOverlayZIndex() {
  let max = 999999;
  document.querySelectorAll(".plg-overlay").forEach((el) => {
    const raw = el.style.zIndex || window.getComputedStyle(el).zIndex || "0";
    const z = parseInt(raw, 10);
    if (!Number.isNaN(z) && z > max) max = z;
  });
  return max + 30;
}

/** 更新日志 / 使用说明弹窗必须叠在 PlainLedger 设置 overlay 之上 */
function elevateUpdateModalLayer(modal) {
  window.requestAnimationFrame(() => {
    const z = String(getTopOverlayZIndex());
    const container = modal.modalEl.closest(".modal-container");
    const bg = modal.modalEl.closest(".modal-bg");
    if (container) {
      container.addClass("plg-update-modal-host");
      applyCssProps(container, { "--plg-update-z": z });
    }
    if (bg) {
      bg.addClass("plg-update-modal-bg");
      applyCssProps(bg, { "--plg-update-z": z });
    }
  });
}

function needsUpdateNotice(lastSeen, current) {
  const seen = String(lastSeen || "").trim();
  const cur = String(current || "").trim();
  if (!cur) return false;
  if (!seen) return true;
  return compareVersions(seen, cur) < 0;
}

function showUpdateNoticeModal(app, plugin, options = {}) {
  const versionLabel = getPluginVersionLabel();
  const versionSemver = getPluginVersionSemver();
  if (!options.force && !needsUpdateNotice(plugin.settings.lastSeenVersion, versionSemver)) return;

  injectUpdateNoticeStyles();

  const modal = new Modal(app);
  addClasses(modal.modalEl, "lifeos-modal", "plg-update-modal");
  modal.titleEl.hide();
  modal.contentEl.empty();

  const wrap = modal.contentEl.createDiv({ cls: "plg-update-wrap" });
  const hero = wrap.createDiv({ cls: "plg-update-hero" });
  renderUpdateNoticeHero(hero);

  const body = wrap.createDiv({ cls: "plg-update-body" });
  renderChangelogBody(body, versionSemver);

  const foot = wrap.createDiv({ cls: "plg-update-foot" });
  const btn = foot.createEl("button", { text: "知道了，开始使用" });
  addClasses(btn, "lifeos-modal-primary", "plg-update-btn");
  btn.onclick = () => {
    plugin.settings.lastSeenVersion = versionSemver;
    void plugin.saveSettings();
    modal.close();
    if (typeof options.onDismiss === "function") options.onDismiss();
  };

  modal.open();
  elevateLifeOsUpdateModal(modal);
  if (typeof elevateUpdateModalLayer === "function") elevateUpdateModalLayer(modal);
}

// ─── PlainLedger settings tab layout (align with 纪念日 / BrainCore) ─────────

const PLG_SETTINGS_STYLE_ID = "plg-settings-compact-styles-v3";
const PLG_MOBILE_TOP_INSET_PX = 41;
const PLG_MOBILE_TOP_SPACER_CLASS = "plg-mobile-top-spacer";

function getPlgEditionLabel(plugin) {
  // 体验包激活后按「公版」展示，避免标题仍写「48小时体验版」造成歧义
  if (typeof isTrialEdition === "function" && isTrialEdition()) {
    if (plugin?.settings?.licenseActivated) return "公版";
    const h = typeof getTrialHoursLabel === "function" ? getTrialHoursLabel() : "";
    return h ? `${h}体验版` : "48小时体验版";
  }
  if (typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public") return "公版";
  return "个人版";
}

function resolvePlgSettingsTabFromFocus(focusOpts) {
  if (!focusOpts?.section) return null;
  const map = {
    categories: "categories",
    appearance: "appearance",
    pendingDues: "rules",
    subscription: "rules",
    recurring: "rules",
    globalKeywords: "rules",
  };
  return map[focusOpts.section] || "common";
}

function injectPlgSettingsCompactStyles() {
  /* CSS lives in styles.css (community plugin: no runtime <style> injection). */
}

function appendPlgMobileTopSpacer(containerEl) {
  containerEl.createDiv({ cls: PLG_MOBILE_TOP_SPACER_CLASS });
}

function applyPlgMobileSettingsLayout(containerEl, app) {
  document.querySelectorAll(".plg-settings-mobile-host, .plg-settings-host").forEach((el) => {
    el.removeClass("plg-settings-mobile-host");
    el.removeClass("plg-settings-host");
  });
  injectPlgSettingsCompactStyles();
  const host = containerEl.closest(".vertical-tab-content")
    || containerEl.closest(".vertical-tab-content-container")
    || containerEl.parentElement;
  host?.addClass("plg-settings-host");
  const isMobile = app?.isMobile || Platform.isMobileApp;
  if (!isMobile) return;
  host?.addClass("plg-settings-mobile-host");
  appendPlgMobileTopSpacer(containerEl);
}

function createPlgSettingsBlock(parent, title, desc) {
  const block = parent.createDiv({ cls: "plg-settings-block" });
  const heading = new Setting(block).setName(title).setHeading();
  if (desc) heading.setDesc(desc);
  return block;
}

function addPlgSubgroupTitle(block, title) {
  new Setting(block).setName(title).setHeading().setClass("plg-settings-subgroup");
}

function createPlgCollapsibleBlock(parent, plugin, sectionId, title, desc, buildBody, opts = {}) {
  const uiSections = plugin.settings.uiState?.settingsSections || {};
  let expanded = uiSections[sectionId];
  if (expanded === undefined) expanded = opts.defaultExpanded !== false;
  if (opts.forceOpen) expanded = true;

  const block = parent.createDiv({
    cls: "plg-settings-block plg-settings-block-collapsible" + (expanded ? " open" : ""),
  });
  block.setAttr("data-settings-section", sectionId);

  const head = block.createDiv({ cls: "plg-settings-block-head clickable" });
  head.setAttr("role", "button");
  head.setAttr("tabindex", "0");
  head.setAttr("aria-expanded", expanded ? "true" : "false");

  const heading = new Setting(head).setName(title).setHeading();
  if (desc) heading.setDesc(desc);

  const body = block.createDiv({
    cls: "plg-settings-block-body" + (expanded ? "" : " hidden"),
  });
  buildBody(body);

  const sync = (open) => {
    expanded = open;
    block.toggleClass("open", open);
    body.toggleClass("hidden", !open);
    head.setAttr("aria-expanded", open ? "true" : "false");
  };

  const toggle = () => {
    sync(!expanded);
    plugin.settings.uiState = plugin.settings.uiState || {};
    plugin.settings.uiState.settingsSections = plugin.settings.uiState.settingsSections || {};
    plugin.settings.uiState.settingsSections[sectionId] = expanded;
    plugin.saveSettings();
  };
  head.addEventListener("click", toggle);
  head.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });

  return block;
}

function buildPlgSettingsTabs(container, plugin, tabDefs, initialTabId) {
  const tabBar = container.createDiv({ cls: "plg-settings-tab-bar" });
  if (tabDefs.length >= 5) tabBar.addClass("is-many-tabs");
  tabBar.setAttr("role", "tablist");
  tabBar.setAttr("aria-label", "PlainLedger 设置");

  const panelsWrap = container.createDiv({ cls: "plg-settings-panels" });
  const panels = {};
  tabDefs.forEach((t) => {
    panels[t.id] = panelsWrap.createDiv({
      cls: "plg-settings-panel",
      attr: {
        role: "tabpanel",
        id: `plg-panel-${t.id}`,
        "aria-labelledby": `plg-tab-${t.id}`,
      },
    });
    panels[t.id].addClass("is-hidden");
  });

  const showTab = (id) => {
    tabDefs.forEach((t) => {
      panels[t.id].toggleClass("is-hidden", t.id !== id);
      panels[t.id].toggleClass("is-active", t.id === id);
    });
    tabBar.querySelectorAll("button").forEach((btn) => {
      const active = btn.dataset.tab === id;
      btn.toggleClass("mod-cta", active);
      btn.setAttr("aria-selected", active ? "true" : "false");
    });
  };

  tabDefs.forEach((t) => {
    const btn = tabBar.createEl("button", { text: t.label });
    btn.dataset.tab = t.id;
    btn.setAttr("role", "tab");
    btn.setAttr("id", `plg-tab-${t.id}`);
    btn.setAttr("aria-controls", `plg-panel-${t.id}`);
    btn.setAttr("aria-selected", "false");
    btn.addEventListener("click", () => showTab(t.id));
  });

  const startId = initialTabId && tabDefs.some((t) => t.id === initialTabId)
    ? initialTabId
    : tabDefs[0]?.id;
  if (startId) showTab(startId);

  return { tabBar, panels, showTab };
}

// ─── 农历 / 节假日（轻量，1900–2100）────────────────────────────────────────

const LUNAR_INFO = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
];

const LUNAR_DAY_NAMES = [
  "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
  "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
  "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十",
];

const LUNAR_MONTH_NAMES = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];

const SOLAR_HOLIDAYS = {
  "01-01": "元旦",
  "02-14": "情人节",
  "03-08": "妇女节",
  "05-01": "劳动节",
  "05-04": "青年节",
  "06-01": "儿童节",
  "07-01": "建党节",
  "08-01": "建军节",
  "09-10": "教师节",
  "10-01": "国庆节",
  "12-25": "圣诞节",
};

const LUNAR_HOLIDAYS = {
  "1-1": "春节",
  "1-15": "元宵",
  "5-5": "端午",
  "7-7": "七夕",
  "8-15": "中秋",
  "9-9": "重阳",
  "12-8": "腊八",
  "12-30": "除夕",
};

function lunarYearDays(y) {
  let sum = 348;
  const info = LUNAR_INFO[y - 1900];
  if (!info) return 348;
  for (let i = 0x8000; i > 0x8; i >>= 1) sum += (info & i) ? 1 : 0;
  return sum + leapDays(y);
}

function leapMonth(y) {
  return LUNAR_INFO[y - 1900] & 0xf;
}

function leapDays(y) {
  if (leapMonth(y)) return (LUNAR_INFO[y - 1900] & 0x10000) ? 30 : 29;
  return 0;
}

function monthDays(y, m) {
  return (LUNAR_INFO[y - 1900] & (0x10000 >> m)) ? 30 : 29;
}

function solarToLunar(y, m, d) {
  const base = new Date(1900, 0, 31);
  const obj = new Date(y, m - 1, d);
  let offset = Math.floor((obj - base) / 86400000);
  if (offset < 0) return { month: 1, day: 1, leap: false };

  let ly = 1900;
  for (; ly < 2101 && offset > 0; ly++) {
    const days = lunarYearDays(ly);
    if (offset < days) break;
    offset -= days;
  }

  let leap = leapMonth(ly);
  let isLeap = false;
  let lm = 1;
  for (; lm < 13 && offset > 0; lm++) {
    if (leap > 0 && lm === leap + 1 && !isLeap) {
      lm--;
      isLeap = true;
      const days = leapDays(ly);
      if (offset < days) break;
      offset -= days;
      isLeap = false;
      lm++;
      continue;
    }
    const days = monthDays(ly, lm);
    if (offset < days) break;
    offset -= days;
  }

  return { year: ly, month: lm, day: offset + 1, leap: isLeap };
}

function getLunarDayLabel(date) {
  const l = solarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return LUNAR_DAY_NAMES[l.day - 1] || "";
}

function getLunarMonthDayLabel(date) {
  const l = solarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const mName = LUNAR_MONTH_NAMES[l.month - 1] || String(l.month);
  const dName = LUNAR_DAY_NAMES[l.day - 1] || "";
  return l.day === 1 ? `${mName}月` : dName;
}

function getCnHoliday(dateKey) {
  const parts = dateKey.split("-");
  if (parts.length < 3) return "";
  const m = parts[1];
  const d = parts[2];
  const solar = SOLAR_HOLIDAYS[`${m}-${d}`];
  if (solar) return solar;

  const date = new Date(Number(parts[0]), Number(m) - 1, Number(d));
  const l = solarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return LUNAR_HOLIDAYS[`${l.month}-${l.day}`] || "";
}

function getCalCellSubLabel(dateKey) {
  const holiday = getCnHoliday(dateKey);
  if (holiday) return holiday;
  const date = parseDateTime(dateKey + " 12:00");
  return getLunarMonthDayLabel(date);
}

function isWeekendDateKey(dateKey) {
  const d = parseDateTime(dateKey + " 12:00");
  const dow = d.getDay();
  return dow === 0 || dow === 6;
}

function buildCalDayTooltip(info) {
  const parts = [];
  if (info.income > 0) parts.push(`收入 ${fmtMoney(info.income)}`);
  if (info.expense > 0) parts.push(`支出 ${fmtMoney(info.expense)}`);
  if (!parts.length) return "暂无收支";
  const net = info.income - info.expense;
  if (info.income > 0 && info.expense > 0) {
    parts.push(`结余 ${fmtMoney(net)}`);
  }
  if (info.count > 0) parts.push(`笔数${info.count}`);
  return parts.join(" · ");
}

const SUBSCRIPTION_TABS = [
  { id: "all", label: "全部" },
  { id: "video", label: "影音" },
  { id: "music", label: "音乐" },
  { id: "read", label: "阅读" },
  { id: "cloud", label: "云盘" },
  { id: "shop", label: "购物" },
  { id: "office", label: "办公" },
  { id: "ai", label: "AI" },
  { id: "other", label: "其他" },
];

const DEFAULT_SUBSCRIPTION_LEDGER_CATEGORY = "软件续费";
/** 曾误用作入账分类，加载时迁回默认分类 */
const DEPRECATED_SUBSCRIPTION_LEDGER_CATEGORY = "订阅";

function subPreset(name, tab, domain, color, subcategory) {
  return {
    name,
    tab,
    domain,
    color,
    category: DEFAULT_SUBSCRIPTION_LEDGER_CATEGORY,
    subcategory: subcategory || name,
    abbr: subscriptionAbbr(name),
  };
}

const SUBSCRIPTION_PRESETS = [
  // 影音
  subPreset("腾讯视频", "video", "v.qq.com", "#FF6022"),
  subPreset("优酷", "video", "youku.com", "#00A1D6"),
  subPreset("爱奇艺", "video", "iqiyi.com", "#00BE06"),
  subPreset("哔哩哔哩", "video", "bilibili.com", "#FB7299"),
  subPreset("芒果TV", "video", "mgtv.com", "#FF6600"),
  subPreset("咪咕视频", "video", "miguvideo.com", "#0080FF"),
  subPreset("Netflix", "video", "netflix.com", "#E50914"),
  subPreset("Disney+", "video", "disneyplus.com", "#113CCF"),
  subPreset("YouTube Premium", "video", "youtube.com", "#FF0000"),
  subPreset("抖音会员", "video", "douyin.com", "#161823"),
  subPreset("快手会员", "video", "kuaishou.com", "#FF4906"),
  subPreset("TV+", "video", "apple.com", "#000000", "Apple TV+"),
  // 音乐
  subPreset("QQ音乐", "music", "y.qq.com", "#31C27C"),
  subPreset("酷狗音乐", "music", "kugou.com", "#0090FF"),
  subPreset("酷我音乐", "music", "kuwo.cn", "#FF5040"),
  subPreset("网易云音乐", "music", "music.163.com", "#E60026", "网易云"),
  subPreset("Apple Music", "music", "apple.com", "#FA243C"),
  subPreset("Spotify", "music", "spotify.com", "#1DB954"),
  subPreset("喜马拉雅", "music", "ximalaya.com", "#F86442"),
  subPreset("汽水音乐", "music", "douyin.com", "#FE2C55"),
  subPreset("QQ音乐豪华绿钻", "music", "y.qq.com", "#31C27C", "QQ音乐"),
  // 阅读
  subPreset("微信读书", "read", "weread.qq.com", "#4AB55F"),
  subPreset("得到", "read", "dedao.cn", "#FF6A00"),
  subPreset("Kindle Unlimited", "read", "amazon.cn", "#FF9900", "Kindle"),
  subPreset("知乎盐选", "read", "zhihu.com", "#0066FF"),
  subPreset("QQ阅读", "read", "qq.com", "#12B7F5"),
  subPreset("起点读书", "read", "qidian.com", "#E5353D"),
  subPreset("豆瓣阅读", "read", "douban.com", "#007722"),
  subPreset("帆书", "read", "dushu.io", "#E74C3C"),
  subPreset("掌阅", "read", "zhangyue.com", "#FF6B35"),
  // 云盘
  subPreset("百度网盘", "cloud", "pan.baidu.com", "#2932E1"),
  subPreset("阿里云盘", "cloud", "aliyundrive.com", "#6349FF"),
  subPreset("OneDrive", "cloud", "onedrive.com", "#0078D4"),
  subPreset("坚果云", "cloud", "jianguoyun.com", "#33CC66"),
  subPreset("iCloud+", "cloud", "icloud.com", "#3693F3", "iCould 云"),
  subPreset("夸克网盘", "cloud", "quark.cn", "#000000"),
  subPreset("115网盘", "cloud", "115.com", "#FF6600"),
  subPreset("Google One", "cloud", "google.com", "#4285F4"),
  subPreset("Dropbox", "cloud", "dropbox.com", "#0061FF"),
  subPreset("腾讯微云", "cloud", "weiyun.com", "#12B7F5"),
  subPreset("天翼云盘", "cloud", "cloud.189.cn", "#0099FF"),
  // 购物 / 生活会员
  subPreset("淘宝88VIP", "shop", "taobao.com", "#FF5000"),
  subPreset("京东PLUS", "shop", "jd.com", "#E1251B"),
  subPreset("拼多多省钱月卡", "shop", "pinduoduo.com", "#E02E24", "拼多多"),
  subPreset("美团会员", "shop", "meituan.com", "#FFC300"),
  subPreset("饿了么超级会员", "shop", "ele.me", "#0097FF", "饿了么"),
  subPreset("山姆会员", "shop", "samsclub.cn", "#0060A9", "山姆"),
  subPreset("盒马X会员", "shop", "freshhema.com", "#FF6A00", "盒马"),
  subPreset("Costco会员", "shop", "costco.com.cn", "#E31837", "Costco"),
  subPreset("叮咚买菜会员", "shop", "100.me", "#00B578", "叮咚买菜"),
  subPreset("星巴克星礼卡", "shop", "starbucks.com.cn", "#00704A", "星巴克"),
  // 办公 / 工具
  subPreset("Microsoft 365", "office", "microsoft.com", "#0078D4"),
  subPreset("WPS会员", "office", "wps.cn", "#FF9800", "WPS"),
  subPreset("Notion", "office", "notion.so", "#000000"),
  subPreset("Obsidian Sync", "office", "obsidian.md", "#7C3AED", "Obsidian"),
  subPreset("Adobe Creative Cloud", "office", "adobe.com", "#FF0000", "Adobe"),
  subPreset("Figma", "office", "figma.com", "#F24E1E"),
  subPreset("Canva", "office", "canva.com", "#00C4CC"),
  subPreset("迅雷会员", "office", "xunlei.com", "#2196F3", "迅雷"),
  subPreset("GitHub Copilot", "office", "github.com", "#24292F"),
  subPreset("Cursor", "office", "cursor.com", "#000000"),
  subPreset("JetBrains", "office", "jetbrains.com", "#FE315D"),
  subPreset("1Password", "office", "1password.com", "#0094F5"),
  subPreset("Grammarly", "office", "grammarly.com", "#15C39A"),
  // AI
  subPreset("ChatGPT Plus", "ai", "openai.com", "#10A37F", "ChatGPT"),
  subPreset("Claude Pro", "ai", "anthropic.com", "#D97757", "Claude"),
  subPreset("Midjourney", "ai", "midjourney.com", "#000000"),
  subPreset("Copilot Pro", "ai", "microsoft.com", "#0078D4"),
  subPreset("Gemini Advanced", "ai", "google.com", "#4285F4", "Gemini"),
  subPreset("Poe", "ai", "poe.com", "#6B46FF"),
  subPreset("Perplexity", "ai", "perplexity.ai", "#20B8CD"),
  // 其他常用
  subPreset("Surge", "other", "nssurge.com", "#147EFB"),
  subPreset("Shadowrocket", "other", "shadowrocket.app", "#007AFF"),
  subPreset("Telegram Premium", "other", "telegram.org", "#26A5E4"),
  subPreset("Twitter/X Premium", "other", "x.com", "#000000"),
  subPreset("LinkedIn Premium", "other", "linkedin.com", "#0A66C2"),
  subPreset("Duolingo Super", "other", "duolingo.com", "#58CC02", "多邻国"),
  subPreset("Keep会员", "other", "gotokeep.com", "#FF5722", "Keep"),
  subPreset("Nintendo Switch Online", "other", "nintendo.com", "#E60012"),
  subPreset("PlayStation Plus", "other", "playstation.com", "#003791"),
  subPreset("Xbox Game Pass", "other", "xbox.com", "#107C10"),
  subPreset("Steam", "other", "steampowered.com", "#1B2838"),
];

function findSubscriptionPreset(name) {
  return SUBSCRIPTION_PRESETS.find((p) => p.name === name)
    || SUBSCRIPTION_PRESETS.find((p) => p.subcategory === name);
}

function resolveSubscriptionPreset(item) {
  if (!item) return null;
  const name = (item.name || "").trim();
  const sub = (item.subcategory || "").trim();
  const direct = findSubscriptionPreset(name) || findSubscriptionPreset(sub);
  if (direct) return direct;
  const fromTx = matchTxToSubscriptionPreset({
    note: name,
    subcategory: sub,
    category: item.category || "",
  });
  if (fromTx) return fromTx;
  const blob = `${name} ${sub}`.toLowerCase();
  return SUBSCRIPTION_PRESETS.find((p) => {
    const pn = p.name.toLowerCase();
    const ps = (p.subcategory || "").toLowerCase();
    return (pn.length >= 2 && blob.includes(pn)) || (ps.length >= 2 && blob.includes(ps));
  }) || null;
}

function matchTxToSubscriptionPreset(tx) {
  const sub = (tx.subcategory || "").trim();
  const note = (tx.note || "").trim();
  const blob = `${sub} ${note}`.toLowerCase();
  if (!blob.trim()) return null;
  for (const p of SUBSCRIPTION_PRESETS) {
    const keys = [...new Set([p.name, p.subcategory].filter(Boolean))];
    for (const k of keys) {
      const lk = k.toLowerCase();
      if (sub === k || blob.includes(lk)) return p;
    }
  }
  if (/icloud|icould/i.test(blob)) return findSubscriptionPreset("iCloud+");
  if (/网易云/i.test(blob)) return findSubscriptionPreset("网易云音乐");
  if (/b站|bilibili|哔哩/i.test(blob)) return findSubscriptionPreset("哔哩哔哩");
  if (/腾讯.*视频|video.*腾讯/i.test(blob)) return findSubscriptionPreset("腾讯视频");
  return null;
}

function isAutoSyncedRecurringItem(item) {
  const note = String(item?.note || "");
  return /从\s*\d+\s*笔(历史|周期)?账单同步/.test(note);
}

function purgeAutoSyncedRecurring(data) {
  if (!Array.isArray(data?.recurring) || !data.recurring.length) return false;
  const kept = data.recurring.filter((r) => !isAutoSyncedRecurringItem(r));
  if (kept.length === data.recurring.length) return false;
  data.recurring = kept;
  return true;
}

/** 周期规则已清空时，移除插件自动生成的 recurring 账单（历史误同步残留） */
function purgeOrphanRecurringTransactions(data) {
  if (!Array.isArray(data?.transactions) || !data.transactions.length) return false;
  if ((data.recurring || []).length > 0) return false;
  const before = data.transactions.length;
  data.transactions = data.transactions.filter((t) => t.source !== "recurring");
  return data.transactions.length !== before;
}

function isSubscriptionTransaction(t) {
  if (t.flow !== "expense") return false;
  return (
    t.source === "subscription"
    || (t.tags || []).includes("订阅")
    || !!String(t.linkedSubscriptionId || "").trim()
  );
}

function subscriptionAlreadyExists(data, key, preset, last) {
  return (data.subscriptions || []).some((s) => {
    if (s.name === key) return true;
    if (preset?.name && s.name === preset.name) return true;
    const sub = (last?.subcategory || "").trim();
    if (sub && (s.subcategory === sub || s.name === sub)) return true;
    return false;
  });
}

function isAutoSyncedSubscriptionItem(item) {
  const note = String(item?.note || "");
  return /从\s*\d+\s*笔历史账单同步/.test(note);
}

function subAliasKey(s) {
  return String(s || "").replace(/\s+/g, "").toLowerCase();
}

function subscriptionAmountMatches(item, t) {
  const expected = Number(item?.amount);
  if (!Number.isFinite(expected) || expected <= 0) return true;
  const got = Number(t?.amount);
  if (!Number.isFinite(got)) return false;
  const diff = Math.abs(got - expected);
  if (diff <= 0.009) return true;
  return diff / expected <= 0.06;
}

function subscriptionTxMatchesExact(item, t) {
  if (!item || !t || t.flow !== "expense") return false;
  const keys = [...new Set([(item.name || "").trim(), (item.subcategory || "").trim()].filter(Boolean))];
  if (!keys.length) return false;
  const sub = (t.subcategory || "").trim();
  const note = (t.note || "").trim();
  const field = note || sub;
  if (!field) return false;
  const fieldKey = subAliasKey(field);
  if (!keys.some((k) => subAliasKey(k) === fieldKey)) return false;
  return subscriptionAmountMatches(item, t);
}

function subscriptionTxMatchesStrict(item, t) {
  if (!item || !t || t.flow !== "expense") return false;
  const name = (item.name || "").trim();
  const subcat = (item.subcategory || "").trim();
  const sub = (t.subcategory || "").trim();
  const note = (t.note || "").trim();
  const preset = findSubscriptionPreset(name) || findSubscriptionPreset(subcat);
  const keys = new Set([name, subcat, preset?.name, preset?.subcategory].filter(Boolean));
  const aliases = new Set([...keys].map(subAliasKey));
  if (keys.has(sub) || aliases.has(subAliasKey(sub))) return true;
  if (note && (keys.has(note) || aliases.has(subAliasKey(note)))) return true;
  const txPreset = matchTxToSubscriptionPreset(t);
  if (txPreset) {
    if (keys.has(txPreset.name) || aliases.has(subAliasKey(txPreset.name))) return true;
    if (txPreset.subcategory && (keys.has(txPreset.subcategory) || aliases.has(subAliasKey(txPreset.subcategory)))) {
      return true;
    }
    if (preset && txPreset.name === preset.name) return true;
  }
  return false;
}

/** 移除「从历史账单同步」订阅时 processDue 批量回填的假账单 */
function purgeSubscriptionBackfill(data) {
  if (!data?.subscriptions?.length || !data?.transactions?.length) return false;
  let changed = false;
  const removeIds = new Set();

  data.subscriptions.forEach((sub) => {
    if (!isAutoSyncedSubscriptionItem(sub)) return;
    data.transactions.forEach((t) => {
      if (t.source === "subscription" && subscriptionTxMatchesStrict(sub, t)) {
        removeIds.add(t.id);
      }
    });
    const real = data.transactions.filter(
      (t) => !removeIds.has(t.id) && t.source !== "subscription" && subscriptionTxMatchesStrict(sub, t)
    );
    if (removeIds.size) changed = true;
    sub.generatedCount = 0;
    sub.note = String(sub.note || "").replace(/从\s*\d+\s*笔历史账单同步/, "").trim();
    sub.source = "matched";
    if (sub.userActivated !== true) sub.active = false;
    if (real.length) {
      const sorted = real.sort((a, b) => b.datetime.localeCompare(a.datetime));
      sub.billingAnchor = sorted[0].datetime.slice(0, 16);
    }
    sub.nextDate = computeInitialNextDate(sub, new Date());
  });

  if (removeIds.size) {
    data.transactions = data.transactions.filter((t) => !removeIds.has(t.id));
  }
  return changed;
}

function isManualSubscriptionItem(item) {
  return item?.source === "manual";
}

function isAutoMatchedSubscriptionItem(item) {
  if (isManualSubscriptionItem(item)) return false;
  if (item?.source === "matched" || item?.autoMatched === true) return true;
  return isAutoSyncedSubscriptionItem(item);
}

/** 历史账单匹配到的订阅默认暂停；仅手动新增且开启的才自动续费 */
function normalizeSubscriptionActivePolicy(data) {
  if ((data.subscriptionActivePolicy || 0) >= 1) return false;
  let changed = false;
  (data.subscriptions || []).forEach((sub) => {
    if (isManualSubscriptionItem(sub)) return;
    if (sub.source !== "matched") {
      sub.source = "matched";
      changed = true;
    }
    if (sub.userActivated === true) return;
    if (sub.active !== false) {
      sub.active = false;
      changed = true;
    }
  });
  data.subscriptionActivePolicy = 1;
  return changed;
}

function applySubscriptionStartDate(item, dateStr) {
  if (!dateStr) return;
  const s = String(dateStr).slice(0, 10);
  const parts = s.split("-").map(Number);
  if (parts.length < 3 || !parts[0]) return;
  const [y, m, d] = parts;
  item.startDate = s;
  item.cycleDay = d;
  item.cycleMonth = m;
  item.cycleWeekday = new Date(y, m - 1, d).getDay();
  if (!item.cycleTime) item.cycleTime = "12:00";
  item.billingAnchor = `${s}T${item.cycleTime}`;
}

function subscriptionDateValue(item, field) {
  const v = item?.[field];
  if (v) return String(v).slice(0, 10);
  if (field === "startDate" && item?.billingAnchor) return String(item.billingAnchor).slice(0, 10);
  return "";
}

function getActiveSubscriptionPhase(item) {
  if (!item?.phases?.length) return null;
  return item.phases.find((p) => !p.endDate) || item.phases[item.phases.length - 1];
}

function syncSubscriptionFromPhase(item, phase) {
  if (!phase) return;
  item.amount = phase.amount;
  item.cycle = phase.cycle || "monthly";
  item.cycleDay = phase.cycleDay;
  item.cycleMonth = phase.cycleMonth;
  item.cycleWeekday = phase.cycleWeekday;
  item.cycleIntervalDays = phase.cycleIntervalDays || 0;
  if (phase.startDate) applySubscriptionStartDate(item, phase.startDate);
  item.pausedAt = phase.endDate || "";
  item.active = !phase.endDate;
}

function normalizeSingleSubscriptionPhases(item) {
  if (!item) return;
  if (Array.isArray(item.phases) && item.phases.length) {
    const active = getActiveSubscriptionPhase(item);
    if (active) syncSubscriptionFromPhase(item, active);
    return;
  }
  const start = subscriptionDateValue(item, "startDate")
    || (item.nextDate ? String(item.nextDate).slice(0, 10) : "")
    || dateKey(new Date());
  const end = subscriptionDateValue(item, "pausedAt");
  item.phases = [{
    id: uid(),
    amount: item.amount || 0,
    cycle: item.cycle || "monthly",
    cycleDay: item.cycleDay || parseInt(start.slice(8), 10) || 1,
    cycleMonth: item.cycleMonth || parseInt(start.slice(5, 7), 10) || 1,
    cycleWeekday: item.cycleWeekday,
    cycleIntervalDays: item.cycleIntervalDays || 0,
    startDate: start,
    endDate: end,
  }];
  syncSubscriptionFromPhase(item, item.phases[0]);
}

function normalizeSubscriptionPhases(data) {
  let changed = false;
  (data.subscriptions || []).forEach((sub) => {
    const hadPhases = Array.isArray(sub.phases) && sub.phases.length;
    const snap = hadPhases ? JSON.stringify(sub.phases) : "";
    normalizeSingleSubscriptionPhases(sub);
    if (!hadPhases || JSON.stringify(sub.phases) !== snap) changed = true;
  });
  return changed;
}

function closeSubscriptionPhase(item, endDate) {
  normalizeSingleSubscriptionPhases(item);
  const end = (endDate || dateKey(new Date())).slice(0, 10);
  const phase = getActiveSubscriptionPhase(item);
  if (phase && !phase.endDate) phase.endDate = end;
  item.pausedAt = end;
  item.active = false;
}

function startSubscriptionPhase(item, phaseData) {
  normalizeSingleSubscriptionPhases(item);
  const prev = getActiveSubscriptionPhase(item);
  const end = (phaseData.startDate || dateKey(new Date())).slice(0, 10);
  if (prev && !prev.endDate) prev.endDate = end;
  const phase = {
    id: uid(),
    amount: phaseData.amount,
    cycle: phaseData.cycle || "monthly",
    cycleDay: phaseData.cycleDay,
    cycleMonth: phaseData.cycleMonth,
    cycleWeekday: phaseData.cycleWeekday,
    cycleIntervalDays: phaseData.cycleIntervalDays || 0,
    startDate: phaseData.startDate,
    endDate: "",
  };
  if (!item.phases) item.phases = [];
  item.phases.push(phase);
  syncSubscriptionFromPhase(item, phase);
  item.active = true;
  item.pausedAt = "";
}

function subscriptionPhaseFormChanged(phase, form) {
  if (!phase) return true;
  return (
    Number(phase.amount) !== Number(form.amount)
    || phase.cycle !== form.cycle
    || (phase.cycleIntervalDays || 0) !== (form.cycleIntervalDays || 0)
    || String(phase.startDate).slice(0, 10) !== String(form.startDate).slice(0, 10)
  );
}

function isSubscriptionRenewing(item) {
  normalizeSingleSubscriptionPhases(item);
  const phase = getActiveSubscriptionPhase(item);
  return !!(phase && !phase.endDate && item.active !== false);
}

function getActiveRecurringPhase(item) {
  if (!item?.phases?.length) return null;
  return item.phases.find((p) => !p.endDate) || item.phases[item.phases.length - 1];
}

function syncRecurringFromPhase(item, phase) {
  if (!phase) return;
  item.amount = phase.amount;
  item.cycle = phase.cycle || "monthly";
  item.cycleDay = phase.cycleDay;
  item.cycleMonth = phase.cycleMonth;
  item.cycleWeekday = phase.cycleWeekday;
  item.cycleIntervalDays = phase.cycleIntervalDays || 0;
  if (phase.startDate) {
    item.startDate = phase.startDate;
    applyBillingAnchorFromDate(item, phase.startDate);
  }
  item.active = !phase.endDate;
}

function normalizeSingleRecurringPhases(item) {
  if (!item) return;
  if (Array.isArray(item.phases) && item.phases.length) {
    const active = getActiveRecurringPhase(item);
    if (active) syncRecurringFromPhase(item, active);
    return;
  }
  const start = billingDateValue(item) || dateKey(new Date());
  const pausedAt = item.pausedAt ? String(item.pausedAt).slice(0, 10) : "";
  const end = item.active === false ? (pausedAt || "") : "";
  item.phases = [{
    id: uid(),
    amount: item.amount || 0,
    cycle: item.cycle || "monthly",
    cycleDay: item.cycleDay || parseInt(start.slice(8), 10) || 1,
    cycleMonth: item.cycleMonth || parseInt(start.slice(5, 7), 10) || 1,
    cycleWeekday: item.cycleWeekday,
    cycleIntervalDays: item.cycleIntervalDays || 0,
    startDate: start,
    endDate: end,
  }];
  syncRecurringFromPhase(item, item.phases[0]);
}

function normalizeRecurringPhases(data) {
  let changed = false;
  (data.recurring || []).forEach((item) => {
    const hadPhases = Array.isArray(item.phases) && item.phases.length;
    const snap = hadPhases ? JSON.stringify(item.phases) : "";
    normalizeSingleRecurringPhases(item);
    if (!hadPhases || JSON.stringify(item.phases) !== snap) changed = true;
  });
  return changed;
}

function closeRecurringPhase(item, endDate) {
  normalizeSingleRecurringPhases(item);
  const end = (endDate || dateKey(new Date())).slice(0, 10);
  const phase = getActiveRecurringPhase(item);
  if (phase && !phase.endDate) phase.endDate = end;
  item.pausedAt = end;
  item.active = false;
}

function startRecurringPhase(item, phaseData) {
  normalizeSingleRecurringPhases(item);
  const prev = getActiveRecurringPhase(item);
  const end = (phaseData.startDate || dateKey(new Date())).slice(0, 10);
  if (prev && !prev.endDate) prev.endDate = end;
  const phase = {
    id: uid(),
    amount: phaseData.amount,
    cycle: phaseData.cycle || "monthly",
    cycleDay: phaseData.cycleDay,
    cycleMonth: phaseData.cycleMonth,
    cycleWeekday: phaseData.cycleWeekday,
    cycleIntervalDays: phaseData.cycleIntervalDays || 0,
    startDate: phaseData.startDate,
    endDate: "",
  };
  if (!item.phases) item.phases = [];
  item.phases.push(phase);
  syncRecurringFromPhase(item, phase);
  item.active = true;
  item.pausedAt = "";
}

function recurringPhaseFormChanged(phase, form) {
  if (!phase) return true;
  return (
    Number(phase.amount) !== Number(form.amount)
    || phase.cycle !== form.cycle
    || (phase.cycleIntervalDays || 0) !== (form.cycleIntervalDays || 0)
    || String(phase.startDate).slice(0, 10) !== String(form.startDate).slice(0, 10)
  );
}

function isRecurringActive(item) {
  normalizeSingleRecurringPhases(item);
  const phase = getActiveRecurringPhase(item);
  return !!(phase && !phase.endDate && item.active !== false);
}

function normalizeSubscriptionLedgerCategory(data) {
  if (!data?.categories) data.categories = [];
  let changed = false;
  const catName = DEFAULT_SUBSCRIPTION_LEDGER_CATEGORY;

  if (!data.categories.some((c) => c.name === catName)) {
    data.categories.push({
      name: catName,
      icon: "📱",
      color: "#FF9CEE",
      flow: "expense",
      keywords: [],
      subcategories: [],
    });
    changed = true;
  }

  (data.subscriptions || []).forEach((s) => {
    if (!s.category) {
      s.category = catName;
      changed = true;
    } else if (s.category === DEPRECATED_SUBSCRIPTION_LEDGER_CATEGORY) {
      s.category = catName;
      changed = true;
    }
  });

  return changed;
}

/** 软件续费：仅保留账本中已有支出的二级分类 */
function pruneSoftwareRenewalSubcategories(data) {
  const cat = (data.categories || []).find((c) => c.name === DEFAULT_SUBSCRIPTION_LEDGER_CATEGORY);
  if (!cat?.subcategories?.length) return false;

  const billed = new Set();
  (data.transactions || []).forEach((t) => {
    if (t.flow !== "expense" || t.category !== DEFAULT_SUBSCRIPTION_LEDGER_CATEGORY) return;
    const sub = (t.subcategory || "").trim();
    if (sub) billed.add(sub);
  });

  const before = cat.subcategories.length;
  cat.subcategories = cat.subcategories.filter((s) => billed.has(subcategoryName(s)));
  normalizeCategorySubs(cat);
  return cat.subcategories.length !== before;
}

function recurringTitleBase(title) {
  return String(title || "").split("·")[0].trim();
}

function createRecurringItemFromTxStream(spec, title, amount, txs) {
  const sorted = [...txs].sort((a, b) => a.datetime.localeCompare(b.datetime));
  const firstDate = sorted[0].datetime.slice(0, 10);
  const latest = sorted[sorted.length - 1];
  const anchorDate = spec.anchorFromLatest ? latest.datetime.slice(0, 10) : (spec.defaultAnchor || firstDate);
  const [y, m, d] = anchorDate.split("-").map(Number);
  const item = {
    id: uid(),
    title,
    amount,
    category: spec.category,
    subcategory: spec.subcategory || "",
    flow: spec.flow || "expense",
    cycle: "monthly",
    cycleDay: d,
    cycleMonth: m,
    cycleWeekday: new Date(y, m - 1, d).getDay(),
    cycleIntervalDays: 0,
    cycleTime: "12:00",
    billingAnchor: `${anchorDate}T12:00`,
    startDate: firstDate,
    nextDate: "",
    active: true,
    generatedCount: 0,
    note: "",
  };
  item.nextDate = computeInitialNextDate(item, new Date());
  return item;
}

/** 将总账本中典型的保险账单关联到周期规则（仅宝宝保险；多保单请手动建周期 + 用二级名称区分） */
function bootstrapInsuranceRecurring(data) {
  if (!data?.transactions?.length) return false;
  if (!data.recurring) data.recurring = [];
  let dirty = false;

  const spec = {
    title: "宝宝保险",
    category: "吞金兽",
    subcategory: "宝宝保险",
    defaultAmount: 75,
    flow: "expense",
    match: (t) => t.flow === "expense" && (
      (t.category === "吞金兽" && t.subcategory === "宝宝保险") ||
      (Number(t.amount) === 75 && String(t.note || "").includes("宝宝保险"))
    ),
    defaultAnchor: "2024-10-05",
    anchorFromLatest: true,
  };

  const matches = data.transactions.filter(spec.match);
  if (!matches.length) return dirty;

  let item = data.recurring.find((r) => r.title === spec.title && r.category === spec.category);
  if (!item) {
    item = createRecurringItemFromTxStream(
      spec,
      spec.title,
      spec.defaultAmount ?? matches[matches.length - 1].amount,
      matches,
    );
    data.recurring.push(item);
    dirty = true;
  }

  for (const t of matches) {
    if (String(t.linkedRecurringId || "") === item.id) continue;
    t.linkedRecurringId = item.id;
    t.tags = [...new Set([...(t.tags || []), "周期"])];
    dirty = true;
  }
  return dirty;
}

function syncSubscriptionsFromTransactions(_data) {
  // 不再自动从历史账单创建订阅规则（易误匹配并触发批量回填）
  return false;
}

function findSubscriptionItemByName(name, subscriptions) {
  const n = String(name || "").trim();
  if (!n || !subscriptions?.length) return null;
  const direct = subscriptions.find((s) => {
    const sn = String(s.name || "").trim();
    const ss = String(s.subcategory || "").trim();
    return sn === n || ss === n;
  });
  if (direct) return direct;
  return subscriptions.find((s) => {
    const preset = resolveSubscriptionPreset(s);
    const keys = [...new Set([s.name, s.subcategory, preset?.name, preset?.subcategory].filter(Boolean))];
    return keys.some((k) => String(k).trim() === n);
  }) || null;
}

function findRecurringItemByName(name, recurring, categoryName) {
  const n = String(name || "").trim();
  if (!n || !recurring?.length) return null;
  const base = recurringTitleBase(n);
  return recurring.find((r) => {
    if (categoryName && r.category !== categoryName) return false;
    const title = String(r.title || "").trim();
    const sub = String(r.subcategory || "").trim();
    return title === n || sub === n || recurringTitleBase(title) === base;
  }) || null;
}

function billLinksToSubcategory(bill, categoryName, subName) {
  const sn = String(subName || "").trim();
  if (!sn || bill.category !== categoryName) return false;
  const keys = [bill.subcategory, bill.name, bill.title]
    .map((x) => String(x || "").trim())
    .filter(Boolean);
  return keys.includes(sn);
}

function syncSubcategoryIcon(data, categoryName, subName, iconPayload) {
  if (!data?.categories || !categoryName || !subName) return false;
  const cat = data.categories.find((c) => c.name === categoryName);
  if (!cat) return false;
  normalizeCategorySubs(cat);
  const sn = String(subName).trim();
  const idx = cat.subcategories.findIndex((s) => subcategoryName(s) === sn);
  const prev = idx >= 0 ? normalizeSubcategory(cat.subcategories[idx]) : null;
  const next = normalizeSubcategory({
    ...(prev || { name: sn, keywords: [] }),
    name: sn,
    icon: iconPayload.icon ?? prev?.icon ?? "",
    iconUrl: iconPayload.iconUrl ?? prev?.iconUrl ?? "",
  });
  const unchanged = prev
    && prev.icon === next.icon
    && prev.iconUrl === next.iconUrl;
  if (unchanged) return false;
  if (idx >= 0) cat.subcategories[idx] = next;
  else {
    cat.subcategories.push(next);
    cat.subcategories.sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
  }
  return true;
}

function syncLinkedBillIcons(data, categoryName, subName, iconPayload) {
  if (!data || !categoryName || !subName) return false;
  let dirty = false;
  const payload = {
    icon: iconPayload.icon ?? "",
    iconUrl: iconPayload.iconUrl ?? "",
  };
  for (const s of data.subscriptions || []) {
    if (!billLinksToSubcategory(s, categoryName, subName)) continue;
    if (s.icon === payload.icon && (s.iconUrl || "") === payload.iconUrl) continue;
    s.icon = payload.icon;
    s.iconUrl = payload.iconUrl;
    if (payload.iconUrl) s.domain = "";
    dirty = true;
  }
  for (const r of data.recurring || []) {
    if (!billLinksToSubcategory(r, categoryName, subName)) continue;
    if (r.icon === payload.icon && (r.iconUrl || "") === payload.iconUrl) continue;
    r.icon = payload.icon;
    r.iconUrl = payload.iconUrl;
    if (payload.iconUrl) r.domain = "";
    dirty = true;
  }
  return dirty;
}

function syncBillIconWithSubcategory(data, bill) {
  if (!data || !bill?.category) return false;
  const subName = String(bill.subcategory || bill.name || bill.title || "").trim();
  if (!subName) return false;
  const payload = { icon: bill.icon || "", iconUrl: bill.iconUrl || "" };
  const a = syncSubcategoryIcon(data, bill.category, subName, payload);
  const b = syncLinkedBillIcons(data, bill.category, subName, payload);
  return a || b;
}

function syncSubcategoryIconWithBills(data, categoryName, subName, iconPayload) {
  const a = syncSubcategoryIcon(data, categoryName, subName, iconPayload);
  const b = syncLinkedBillIcons(data, categoryName, subName, iconPayload);
  return a || b;
}

function seedBillIconFromSubcategory(bill, categories) {
  if (!bill || bill.iconUrl) return bill;
  const cat = (categories || []).find((c) => c.name === bill.category);
  const subName = String(bill.subcategory || bill.name || bill.title || "").trim();
  const subMeta = subName ? findSubcategoryMeta(cat, subName) : null;
  if (!subMeta) return bill;
  const norm = normalizeSubcategory(subMeta);
  if (norm.iconUrl) {
    return { ...bill, icon: norm.icon || bill.icon, iconUrl: norm.iconUrl };
  }
  if (norm.icon && !bill.icon) {
    return { ...bill, icon: norm.icon };
  }
  return bill;
}

function bootstrapBillSubcategoryIcons(data) {
  if (!data?.categories) return false;
  let dirty = false;
  for (const cat of data.categories) {
    for (const raw of cat.subcategories || []) {
      const sub = normalizeSubcategory(raw);
      if (!sub.name) continue;
      const bills = [];
      for (const s of data.subscriptions || []) {
        if (billLinksToSubcategory(s, cat.name, sub.name)) bills.push(s);
      }
      for (const r of data.recurring || []) {
        if (billLinksToSubcategory(r, cat.name, sub.name)) bills.push(r);
      }
      if (!bills.length) continue;
      const billWithUrl = bills.find((b) => b.iconUrl);
      const payload = sub.iconUrl
        ? { icon: sub.icon, iconUrl: sub.iconUrl }
        : billWithUrl
          ? { icon: billWithUrl.icon, iconUrl: billWithUrl.iconUrl }
          : null;
      if (!payload) continue;
      if (!sub.iconUrl && billWithUrl) {
        if (syncSubcategoryIcon(data, cat.name, sub.name, payload)) dirty = true;
      }
      if (syncLinkedBillIcons(data, cat.name, sub.name, payload)) dirty = true;
    }
  }
  return dirty;
}

function enrichSubcategoryWithPreset(meta, categoryName, subscriptions, recurring) {
  const m = normalizeSubcategory(meta);
  if (m.iconUrl) return m;

  const linkedSub = findSubscriptionItemByName(m.name, subscriptions);
  if (linkedSub?.iconUrl) {
    const preset = resolveSubscriptionPreset(linkedSub);
    return {
      ...m,
      iconUrl: linkedSub.iconUrl,
      domain: linkedSub.domain || preset?.domain || "",
      color: linkedSub.color || preset?.color || "",
      icon: linkedSub.icon || preset?.abbr || m.icon || subscriptionAbbr(m.name),
    };
  }
  if (linkedSub?.icon && linkedSub.icon !== subscriptionAbbr(m.name)) {
    const preset = resolveSubscriptionPreset(linkedSub);
    return {
      ...m,
      icon: linkedSub.icon || preset?.abbr || m.icon,
      domain: linkedSub.domain || preset?.domain || "",
      color: linkedSub.color || preset?.color || "",
    };
  }

  const linkedRec = findRecurringItemByName(m.name, recurring, categoryName);
  if (linkedRec?.iconUrl) {
    return {
      ...m,
      iconUrl: linkedRec.iconUrl,
      icon: linkedRec.icon || m.icon || subscriptionAbbr(m.name),
    };
  }
  if (linkedRec?.icon && linkedRec.icon !== subscriptionAbbr(m.name)) {
    return {
      ...m,
      icon: linkedRec.icon || m.icon,
    };
  }

  const preset = findSubscriptionPreset(m.name)
    || matchTxToSubscriptionPreset({
      subcategory: m.name,
      category: categoryName || DEFAULT_SUBSCRIPTION_LEDGER_CATEGORY,
      note: m.name,
    });
  if (!preset) return m;
  return {
    ...m,
    domain: preset.domain || "",
    color: preset.color || "",
    icon: preset.abbr || m.icon || subscriptionAbbr(m.name),
  };
}

function subscriptionAbbr(name) {
  const clean = String(name || "").replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, "");
  if (/^[a-zA-Z]/.test(clean)) return clean.slice(0, 2).toUpperCase();
  return clean.slice(0, 1) || "订";
}

function brandIconDataUri(color, abbr) {
  const safe = String(abbr || "订").replace(/[<>&'"]/g, "").slice(0, 2);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${color || "#c9a88a"}"/><text x="32" y="40" text-anchor="middle" fill="#ffffff" font-size="24" font-family="system-ui,sans-serif" font-weight="700">${safe}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function subscriptionIconLooksLoaded(img) {
  return !!(img && img.complete && img.naturalWidth >= 16 && img.naturalHeight >= 16);
}

function syncSubscriptionIconWrap(wrap, img, fallbackSrc) {
  const src = String(img?.currentSrc || img?.src || "");
  const isBrandFallback = src.startsWith("data:image/svg+xml") || src === fallbackSrc;
  if (isBrandFallback) {
    wrap.removeClass("has-img");
    return;
  }
  if (subscriptionIconLooksLoaded(img)) wrap.addClass("has-img");
  else wrap.removeClass("has-img");
}

async function tryLoadRemoteFavicon(img, domain, fallbackSrc, wrap) {
  if (!domain || typeof requestUrl !== "function") return false;
  const urls = [
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`,
  ];
  for (const url of urls) {
    try {
      const res = await requestUrl({ url, method: "GET" });
      if (res.status >= 200 && res.status < 300 && res.arrayBuffer?.byteLength > 80) {
        const type = res.headers?.["content-type"] || "image/png";
        const blob = new Blob([res.arrayBuffer], { type });
        const objectUrl = URL.createObjectURL(blob);
        await new Promise((resolve) => {
          const probe = new Image();
          probe.onload = () => {
            if (probe.naturalWidth >= 16 && probe.naturalHeight >= 16) {
              img.src = objectUrl;
              syncSubscriptionIconWrap(wrap, img, fallbackSrc);
            } else {
              URL.revokeObjectURL(objectUrl);
              img.src = fallbackSrc;
              syncSubscriptionIconWrap(wrap, img, fallbackSrc);
            }
            resolve();
          };
          probe.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve();
          };
          probe.src = objectUrl;
        });
        if (wrap?.hasClass("has-img")) return true;
      }
    } catch (_) { /* try next source */ }
  }
  img.src = fallbackSrc;
  syncSubscriptionIconWrap(wrap, img, fallbackSrc);
  return false;
}

function renderSubscriptionIcon(parent, presetOrItem, plugin) {
  const raw = typeof presetOrItem === "string" ? { name: presetOrItem } : (presetOrItem || {});
  const preset = resolveSubscriptionPreset(raw) || findSubscriptionPreset(raw.name) || {};
  const wrap = parent.createDiv({ cls: "plg-sub-app-icon" });
  const color = raw.color || preset.color || "#c9a88a";
  const name = raw.name || preset.name || "";
  const abbr = preset.abbr || raw.icon || subscriptionAbbr(name);
  applyCssProps(wrap, { "--brand": color });

  if (raw.iconUrl && (raw.iconUrl.startsWith("data:") || raw.iconUrl.startsWith("http"))) {
    if (isSvgIconUrl(raw.iconUrl)) {
      const svg = decodeSvgDataUrl(raw.iconUrl);
      if (svg) {
        wrap.addClass("has-img", "has-svg");
        const slot = wrap.createDiv({ cls: "plg-cat-icon-svg" });
        setSvgContent(slot, normalizeIconfontSvg(svg));
        return wrap;
      }
    }
    wrap.createDiv({ cls: "plg-sub-app-icon-fallback", text: abbr });
    const fallbackSrc = brandIconDataUri(color, abbr);
    wrap.addClass("has-img");
    const img = wrap.createEl("img", {
      cls: "plg-sub-app-icon-img",
      attr: { src: raw.iconUrl, alt: name, loading: "lazy", referrerpolicy: "no-referrer" },
    });
    const onCustomIcon = () => syncSubscriptionIconWrap(wrap, img, fallbackSrc);
    img.addEventListener("load", onCustomIcon);
    img.addEventListener("error", () => {
      wrap.removeClass("has-img");
      img.src = fallbackSrc;
      syncSubscriptionIconWrap(wrap, img, fallbackSrc);
    });
    if (img.complete) onCustomIcon();
    return wrap;
  }

  wrap.createDiv({ cls: "plg-sub-app-icon-fallback", text: abbr });
  const domain = raw.domain || preset.domain;
  const fallbackSrc = brandIconDataUri(color, abbr);
  const img = wrap.createEl("img", {
    cls: "plg-sub-app-icon-img",
    attr: {
      src: fallbackSrc,
      alt: name,
      loading: "lazy",
      referrerpolicy: "no-referrer",
    },
  });
  const onImgChange = () => syncSubscriptionIconWrap(wrap, img, fallbackSrc);
  img.addEventListener("load", onImgChange);
  img.addEventListener("error", () => {
    img.src = fallbackSrc;
    syncSubscriptionIconWrap(wrap, img, fallbackSrc);
  });
  onImgChange();
  if (domain) tryLoadRemoteFavicon(img, domain, fallbackSrc, wrap);
  return wrap;
}

function categoryInitialIcon(name) {
  const n = (name || "").trim();
  if (!n) return "·";
  return [...n][0] || "·";
}

function effectiveCategoryIcon(meta) {
  const name = meta?.name || "";
  if (meta?.iconUrl && (meta.iconUrl.startsWith("data:") || meta.iconUrl.startsWith("http"))) {
    return meta.icon || categoryInitialIcon(name);
  }
  const icon = meta?.icon;
  if (!icon || icon === "📌") return categoryInitialIcon(name);
  return icon;
}

function parseKeywordInput(text) {
  return [...new Set(String(text || "").split(/\s+/).map((k) => k.trim()).filter(Boolean))];
}

function formatKeywordInput(keywords) {
  return (keywords || []).join(" ");
}

function subcategoryName(sub) {
  if (!sub) return "";
  return typeof sub === "string" ? sub : (sub.name || "");
}

function normalizeSubcategory(sub) {
  if (!sub) return { name: "", icon: categoryInitialIcon(""), iconUrl: "", keywords: [] };
  if (typeof sub === "string") {
    const name = sub;
    const { icon, iconUrl } = seedSubcategoryIcon(name, "", "");
    return {
      name,
      icon,
      iconUrl: "",
      keywords: seedSubcategoryKeywords(name, []),
    };
  }
  const name = sub.name || "";
  const { icon, iconUrl } = seedSubcategoryIcon(name, sub.icon, sub.iconUrl);
  return {
    name,
    icon: effectiveCategoryIcon({ name, icon, iconUrl }),
    iconUrl: iconUrl || "",
    keywords: seedSubcategoryKeywords(name, sub.keywords || []),
  };
}

function buildDefaultSubIconMap() {
  return {
    水果: "🍎",
    尿不湿: "🧻",
    保险: "🛡️",
    宝宝保险: "🛡️",
    午餐: "🍱",
    早饭: "🍳",
    早餐: "🍳",
    晚饭: "🍽️",
    晚餐: "🍽️",
    茶饮: "🥤",
    奶茶: "🧋",
    咖啡: "☕",
    买菜: "🥬",
    米面粮油: "🌾",
    电费: "💡",
    水费: "🚰",
    物业费: "🏢",
    房贷: "🏠",
    信用卡: "💳",
    理发: "💇",
    手机话费: "📱",
    话费: "📱",
    打的: "🚕",
    停车费: "🅿️",
    奶粉: "🍼",
    玩具: "🧸",
    礼物: "🎁",
    服饰: "👔",
    孝心: "❤️",
    麻将: "🀄",
    斗地主: "🃏",
    棋牌: "🎴",
    维修: "🔧",
    洗护用品: "🧴",
    烟酒茶: "🍷",
    通讯: "📡",
    Ai充值: "🤖",
  };
}

const DEFAULT_SUB_ICONS = buildDefaultSubIconMap();

function isInitialSubIcon(name, icon) {
  const cur = String(icon || "").trim();
  if (!cur || cur === "📌") return true;
  if (cur.length === 1) return true;
  const initial = categoryInitialIcon(name);
  return cur === initial;
}

function seedSubcategoryIcon(name, icon, iconUrl) {
  if (iconUrl) return { icon: icon || categoryInitialIcon(name), iconUrl };
  const preset = DEFAULT_SUB_ICONS[name];
  const cur = String(icon || "").trim();
  if (preset && isInitialSubIcon(name, cur)) {
    return { icon: preset, iconUrl: "" };
  }
  return { icon: cur || categoryInitialIcon(name), iconUrl: "" };
}

/** 上传图标压缩为统一尺寸，展示与 emoji 一致 */
function compressIconImageFile(file, maxPx = 128) {
  return new Promise((resolve, reject) => {
    if (!file || !String(file.type || "").startsWith("image/")) {
      reject(new Error("invalid image"));
      return;
    }
    if (file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(reader.error || new Error("read failed"));
      reader.readAsDataURL(file);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const w = img.naturalWidth || img.width || maxPx;
        const h = img.naturalHeight || img.height || maxPx;
        const scale = Math.min(1, maxPx / Math.max(w, h, 1));
        const tw = Math.max(1, Math.round(w * scale));
        const th = Math.max(1, Math.round(h * scale));
        const canvas = document.createElement("canvas");
        canvas.width = tw;
        canvas.height = th;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(String(reader.result || ""));
          return;
        }
        ctx.drawImage(img, 0, 0, tw, th);
        let dataUrl = "";
        try {
          dataUrl = canvas.toDataURL("image/webp", 0.86);
          if (!dataUrl.startsWith("data:image/webp")) dataUrl = canvas.toDataURL("image/jpeg", 0.86);
        } catch {
          dataUrl = canvas.toDataURL("image/png");
        }
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error("load failed"));
      img.src = String(reader.result || "");
    };
    reader.onerror = () => reject(reader.error || new Error("read failed"));
    reader.readAsDataURL(file);
  });
}

/** 将已存储的 data URL 图标统一压缩为 PNG（maxPx 像素） */
function rasterizeDataUrlToPng(dataUrl, maxPx = 128) {
  return new Promise((resolve) => {
    const raw = String(dataUrl || "").trim();
    if (!raw.startsWith("data:")) {
      resolve(raw);
      return;
    }
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth || 0;
      const h = img.naturalHeight || 0;
      if (w > 0 && h > 0 && w <= maxPx && h <= maxPx && /^data:image\/png/i.test(raw)) {
        resolve(raw);
        return;
      }
      const sw = w || maxPx;
      const sh = h || maxPx;
      const scale = Math.min(1, maxPx / Math.max(sw, sh, 1));
      const tw = Math.max(1, Math.round(sw * scale));
      const th = Math.max(1, Math.round(sh * scale));
      const canvas = document.createElement("canvas");
      canvas.width = tw;
      canvas.height = th;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(raw);
        return;
      }
      ctx.drawImage(img, 0, 0, tw, th);
      try {
        const png = canvas.toDataURL("image/png");
        resolve(png && png.length > 80 ? png : raw);
      } catch {
        resolve(raw);
      }
    };
    img.onerror = () => resolve(raw);
    img.src = raw;
  });
}

async function normalizeStoredIconUrl(iconUrl, maxPx = 128) {
  const raw = String(iconUrl || "").trim();
  if (!raw || !raw.startsWith("data:")) return raw;
  if (isSvgIconUrl(raw)) {
    const svg = decodeSvgDataUrl(raw);
    if (!svg) return raw;
    const png = await rasterizeSvgToPngDataUrl(normalizeIconfontSvg(svg));
    return png && png.length > 120 ? png : raw;
  }
  return rasterizeDataUrlToPng(raw, maxPx);
}

async function normalizeAllStoredIcons(data, maxPx = 128) {
  let changed = false;
  const touch = async (obj) => {
    if (!obj?.iconUrl || !String(obj.iconUrl).startsWith("data:")) return;
    const next = await normalizeStoredIconUrl(obj.iconUrl, maxPx);
    if (next && next !== obj.iconUrl) {
      obj.iconUrl = next;
      changed = true;
    }
  };
  const jobs = [];
  (data.categories || []).forEach((cat) => {
    jobs.push(touch(cat));
    (cat.subcategories || []).forEach((sub) => jobs.push(touch(normalizeSubcategory(sub))));
  });
  (data.subscriptions || []).forEach((s) => jobs.push(touch(s)));
  await Promise.all(jobs);
  return changed;
}

function buildDefaultSubKeywordMap() {
  const map = {};
  SUBSCRIPTION_PRESETS.forEach((p) => {
    const sub = p.subcategory || p.name;
    const tokens = [...new Set([p.name, p.subcategory].filter(Boolean))];
    map[sub] = [...new Set([...(map[sub] || []), ...tokens])];
  });
  const extra = {
    买菜: ["买菜", "菜市场", "超市", "菜场"],
    水果: ["水果", "果切"],
    电费: ["电费", "缴电费", "电力"],
    米面粮油: ["米面", "粮油", "大米", "面粉"],
    午餐: ["午餐", "午饭", "中饭"],
    晚饭: ["晚餐", "晚饭", "夜宵"],
    早饭: ["早餐", "早饭", "早点"],
    茶饮: ["奶茶", "咖啡", "茶饮", "饮料"],
    打的: ["打车", "滴滴", "出租", "网约车"],
    停车费: ["停车", "停车费"],
    房贷: ["房贷", "月供", "按揭"],
    信用卡: ["信用卡", "还款"],
    保险: ["保险", "保费", "保单"],
    尿不湿: ["尿不湿", "纸尿裤", "拉拉裤", "尿片"],
    宝宝保险: ["宝宝保险", "少儿保险", "儿童保险"],
    奶粉: ["奶粉", "配方奶"],
    玩具: ["玩具", "积木"],
    礼物: ["礼物", "礼品"],
    服饰: ["衣服", "服饰", "童装"],
    孝心: ["孝心", "孝敬"],
    维修: ["维修", "修理"],
    洗护用品: ["洗护", "洗衣液", "沐浴露"],
    烟酒茶: ["烟酒", "茶叶", "香烟"],
    通讯: ["话费", "流量", "宽带"],
    物业费: ["物业费", "物业"],
    水费: ["水费", "自来水"],
    Ai充值: ["Ai充值", "AI充值", "Cursor", "ChatGPT", "Claude", "Gemini"],
    手工素材: ["手工", "素材", "文具"],
    理发: ["理发", "剪发", "美发"],
    手机话费: ["话费", "充值", "流量"],
    麻将: ["麻将", "搓麻", "打牌"],
    斗地主: ["斗地主", "扑克"],
    棋牌: ["棋牌", "麻将", "斗地主", "扑克"],
  };
  Object.entries(extra).forEach(([k, v]) => {
    map[k] = [...new Set([...(map[k] || []), ...v])];
  });
  return map;
}

const DEFAULT_SUB_KEYWORDS = buildDefaultSubKeywordMap();

function seedSubcategoryKeywords(name, existing) {
  const list = [...new Set((existing || []).filter(Boolean))];
  const defaults = DEFAULT_SUB_KEYWORDS[name] || [];
  return [...new Set([...list, ...defaults])];
}

function syncSubcategoryDefaults(data) {
  if (!data?.categories?.length) return false;
  let changed = false;
  data.categories.forEach((cat) => {
    if (!cat.subcategories?.length) return;
    const nextSubs = cat.subcategories.map((sub) => {
      const raw = typeof sub === "string" ? { name: sub } : { ...sub };
      const norm = normalizeSubcategory(raw);
      const before = JSON.stringify(sub);
      const after = JSON.stringify(norm);
      if (before !== after) changed = true;
      return norm;
    });
    cat.subcategories = nextSubs;
  });
  return changed;
}

function normalizeCategorySubs(cat) {
  if (!cat.subcategories) cat.subcategories = [];
  cat.subcategories = cat.subcategories.map(normalizeSubcategory);
  cat.subcategories.sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
}

function renderIconUrlContent(wrap, iconUrl, alt = "") {
  if (!iconUrl) return false;
  if (isSvgIconUrl(iconUrl)) {
    const svg = decodeSvgDataUrl(iconUrl);
    if (svg) {
      wrap.addClass("has-img", "has-svg");
      const slot = wrap.createDiv({ cls: "plg-cat-icon-svg" });
      setSvgContent(slot, normalizeIconfontSvg(svg));
      return true;
    }
  }
  if (iconUrl.startsWith("data:") || iconUrl.startsWith("http")) {
    wrap.addClass("has-img");
    wrap.createEl("img", {
      cls: "plg-cat-icon-img",
      attr: { src: iconUrl, alt: alt || "" },
    });
    return true;
  }
  return false;
}

function renderCategoryIcon(parent, cat, opts = {}) {
  const meta = cat || {};
  const slotCls = opts.panelIcon ? " plg-panel-icon-slot" : "";
  if (!meta.iconUrl && meta.domain) {
    const slot = parent.createDiv({ cls: "plg-cat-icon-wrap has-sub-brand" + slotCls });
    renderSubscriptionIcon(slot, meta);
    return slot;
  }
  const wrap = parent.createDiv({ cls: "plg-cat-icon-wrap" + slotCls });
  if (renderIconUrlContent(wrap, meta.iconUrl, meta.name)) {
    return wrap;
  }
  wrap.addClass("no-bg");
  wrap.createDiv({ cls: "plg-cat-icon", text: effectiveCategoryIcon(meta) });
  return wrap;
}

function findSubcategoryMeta(cat, subName) {
  const name = String(subName || "").trim();
  if (!cat || !name) return null;
  const subs = cat.subcategories || [];
  const exact = subs.find((s) => subcategoryName(s) === name);
  if (exact) return exact;
  const lower = name.toLowerCase();
  return subs.find((s) => subcategoryName(s).toLowerCase() === lower) || null;
}

function buildTransactionDisplayTitle(categories, t) {
  const cat = (categories || []).find((c) => c.name === t.category);
  const catName = cat?.name || t.category || "";
  const subRaw = String(t.subcategory || "").trim();
  if (!subRaw) return catName;
  const subMeta = findSubcategoryMeta(cat, subRaw);
  const subName = subMeta ? subcategoryName(subMeta) : subRaw;
  return `${catName}·${subName}`;
}

/** 入账预览/列表：优先二级分类图标，否则用一级（含 iconUrl） */
function getTransactionIconMeta(categories, categoryName, subName, subscriptions, recurring) {
  const cat = (categories || []).find((c) => c.name === categoryName);
  if (!cat) return { name: categoryName || "", icon: "📌", iconUrl: "" };
  const sub = findSubcategoryMeta(cat, subName);
  if (sub) return enrichSubcategoryWithPreset(sub, categoryName, subscriptions, recurring);
  if (String(subName || "").trim()) {
    return enrichSubcategoryWithPreset(
      { name: String(subName).trim(), icon: "", iconUrl: "" },
      categoryName,
      subscriptions,
      recurring,
    );
  }
  return {
    name: cat.name,
    icon: cat.icon,
    iconUrl: cat.iconUrl || "",
  };
}

function renderCategoryLabel(parent, meta, opts = {}) {
  const label = parent.createDiv({ cls: "plg-cat-label" });
  const displayMeta = enrichSubcategoryWithPreset(
    normalizeSubcategory(meta),
    opts.categoryName || "",
    opts.subscriptions || [],
    opts.recurring || [],
  );
  renderCategoryIcon(label, displayMeta);
  if (opts.multiline) {
    const info = label.createDiv({ cls: "plg-cat-info" });
    info.createDiv({ cls: "plg-cat-name", text: displayMeta.name || opts.name || "" });
    if (opts.subtitle) info.createDiv({ cls: "plg-muted", text: opts.subtitle });
    return { label, info };
  }
  const textCol = label.createDiv({ cls: "plg-cat-label-text" });
  textCol.createEl("span", {
    cls: opts.nameClass || "plg-cat-label-name",
    text: displayMeta.name || opts.name || "",
  });
  if (opts.subtitle) textCol.createDiv({ cls: "plg-muted plg-cat-label-sub", text: opts.subtitle });
  return { label, nameEl: textCol };
}

// ─── Smart input parser (关键词匹配) ───────────────────────────────────────

/**
 * 常见关联词库：anchor 为概念锚点（如「棋牌」）
 * 匹配顺序：先找同名二级分类 → 再找 anchor 对应的一级/二级 → 最后才兜底
 */
const CATEGORY_ALIAS_GROUPS = {
  棋牌: ["麻将", "扑克", "斗地主", "打牌", "搓麻", "牌局", "德州", "象棋", "围棋", "五子棋"],
  餐饮: ["午饭", "晚饭", "早饭", "外卖", "堂食", "聚餐", "下馆子"],
  交通: ["打车", "滴滴", "地铁", "公交", "高铁", "火车", "机票", "加油"],
};

function findSubcategoryOwner(categories, subName) {
  if (!subName) return null;
  for (const cat of categories || []) {
    if ((cat.subcategories || []).some((s) => subcategoryName(s) === subName)) {
      return { category: cat.name, subcategory: subName, flow: cat.flow || "expense" };
    }
  }
  return null;
}

function resolveAliasTarget(categories, anchorName, alias) {
  const subHit = findSubcategoryOwner(categories, alias);
  if (subHit) return { ...subHit, tier: "sub", kind: "alias-sub" };

  const primary = (categories || []).find((c) => c.name === anchorName);
  if (primary) {
    return {
      category: anchorName,
      subcategory: "",
      flow: primary.flow || "expense",
      tier: "cat",
      kind: "alias-cat",
    };
  }

  const anchorAsSub = findSubcategoryOwner(categories, anchorName);
  if (anchorAsSub) {
    return { ...anchorAsSub, tier: "sub", kind: "alias-sub" };
  }

  return null;
}

function buildKeywordIndex(categories, globalKeywords) {
  const subIndex = [];
  const catIndex = [];

  (categories || []).forEach((cat) => {
    const flow = cat.flow || "expense";
    (cat.subcategories || []).forEach((sub) => {
      const meta = normalizeSubcategory(sub);
      const name = meta.name;
      if (!name) return;
      subIndex.push({
        keyword: name,
        category: cat.name,
        subcategory: name,
        flow,
        len: name.length,
        kind: "subcategory",
      });
      (meta.keywords || []).forEach((kw) => {
        if (!kw) return;
        parseKeywordInput(kw).forEach((token) => {
          if (!token) return;
          subIndex.push({
            keyword: token,
            category: cat.name,
            subcategory: name,
            flow,
            len: token.length,
            kind: "sub-keyword",
          });
        });
      });
    });
    if (cat.name) {
      catIndex.push({
        keyword: cat.name,
        category: cat.name,
        subcategory: "",
        flow,
        len: cat.name.length,
        kind: "category",
      });
    }
    (cat.keywords || []).forEach((kw) => {
      if (!kw) return;
      parseKeywordInput(kw).forEach((token) => {
        if (!token) return;
        catIndex.push({
          keyword: token,
          category: cat.name,
          subcategory: "",
          flow,
          len: token.length,
          kind: "cat-keyword",
        });
      });
    });
  });

  Object.entries(CATEGORY_ALIAS_GROUPS).forEach(([anchorName, aliases]) => {
    aliases.forEach((alias) => {
      const target = resolveAliasTarget(categories, anchorName, alias);
      if (!target) return;
      const entry = {
        keyword: alias,
        category: target.category,
        subcategory: target.subcategory || "",
        flow: target.flow,
        len: alias.length,
        kind: target.kind,
      };
      if (target.tier === "sub") subIndex.push(entry);
      else catIndex.push(entry);
    });
  });

  Object.entries(globalKeywords || {}).forEach(([kw, v]) => {
    if (!kw) return;
    const entry = {
      keyword: kw,
      category: v.category || "",
      subcategory: v.subcategory || "",
      flow: v.flow || "expense",
      len: kw.length,
      kind: "global",
    };
    if (entry.subcategory) subIndex.push(entry);
    else catIndex.push(entry);
  });

  const sorter = (a, b) => b.len - a.len || (a.kind === "subcategory" ? -1 : 0);
  return {
    subIndex: subIndex.sort(sorter),
    catIndex: catIndex.sort(sorter),
  };
}

function amountPattern(amount) {
  const n = Number(amount);
  if (!n) return "";
  if (Number.isInteger(n)) return `${n}(?:\\.0+)?`;
  return String(n).replace(".", "\\.");
}

function stripAmountFromText(raw, amount) {
  let t = String(raw || "");
  const ap = amountPattern(amount);
  if (ap) {
    t = t.replace(new RegExp(`(?:¥|￥)\\s*${ap}`, "g"), " ");
    t = t.replace(new RegExp(`${ap}\\s*[元块]?`, "g"), " ");
    t = t.replace(new RegExp(`${ap}$`), " ");
    t = t.replace(new RegExp(`^${ap}`), " ");
  }
  t = t.replace(/(?:¥|￥)\s*\d+(?:\.\d{1,2})?/g, " ");
  t = t.replace(/\d+(?:\.\d{1,2})?\s*[元块]/g, " ");
  t = t.replace(/[零〇一二两三四五六七八九十百千万]{1,8}\s*[元块]/g, " ");
  t = t.replace(/([零〇一二两三四五六七八九十百千万]{1,4})\s*$/g, " ");
  t = t.replace(/20\d{2}[-\/.年]\d{1,2}[-\/.月]\d{1,2}日?/g, " ");
  t = t.replace(/昨天|前天|今天|刚才/g, " ");
  t = t.replace(/\d{1,2}月\d{1,2}日?/g, " ");
  t = t.replace(/(?:^|\s)\d{1,2}[.\-/]\d{1,2}日?(?=\s|[^\d]|$)/g, " ");
  t = t.replace(/花了|花费|支出|收入|买了|付了|消费|转账/g, " ");
  return t.replace(/\s+/g, " ").trim();
}

function hasMeaningfulHint(text) {
  const t = String(text || "").replace(/\s+/g, "").trim();
  return t.length >= 2;
}

function textHitsKeyword(text, keyword) {
  if (!text || !keyword) return false;
  if (text === keyword) return true;
  if (text.includes(keyword) || keyword.includes(text)) {
    return Math.min(text.length, keyword.length) >= 2;
  }
  return false;
}

function matchFromIndex(text, index) {
  if (!text) return null;
  for (const item of index) {
    if (item.keyword === text) return item;
  }
  for (const item of index) {
    if (!item.keyword) continue;
    if (textHitsKeyword(text, item.keyword)) return item;
  }
  return null;
}

function matchTiered(textForMatch, raw, subIndex, catIndex) {
  return matchFromIndex(textForMatch, subIndex)
    || matchFromIndex(raw, subIndex)
    || matchFromIndex(textForMatch, catIndex)
    || matchFromIndex(raw, catIndex);
}

function scoreMatch(item, textForMatch, raw) {
  const inHint = textForMatch && textHitsKeyword(textForMatch, item.keyword);
  const inRaw = textHitsKeyword(raw, item.keyword);
  const isSub = !!(item.subcategory || item.kind === "subcategory" || item.kind === "alias-sub");

  if (isSub && (inHint || inRaw)) {
    const label = item.kind === "alias-sub" ? "关联词·二级" : "二级分类";
    return { confidence: inHint ? 0.94 : 0.88, matchReason: "subcategory", matchLabel: label };
  }
  if (item.kind === "keyword" || item.kind === "global" || item.kind === "sub-keyword") {
    const label = item.kind === "sub-keyword" ? "二级关键词" : "关键词";
    return { confidence: inHint ? 0.88 : 0.82, matchReason: "keyword", matchLabel: label };
  }
  if (item.kind === "alias-cat") {
    return { confidence: inHint ? 0.84 : 0.78, matchReason: "category", matchLabel: "关联词·一级" };
  }
  return { confidence: inHint ? 0.8 : 0.74, matchReason: "category", matchLabel: "一级分类" };
}

function parseChineseAmount(str) {
  const map = { 零: 0, 〇: 0, 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
  const unit = { 十: 10, 百: 100, 千: 1000, 万: 10000 };
  let total = 0;
  let section = 0;
  let number = 0;
  for (const ch of String(str || "")) {
    if (ch in map) number = map[ch];
    else if (ch in unit) {
      const u = unit[ch];
      if (u === 10000) {
        section = (section + number) * u;
        total += section;
        section = 0;
        number = 0;
      } else {
        section += (number || 1) * u;
        number = 0;
      }
    }
  }
  return total + section + number;
}

function extractAmount(text) {
  const raw = String(text || "").replace(/,/g, "");
  const candidates = [];

  const push = (v, score) => {
    const n = parseFloat(v);
    if (!n || n <= 0 || n > 99999999) return;
    candidates.push({ v: n, score });
  };

  const tailCnAmt = raw.match(/([\u4e00-\u9fff]{1,12})(\d+(?:\.\d{1,2})?)\s*$/);
  if (tailCnAmt) push(tailCnAmt[2], 98);

  for (const m of raw.matchAll(/([零〇一二两三四五六七八九十百千万]{1,8})\s*[元块]/g)) {
    const v = parseChineseAmount(m[1]);
    if (v > 0) push(String(v), 96);
  }

  const tailCnHan = raw.match(/([\u4e00-\u9fff]{1,12})([零〇一二两三四五六七八九十百千万]{1,6})\s*$/);
  if (tailCnHan) {
    const v = parseChineseAmount(tailCnHan[2]);
    if (v > 0) push(String(v), 97);
  }

  const tailHanOnly = raw.match(/([零〇一二两三四五六七八九十百千万]{1,4})\s*$/);
  if (tailHanOnly) {
    const v = parseChineseAmount(tailHanOnly[1]);
    if (v > 0 && v <= 99999) push(String(v), 94);
  }

  for (const m of raw.matchAll(/(?:¥|￥)\s*(\d+(?:\.\d{1,2})?)/g)) {
    push(m[1], 100);
  }
  for (const m of raw.matchAll(/(\d+(?:\.\d{1,2})?)\s*[元块]/g)) {
    push(m[1], 95);
  }
  for (const m of raw.matchAll(
    /(?:午餐|早餐|晚餐|早饭|午饭|晚饭|买菜|工资|花了|付了|消费|支出|收入|买了|共计|合计|一共|转账|过路费|停车费)\s*[：:]?\s*(\d+(?:\.\d{1,2})?)/g
  )) {
    push(m[1], 92);
  }

  for (const m of raw.matchAll(/(\d+(?:\.\d{1,2})?)/g)) {
    const token = m[1];
    const v = parseFloat(token);
    if (!v || v <= 0) continue;
    if (looksLikeMdDate(token, raw, m.index ?? 0)) continue;

    let score = 55;
    const idx = m.index ?? 0;
    const tail = raw.slice(idx, idx + 12);
    const before = raw.slice(Math.max(0, idx - 1), idx);
    const after = raw.slice(idx + token.length, idx + token.length + 1);

    if (/^\d+(?:\.\d+)?\s*[个个条款份杯只双]/.test(tail) && v <= 20) score = 15;
    if (/[\u4e00-\u9fff]/.test(before) && !token.includes(".")) score += 22;
    if (idx + token.length >= raw.trim().length - 1 && !token.includes(".")) score += 18;
    if (token.includes(".")) score += 8;
    if (v >= 50) score += 8;
    if (v >= 500) score += 5;
    if (/[\u4e00-\u9fff]/.test(after) && token.includes(".")) score -= 30;
    push(token, score);
  }

  if (!candidates.length) return 0;
  candidates.sort((a, b) => b.score - a.score || b.v - a.v);
  return candidates[0].v;
}

function looksLikeMdDate(token, raw, index) {
  if (!/^\d{1,2}\.\d{1,2}$/.test(token)) return false;
  const [m, d] = token.split(".").map(Number);
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  if (index <= 2) return true;
  const after = raw.slice(index + token.length, index + token.length + 1);
  return /[\u4e00-\u9fff]/.test(after);
}

function stripDateTokens(text) {
  return String(text || "")
    .replace(/(?:^|\s)(\d{1,2})[.\-/](\d{1,2})(?:日)?(?=[\u4e00-\u9fff\s]|$)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCalendarDate(year, month, day, refNow) {
  const now = refNow || new Date();
  const y = year != null ? year : now.getFullYear();
  const d = new Date(y, month - 1, day, now.getHours(), now.getMinutes());
  if (year == null) {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (d.getTime() > today.getTime()) d.setFullYear(y - 1);
  }
  return d;
}

function parseRelativeDate(text) {
  const now = new Date();
  const raw = String(text || "");
  if (/前天/.test(raw)) {
    const d = new Date(now);
    d.setDate(d.getDate() - 2);
    return d;
  }
  if (/昨天/.test(raw)) {
    const d = new Date(now);
    d.setDate(d.getDate() - 1);
    return d;
  }
  if (/今天|刚才/.test(raw)) return now;

  let m = raw.match(/(20\d{2})[-\/.年](\d{1,2})[-\/.月](\d{1,2})日?/);
  if (m) {
    return parseCalendarDate(parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10), now);
  }

  m = raw.match(/(\d{1,2})月(\d{1,2})日?/);
  if (m) {
    return parseCalendarDate(null, parseInt(m[1], 10), parseInt(m[2], 10), now);
  }

  m = raw.match(/(?:^|\s)(\d{1,2})[.\-/](\d{1,2})(?:日)?(?=\s|[^\d]|$)/);
  if (m) {
    const month = parseInt(m[1], 10);
    const day = parseInt(m[2], 10);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return parseCalendarDate(null, month, day, now);
    }
  }

  return now;
}

function detectReimbursement(text) {
  return /报销|待报销|可报销/.test(String(text || ""));
}

function detectFlow(text, matchedFlow) {
  if (/收入|工资|到账|退款|赞助|二手|结余/.test(text)) return "income";
  if (/支出|花了|消费|付款|买了|付了/.test(text)) return "expense";
  if (detectReimbursement(text)) return "expense";
  return matchedFlow === "income" ? "income" : "expense";
}

function learnFromTextHistory(hint, transactions, categories) {
  if (!hint || hint.length < 2) return null;
  const scores = new Map();
  (transactions || []).slice(0, 500).forEach((t) => {
    const note = (t.note || "").trim();
    const sub = (t.subcategory || "").trim();
    const catName = (t.category || "").trim();
    let weight = 0;
    if (sub && textHitsKeyword(sub, hint)) weight += sub === hint ? 6 : 4;
    if (note && textHitsKeyword(note, hint)) weight += note === hint ? 5 : 3;
    if (catName && textHitsKeyword(catName, hint)) weight += 2;
    if (!weight) return;
    const key = `${catName}|${sub}`;
    scores.set(key, (scores.get(key) || 0) + weight);
  });
  let bestKey = null;
  let bestScore = 0;
  scores.forEach((score, key) => {
    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  });
  if (!bestKey || bestScore < 3) return null;
  const [category, subcategory] = bestKey.split("|");
  const cat = categories.find((c) => c.name === category);
  if (!cat) return null;
  return {
    category,
    subcategory,
    flow: cat.flow || "expense",
    confidence: Math.min(0.72, 0.48 + bestScore * 0.04),
    matchReason: "history-text",
    matchLabel: "历史记录",
    matchedKw: hint,
  };
}

const LEARN_STOP_PREFIX = /^(购买|买了|消费|花了|付款|支付|支出|收入|搞定|来个|一件|一个|一份|今日|今天|昨天|刚才|刚刚)/;
const LEARN_STOP_SUFFIX = /(了|的|钱|块|元)$/;

function extractLearnableKeywords(text, amount) {
  let raw = String(text || "").trim();
  if (!raw) return [];
  raw = stripAmountFromText(raw, amount) || raw;
  raw = raw.replace(/[¥￥.,+\-]/g, " ").replace(/元|块|毛钱/g, " ").replace(/\s+/g, " ").trim();
  raw = raw.replace(LEARN_STOP_PREFIX, "").replace(LEARN_STOP_SUFFIX, "").trim();

  const out = new Set();
  (raw.match(/[\u4e00-\u9fff]{2,8}/g) || []).forEach((chunk) => {
    let token = chunk.replace(LEARN_STOP_PREFIX, "").replace(LEARN_STOP_SUFFIX, "").trim();
    if (token.length >= 2 && token.length <= 8) out.add(token);
  });
  if (raw.length >= 2 && raw.length <= 8 && /[\u4e00-\u9fff]{2,}/.test(raw)) out.add(raw);
  return [...out].slice(0, 2);
}

/** 记账后把商户/商品词写入分类关键词，供下次智能识别 */
function learnKeywordsFromTransaction(data, tx, rawHint) {
  if (!data || !tx?.category || tx?.source === "carryover") return false;
  const hint = String(rawHint || tx.note || "").trim();
  if (!hint) return false;

  const tokens = extractLearnableKeywords(hint, tx.amount);
  if (!tokens.length) return false;

  const cat = (data.categories || []).find((c) => c.name === tx.category);
  if (!cat) return false;

  let dirty = false;
  if (tx.subcategory) {
    const subName = String(tx.subcategory).trim();
    normalizeCategorySubs(cat);
    const idx = cat.subcategories.findIndex((s) => subcategoryName(s) === subName);
    if (idx < 0) return false;
    const sub = normalizeSubcategory(cat.subcategories[idx]);
    tokens.forEach((kw) => {
      if (!kw || kw === subName || kw === cat.name) return;
      if (!(sub.keywords || []).includes(kw)) {
        sub.keywords = [...(sub.keywords || []), kw];
        dirty = true;
      }
    });
    if (dirty) {
      sub.keywords.sort((a, b) => a.localeCompare(b, "zh"));
      cat.subcategories[idx] = sub;
    }
  } else {
    if (!cat.keywords) cat.keywords = [];
    tokens.forEach((kw) => {
      if (!kw || kw === cat.name) return;
      if (!cat.keywords.includes(kw)) {
        cat.keywords.push(kw);
        dirty = true;
      }
    });
    if (dirty) cat.keywords.sort((a, b) => a.localeCompare(b, "zh"));
  }
  return dirty;
}

function applyMatchResult(result, hit, textForMatch, raw) {
  if (!hit) return result;
  result.category = hit.category;
  result.subcategory = hit.subcategory || "";
  result.matchedFlow = hit.flow || "expense";
  result.matchedKw = hit.keyword || hit.matchedKw || "";
  if (hit.confidence != null) {
    result.confidence = hit.confidence;
    result.matchReason = hit.matchReason;
    result.matchLabel = hit.matchLabel;
    return result;
  }
  const scored = scoreMatch(hit, textForMatch, raw);
  result.confidence = scored.confidence;
  result.matchReason = scored.matchReason;
  result.matchLabel = scored.matchLabel;
  return result;
}

function parseSmartInput(text, categories, globalKeywords, transactions) {
  const raw = String(text || "").trim();
  if (!raw) return null;

  const refDate = parseRelativeDate(raw);
  const amountRaw = stripDateTokens(raw);
  const amount = extractAmount(amountRaw);
  if (!amount || amount <= 0) return { error: "未识别到金额，例如：午餐22 或 6.28过路费48" };

  const { subIndex, catIndex } = buildKeywordIndex(categories, globalKeywords);
  const textForMatch = stripAmountFromText(amountRaw, amount);

  const result = {
    category: "",
    subcategory: "",
    matchedFlow: "expense",
    matchedKw: "",
    confidence: 0.22,
    matchReason: "fallback",
    matchLabel: "默认分类",
  };

  // 1) 二级（含关联词·二级、二级名）→ 一级（含关联词·一级、关键词、一级名）
  const hit = matchTiered(textForMatch, raw, subIndex, catIndex);
  if (hit) applyMatchResult(result, hit, textForMatch, raw);

  // 2) 仍无结果 → 查历史文字记录（不用同金额）
  if (!result.category && hasMeaningfulHint(textForMatch)) {
    const learnedText = learnFromTextHistory(textForMatch, transactions, categories);
    if (learnedText) applyMatchResult(result, learnedText, textForMatch, raw);
  }

  // 3) 兜底默认分类
  if (!result.category) {
    const fallback = categories.find((c) => c.name === "生活" && c.flow !== "income")
      || categories.find((c) => c.flow !== "income")
      || categories[0];
    result.category = fallback?.name || "";
    result.subcategory = "";
    result.confidence = 0.22;
    result.matchReason = "fallback";
    result.matchLabel = "默认分类";
  }

  const flow = detectFlow(raw, result.matchedFlow);
  const reimburse = detectReimbursement(raw);
  let note = textForMatch;
  if (result.matchedKw) note = note.replace(result.matchedKw, "");
  note = note.replace(/花了|花费|支出|收入|买了|付了/g, "").replace(/\s+/g, " ").trim();
  if (!note) note = raw.replace(result.matchedKw || "", "").replace(/\d+(?:\.\d+)?/g, "").trim();
  if (!note && result.matchReason === "fallback") note = textForMatch || "";

  const now = new Date();
  const explicitDate = /(?:^|\s)(\d{1,2})[.\-/](\d{1,2})|月|年|昨天|前天/.test(raw);
  const useNoon = explicitDate && dateKey(refDate) !== dateKey(now);
  const timePart = useNoon
    ? "12:00"
    : `${pad2(refDate.getHours())}:${pad2(refDate.getMinutes())}`;

  return {
    flow,
    amount,
    category: result.category,
    subcategory: result.subcategory,
    note,
    datetime: `${dateKey(refDate)} ${timePart}`,
    confidence: result.confidence,
    matchReason: result.matchReason,
    matchLabel: result.matchLabel,
    reimburse,
    raw,
  };
}

function formatMatchHint(parsed) {
  if (!parsed) return "";
  const pct = Math.round((parsed.confidence || 0) * 100);
  if ((parsed.confidence || 0) < 0.5 || parsed.matchReason === "fallback") {
    const base = parsed.matchReason === "fallback"
      ? "未匹配分类 · 请确认"
      : `匹配度偏低 (${pct}%) · 请确认分类`;
    return parsed.reimburse ? `${base} · 已标记报销` : base;
  }
  if (parsed.matchReason === "fallback") {
    return parsed.note
      ? `未匹配分类 · 备注「${parsed.note}」· 已暂归入默认`
      : "未匹配分类 · 已暂归入默认";
  }
  if (parsed.matchReason === "history-text") {
    return `历史记录 · 匹配度 ${pct}%`;
  }
  const via = parsed.matchLabel || "关键词";
  const hint = `${via} · 匹配度 ${pct}%`;
  return parsed.reimburse ? `${hint} · 报销支出` : hint;
}

/** 从支付截图 OCR 文本中提取金额、商户、时间，再交给智能解析 */
function parseOcrReceiptText(text, categories, globalKeywords, transactions) {
  const raw = String(text || "").replace(/\s+/g, " ").trim();
  if (!raw) return null;

  const amountPatterns = [
    /(?:实付|合计|总计|支付|付款|金额|￥|¥)\s*[：:]?\s*(-?\d+(?:\.\d{1,2})?)/,
    /(-?\d+(?:\.\d{1,2})?)\s*元/,
    /[¥￥]\s*(-?\d+(?:\.\d{1,2})?)/,
  ];
  let amount = 0;
  for (const re of amountPatterns) {
    const m = raw.match(re);
    if (m) {
      amount = Math.abs(parseFloat(m[1]) || 0);
      if (amount > 0) break;
    }
  }

  const merchantPatterns = [
    /商户[名称名]?[：:]\s*([^\n，,；;]{2,24})/,
    /收款方[：:]\s*([^\n，,；;]{2,24})/,
    /向\s*([^\s，,；;]{2,20})\s*付款/,
    /付款给\s*([^\s，,；;]{2,20})/,
  ];
  let merchant = "";
  for (const re of merchantPatterns) {
    const m = raw.match(re);
    if (m) {
      merchant = m[1].trim();
      break;
    }
  }

  const datePatterns = [
    /(\d{4})[年/-](\d{1,2})[月/-](\d{1,2})[日号]?/,
    /(\d{1,2})[月/-](\d{1,2})[日号]/,
  ];
  let dateHint = "";
  for (const re of datePatterns) {
    const m = raw.match(re);
    if (m) {
      if (m.length >= 4) dateHint = `${m[1]}-${m[2]}-${m[3]}`;
      else dateHint = `${m[1]}月${m[2]}日`;
      break;
    }
  }

  const parts = [];
  if (merchant) parts.push(merchant);
  if (amount > 0) parts.push(String(amount));
  if (dateHint) parts.push(dateHint);
  const hint = parts.join(" ") || raw.slice(0, 120);
  const parsed = parseSmartInput(hint, categories, globalKeywords, transactions);
  if (!parsed || parsed.error) {
    return parseSmartInput(raw, categories, globalKeywords, transactions);
  }
  if (amount > 0) parsed.amount = amount;
  if (merchant && !parsed.note) parsed.note = merchant;
  else if (merchant && !parsed.note.includes(merchant)) parsed.note = `${merchant} ${parsed.note}`.trim();
  if (dateHint) {
    const ref = parseRelativeDate(dateHint);
    parsed.datetime = `${dateKey(ref)} ${pad2(ref.getHours())}:${pad2(ref.getMinutes())}`;
  }
  parsed.raw = raw;
  return parsed;
}

function parsedToTransaction(parsed, ledger, source) {
  return {
    id: uid(),
    datetime: parsed.datetime,
    flow: parsed.flow,
    category: parsed.category,
    subcategory: parsed.subcategory || "",
    amount: parsed.amount,
    ledger: ledger || "",
    accountOut: "",
    accountIn: "",
    note: parsed.note || "",
    reimburse: !!parsed.reimburse,
    discount: 0,
    tags: [],
    member: "",
    source: source || "smart",
    linkedSubscriptionId: "",
    linkedRecurringId: "",
  };
}

function txToParsed(tx, opts = {}) {
  return {
    flow: tx.flow,
    amount: tx.amount,
    category: tx.category,
    subcategory: tx.subcategory || "",
    note: tx.note || "",
    datetime: tx.datetime,
    confidence: opts.confidence ?? 1,
    matchReason: opts.matchReason || "manual",
    matchLabel: opts.matchLabel || "手动",
    raw: opts.raw || "",
  };
}

function parseCycleTime(timeStr) {
  const [hh, mm] = String(timeStr || "12:00").split(":").map((x) => parseInt(x, 10));
  return { hh: Number.isFinite(hh) ? hh : 12, mm: Number.isFinite(mm) ? mm : 0 };
}

function billingDatetimeValue(item) {
  if (item?.billingAnchor) return String(item.billingAnchor).slice(0, 16);
  const now = new Date();
  const y = now.getFullYear();
  const m = item?.cycleMonth || now.getMonth() + 1;
  const day = item?.cycleDay || 1;
  const { hh, mm } = parseCycleTime(item?.cycleTime);
  return `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function applyBillingAnchor(item, dtLocalValue) {
  if (!dtLocalValue) return;
  const d = new Date(dtLocalValue);
  if (Number.isNaN(d.getTime())) return;
  item.cycleDay = d.getDate();
  item.cycleMonth = d.getMonth() + 1;
  item.cycleWeekday = d.getDay();
  item.cycleTime = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  item.billingAnchor = dtLocalValue.slice(0, 16);
  item.startDate = dtLocalValue.slice(0, 10);
}

function applyBillingAnchorFromDate(item, dateStr) {
  if (!dateStr) return;
  const s = String(dateStr).slice(0, 10);
  if (!item.cycleTime) item.cycleTime = "12:00";
  applyBillingAnchor(item, `${s}T${item.cycleTime}`);
}

function billingDateValue(item) {
  if (item?.startDate) return String(item.startDate).slice(0, 10);
  if (item?.billingAnchor) return String(item.billingAnchor).slice(0, 10);
  const now = new Date();
  const y = now.getFullYear();
  const m = item?.cycleMonth || now.getMonth() + 1;
  const day = item?.cycleDay || 1;
  return `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function cycleTimeOnDate(dateStr, item) {
  const { hh, mm } = parseCycleTime(item?.cycleTime);
  return `${dateStr} ${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function computeNextRecurringDate(item, fromDate) {
  let base;
  if (fromDate) {
    const s = String(fromDate).slice(0, 10);
    const [y, m, day] = s.split("-").map(Number);
    base = new Date(y, m - 1, day);
  } else {
    base = new Date();
  }
  const d = new Date(base);
  if (item.cycle === "custom" && item.cycleIntervalDays > 0) {
    d.setDate(d.getDate() + item.cycleIntervalDays);
    return dateKey(d);
  }
  if (item.cycle === "weekly") {
    d.setDate(d.getDate() + 7);
  } else if (item.cycle === "quarterly") {
    d.setMonth(d.getMonth() + 3);
    const targetDay = item.cycleDay || 1;
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    d.setDate(Math.min(targetDay, lastDay));
  } else if (item.cycle === "yearly") {
    const targetMonth = (item.cycleMonth || base.getMonth() + 1) - 1;
    const targetDay = item.cycleDay || 1;
    d.setFullYear(d.getFullYear() + 1);
    d.setMonth(targetMonth);
    const lastDay = new Date(d.getFullYear(), targetMonth + 1, 0).getDate();
    d.setDate(Math.min(targetDay, lastDay));
  } else {
    const targetDay = item.cycleDay || 1;
    d.setMonth(d.getMonth() + 1);
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    d.setDate(Math.min(targetDay, lastDay));
  }
  return dateKey(d);
}

/** 新建周期账单时：计算「下一次应入账」日期（不含当天立即入账） */
function computeInitialNextDate(item, ref = new Date()) {
  const today = dateKey(ref);
  const [y, m, d] = today.split("-").map(Number);
  const refDay = new Date(y, m - 1, d).getTime();
  if (item.cycle === "custom" && item.cycleIntervalDays > 0) {
    const anchorStr = (item.startDate || item.billingAnchor || today).slice(0, 10);
    const [ay, am, ad] = anchorStr.split("-").map(Number);
    const candidate = new Date(ay, am - 1, ad);
    while (candidate.getTime() < refDay) {
      candidate.setDate(candidate.getDate() + item.cycleIntervalDays);
    }
    return dateKey(candidate);
  }
  if (item.cycle === "weekly") {
    const targetWd = item.cycleWeekday ?? ref.getDay();
    const candidate = new Date(y, m - 1, d);
    let diff = targetWd - candidate.getDay();
    if (diff < 0) diff += 7;
    candidate.setDate(candidate.getDate() + diff);
    if (candidate.getTime() < refDay) candidate.setDate(candidate.getDate() + 7);
    return dateKey(candidate);
  }
  if (item.cycle === "quarterly") {
    const targetDay = item.cycleDay || 1;
    const anchorMonth = item.cycleMonth || m;
    let month = anchorMonth;
    let year = y;
    const mk = (yy, mm) => {
      const last = new Date(yy, mm, 0).getDate();
      return new Date(yy, mm - 1, Math.min(targetDay, last));
    };
    let candidate = mk(year, month);
    while (candidate.getTime() < refDay) {
      month += 3;
      while (month > 12) { month -= 12; year += 1; }
      candidate = mk(year, month);
    }
    return dateKey(candidate);
  }
  if (item.cycle === "yearly") {
    const targetMonth = item.cycleMonth || m;
    const targetDay = item.cycleDay || 1;
    const mk = (yy) => {
      const last = new Date(yy, targetMonth, 0).getDate();
      return new Date(yy, targetMonth - 1, Math.min(targetDay, last));
    };
    let candidate = mk(y);
    if (candidate.getTime() < refDay) candidate = mk(y + 1);
    return dateKey(candidate);
  }
  const targetDay = item.cycleDay || 1;
  const lastThis = new Date(y, m, 0).getDate();
  let candidate = new Date(y, m - 1, Math.min(targetDay, lastThis));
  if (candidate.getTime() >= refDay) return dateKey(candidate);
  const lastNext = new Date(y, m + 1, 0).getDate();
  candidate = new Date(y, m, Math.min(targetDay, lastNext));
  return dateKey(candidate);
}

/** 补录/阶段编辑：从当前扣费日推下一期（锚定开始日的月/季/年日，而非订阅 cycleDay） */
function computeNextPeriodDateInRange(item, cur, anchorStart) {
  const s = String(cur).slice(0, 10);
  const [y, m, d] = s.split("-").map(Number);
  const base = new Date(y, m - 1, d);
  const anchor = String(anchorStart).slice(0, 10);
  const [ay, am, ad] = anchor.split("-").map(Number);

  if (item.cycle === "custom" && item.cycleIntervalDays > 0) {
    base.setDate(base.getDate() + item.cycleIntervalDays);
    return dateKey(base);
  }
  if (item.cycle === "weekly") {
    base.setDate(base.getDate() + 7);
    return dateKey(base);
  }
  if (item.cycle === "quarterly") {
    base.setMonth(base.getMonth() + 3);
    const lastDay = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
    base.setDate(Math.min(ad, lastDay));
    return dateKey(base);
  }
  if (item.cycle === "yearly") {
    base.setFullYear(base.getFullYear() + 1);
    base.setMonth(am - 1);
    const lastDay = new Date(base.getFullYear(), am, 0).getDate();
    base.setDate(Math.min(ad, lastDay));
    return dateKey(base);
  }
  base.setMonth(base.getMonth() + 1);
  const lastDay = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
  base.setDate(Math.min(ad, lastDay));
  return dateKey(base);
}

function daysBetweenDateKeys(a, b) {
  const da = new Date(String(a).slice(0, 10));
  const db = new Date(String(b).slice(0, 10));
  return Math.round((db - da) / 86400000);
}

/** 根据阶段内已有账单间隔推断周期（用于历史阶段期数预览） */
function inferBillingCadenceFromTxs(txs, fallbackItem) {
  const sorted = [...(txs || [])].sort((a, b) => a.datetime.localeCompare(b.datetime));
  const base = {
    ...(fallbackItem || {}),
    cycleTime: fallbackItem?.cycleTime || "12:00",
  };
  if (!sorted.length) {
    return {
      ...base,
      cycle: base.cycle || "monthly",
      cycleDay: base.cycleDay || 1,
      cycleMonth: base.cycleMonth || 1,
      cycleWeekday: base.cycleWeekday ?? 0,
      cycleIntervalDays: base.cycleIntervalDays || 0,
    };
  }
  const firstDate = sorted[0].datetime.slice(0, 10);
  const [y, m, d] = firstDate.split("-").map(Number);
  const anchor = {
    ...base,
    cycleDay: d,
    cycleMonth: m,
    cycleWeekday: new Date(y, m - 1, d).getDay(),
  };
  if (sorted.length < 2) {
    return {
      ...anchor,
      cycle: base.cycle || "monthly",
      cycleIntervalDays: base.cycle === "custom" ? (base.cycleIntervalDays || 0) : 0,
    };
  }
  const gaps = [];
  for (let i = 1; i < sorted.length; i++) {
    gaps.push(daysBetweenDateKeys(sorted[i - 1].datetime.slice(0, 10), sorted[i].datetime.slice(0, 10)));
  }
  gaps.sort((a, b) => a - b);
  const median = gaps[Math.floor(gaps.length / 2)];
  if (median >= 330 && median <= 400) {
    return { ...anchor, cycle: "yearly", cycleIntervalDays: 0 };
  }
  if (median >= 80 && median <= 100) {
    return { ...anchor, cycle: "quarterly", cycleIntervalDays: 0 };
  }
  if (median >= 25 && median <= 35) {
    return { ...anchor, cycle: "monthly", cycleIntervalDays: 0 };
  }
  if (median >= 6 && median <= 8) {
    return { ...anchor, cycle: "weekly", cycleIntervalDays: 0 };
  }
  if (median >= 1 && median <= 45) {
    return { ...anchor, cycle: "custom", cycleIntervalDays: Math.max(1, Math.round(median)) };
  }
  const avg = gaps.reduce((s, g) => s + g, 0) / gaps.length;
  if (avg >= 330) return { ...anchor, cycle: "yearly", cycleIntervalDays: 0 };
  return {
    ...anchor,
    cycle: base.cycle || "monthly",
    cycleIntervalDays: base.cycle === "custom" ? (base.cycleIntervalDays || 0) : 0,
  };
}

function resolveBillingItemForPhase(item, phaseTxs) {
  const inferred = inferBillingCadenceFromTxs(phaseTxs, item);
  const first = phaseTxs?.[0]?.datetime?.slice(0, 10);
  if (first) applyBillingAnchorFromDate(inferred, first);
  return inferred;
}

function resolveBillingItemForPreview(item, start, end, amount, records) {
  if (!start || !end || !records?.length) return item;
  const amt = Number(amount);
  const inRange = records.filter((t) => {
    const d = t.datetime.slice(0, 10);
    if (d < start || d > end) return false;
    if (amt > 0 && Math.abs(Number(t.amount) - amt) > 0.009) return false;
    return true;
  });
  if (inRange.length) return resolveBillingItemForPhase(item, inRange);
  return item;
}

/** 按订阅周期，计算开始～结束之间的各期扣费日（起止日 inclusive，以开始日为锚） */
function computeSubscriptionPeriodDates(item, startDateStr, endDateStr) {
  const start = String(startDateStr || "").slice(0, 10);
  const end = String(endDateStr || "").slice(0, 10);
  if (!start || !end || start > end) return [];
  const dates = [];
  let cur = start;
  let guard = 0;
  while (cur <= end && guard++ < 600) {
    dates.push(cur);
    const next = computeNextPeriodDateInRange(item, cur, start);
    if (!next || next <= cur) break;
    cur = next;
  }
  return dates;
}

function countSubscriptionPeriods(item, startDateStr, endDateStr) {
  return computeSubscriptionPeriodDates(item, startDateStr, endDateStr).length;
}

function formatRecurringLabel(item) {
  const weekNames = ["日", "一", "二", "三", "四", "五", "六"];
  if (item.cycle === "custom" && item.cycleIntervalDays > 0) return `每${item.cycleIntervalDays}天`;
  if (item.cycle === "weekly") return `每周${weekNames[item.cycleWeekday ?? 0]}`;
  if (item.cycle === "quarterly") return `每季${item.cycleDay || 1}日`;
  if (item.cycle === "yearly") return `每年${item.cycleMonth || 1}月${item.cycleDay || 1}日`;
  return `每月${item.cycleDay || 1}日`;
}

function cycleHintText(cycle) {
  if (cycle === "custom") return "将按自定义间隔天数，从开始日起自动生成账单";
  if (cycle === "weekly") return "将在每周该日自动生成账单";
  if (cycle === "quarterly") return "将在每季该日自动生成账单";
  if (cycle === "yearly") return "将在每年该日自动生成账单";
  return "将在每月该日自动生成账单";
}

// ─── Capture, edit & OCR modals ──────────────────────────────────────────────

function appendSelectOptions(select, options, selected) {
  select.textContent = "";
  options.forEach(({ value, label }) => {
    const o = document.createElement("option");
    o.value = value;
    o.textContent = label;
    if (value === selected) o.selected = true;
    select.appendChild(o);
  });
}

/** 关联订阅/周期：左侧滑动开关 + 右侧下拉 */
function createLinkToggleRow(parent, label, placeholder, items, selectedId) {
  const row = divCls(parent, "plg-bill-form-row plg-link-inline-row");
  row.createSpan({ cls: "plg-bill-form-label", text: label });
  const ctrl = divCls(row, "plg-bill-form-control plg-link-inline-control");
  const switchLabel = ctrl.createEl("label", { cls: "plg-slide-switch", attr: { "aria-label": label } });
  const checkbox = switchLabel.createEl("input", { type: "checkbox" });
  checkbox.checked = !!selectedId;
  switchLabel.createSpan({ cls: "plg-slide-track" });
  const select = ctrl.createEl("select", { cls: "plg-link-inline-select" });
  appendSelectOptions(
    select,
    [{ value: "", label: placeholder }].concat(items),
    selectedId || ""
  );
  const sync = () => {
    const on = checkbox.checked;
    select.disabled = !on;
    select.toggleClass("is-disabled", !on);
    if (!on) select.value = "";
  };
  sync();
  checkbox.onchange = sync;
  return { checkbox, select };
}

function addClasses(el, ...classes) {
  if (!el) return;
  classes.filter(Boolean).forEach((c) => {
    String(c).trim().split(/\s+/).filter(Boolean).forEach((token) => {
      try { el.addClass(token); } catch (_) { /* iOS WebKit: one class token per addClass */ }
    });
  });
}

/** iOS WebKit rejects space-joined class strings in createDiv/createEl cls. */
function divCls(parent, cls) {
  const el = parent.createDiv();
  if (cls) addClasses(el, cls);
  return el;
}

function elCls(parent, tag, cls, opts = {}) {
  const el = parent.createEl(tag, opts);
  if (cls) addClasses(el, cls);
  return el;
}

function pickFrontModalContainer() {
  const containers = [...document.querySelectorAll(".modal-container")].filter((c) => {
    try {
      if (!c.querySelector?.(".modal")) return false;
      return c.getClientRects?.().length > 0 || c.offsetParent !== null;
    } catch (_) {
      return false;
    }
  });
  if (!containers.length) return null;
  let best = containers[containers.length - 1];
  let bestZ = -1;
  for (const c of containers) {
    try {
      const raw = c.style?.zIndex || window.getComputedStyle(c).zIndex || "0";
      const z = parseInt(raw, 10);
      if (!Number.isNaN(z) && z >= bestZ) {
        bestZ = z;
        best = c;
      }
    } catch (_) { /* ignore */ }
  }
  return best;
}

function getPlgApp() {
  try {
    if (typeof app !== "undefined" && app) return app;
  } catch (_) { /* ignore */ }
  try {
    return window.app || globalThis.app || null;
  } catch (_) {
    return null;
  }
}

/** 设置窗或其它 Obsidian 模态已打开时，必须走原生 Modal 才能压在上面 */
function shouldUseObsidianModalHost() {
  const a = getPlgApp();
  if (a && typeof isObsidianSettingsOpen === "function" && isObsidianSettingsOpen(a)) return true;
  return !!pickFrontModalContainer();
}

function getOverlayHost(stack = false) {
  if (stack) {
    const tops = [...document.querySelectorAll(".plg-overlay, .lifeos-overlay")];
    const top = tops[tops.length - 1];
    if (top?.parentElement) return top.parentElement;
  }
  const body = document.body;
  if (body && (body.clientHeight > 0 || body.clientWidth > 0)) return body;
  return document.documentElement;
}

function readOverlayZ(el) {
  try {
    const raw = el?.style?.zIndex || (el ? window.getComputedStyle(el).zIndex : "0") || "0";
    const z = parseInt(raw, 10);
    return Number.isNaN(z) ? 0 : z;
  } catch (_) {
    return 0;
  }
}

function getPlgFrontOverlayZ() {
  let max = typeof getLifeOsMaxOverlayZIndex === "function" ? getLifeOsMaxOverlayZIndex() : 100000;
  document.querySelectorAll(".plg-overlay, .lifeos-overlay").forEach((el) => {
    const z = readOverlayZ(el);
    if (z > max) max = z;
  });
  return max;
}

function elevatePlgModalLayer(modal) {
  const apply = () => {
    if (!modal?.modalEl) return;
    const z = String(Math.max(
      typeof getLifeOsMaxOverlayZIndex === "function" ? getLifeOsMaxOverlayZIndex() : 100000,
      5001000
    ) + 200);
    const container = modal.modalEl.closest(".modal-container");
    if (container) {
      container.addClass("plg-obsidian-modal-layer");
      try {
        container.style.setProperty("z-index", z);
      } catch (_) {
        container.style.zIndex = z;
      }
      const bg = container.querySelector(".modal-bg");
      if (bg) {
        try { bg.style.setProperty("z-index", z); } catch (_) { bg.style.zIndex = z; }
      }
    }
    try {
      modal.modalEl.style.setProperty("z-index", z);
    } catch (_) {
      modal.modalEl.style.zIndex = z;
    }
  };
  apply();
  window.requestAnimationFrame(() => {
    apply();
    window.requestAnimationFrame(apply);
  });
  window.setTimeout(apply, 40);
  window.setTimeout(apply, 160);
}

const _plgOverlayModalStack = [];

class PlgOverlayModal extends Modal {
  constructor(appRef, opts) {
    super(appRef);
    this.plgOpts = opts || {};
  }

  onOpen() {
    const { title, cls = "", wide = false, build, tier = 0 } = this.plgOpts;
    this.modalEl.addClass("plg-obsidian-modal-host");
    this.modalEl.addClass("lifeos-overlay-panel");
    if (wide) this.modalEl.addClass("plg-obsidian-modal-wide");
    if (cls) addClasses(this.modalEl, cls);
    if (tier === 2) this.modalEl.addClass("plg-overlay-tier2");
    else if (tier === 3) this.modalEl.addClass("plg-overlay-tier3");

    elevatePlgModalLayer(this);

    if (title) this.titleEl.setText(title);
    else {
      this.titleEl.setText("");
      this.titleEl.addClass("plg-obsidian-modal-no-title");
    }

    const body = this.contentEl;
    body.empty();
    addClasses(body, "plg-overlay-body", "lifeos-overlay-body");

    const close = () => this.close();
    try {
      build?.(body, close);
    } catch (err) {
      body.createEl("p", { text: "加载失败：" + (err.message || String(err)) });
      console.error("[PlainLedger]", err);
    }
  }

  onClose() {
    try { this.contentEl.empty(); } catch (_) { /* ignore */ }
    const idx = _plgOverlayModalStack.indexOf(this);
    if (idx >= 0) _plgOverlayModalStack.splice(idx, 1);
  }
}

function closePlgOverlayModals() {
  while (_plgOverlayModalStack.length) {
    const m = _plgOverlayModalStack.pop();
    try { m.close(); } catch (_) { /* ignore */ }
  }
}

function openPlgOverlayViaObsidianModal(opts) {
  const appRef = getPlgApp();
  if (!appRef || typeof Modal !== "function") return null;
  const modal = new PlgOverlayModal(appRef, opts);
  _plgOverlayModalStack.push(modal);
  modal.open();
  elevatePlgModalLayer(modal);
  return () => {
    try { modal.close(); } catch (_) { /* ignore */ }
  };
}

/** Mobile-friendly modal body: scroll region + sticky action bar (matches plg-edit-overlay). */
function createMobileModalShell(body, modalCls = "plg-modal") {
  const mobile = isMobileCaptureUi();
  if (mobile) body.addClass("plg-edit-mobile-shell");
  const modal = divCls(body, modalCls);
  if (mobile) modal.addClass("plg-edit-mobile-layout");
  const content = mobile ? modal.createDiv({ cls: "plg-edit-mobile-scroll" }) : modal;
  const actions = mobile
    ? modal.createDiv({ cls: "plg-modal-actions plg-edit-mobile-actions" })
    : null;
  return { modal, content, actions, mobile };
}

function attachOverlayPanelDrag(overlay, panel, head) {
  if (typeof window === "undefined" || isMobileCaptureUi()) return;
  head.addClass("plg-overlay-draggable-head");
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  const onDown = (e) => {
    if (e.button != null && e.button !== 0) return;
    if (e.target.closest(".plg-overlay-close, button, input, select, textarea, a, label")) return;
    dragging = true;
    const rect = panel.getBoundingClientRect();
    panel.addClass("plg-overlay-panel-floating");
    applyCssProps(panel, {
      "--plg-drag-left": `${rect.left}px`,
      "--plg-drag-top": `${rect.top}px`,
    });
    startX = e.clientX;
    startY = e.clientY;
    startLeft = rect.left;
    startTop = rect.top;
    head.addClass("dragging");
    e.preventDefault();
  };

  const onMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const maxW = window.innerWidth;
    const maxH = window.innerHeight;
    const rect = panel.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const left = Math.min(Math.max(8, startLeft + dx), Math.max(8, maxW - w - 8));
    const top = Math.min(Math.max(8, startTop + dy), Math.max(8, maxH - h - 8));
    applyCssProps(panel, {
      "--plg-drag-left": `${left}px`,
      "--plg-drag-top": `${top}px`,
    });
  };

  const onUp = () => {
    dragging = false;
    head.removeClass("dragging");
  };

  head.addEventListener("mousedown", onDown);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
}

function applyPlgOverlayZ(overlay, z) {
  applyCssProps(overlay, { "--plg-overlay-z": String(z) });
  try {
    overlay.style.setProperty("z-index", String(z));
  } catch (_) {
    overlay.style.zIndex = String(z);
  }
}

function openPlgOverlay(opts) {
  injectLifeOsSharedStyles();
  const { title, cls = "", wide = false, build, stack = false, tier = 0 } = opts;
  if (!stack) {
    // 只清 PlainLedger 自己的 overlay / 原生 Modal 叠层，勿误关其它 LifeOS 插件弹层
    document.querySelectorAll(".plg-overlay").forEach((el) => el.remove());
    closePlgOverlayModals();
  }

  // 木木夕等：设置窗打开时必须用 Obsidian Modal 才能压在设置上面
  if (shouldUseObsidianModalHost()) {
    const closer = openPlgOverlayViaObsidianModal(opts);
    if (closer) return closer;
  }

  const host = getOverlayHost(stack);
  const overlay = host.createDiv({ cls: "plg-overlay" });
  addClasses(overlay, "lifeos-overlay");
  try { host.appendChild(overlay); } catch (_) { /* already attached */ }

  const isCapture = String(cls).includes("plg-capture-overlay");
  const depth = document.querySelectorAll(".lifeos-overlay, .plg-overlay").length;
  const floorZ = isCapture ? 1000050 : 1000000;
  const tierBoost = Math.max(0, Number(tier) || 0) * 100;
  const z = Math.max(floorZ, getPlgFrontOverlayZ()) + 100 + tierBoost + depth;
  applyPlgOverlayZ(overlay, z);
  if (isCapture && isMobileCaptureUi()) overlay.addClass("plg-capture-sheet-host");
  const panel = overlay.createDiv({ cls: "plg-overlay-panel" });
  addClasses(panel, "lifeos-overlay-panel", cls, wide ? "wide" : "");
  if (tier === 2) panel.addClass("plg-overlay-tier2");
  else if (tier === 3) panel.addClass("plg-overlay-tier3");
  const head = panel.createDiv({ cls: "plg-overlay-head" });
  addClasses(head, "lifeos-overlay-head");
  if (title) head.createEl("h2", { text: title });
  const closeBtn = head.createEl("button", { text: "×", cls: "plg-overlay-close", attr: { type: "button", "aria-label": "关闭" } });
  addClasses(closeBtn, "lifeos-overlay-close");
  const body = panel.createDiv({ cls: "plg-overlay-body" });
  addClasses(body, "lifeos-overlay-body");
  const releaseMobileFit = bindMobileOverlayViewport(overlay, panel, cls);
  const close = () => {
    releaseMobileFit?.();
    overlay.remove();
  };
  head.querySelector(".plg-overlay-close").onclick = close;
  attachOverlayPanelDrag(overlay, panel, head);
  overlay.addEventListener("click", (e) => {
    if (e.target !== overlay) return;
    close();
  });
  panel.addEventListener("click", (e) => e.stopPropagation());
  window.requestAnimationFrame(() => {
    try {
      if (overlay.parentElement) overlay.parentElement.appendChild(overlay);
      const z2 = Math.max(z, getPlgFrontOverlayZ() + 50);
      if (z2 > readOverlayZ(overlay)) applyPlgOverlayZ(overlay, z2);
    } catch (_) { /* ignore */ }
    try {
      build(body, close);
      const mobileOverlay = body.closest(".plg-overlay-mobile-fit");
      if (mobileOverlay) scheduleMobileOverlaySync(mobileOverlay);
      else syncMobileCaptureOverlay();
    } catch (err) {
      body.createEl("p", { text: "加载失败：" + (err.message || String(err)) });
      console.error("[PlainLedger]", err);
    }
  });
  return close;
}

function isNativeMobileApp(appOrPlugin) {
  const app = appOrPlugin?.app || appOrPlugin;
  if (app?.isMobile) return true;
  return typeof Platform !== "undefined" && Platform.isMobile;
}

function isMobileCaptureUi() {
  if (typeof Platform !== "undefined" && Platform.isMobile) return true;
  const w = window.innerWidth || document.documentElement.clientWidth || 0;
  if (w > 0 && w <= 520) return true;
  try {
    return window.matchMedia("(max-width: 520px)").matches;
  } catch (_) {
    return false;
  }
}

function captureMobileRegions(card) {
  const inMobileShell = !!card.closest?.(".plg-overlay-mobile-fit")
    || !!card.closest?.(".plg-overlay-panel-mobile-fit");
  const isMobile = inMobileShell || isMobileCaptureModal();
  if (!isMobile) {
    return { scroll: card, footer: card, isMobile: false };
  }
  card.addClass("plg-capture-card-mobile");
  if (isMobileCaptureModal() && !card.closest?.(".plg-overlay-mobile-fit")) {
    return { scroll: card, footer: card, isMobile: true, flat: true };
  }
  return {
    scroll: card.createDiv({ cls: "plg-capture-mobile-scroll" }),
    footer: card.createDiv({ cls: "plg-capture-mobile-footer" }),
    isMobile: true,
    flat: false,
  };
}

function isMobileCaptureModal() {
  return isMobileCaptureUi() && document.body.classList.contains("plg-mobile-force-top");
}

/** 键盘弹出时把输入区滚进可视区域（Modal / overlay 共用） */
function scrollCaptureFieldIntoView(el) {
  if (!el?.getBoundingClientRect) return;
  const scrollRoot = el.closest(".plg-capture-modal-body")
    || el.closest(".plg-capture-mobile-scroll");
  const run = () => {
    const m = measureMobileVisualViewport();
    const pad = 14;
    const viewTop = m.top + pad;
    const viewBottom = m.top + m.vvH - pad;
    const dock = el.closest(".plg-manual-form-dock");
    const saveRow = dock?.querySelector(".plg-manual-save-row");
    const anchor = (saveRow && el.matches?.("input, textarea"))
      ? saveRow
      : el;
    const r = anchor.getBoundingClientRect();
    if (r.bottom <= viewBottom && r.top >= viewTop) return;
    if (scrollRoot) {
      if (r.bottom > viewBottom) scrollRoot.scrollTop += r.bottom - viewBottom + 10;
      else if (r.top < viewTop) scrollRoot.scrollTop -= viewTop - r.top + 10;
    }
    const container = el.closest(".modal-container");
    if (container && r.bottom > viewBottom) {
      container.scrollTop += r.bottom - viewBottom + 10;
    }
  };
  window.requestAnimationFrame(run);
  window.setTimeout(run, 100);
  window.setTimeout(run, 280);
}

/** 手机 Obsidian Modal：键盘弹出时更新可用高度变量 */
function bindMobileCaptureModalKeyboard(modalEl) {
  if (!modalEl || !isMobileCaptureUi()) return () => {};
  let raf = 0;
  const sync = () => {
    const m = measureMobileVisualViewport();
    const topPad = Math.max(m.top, 4);
    const usable = Math.max(m.vvH - topPad - 6, 200);
    applyCssProps(document.documentElement, {
      "--plg-modal-kb-gap": `${m.kbGap}px`,
      "--plg-modal-vv-h": `${usable}px`,
    });
    document.body.toggleClass("plg-capture-kb-open", m.kbGap > 48);
    const active = document.activeElement;
    if (active && modalEl.contains(active) && active.matches?.("input, textarea, select")) {
      scrollCaptureFieldIntoView(active);
    }
  };
  const onVv = () => {
    if (raf) window.cancelAnimationFrame(raf);
    raf = window.requestAnimationFrame(sync);
  };
  const onFocusIn = (e) => {
    if (!e.target?.matches?.("input, textarea, select")) return;
    sync();
    scrollCaptureFieldIntoView(e.target);
  };
  sync();
  const vv = window.visualViewport;
  vv?.addEventListener("resize", onVv);
  vv?.addEventListener("scroll", onVv);
  window.addEventListener("resize", onVv);
  modalEl.addEventListener("focusin", onFocusIn);
  return () => {
    if (raf) window.cancelAnimationFrame(raf);
    vv?.removeEventListener("resize", onVv);
    vv?.removeEventListener("scroll", onVv);
    window.removeEventListener("resize", onVv);
    modalEl.removeEventListener("focusin", onFocusIn);
    document.body.removeClass("plg-capture-kb-open");
    document.documentElement.style.removeProperty("--plg-modal-kb-gap");
    document.documentElement.style.removeProperty("--plg-modal-vv-h");
  };
}

function focusCaptureField(el) {
  if (!el) return;
  try {
    el.focus({ preventScroll: true });
  } catch (_) {
    el.focus();
  }
}

function resetCaptureScrollAnchors(root) {
  if (!root) return;
  [
    root,
    ...root.querySelectorAll?.(
      ".plg-capture-mobile-scroll, .plg-capture-modal-body, .plg-overlay-body, .plg-capture-card-mobile, .plg-manual-cat-grid",
    ) || [],
  ].forEach((el) => {
    if (el && "scrollTop" in el) el.scrollTop = 0;
  });
}

const _captureLayoutLocked = new WeakSet();

function bindDesktopCaptureLayoutResize(bodyEl) {
  let timer = 0;
  const onResize = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      const panel = bodyEl?.closest?.(".plg-overlay-panel.plg-capture-overlay");
      if (!panel || panel.classList.contains("plg-overlay-panel-mobile-fit")) return;
      _captureLayoutLocked.delete(panel);
      syncDesktopCaptureLayout(bodyEl, { force: true });
    }, 150);
  };
  window.addEventListener("resize", onResize);
  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("resize", onResize);
    const panel = bodyEl?.closest?.(".plg-overlay-panel.plg-capture-overlay");
    if (panel) _captureLayoutLocked.delete(panel);
  };
}

function measureManualCaptureAnchor(panel) {
  const manualPane = panel.querySelector(".plg-manual-panel");
  const manualCard = manualPane?.querySelector(":scope > .plg-capture-card");
  if (!manualPane || !manualCard) return 0;

  const paneHidden = manualPane.classList.contains("hidden");
  applyCssProps(manualPane, {
    "--plg-measure-width": panel.clientWidth ? `${panel.clientWidth}px` : "560px",
  });
  manualPane.addClass("plg-measure-offscreen");
  manualPane.classList.remove("hidden");

  const cardStyle = window.getComputedStyle(manualCard);
  let h = parseFloat(cardStyle.paddingTop || 0) + parseFloat(cardStyle.paddingBottom || 0);
  for (const child of manualCard.children) {
    const style = window.getComputedStyle(child);
    if (style.display === "none" || style.visibility === "hidden") continue;
    h += child.offsetHeight
      + parseFloat(style.marginTop || 0)
      + parseFloat(style.marginBottom || 0);
  }

  manualPane.removeClass("plg-measure-offscreen");
  manualPane.classList.toggle("hidden", paneHidden);

  return Math.ceil(h);
}

function measureCaptureContentHeight(panel) {
  // 与 styles.css 桌面记一笔 max-height: min(86vh, 640px) 对齐，并计入提示行，避免底部按钮被裁切
  const maxH = Math.min(Math.round((window.innerHeight || 800) * 0.86), 640);
  const manualH = measureManualCaptureAnchor(panel);
  const cardH = Math.max(manualH, 280);
  if (!cardH) return 420;

  const headH = panel.querySelector(".plg-overlay-head")?.offsetHeight || 0;
  const tabsH = panel.querySelector(".plg-mode-tabs")?.offsetHeight || 0;
  const hintEl = panel.querySelector(".plg-capture-mode-hint-row");
  let hintH = 0;
  if (hintEl) {
    const hs = window.getComputedStyle(hintEl);
    hintH = hintEl.offsetHeight
      + parseFloat(hs.marginTop || 0)
      + parseFloat(hs.marginBottom || 0);
  }
  const overlayBody = panel.querySelector(".plg-overlay-body");
  const bodyPadY = overlayBody
    ? parseFloat(window.getComputedStyle(overlayBody).paddingTop || 0)
      + parseFloat(window.getComputedStyle(overlayBody).paddingBottom || 0)
    : 24;
  const chrome = headH + bodyPadY + tabsH + hintH;
  const available = Math.max(maxH - chrome, 280);
  return Math.min(cardH, available);
}

function scheduleDesktopCaptureLayoutSync(bodyEl) {
  if (!bodyEl || bodyEl.closest?.(".plg-overlay-panel-mobile-fit")) return;
  window.requestAnimationFrame(() => {
    syncDesktopCaptureLayout(bodyEl, { force: true });
  });
}

function restoreCaptureTabVisibility(panel) {
  const mode = panel.dataset.captureMode || "smart";
  applyCaptureTabVisibility({
    smart: panel.querySelector(".plg-smart-panel"),
    manual: panel.querySelector(".plg-manual-panel"),
    ocr: panel.querySelector(".plg-ocr-panel"),
  }, mode);
}

function syncDesktopCaptureLayout(bodyEl, { force = false } = {}) {
  const panel = bodyEl?.closest?.(".plg-overlay-panel.plg-capture-overlay");
  if (!panel || panel.classList.contains("plg-overlay-panel-mobile-fit")) return;
  if (_captureLayoutLocked.has(panel) && !force) return;

  const contentH = measureCaptureContentHeight(panel);
  if (contentH < 280) return;

  panel.style.removeProperty("height");
  panel.style.removeProperty("min-height");
  panel.style.removeProperty("max-height");
  const modalBody = panel.querySelector(".plg-capture-modal-body");
  modalBody?.style.removeProperty("height");
  modalBody?.style.removeProperty("min-height");
  modalBody?.style.removeProperty("max-height");
  applyCssProps(panel, { "--plg-capture-content-h": `${contentH}px` });
  restoreCaptureTabVisibility(panel);
  _captureLayoutLocked.add(panel);
}

function syncMobileCaptureOverlay() {
  document.querySelectorAll(".plg-overlay-mobile-fit").forEach((el) => {
    if (el._mumuSyncViewport) el._mumuSyncViewport();
    else scheduleMobileOverlaySync(el);
  });
}

const _overlaySyncTimers = new WeakMap();

function scheduleMobileOverlaySync(overlay) {
  if (!overlay) return;
  const prev = _overlaySyncTimers.get(overlay);
  if (prev) prev.forEach((id) => window.clearTimeout(id));
  const ids = [0, 80, 220, 420].map((ms) => window.setTimeout(() => {
    overlay._mumuSyncViewport?.();
  }, ms));
  _overlaySyncTimers.set(overlay, ids);
}

/**
 * 手机记一笔壳高（对齐 4.0.1）：
 * - 顶对齐，三 Tab 视觉位置一致
 * - 未出键盘时先按预估键盘高起稿，真键盘到位后再钉死
 * - 切手动/截图/收键盘均保持该锚高，不再二次收缩或拉高
 */
const CAPTURE_SHELL_RATIO = 0.58;
const CAPTURE_ASSUMED_KB_RATIO = 0.42;

let _captureShellHeightLock = null;
let _captureShellKbAnchored = false;

function resetCaptureFixedPanelHeight() {
  _captureShellHeightLock = null;
  _captureShellKbAnchored = false;
}

function applyCapturePanelGeometry(panel, layout, isCapture) {
  panel.addClass("plg-overlay-panel-geom");
  applyCssProps(panel, {
    "--plg-geom-left": isCapture ? "0" : `${layout.left}px`,
    "--plg-geom-width": isCapture ? "100%" : `${layout.vvW}px`,
    "--plg-geom-top": `${layout.panelTop}px`,
    "--plg-geom-bottom": "auto",
    "--plg-geom-height": `${layout.panelHeight}px`,
    "--plg-geom-max-height": `${layout.panelHeight}px`,
    "--plg-geom-min-height": `${layout.panelHeight}px`,
    "--plg-geom-radius": isCapture ? "0" : "16px 16px 0 0",
  });
  return { panelTop: layout.panelTop, panelHeight: layout.panelHeight };
}

function captureKeyboardBottom(m, measuredKb, inputFocused) {
  let kbBottom = Math.max(measuredKb, Math.round(m.ih - m.top - m.vvH));
  if (inputFocused && kbBottom < 140) kbBottom = Math.round(m.ih * CAPTURE_ASSUMED_KB_RATIO);
  if (kbBottom < 120) kbBottom = Math.round(m.ih * CAPTURE_ASSUMED_KB_RATIO);
  return kbBottom;
}

function measureCapturePanelLayout(panelEl) {
  const m = measureMobileVisualViewport();
  const active = document.activeElement;
  const inputFocused = !!(panelEl && active && panelEl.contains(active)
    && active.matches?.("input, textarea, select, [contenteditable='true']"));
  const measuredKb = Math.max(0, Math.round(m.kbGap));
  const keyboardUp = measuredKb >= 40 || m.keyboardOpen || inputFocused;
  const panelTop = Math.max(0, Math.round(m.top || 0));

  if (keyboardUp) {
    const kbBottom = captureKeyboardBottom(m, measuredKb, inputFocused);
    const available = Math.max(260, Math.round(m.ih - kbBottom - panelTop));
    if (!_captureShellKbAnchored) {
      // 首次键盘到位：以此时高度为唯一锚点
      _captureShellHeightLock = available;
      _captureShellKbAnchored = true;
    } else if (_captureShellHeightLock != null && available < _captureShellHeightLock - 8) {
      // 键盘更高时仅允许再钉矮一点，避免二次闪缩后内容溢出
      _captureShellHeightLock = available;
    }
  } else if (_captureShellKbAnchored && _captureShellHeightLock != null) {
    // 键盘收起：允许向下回缩到内容可用高度（阈值防抖），减少底部留白
    const relaxed = Math.max(260, Math.round(m.vvH - 8));
    if (relaxed < _captureShellHeightLock - 24) {
      _captureShellHeightLock = relaxed;
    }
  } else if (_captureShellHeightLock == null) {
    // 未出键盘：先按预估键盘高度起稿，与弹键盘后接近，减少二次收缩
    const assumedKb = Math.round(m.ih * CAPTURE_ASSUMED_KB_RATIO);
    _captureShellHeightLock = Math.max(260, Math.round(m.ih - assumedKb - panelTop));
  }

  const panelHeight = _captureShellHeightLock
    ?? Math.max(300, Math.round(m.ih * CAPTURE_SHELL_RATIO));
  const panelBottom = Math.max(0, Math.round(m.ih - panelTop - panelHeight));

  return {
    ...m,
    kbPad: panelBottom,
    keyboardUp,
    panelBottom,
    panelTop,
    panelHeight,
    useFixedHeight: true,
    useTopAnchor: true,
  };
}

function getMumuTesseract() {
  const g = typeof globalThis !== "undefined" ? globalThis : window;
  if (g.__MUMU_TESSERACT__) return g.__MUMU_TESSERACT__;
  if (g.Tesseract) return g.Tesseract;
  if (typeof self !== "undefined" && self.Tesseract) return self.Tesseract;
  try {
    if (typeof module !== "undefined" && module.exports) {
      if (typeof module.exports.createWorker === "function") return module.exports;
      if (module.exports.Tesseract) return module.exports.Tesseract;
    }
  } catch (_) { /* Obsidian sandbox */ }
  return null;
}

function measureMobileVisualViewport() {
  const vv = window.visualViewport;
  const ih = window.innerHeight || document.documentElement.clientHeight || 640;
  const iw = window.innerWidth || document.documentElement.clientWidth || 360;
  const top = Math.max(0, vv?.offsetTop ?? 0);
  const left = Math.max(0, vv?.offsetLeft ?? 0);
  const vvH = Math.max(vv?.height > 0 ? vv.height : ih, 200);
  const vvW = Math.max(vv?.width > 0 ? vv.width : iw, 280);
  const kbGap = Math.max(0, ih - top - vvH);
  const keyboardOpen = kbGap > 48 || vvH < ih * 0.72;
  return { top, left, vvH, vvW, ih, iw, kbGap, keyboardOpen };
}

function stopCaptureControlBubble(el) {
  if (!el) return;
  ["mousedown", "touchstart", "click"].forEach((evt) => {
    el.addEventListener(evt, (e) => e.stopPropagation());
  });
}

function formatManualTimeDisplay(iso) {
  if (!iso) return "";
  const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return String(iso).replace("T", " ").slice(0, 16);
  return `${m[2]}/${m[3]} ${m[4]}:${m[5]}`;
}

function parseManualTimeDisplay(text, refIso) {
  const t = String(text || "").trim();
  if (!t) return refIso || "";
  const now = new Date();
  const y = now.getFullYear();
  const full = t.match(/^(\d{4})[\/\-年.](\d{1,2})[\/\-月.](\d{1,2})[\s日]*(\d{1,2}):(\d{2})/);
  if (full) {
    return `${full[1]}-${pad2(full[2])}-${pad2(full[3])}T${pad2(full[4])}:${full[5]}`;
  }
  const short = t.match(/^(\d{1,2})[\/\-](\d{1,2})\s+(\d{1,2}):(\d{2})/);
  if (short) {
    return `${y}-${pad2(short[1])}-${pad2(short[2])}T${pad2(short[3])}:${short[4]}`;
  }
  return refIso || "";
}

function updateCaptureSheetMode(panel, mode) {
  if (!panel) return;
  const next = mode || "smart";
  panel.dataset.captureMode = next;
  if (panel.classList.contains("plg-overlay-panel-mobile-fit")) return;
  const modalBody = panel.querySelector(".plg-capture-modal-body");
  if (!modalBody) return;
  modalBody.style.removeProperty("height");
  modalBody.style.removeProperty("min-height");
  modalBody.style.removeProperty("max-height");
}

function syncMobileCaptureFooterInset(panel) {
  const visiblePane = panel?.querySelector?.(".plg-capture-tab-pane:not(.hidden)");
  const foot = visiblePane?.querySelector?.(".plg-capture-mobile-footer")
    || panel?.querySelector?.(".plg-capture-mobile-footer");
  if (!foot || foot.offsetParent === null) {
    if (panel) applyCssProps(panel, { "--plg-capture-footer-h": "0px" });
    return;
  }
  const fh = Math.ceil(foot.getBoundingClientRect().height);
  applyCssProps(panel, { "--plg-capture-footer-h": fh > 4 ? `${fh}px` : "0px" });
}

function blurCaptureFocusWithin(root) {
  const active = document.activeElement;
  if (active && root?.contains?.(active) && active.matches?.("input, textarea, select")) {
    active.blur();
  }
}

function applyCaptureTabVisibility(tabRoots, mode) {
  Object.entries(tabRoots).forEach(([id, el]) => {
    if (!el) return;
    el.toggleClass("hidden", id !== mode);
  });
}

function afterCaptureTabSwitch(bodyEl, panel) {
  if (panel) applyCssProps(panel, { "--plg-capture-footer-h": "0px" });
  resetCaptureScrollAnchors(bodyEl);
  if (panel?.classList?.contains?.("plg-overlay-panel-mobile-fit")) {
    syncMobileCaptureFooterInset(panel);
    // 切 Tab 后按锚点壳高重贴（不会升高）
    window.requestAnimationFrame(() => syncMobileCaptureOverlay());
  } else {
    syncDesktopCaptureLayout(bodyEl, { force: true });
  }
}

/** 手机端：半透明悬浮层 + 面板贴 visualViewport（顶栏下、键盘上） */
function bindMobileOverlayViewport(overlay, panel, cls = "") {
  const mobileFit = String(cls).includes("plg-capture-overlay")
    || String(cls).includes("plg-edit-overlay")
    || (isMobileCaptureUi() && (
      String(cls).includes("plg-settings-modal")
      || String(cls).includes("plg-budget-edit-modal")
      || String(cls).includes("plg-subscription-overlay")
      || String(cls).includes("plg-recurring-overlay")
      || String(cls).includes("plg-cat-edit-modal")
    ));
  if (!mobileFit || !isMobileCaptureUi()) return null;

  const isCaptureOverlay = String(cls).includes("plg-capture-overlay");
  overlay.addClass("plg-overlay-mobile-fit");
  panel.addClass("plg-overlay-panel-mobile-fit");
  document.documentElement.classList.add("plg-overlay-scroll-lock");
  if (isCaptureOverlay) document.documentElement.classList.add("plg-capture-overlay-open");

  let pollRaf = 0;
  let lastLayoutIh = window.innerHeight || 0;
  const stopPoll = () => {
    if (pollRaf) window.cancelAnimationFrame(pollRaf);
    pollRaf = 0;
  };
  const pollMs = isCaptureOverlay ? 3200 : 1100;
  const startPoll = () => {
    stopPoll();
    const t0 = Date.now();
    const tick = () => {
      sync();
      if (Date.now() - t0 < pollMs) pollRaf = window.requestAnimationFrame(tick);
      else pollRaf = 0;
    };
    pollRaf = window.requestAnimationFrame(tick);
  };

  const sync = () => {
    const isCapture = String(cls).includes("plg-capture-overlay");
    // 注意：键盘弹起时 innerHeight 也可能跳变，禁止因此清掉壳高锚点（否则切手动会拉高）

    // Static overlay layout lives on `.plg-overlay-mobile-fit` in styles.css.

    let panelTop;
    let panelHeight;
    let kbGap = 0;
    let keyboardUp = false;
    let isCatEditModal = false;

    if (isCapture) {
      const layout = measureCapturePanelLayout(panel);
      kbGap = layout.panelBottom;
      keyboardUp = layout.keyboardUp;
      document.body.toggleClass("plg-capture-kb-open", keyboardUp);
      const frame = applyCapturePanelGeometry(panel, layout, true);
      panelTop = frame.panelTop;
      panelHeight = frame.panelHeight;
      applyCssProps(overlay, {
        "--plg-kb-h": `${kbGap}px`,
        "--plg-panel-h": `${panelHeight}px`,
      });
    } else {
      const m = measureMobileVisualViewport();
      kbGap = m.kbGap;
      keyboardUp = m.keyboardOpen;
      const isSettingsModal = String(cls).includes("plg-settings-modal");
      const isEditOverlay = String(cls).includes("plg-edit-overlay");
      isCatEditModal = String(cls).includes("plg-cat-edit-modal");
      if (m.keyboardOpen) {
        panelTop = m.top;
        panelHeight = m.vvH;
      } else if (isCatEditModal) {
        // 分类编辑内容短：按内容高度贴底，不再强行 92% 视口留出大片空白。
        panelHeight = 0;
        panelTop = m.top;
      } else if (isEditOverlay || isSettingsModal) {
        panelHeight = Math.round(m.vvH * 0.92);
        panelTop = m.top + Math.max(0, m.vvH - panelHeight);
      } else {
        const ratio = 0.78;
        const cap = 560;
        panelHeight = Math.min(Math.round(m.vvH * ratio), cap);
        panelTop = m.top + m.vvH - panelHeight;
      }
    }

    if (!isCapture) {
      const vv = measureMobileVisualViewport();
      panel.addClass("plg-overlay-panel-geom");
      if (isCatEditModal && !keyboardUp) {
        applyCssProps(panel, {
          "--plg-geom-left": `${vv.left}px`,
          "--plg-geom-width": `${vv.vvW}px`,
          "--plg-geom-min-height": "0",
          "--plg-geom-height": "auto",
          "--plg-geom-max-height": `${Math.round(vv.vvH * 0.92)}px`,
          "--plg-geom-bottom": "0",
          "--plg-geom-top": "auto",
          "--plg-geom-radius": "16px 16px 0 0",
        });
      } else {
        applyCssProps(panel, {
          "--plg-geom-left": `${vv.left}px`,
          "--plg-geom-width": `${vv.vvW}px`,
          "--plg-geom-min-height": "0",
          "--plg-geom-top": `${panelTop}px`,
          "--plg-geom-height": `${panelHeight}px`,
          "--plg-geom-max-height": `${panelHeight}px`,
          "--plg-geom-bottom": "auto",
          "--plg-geom-radius": "16px 16px 0 0",
        });
      }
    }

    applyCssProps(overlay, {
      "--plg-vv-height": `${panelHeight}px`,
      "--plg-kb-gap": `${kbGap}px`,
    });
    syncMobileCaptureFooterInset(panel);
  };

  const scheduleCaptureSync = () => {
    sync();
    scheduleMobileOverlaySync(overlay);
  };

  const onFocusIn = (e) => {
    if (!e.target?.matches?.("input, textarea, select")) return;
    window.requestAnimationFrame(() => resetCaptureScrollAnchors(panel));
    scheduleCaptureSync();
    startPoll();
  };

  const onFocusOut = () => window.setTimeout(sync, 140);

  sync();
  overlay._mumuSyncViewport = sync;
  panel.addEventListener("focusin", onFocusIn);
  panel.addEventListener("focusout", onFocusOut);
  const onOrient = () => {
    resetCaptureFixedPanelHeight();
    lastLayoutIh = window.innerHeight || 0;
    scheduleCaptureSync();
  };
  const vv = window.visualViewport;
  vv?.addEventListener("resize", sync);
  vv?.addEventListener("scroll", sync);
  window.addEventListener("orientationchange", onOrient);
  window.addEventListener("resize", sync);
  if (isCaptureOverlay) scheduleCaptureSync();

  return () => {
    stopPoll();
    delete overlay._mumuSyncViewport;
    if (isCaptureOverlay) resetCaptureFixedPanelHeight();
    document.documentElement.classList.remove("plg-overlay-scroll-lock");
    document.documentElement.classList.remove("plg-capture-overlay-open");
    document.body.removeClass("plg-capture-kb-open");
    panel.removeEventListener("focusin", onFocusIn);
    panel.removeEventListener("focusout", onFocusOut);
    vv?.removeEventListener("resize", sync);
    vv?.removeEventListener("scroll", sync);
    window.removeEventListener("orientationchange", onOrient);
    window.removeEventListener("resize", sync);
  };
}

function confirmPlgAction({ title, message, confirmText = "确定", danger = false, onConfirm, stack = true }) {
  openPlgOverlay({
    title: title || "确认",
    stack,
    build: (body, close) => {
      body.createEl("p", { text: message });
      const row = body.createDiv({ cls: "plg-modal-actions" });
      row.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = close;
      row.createEl("button", {
        text: confirmText,
        cls: (danger ? "plg-btn-danger " : "") + "mod-cta",
        attr: { type: "button" },
      }).onclick = () => {
        onConfirm?.();
        close();
      };
    },
  });
}

function openDeleteTransactionDialog(app, plugin, editTx, onDeleted, closeEdit) {
  openPlgOverlay({
    title: "删除账单",
    stack: true,
    build: (body, closeConfirm) => {
      addClasses(body, "plg-modal");
      body.createEl("p", {
        text: "确定删除这条记账吗？也可选择「迁移」修改分类后再保存。",
      });
      const row = divCls(body, "plg-modal-actions plg-modal-actions-triple");
      row.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = closeConfirm;
      row.createEl("button", {
        text: "迁移",
        cls: "mod-cta",
        attr: { type: "button" },
      }).onclick = () => {
        closeConfirm();
        new Notice("请在下方修改分类、二级分类后点保存");
      };
      row.createEl("button", {
        text: "删除",
        cls: "plg-btn-danger",
        attr: { type: "button" },
      }).onclick = async () => {
        await plugin.store.deleteTransaction(editTx.id);
        new Notice("已删除");
        onDeleted?.();
        closeConfirm();
        closeEdit();
      };
    },
  });
}

function openEditTransaction(app, plugin, tx, onSaved, onDeleted, opts = {}) {
  opts.onBeforeOpen?.();
  const draft = opts.draft ?? String(tx.source || "").includes("draft");
  const editTx = { ...tx };

  openPlgOverlay({
    title: opts.title || (draft ? "记账" : "修改账单"),
    cls: "plg-edit-overlay",
    build: (body, close) => {
      const mobileEdit = isMobileCaptureUi();
      if (mobileEdit) body.addClass("plg-edit-mobile-shell");
      const modal = divCls(body, "plg-modal plg-edit-modal");
      if (mobileEdit) modal.addClass("plg-edit-mobile-layout");
      const formHost = mobileEdit ? modal.createDiv({ cls: "plg-edit-mobile-scroll" }) : modal;
      const cats = plugin.store.data.categories || [];
      const fields = {};

      const isAutoSubBill = editTx.source === "subscription";
      const isAutoRecBill = editTx.source === "recurring";
      const linkedSubId = String(editTx.linkedSubscriptionId || "").trim();
      const linkedRecId = String(editTx.linkedRecurringId || "").trim();
      const linkedSub = linkedSubId
        ? (plugin.store.data.subscriptions || []).find((s) => s.id === linkedSubId)
        : (isAutoSubBill ? resolveLinkedSubscriptionForTx(plugin, editTx) : null);
      const linkedRec = linkedRecId
        ? (plugin.store.data.recurring || []).find((r) => r.id === linkedRecId)
        : (isAutoRecBill ? resolveLinkedRecurringForTx(plugin, editTx) : null);

      if (isAutoSubBill || isAutoRecBill || linkedSub || linkedRec) {
        const banner = formHost.createDiv({ cls: "plg-tx-source-banner" });
        if (isAutoSubBill) {
          const name = linkedSub?.name || editTx.subcategory || editTx.note || "订阅";
          const btn = banner.createEl("button", {
            text: `📱 订阅 · ${name}`,
            cls: "plg-tx-source-link",
            attr: { type: "button" },
          });
          btn.onclick = () => {
            close();
            if (linkedSub?.id) {
              plugin.openDashboardSettings({ section: "subscription", id: linkedSub.id });
            } else {
              plugin.openDashboardSettings({ section: "subscription" });
            }
          };
          divCls(banner, "plg-muted plg-tx-source-hint").setText("此账单由订阅规则自动生成");
        } else if (linkedSub) {
          banner.createDiv({
            cls: "plg-tx-source-link-static",
            text: `📱 已关联订阅 · ${linkedSub.name}`,
          });
          divCls(banner, "plg-muted plg-tx-source-hint").setText("计入订阅统计与续费阶段记录；在此编辑普通账单");
        }
        if (isAutoRecBill) {
          const title = linkedRec?.title || editTx.note || "周期记账";
          const btn = banner.createEl("button", {
            text: `🔄 周期/分期 · ${title}`,
            cls: "plg-tx-source-link",
            attr: { type: "button" },
          });
          btn.onclick = () => {
            close();
            if (linkedRec?.id) {
              plugin.openDashboardSettings({ section: "recurring", id: linkedRec.id });
            } else {
              plugin.openDashboardSettings({ section: "recurring" });
            }
          };
          divCls(banner, "plg-muted plg-tx-source-hint").setText("此账单由周期规则自动生成");
        } else if (linkedRec) {
          banner.createDiv({
            cls: "plg-tx-source-link-static",
            text: `🔄 已关联周期 · ${linkedRec.title || linkedRec.note || "周期记账"}`,
          });
          divCls(banner, "plg-muted plg-tx-source-hint").setText("计入周期统计，不出现在自动续费记录中；在此编辑普通账单");
        }
      }

      const row = (label, el) => {
        const r = formHost.createDiv({ cls: "plg-modal-row" });
        r.createSpan({ text: label });
        r.appendChild(el);
        return el;
      };

      fields.flow = row("类型", document.createElement("select"));
      const flowOptions = [
        { value: "expense", label: "支出" },
        { value: "income", label: "收入" },
      ];
      if (editTx.flow === "transfer") flowOptions.push({ value: "transfer", label: "转账" });
      appendSelectOptions(fields.flow, flowOptions, editTx.flow || "expense");

      fields.cat = row("分类", document.createElement("select"));
      fields.sub = row("二级", document.createElement("select"));
      fields.amt = row("金额", document.createElement("input"));
      fields.amt.type = "number";
      fields.amt.step = "0.01";
      fields.amt.classList.add("plg-input-num");
      fields.amt.value = String(editTx.amount ?? "");

      fields.time = row("时间", document.createElement("input"));
      fields.time.type = "datetime-local";
      fields.time.value = String(editTx.datetime || "").replace(" ", "T").slice(0, 16);

      fields.note = row("备注", document.createElement("input"));
      fields.note.type = "text";
      fields.note.value = editTx.note || "";

      const reimbRow = divCls(formHost, "plg-bill-form-row plg-edit-reimb-row");
      reimbRow.createSpan({ cls: "plg-bill-form-label", text: "报销" });
      const reimbCtrl = divCls(reimbRow, "plg-bill-form-control plg-link-inline-control");
      const reimbSwitch = reimbCtrl.createEl("label", {
        cls: "plg-slide-switch",
        attr: { "aria-label": "标记报销" },
      });
      fields.reimburse = reimbSwitch.createEl("input", { type: "checkbox" });
      reimbSwitch.createSpan({ cls: "plg-slide-track" });
      fields.reimburse.checked = !!editTx.reimburse;
      const syncReimbVisible = () => {
        reimbRow.toggleClass("plg-is-hidden", fields.flow.value !== "expense");
        if (fields.flow.value !== "expense") fields.reimburse.checked = false;
      };
      syncReimbVisible();

      const subs = plugin.store.data.subscriptions || [];
      const recurs = plugin.store.data.recurring || [];
      let linkSubCheck = null;
      let linkSubSelect = null;
      let linkRecCheck = null;
      let linkRecSelect = null;

      if (!isAutoSubBill && !isAutoRecBill && (subs.length || recurs.length)) {
        divCls(formHost, "plg-muted plg-link-hint").setText(
          "可选：手动关联到订阅或周期/分期。关联订阅后会计入续费阶段与订阅统计。",
        );

        if (subs.length) {
          const linkSubBlock = formHost.createDiv({ cls: "plg-link-form-block" });
          const subLink = createLinkToggleRow(
            linkSubBlock,
            "关联订阅",
            "（选择订阅）",
            subs.map((s) => ({ value: s.id, label: s.name })),
            linkedSubId
          );
          linkSubCheck = subLink.checkbox;
          linkSubSelect = subLink.select;
        }

        if (recurs.length) {
          const linkRecBlock = formHost.createDiv({ cls: "plg-link-form-block" });
          const recLink = createLinkToggleRow(
            linkRecBlock,
            "关联周期",
            "（选择周期/分期）",
            recurs.map((r) => ({
              value: r.id,
              label: r.title || r.note || r.subcategory || r.category || r.id,
            })),
            linkedRecId
          );
          linkRecCheck = recLink.checkbox;
          linkRecSelect = recLink.select;
        }
      }

      const refreshSubs = () => {
        const c = cats.find((x) => x.name === fields.cat.value);
        appendSelectOptions(
          fields.sub,
          [{ value: "", label: "（无）" }].concat((c?.subcategories || []).map((s) => {
            const name = subcategoryName(s);
            return { value: name, label: name };
          })),
          fields.sub.value || editTx.subcategory || ""
        );
      };

      const refreshCats = () => {
        const f = fields.flow.value;
        const list = f === "income"
          ? cats.filter((c) => c.flow === "income")
          : f === "transfer"
            ? [{ name: "转账", icon: "↔️", subcategories: [] }, ...cats.filter((c) => c.flow !== "income")]
            : cats.filter((c) => c.flow !== "income");
        const selected = list.some((c) => c.name === fields.cat.value)
          ? fields.cat.value
          : (editTx.category && list.some((c) => c.name === editTx.category) ? editTx.category : list[0]?.name || "");
        appendSelectOptions(
          fields.cat,
          list.map((c) => ({ value: c.name, label: `${effectiveCategoryIcon(c)} ${c.name}` })),
          selected
        );
        refreshSubs();
      };

      fields.flow.onchange = () => { editTx.category = ""; editTx.subcategory = ""; syncReimbVisible(); refreshCats(); };
      fields.cat.onchange = () => { editTx.subcategory = ""; refreshSubs(); };
      refreshCats();

      const btnRow = modal.createDiv({
        cls: mobileEdit ? "plg-modal-actions plg-edit-mobile-actions" : "plg-modal-actions",
      });
      if (onDeleted) {
        btnRow.createEl("button", { text: "删除", cls: "plg-btn-danger", attr: { type: "button" } }).onclick = () => {
          openDeleteTransactionDialog(app, plugin, editTx, onDeleted, close);
        };
      }
      btnRow.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = close;
      btnRow.createEl("button", {
        text: draft ? "确定" : "保存",
        cls: "mod-cta",
        attr: { type: "button" },
      }).onclick = async () => {
        const amount = parseFloat(fields.amt.value);
        if (!amount) return new Notice("请输入有效金额");
        const dt = fields.time.value.replace("T", " ");
        Object.assign(editTx, {
          flow: fields.flow.value,
          category: fields.cat.value,
          subcategory: fields.sub.value || "",
          amount,
          datetime: dt.length >= 16 ? dt : editTx.datetime,
          note: fields.note.value || "",
          reimburse: fields.flow.value === "expense" ? !!fields.reimburse.checked : false,
        });
        if (!isAutoSubBill) {
          editTx.linkedSubscriptionId = linkSubCheck?.checked ? (linkSubSelect?.value || "") : "";
        }
        if (!isAutoRecBill) {
          editTx.linkedRecurringId = linkRecCheck?.checked ? (linkRecSelect?.value || "") : "";
        }
        if (draft) {
          onSaved?.(editTx);
          close();
          return;
        }
        await plugin.store.updateTransaction(editTx, {
          learnText: fields.note.value || editTx.note || "",
        });
        new Notice("已更新");
        onSaved?.(editTx);
        close();
      };
    },
  });
}

// ─── Shared capture shell (manual-style layout) ─────────────────────────────

function renderCaptureShell(parent, buildContent, panelCls) {
  parent.empty();
  parent.addClass("plg-capture-pane");
  if (panelCls) parent.addClass(panelCls);
  const card = divCls(parent, "plg-capture-card plg-glass-panel");
  buildContent(card);
  return card;
}

/** 金额输入净化：只保留一个小数点，最多两位小数 */
function sanitizeAmountInput(raw) {
  let s = String(raw ?? "").replace(/[^\d.]/g, "");
  const i = s.indexOf(".");
  if (i >= 0) {
    const intPart = s.slice(0, i);
    const decPart = s.slice(i + 1).replace(/\./g, "").slice(0, 2);
    s = `${intPart}.${decPart}`;
  }
  if (s.startsWith(".")) s = `0${s}`;
  return s;
}

function parsePositiveAmount(raw) {
  const n = parseFloat(sanitizeAmountInput(raw));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

// ─── Manual capture ──────────────────────────────────────────────────────────

class ManualCapturePanel {
  constructor(plugin, callbacks) {
    this.plugin = plugin;
    this.callbacks = callbacks || {};
    this.flow = "expense";
    this.amount = "";
    this.selectedCat = null;
    this.selectedSub = "";
    this.note = "";
    this.reimburse = false;
    this.datetimeLocal = "";
  }

  render(parent) {
    this.rootEl = parent;
    renderCaptureShell(parent, (card) => {
      const { scroll, footer, isMobile } = captureMobileRegions(card);
      const compact = isMobileCaptureUi() || isNativeMobileApp(this.plugin);
      if (compact) card.addClass("plg-manual-mobile-compact");
      const top = scroll;
      const inputRoot = footer;
      if (isMobile) {
        footer.addClass("plg-manual-mobile-form-footer");
      }

      const catZone = divCls(top, "plg-manual-cat-zone");
      let gridCls = "plg-cat-grid plg-cat-grid-manual";
      if (compact) {
        gridCls += " plg-cat-grid-mobile-grid";
      } else {
        gridCls += " plg-cat-grid-desktop-2row";
      }
      const grid = divCls(catZone, gridCls);
      this.renderCategoryGrid(grid);
      // 移动端键盘上方空间紧，不做「常用」；桌面保留
      if (!compact) this.refreshRecentChips(catZone);

      const formDock = inputRoot.createDiv({ cls: "plg-manual-form-dock" });
      if (!compact) formDock.addClass("plg-manual-form-dock-desktop");
      const metaBlock = formDock.createDiv({ cls: "plg-manual-meta-block plg-manual-meta-block-mac" });

      // 顶栏：支出/收入 + 提示 + 标记报销
      const metaRowTop = divCls(metaBlock, "plg-manual-meta-row plg-manual-meta-row-top");
      const flowCell = divCls(metaRowTop, "plg-manual-meta-cell plg-manual-meta-cell-flow");
      const flowBar = divCls(flowCell, "plg-flow-tabs plg-flow-tabs-inline");
      [
        { id: "expense", label: "支出" },
        { id: "income", label: "收入" },
      ].forEach((f) => {
        const btn = flowBar.createEl("button", {
          text: f.label,
          cls: this.flow === f.id ? "active" : "",
          attr: { type: "button" },
        });
        btn.dataset.flow = f.id;
        btn.onclick = () => {
          this.closeSubPopover();
          if (this.flow === f.id) return;
          this.flow = f.id;
          this.refreshFlowGrid();
        };
      });
      this.flowBar = flowBar;

      this.selectionHintEl = metaRowTop.createDiv({
        cls: "plg-manual-selection-hint",
        attr: { "aria-live": "polite" },
      });
      this.updateSelectionHint();

      const reimbCell = divCls(metaRowTop, "plg-manual-meta-cell plg-manual-meta-cell-reimb");
      const reimbLabel = reimbCell.createEl("label", {
        cls: "plg-manual-reimb-check-label",
        attr: { "aria-label": "标记报销" },
      });
      this.reimburseCheck = reimbLabel.createEl("input", {
        type: "checkbox",
        cls: "plg-manual-reimb-check",
      });
      reimbLabel.createSpan({ text: "标记报销", cls: "plg-manual-reimb-label" });
      this.reimburseCheck.checked = this.reimburse;
      this.reimburseCheck.onchange = () => { this.reimburse = this.reimburseCheck.checked; };

      const inlineField = (row, title, cellCls) => {
        const cell = divCls(row, `plg-manual-meta-cell plg-manual-meta-cell-inline ${cellCls}`);
        cell.createSpan({ cls: "plg-manual-field-label", text: title });
        const shell = cell.createDiv({ cls: "plg-manual-field-shell" });
        return { cell, shell };
      };

      // 金额 | 备注
      const metaRowFields = divCls(metaBlock, "plg-manual-meta-row plg-manual-meta-row-fields");
      const { shell: amtShell } = inlineField(metaRowFields, "金额", "plg-manual-meta-cell-amt");
      // 手机：去 ¥，与日期/时间一样格子内居中；桌面保留前缀
      if (!compact) {
        amtShell.createSpan({ cls: "plg-manual-amt-prefix", text: "¥", attr: { "aria-hidden": "true" } });
      }
      this.amountInput = amtShell.createEl("input", {
        type: "text",
        cls: "plg-manual-amt-input",
        attr: {
          placeholder: "0.00",
          inputmode: "decimal",
          autocomplete: "off",
          "aria-label": "金额",
        },
      });
      this.amountInput.value = this.amount;
      this.amountInput.oninput = () => {
        this.amount = sanitizeAmountInput(this.amountInput.value);
        this.amountInput.value = this.amount;
      };
      this.amountInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.save();
        }
      });

      const { shell: noteShell } = inlineField(metaRowFields, "备注", "plg-manual-meta-cell-note");
      const noteInput = noteShell.createEl("input", {
        type: "text",
        cls: "plg-manual-note-input",
        attr: { placeholder: "可选", "aria-label": "备注" },
      });
      noteInput.value = this.note;
      noteInput.oninput = () => { this.note = noteInput.value; };

      const now = new Date();
      if (!this.datetimeLocal) {
        this.datetimeLocal = `${dateKey(now)}T${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
      }
      const [datePart, timePart] = this.datetimeLocal.split("T");

      // 日期 | 时间：统一用壳层 + 原生选择器（隐藏系统图标，避免重影）
      const metaRowDatetime = divCls(metaBlock, "plg-manual-meta-row plg-manual-meta-row-datetime");
      const { shell: dateShell } = inlineField(metaRowDatetime, "日期", "plg-manual-meta-cell-date");
      this.dateInput = dateShell.createEl("input", {
        type: "date",
        cls: "plg-manual-date-input plg-manual-native-picker",
        attr: { "aria-label": "日期" },
      });
      const { shell: timeShell } = inlineField(metaRowDatetime, "时间", "plg-manual-meta-cell-time");
      this.timePartInput = timeShell.createEl("input", {
        type: "time",
        cls: "plg-manual-time-part-input plg-manual-native-picker",
        attr: { "aria-label": "时间" },
      });
      this.dateInput.value = datePart || dateKey(now);
      this.timePartInput.value = (timePart || "12:00").slice(0, 5);
      const syncDateTime = () => {
        if (this.dateInput.value && this.timePartInput.value) {
          this.datetimeLocal = `${this.dateInput.value}T${this.timePartInput.value}`;
        }
      };
      this.dateInput.onchange = syncDateTime;
      this.timePartInput.onchange = syncDateTime;
      this.dateInput.oninput = syncDateTime;
      this.timePartInput.oninput = syncDateTime;
      // 点击壳层也能唤起系统选择器；点面板其他处 blur 关掉
      const openNativePicker = (input) => {
        if (!input) return;
        try {
          if (typeof input.showPicker === "function") input.showPicker();
          else input.focus();
        } catch (_) {
          input.focus();
        }
      };
      [dateShell, timeShell].forEach((shell) => {
        shell.addEventListener("click", (e) => {
          if (e.target?.tagName === "INPUT") return;
          openNativePicker(shell.querySelector("input"));
        });
      });
      // iOS/WebView：日期值偶发不渲染，聚焦时再写回
      this.dateInput.addEventListener("focus", () => {
        const v = this.dateInput.value || (this.datetimeLocal || "").split("T")[0] || dateKey(new Date());
        if (this.dateInput.value !== v) this.dateInput.value = v;
        else {
          this.dateInput.value = "";
          this.dateInput.value = v;
        }
      });
      if (this._pickerDismissOff) {
        document.removeEventListener("pointerdown", this._pickerDismissOff, true);
        this._pickerDismissOff = null;
      }
      this._pickerDismissOff = (e) => {
        const t = e.target;
        if (dateShell.contains(t) || timeShell.contains(t)) return;
        if (this.dateInput === document.activeElement) this.dateInput.blur();
        if (this.timePartInput === document.activeElement) this.timePartInput.blur();
      };
      document.addEventListener("pointerdown", this._pickerDismissOff, true);
      [this.amountInput, noteInput].forEach((el) => {
        stopCaptureControlBubble(el);
      });

      [this.amountInput, this.dateInput, this.timePartInput, noteInput].forEach((el) => {
        el?.addEventListener("focus", () => {
          const overlay = el.closest(".plg-overlay-mobile-fit");
          // 日期/时间：只同步面板高度，避免滚动把表单顶出空白
          if (el.matches?.(".plg-manual-native-picker, [type='date'], [type='time']")) {
            if (overlay) scheduleMobileOverlaySync(overlay);
            return;
          }
          if (el.closest(".plg-overlay-mobile-fit .plg-overlay-panel.plg-capture-overlay")) {
            scrollCaptureFieldIntoView(el);
            return;
          }
          const root = el.closest(".plg-capture-modal-body") || el.closest(".plg-manual-panel");
          window.requestAnimationFrame(() => resetCaptureScrollAnchors(root || document));
          if (overlay) scheduleMobileOverlaySync(overlay);
        });
      });

      const saveRow = formDock.createDiv({ cls: "plg-manual-save-row" });
      // 与智能页「粘贴 / 识别」同套：次要浅底 + 主色 CTA
      elCls(saveRow, "button", "plg-capture-tool plg-manual-save-again", {
        text: "再记",
        attr: { type: "button" },
      }).onclick = () => this.save(true);
      elCls(saveRow, "button", "plg-capture-send mod-cta plg-manual-save", {
        text: "保存",
        attr: { type: "button", title: "保存（⌘↩ / Ctrl+↩）" },
      }).onclick = () => this.save(false);
      this.syncFlowUi();
    }, "plg-manual-panel");
  }

  closeSubPopover() {
    document.querySelectorAll(".plg-sub-popover").forEach((el) => el.remove());
    if (this._subPopoverOff) {
      document.removeEventListener("click", this._subPopoverOff, true);
      this._subPopoverOff = null;
    }
  }

  teardown() {
    this.closeSubPopover();
    if (this._pickerDismissOff) {
      document.removeEventListener("pointerdown", this._pickerDismissOff, true);
      this._pickerDismissOff = null;
    }
  }

  openSubPopover(anchor, subs) {
    this.closeSubPopover();
    const rect = anchor.getBoundingClientRect();
    const overlays = [...document.querySelectorAll(".plg-overlay")];
    const host = overlays.length ? overlays[overlays.length - 1] : document.body;
    const pop = host.createDiv({ cls: "plg-sub-popover plg-sub-popover-anim is-placing" });
    const baseZ = overlays.length
      ? parseInt(overlays[overlays.length - 1].style.zIndex || "1000000", 10)
      : 1000000;
    const maxW = Math.min(260, window.innerWidth - 16);
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - maxW - 8));
    applyCssProps(pop, {
      "--plg-pop-z": String(baseZ + 100),
      "--plg-pop-max-w": `${maxW}px`,
      "--plg-pop-left": `${left}px`,
      "--plg-pop-top": `${rect.bottom + 6}px`,
    });

    subs.forEach((sub) => {
      const meta = normalizeSubcategory(sub);
      const name = subcategoryName(sub);
      const btn = elCls(pop, "button", "plg-sub-pop-item", { attr: { type: "button" } });
      if (this.selectedSub === name) btn.addClass("active");
      renderCategoryIcon(btn, meta, { panelIcon: true });
      btn.createSpan({ text: name });
      btn.onclick = (e) => {
        e.stopPropagation();
        this.selectedSub = this.selectedSub === name ? "" : name;
        this.updateSelectionHint();
        this.closeSubPopover();
        this.rootEl?.querySelectorAll(".plg-cat-cell").forEach((el) => {
          el.toggleClass("active", el.dataset.cat === this.selectedCat);
        });
        window.setTimeout(() => focusCaptureField(this.amountInput), 40);
      };
    });

    const place = () => {
      const popH = Math.max(pop.offsetHeight || 0, 48);
      const below = rect.bottom + 6;
      const above = rect.top - popH - 6;
      const useAbove = below + popH > window.innerHeight - 8 && above >= 8;
      applyCssProps(pop, { "--plg-pop-top": `${useAbove ? above : below}px` });
      pop.removeClass("is-placing");
    };
    window.requestAnimationFrame(place);
    this._subPopoverOff = (e) => {
      if (pop.contains(e.target) || anchor.contains(e.target)) return;
      this.closeSubPopover();
    };
    window.setTimeout(() => document.addEventListener("click", this._subPopoverOff, true), 0);
  }

  categoriesForFlow() {
    const cats = this.plugin.store.data.categories;
    if (this.flow === "income") return cats.filter((c) => c.flow === "income");
    return cats.filter((c) => c.flow !== "income");
  }

  refreshRecentChips(hostEl) {
    const compact = !!this.rootEl?.querySelector?.(".plg-manual-mobile-compact")
      || isMobileCaptureUi()
      || isNativeMobileApp(this.plugin);
    if (compact) {
      // 移动端不展示常用，清掉残留节点
      const host = hostEl
        || this.rootEl?.querySelector?.(".plg-manual-cat-zone")
        || this.rootEl?.querySelector?.(".plg-capture-card");
      host?.querySelectorAll?.(".plg-manual-recent-desktop, .plg-manual-recent-mobile")
        ?.forEach?.((el) => el.remove());
      return;
    }
    const host = hostEl
      || this.rootEl?.querySelector?.(".plg-manual-cat-zone")
      || this.rootEl?.querySelector?.(".plg-capture-card");
    if (!host) return;
    const grid = host.querySelector(".plg-cat-grid-manual");
    let recentRow = host.querySelector(".plg-manual-recent-desktop, .plg-manual-recent-mobile");
    const recent = getRecentManualCategories(
      this.plugin.store.data.transactions,
      this.flow,
      8,
    );
    if (!recent.length) {
      recentRow?.remove();
      return;
    }
    if (!recentRow) {
      recentRow = divCls(host, "plg-manual-recent plg-manual-recent-desktop");
      if (grid && grid.nextSibling) host.insertBefore(recentRow, grid.nextSibling);
      else if (grid) host.appendChild(recentRow);
    }
    let chips = recentRow.querySelector(".plg-manual-recent-chips-grid, .plg-manual-recent-chips-mobile");
    if (!chips) {
      recentRow.empty();
      chips = divCls(recentRow, "plg-manual-recent-chips plg-manual-recent-chips-grid");
    } else {
      chips.empty();
    }
    recent.forEach((pick) => {
      const chip = elCls(chips, "button", "plg-manual-recent-chip", {
        text: pick.subcategory ? `${pick.category}·${pick.subcategory}` : pick.category,
        attr: { type: "button" },
      });
      if (this.selectedCat === pick.category && this.selectedSub === pick.subcategory) chip.addClass("active");
      chip.onclick = () => {
        this.selectedCat = pick.category;
        this.selectedSub = pick.subcategory || "";
        this.closeSubPopover();
        this.updateSelectionHint();
        this.rootEl?.querySelectorAll(".plg-cat-cell").forEach((el) => {
          el.toggleClass("active", el.dataset.cat === pick.category);
        });
        window.setTimeout(() => focusCaptureField(this.amountInput), 40);
      };
    });
  }

  refreshFlowGrid() {
    this.selectedCat = null;
    this.selectedSub = "";
    this.closeSubPopover();
    const grid = this.rootEl?.querySelector?.(".plg-cat-grid-manual");
    if (grid) this.renderCategoryGrid(grid);
    this.refreshRecentChips();
    this.updateSelectionHint();
    this.syncFlowUi();
    // 支出↔收入勿重测壳高：已锁定后 force 重测会因分类变少闪缩
  }

  syncFlowUi() {
    this.rootEl?.querySelectorAll(".plg-flow-tabs-inline button").forEach((btn) => {
      const id = btn.dataset.flow || (btn.textContent.trim() === "支出" ? "expense" : "income");
      btn.toggleClass("active", id === this.flow);
    });
    if (this.flowSelect) this.flowSelect.value = this.flow;
    const showReimb = this.flow === "expense";
    const reimbHost = this.rootEl?.querySelector?.(".plg-manual-meta-cell-reimb");
    if (reimbHost) reimbHost.toggleClass("plg-is-hidden", !showReimb);
    this.rootEl?.querySelector?.(".plg-manual-meta-row-top")
      ?.toggleClass("plg-manual-meta-row-top-income", !showReimb);
    if (!showReimb) {
      this.reimburse = false;
      if (this.reimburseCheck) this.reimburseCheck.checked = false;
    }
  }

  updateSelectionHint() {
    const hint = this.selectionHintEl || this.rootEl?.querySelector?.(".plg-manual-selection-hint");
    if (!hint) return;
    const compact = !!this.rootEl?.querySelector?.(".plg-manual-mobile-compact")
      || isMobileCaptureUi()
      || isNativeMobileApp(this.plugin);
    if (!this.selectedCat) {
      // 移动端未选时不重复占位（顶部 mode hint 已说明）；桌面保留引导文案
      hint.setText(compact ? "" : "请选择一级分类（有二级时点开选择）");
      hint.removeClass("is-selected");
      hint.toggleClass("is-empty", compact);
      return;
    }
    const label = this.selectedSub ? `${this.selectedCat} · ${this.selectedSub}` : this.selectedCat;
    hint.setText(`已选：${label}`);
    hint.addClass("is-selected");
    hint.removeClass("is-empty");
  }

  renderCategoryGrid(grid) {
    grid.empty();
    const cats = this.categoriesForFlow();
    const compact = !!this.rootEl?.querySelector?.(".plg-manual-mobile-compact")
      || isMobileCaptureUi()
      || isNativeMobileApp(this.plugin);
    if (!cats.length) {
      renderLifeOsEmptyState(grid, {
        icon: "◎",
        message: "暂无分类，请先添加",
        ctaLabel: "去添加分类",
        onCta: () => this.plugin.openDashboardSettings({ section: "categories" }),
      });
      return;
    }
    // 移动端：分类少时单行排布，避免「3 个也占两行」
    if (compact) {
      const rows = cats.length <= 5 ? 1 : 2;
      grid.dataset.catRows = String(rows);
      applyCssProps(grid, { "--plg-manual-cat-rows": String(rows) });
      grid.toggleClass("plg-cat-grid-mobile-onerow", rows === 1);
    } else {
      delete grid.dataset.catRows;
      grid.removeClass("plg-cat-grid-mobile-onerow");
    }
    cats.forEach((cat) => {
      const cell = divCls(grid, "plg-cat-cell");
      cell.dataset.cat = cat.name;
      cell.setAttr("role", "button");
      cell.setAttr("tabindex", "0");
      cell.setAttr("aria-pressed", this.selectedCat === cat.name ? "true" : "false");
      if (this.selectedCat === cat.name) cell.addClass("active");
      applyCssProps(cell, { "--cat-color": cat.color || "#ccc" });
      const iconWrap = cell.createDiv({ cls: "plg-cat-cell-icon-wrap" });
      renderCategoryIcon(iconWrap, cat, { panelIcon: true });
      cell.createDiv({ cls: "plg-cat-cell-name", text: cat.name });
      const activate = (e) => {
        e.stopPropagation();
        this.selectedCat = cat.name;
        this.selectedSub = "";
        this.updateSelectionHint();
        grid.querySelectorAll(".plg-cat-cell").forEach((el) => {
          el.removeClass("active");
          el.setAttr("aria-pressed", "false");
        });
        cell.addClass("active");
        cell.setAttr("aria-pressed", "true");
        const subs = cat.subcategories || [];
        if (subs.length) this.openSubPopover(cell, subs);
        else {
          this.closeSubPopover();
          window.setTimeout(() => focusCaptureField(this.amountInput), 40);
        }
      };
      cell.onclick = activate;
      cell.onkeydown = (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        activate(e);
      };
    });
  }

  async save(keepOpen = false) {
    const amount = parsePositiveAmount(this.amount);
    if (!amount) return new Notice("请输入有效金额");
    if (!this.selectedCat) return new Notice("请选择分类");
    if (this.dateInput?.value && this.timePartInput?.value) {
      this.datetimeLocal = `${this.dateInput.value}T${this.timePartInput.value}`;
    }
    if (!this.datetimeLocal) return new Notice("请选择日期和时间");
    const dtTest = new Date(this.datetimeLocal);
    if (Number.isNaN(dtTest.getTime())) return new Notice("日期或时间无效");
    const dtRaw = this.datetimeLocal || "";
    const dt = dtRaw.replace("T", " ");
    const datetime = dt.length >= 16 ? dt : (() => {
      const n = new Date();
      return `${dateKey(n)} ${pad2(n.getHours())}:${pad2(n.getMinutes())}`;
    })();
    const tx = {
      id: uid(),
      datetime,
      flow: this.flow,
      category: this.selectedCat,
      subcategory: this.selectedSub || "",
      amount,
      ledger: this.plugin.store.data.ledger || "",
      accountOut: this.flow === "transfer" ? "默认" : "",
      accountIn: this.flow === "transfer" ? "默认" : "",
      note: this.note || "",
      reimburse: this.flow === "expense" ? !!this.reimburse : false,
      discount: 0,
      tags: [],
      member: "",
      source: "manual",
    };
    try {
      await this.plugin.store.addTransaction(tx, { learnText: this.note || "" });
    } catch (err) {
      console.error(err);
      return new Notice("记账失败，请重试");
    }
    new Notice(`已记账 · ${this.selectedCat}${this.selectedSub ? ` · ${this.selectedSub}` : ""} · ¥${fmtMoney(amount)}`);
    if (keepOpen) {
      this.clearDraft({ keepDatetime: true, silent: true });
      focusCaptureField(this.amountInput);
    }
    this.callbacks.onSaved?.({ keepOpen });
  }

  clearDraft(opts = {}) {
    this.closeSubPopover();
    this.amount = "";
    this.selectedCat = null;
    this.selectedSub = "";
    this.note = "";
    this.reimburse = false;
    if (this.reimburseCheck) this.reimburseCheck.checked = false;
    if (this.amountInput) this.amountInput.value = "";
    const noteInp = this.rootEl?.querySelector?.(".plg-manual-note-input");
    if (noteInp) noteInp.value = "";
    if (!opts.keepDatetime) {
      const now = new Date();
      this.datetimeLocal = `${dateKey(now)}T${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
      const [d, t] = this.datetimeLocal.split("T");
      if (this.dateInput) this.dateInput.value = d;
      if (this.timePartInput) this.timePartInput.value = t;
    }
    const grid = this.rootEl?.querySelector?.(".plg-cat-grid-manual");
    if (grid) this.renderCategoryGrid(grid);
    this.refreshRecentChips();
    this.updateSelectionHint();
    if (!opts.silent) new Notice("已清除草稿");
  }
}

function isCapturePreviewLowConf(parsed) {
  return (parsed.confidence || 0) < 0.5 || parsed.matchReason === "fallback";
}

function patchCaptureParsed(parsed, patch) {
  const next = { ...parsed, ...patch };
  if (patch.category != null || patch.subcategory != null || patch.amount != null) {
    next.confidence = Math.max(next.confidence || 0, 0.88);
    next.matchReason = "manual-fix";
    next.matchLabel = "手动修正";
  }
  return next;
}

function renderCapturePreview(previewEl, parsed, ctx) {
  const {
    plugin, mode, getPreview, setPreview, listEl, draftSource, onConfirm, onClose,
  } = ctx;
  previewEl.empty();
  if (!parsed) {
    previewEl.addClass("hidden");
    listEl?.removeClass("hidden");
    previewEl.closest?.(".plg-capture-card-mobile")?.classList.remove("plg-smart-has-preview");
    return;
  }
  previewEl.removeClass("hidden");
  const lowConf = isCapturePreviewLowConf(parsed);
  previewEl.toggleClass("plg-preview-low-confidence", lowConf);
  const mobilePreview = !!previewEl.closest?.(".plg-overlay-mobile-fit");
  if (mobilePreview && listEl) listEl.addClass("hidden");
  const mobileCard = previewEl.closest?.(".plg-capture-card-mobile");
  mobileCard?.classList.toggle("plg-smart-has-preview", !!parsed);
  syncMobileCaptureFooterInset(previewEl.closest(".plg-overlay-panel"));

  if (lowConf) {
    const quick = previewEl.createDiv({ cls: "plg-preview-quick-fix" });
    quick.createDiv({ cls: "plg-preview-quick-label", text: "快速修正分类与金额" });
    const row = quick.createDiv({ cls: "plg-preview-quick-row" });
    const catSel = row.createEl("select", {
      cls: "plg-preview-quick-cat",
      attr: { "aria-label": "分类" },
    });
    const flowCats = (plugin.store.data.categories || []).filter((c) => (
      parsed.flow === "income" ? c.flow === "income" : c.flow !== "income"
    ));
    flowCats.forEach((c) => {
      const o = catSel.createEl("option", { value: c.name, text: c.name });
      if (c.name === parsed.category) o.selected = true;
    });
    const subSel = row.createEl("select", {
      cls: "plg-preview-quick-sub",
      attr: { "aria-label": "二级分类" },
    });
    const fillSubs = (catName) => {
      subSel.empty();
      subSel.createEl("option", { value: "", text: "无二级" });
      const cat = flowCats.find((c) => c.name === catName);
      (cat?.subcategories || []).forEach((sub) => {
        const name = subcategoryName(sub);
        const o = subSel.createEl("option", { value: name, text: name });
        if (name === (parsed.subcategory || "")) o.selected = true;
      });
    };
    fillSubs(parsed.category || catSel.value);
    const amtInp = row.createEl("input", {
      type: "text",
      cls: "plg-preview-quick-amt",
      attr: { inputmode: "decimal", "aria-label": "金额" },
    });
    amtInp.value = String(parsed.amount || "");
    const applyQuick = () => {
      const next = patchCaptureParsed(getPreview(), {
        category: catSel.value,
        subcategory: subSel.value,
        amount: parseFloat(amtInp.value) || 0,
      });
      setPreview(next);
      renderCapturePreview(previewEl, next, ctx);
    };
    catSel.onchange = () => { fillSubs(catSel.value); applyQuick(); };
    subSel.onchange = applyQuick;
    amtInp.onchange = applyQuick;
  }

  const iconMeta = getTransactionIconMeta(
    plugin.store.data.categories,
    parsed.category,
    parsed.subcategory,
    plugin.store.data.subscriptions,
    plugin.store.data.recurring,
  );
  const head = previewEl.createDiv({ cls: "plg-preview-head" });
  const iconSlot = head.createDiv({ cls: "plg-preview-icon" });
  renderCategoryIcon(iconSlot, iconMeta, { panelIcon: true });
  const info = head.createDiv({ cls: "plg-preview-info" });
  const flowLabel = parsed.flow === "income" ? "收入" : parsed.flow === "transfer" ? "转账" : "支出";
  info.createDiv({
    cls: "plg-preview-title",
    text: parsed.subcategory ? `${parsed.category} · ${parsed.subcategory}` : parsed.category,
  });
  info.createDiv({
    cls: "plg-preview-sub",
    text: `${flowLabel} · ${parsed.datetime || ""} · ${formatMatchHint(parsed)}`,
  });
  if (lowConf) {
    info.createDiv({ cls: "plg-preview-warn", text: "⚠️ 分类置信度较低，请确认或快速修正后再入账" });
  }
  const amtEl = head.createDiv({
    text: (parsed.flow === "income" ? "+" : "-") + fmtMoney(parsed.amount),
  });
  addClasses(amtEl, "plg-preview-amt", parsed.flow === "income" ? "inc" : "exp");

  const actions = previewEl.createDiv({ cls: "plg-preview-actions" });
  actions.createEl("button", { text: "修改", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = () => {
    const tx = parsedToTransaction(getPreview(), plugin.store.data.ledger, draftSource);
    const raw = getPreview().raw;
    openEditTransaction(plugin.app, plugin, tx, (updated) => {
      plugin.openCaptureModal(mode, txToParsed(updated, { confidence: 1, raw }));
    }, null, { draft: true, onBeforeOpen: () => onClose?.() });
  };
  actions.createEl("button", {
    text: "确认入账",
    cls: "plg-btn-primary",
    attr: { type: "button" },
  }).onclick = () => onConfirm(false);
  actions.createEl("button", {
    text: "再记",
    cls: "plg-btn-ghost",
    attr: { type: "button" },
  }).onclick = () => onConfirm(true);
  window.requestAnimationFrame(() => {
    syncMobileCaptureOverlay();
    scheduleDesktopCaptureLayoutSync(previewEl.closest(".plg-capture-modal-body"));
    if (mobilePreview) {
      const scrollRoot = previewEl.closest(".plg-capture-mobile-scroll");
      const runScroll = () => {
        if (scrollRoot) {
          scrollRoot.scrollTop = Math.max(0, previewEl.offsetTop - 8);
        } else {
          previewEl.scrollIntoView({ block: "nearest" });
        }
      };
      runScroll();
      window.setTimeout(runScroll, 80);
    }
  });
}

// ─── Smart capture ───────────────────────────────────────────────────────────

class SmartCapturePanel {
  constructor(plugin, callbacks) {
    this.plugin = plugin;
    this.callbacks = callbacks || {};
    this.sessionEntries = [];
    this.preview = null;
  }

  render(parent) {
    renderCaptureShell(parent, (card) => {
      const { scroll, footer, isMobile, flat } = captureMobileRegions(card);

      if (isMobile) {
        const host = scroll;
        addClasses(card, "plg-smart-mobile-fill", "plg-smart-mobile-layout");
        this.textarea = host.createEl("textarea", {
          cls: "plg-smart-textarea",
          attr: {
            placeholder: "输入文字，或粘贴账单文字…",
            rows: flat ? "4" : "3",
          },
        });
        this.listEl = host.createDiv({ cls: "plg-capture-list" });
        const toolbar = divCls(host, "plg-capture-toolbar plg-capture-toolbar-bottom plg-capture-toolbar-in-scroll plg-smart-mobile-toolbar");
        this.pasteBtn = elCls(toolbar, "button", "plg-capture-tool", { text: "📋 粘贴", attr: { type: "button" } });
        this.parseBtn = elCls(toolbar, "button", "plg-capture-send mod-cta", { text: "🔍 识别", attr: { type: "button" } });
        this.previewEl = divCls(host, "plg-capture-preview hidden");
        footer.addClass("plg-capture-mobile-footer-empty");
      } else {
        card.addClass("plg-capture-card-desktop-fill");
        const fill = card.createDiv({ cls: "plg-capture-input-box" });
        this.textarea = fill.createEl("textarea", {
          cls: "plg-smart-textarea",
          attr: {
            placeholder: "输入文字，或粘贴账单文字…",
            rows: "1",
          },
        });
        addClasses(this.textarea, "plg-smart-textarea-fill");
        const toolbar = divCls(fill, "plg-capture-toolbar plg-capture-toolbar-bottom plg-capture-toolbar-inbox");
        this.pasteBtn = elCls(toolbar, "button", "plg-capture-tool", { text: "📋 粘贴", attr: { type: "button" } });
        this.parseBtn = elCls(toolbar, "button", "plg-capture-send mod-cta", { text: "🔍 识别", attr: { type: "button" } });
        this.previewEl = divCls(card, "plg-capture-preview hidden");
        this.listEl = card.createDiv({ cls: "plg-capture-list" });
      }

      this.textarea.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" || e.shiftKey) return;
        if (e.isComposing || e.keyCode === 229) return;
        e.preventDefault();
        this.runParse();
      });
      this.parseBtn.onclick = () => this.runParse();
      this.pasteBtn.onclick = () => this.pasteFromClipboard();

      this.renderPreview(null);
      this.renderSessionList();
    }, "plg-smart-panel");
  }

  async pasteFromClipboard() {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        if (item.types.includes("text/plain")) {
          const blob = await item.getType("text/plain");
          this.textarea.value = await blob.text();
          this.runParse();
          return;
        }
      }
      new Notice("剪贴板无文本");
    } catch (_) {
      new Notice("无法读取剪贴板");
    }
  }

  runParse() {
    const text = this.textarea?.value?.trim();
    if (!text) return new Notice("请输入文字");
    const parsed = parseSmartInput(
      text,
      this.plugin.store.data.categories,
      this.plugin.settings.categoryKeywords,
      this.plugin.store.data.transactions
    );
    if (parsed?.error) return new Notice(parsed.error);
    this.preview = parsed;
    this.renderPreview(parsed);
    syncMobileCaptureOverlay();
    window.setTimeout(syncMobileCaptureOverlay, 120);
    scheduleDesktopCaptureLayoutSync(this.previewEl?.closest(".plg-capture-modal-body"));
  }

  renderPreview(parsed) {
    if (!this.previewEl) return;
    renderCapturePreview(this.previewEl, parsed, {
      plugin: this.plugin,
      mode: "smart",
      draftSource: "smart-draft",
      getPreview: () => this.preview,
      setPreview: (p) => { this.preview = p; },
      listEl: this.listEl,
      onClose: () => this.callbacks.onClose?.(),
      onConfirm: (keepOpen) => this.confirmSave(keepOpen),
    });
  }

  clearDraft() {
    if (this.textarea) this.textarea.value = "";
    this.preview = null;
    this.sessionEntries = [];
    this.renderPreview(null);
    this.renderSessionList();
    focusCaptureField(this.textarea);
    new Notice("已清除草稿");
  }

  async confirmSave(keepOpen = false) {
    if (!this.preview) {
      const text = this.textarea?.value?.trim();
      return new Notice(text ? "请先点「识别」确认这一笔" : "请输入要记的内容");
    }
    const tx = parsedToTransaction(this.preview, this.plugin.store.data.ledger, "smart");
    await this.plugin.store.addTransaction(tx, {
      learnText: this.preview.raw || this.textarea?.value || this.preview.note || "",
    });
    this.sessionEntries.unshift(tx);
    if (this.sessionEntries.length > 8) this.sessionEntries.pop();
    new Notice("已记账");
    if (this.textarea) this.textarea.value = "";
    this.preview = null;
    this.renderPreview(null);
    this.renderSessionList();
    this.callbacks.onSaved?.({ keepOpen });
    if (keepOpen) focusCaptureField(this.textarea);
  }

  renderSessionList() {
    if (!this.listEl) return;
    this.listEl.empty();
    if (!this.sessionEntries.length) return;
    this.listEl.createEl("h4", { text: "本次记录" });
    this.sessionEntries.forEach((t) => {
      const iconMeta = getTransactionIconMeta(this.plugin.store.data.categories, t.category, t.subcategory, this.plugin.store.data.subscriptions, this.plugin.store.data.recurring);
      const row = this.listEl.createDiv({ cls: "plg-capture-row plg-capture-row-static" });
      const iconSlot = row.createDiv({ cls: "plg-tx-icon" });
      renderCategoryIcon(iconSlot, iconMeta, { panelIcon: true });
      const mid = row.createDiv({ cls: "plg-tx-mid" });
      mid.createDiv({
        cls: "plg-tx-title",
        text: buildTransactionDisplayTitle(this.plugin.store.data.categories, t),
      });
      const amtCell = row.createDiv({
        text: (t.flow === "income" ? "+" : "-") + fmtMoney(t.amount),
      });
      addClasses(amtCell, "plg-tx-amt", t.flow === "income" ? "inc" : "exp");
    });
    scheduleDesktopCaptureLayoutSync(this.listEl.closest(".plg-capture-modal-body"));
  }
}

// ─── OCR capture ─────────────────────────────────────────────────────────────

function getFflateGunzip() {
  const lib = typeof __MUMU_FFLATE__ !== "undefined" ? __MUMU_FFLATE__ : null;
  if (lib?.gunzipSync) return lib.gunzipSync.bind(lib);
  return null;
}

const OCR_CACHE_PATH = "plain-ledger-tesseract";
const OCR_LANGS = ["chi_sim", "eng"];

function ocrLangCacheKey(lang) {
  return `${OCR_CACHE_PATH}/${lang}.traineddata`;
}

function idbKeyvalGet(key) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("keyval-store");
    req.onerror = () => reject(req.error);
    req.onupgradeneeded = (ev) => {
      if (!ev.target.result.objectStoreNames.contains("keyval")) {
        ev.target.result.createObjectStore("keyval");
      }
    };
    req.onsuccess = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("keyval")) {
        resolve(undefined);
        return;
      }
      const tx = db.transaction("keyval", "readonly");
      const getReq = tx.objectStore("keyval").get(key);
      getReq.onsuccess = () => resolve(getReq.result);
      getReq.onerror = () => reject(getReq.error);
    };
  });
}

function idbKeyvalSet(key, val) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("keyval-store");
    req.onerror = () => reject(req.error);
    req.onupgradeneeded = (ev) => {
      if (!ev.target.result.objectStoreNames.contains("keyval")) {
        ev.target.result.createObjectStore("keyval");
      }
    };
    req.onsuccess = () => {
      const db = req.result;
      const tx = db.transaction("keyval", "readwrite");
      tx.objectStore("keyval").put(val, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    };
  });
}

async function readBundledLangGz(plugin, lang) {
  if (typeof Platform === "undefined" || !Platform.isDesktop || !plugin?.manifest?.dir) return null;
  try {
    const rel = normalizePath(`${plugin.manifest.dir}/vendor/lang/${lang}.traineddata.gz`);
    const adapter = plugin.app?.vault?.adapter;
    if (!adapter?.exists || !adapter?.readBinary) return null;
    if (await adapter.exists(rel)) {
      const buf = await adapter.readBinary(rel);
      return buf ? new Uint8Array(buf) : null;
    }
  } catch (_) { /* ignore */ }
  return null;
}

function langDownloadUrls(lang) {
  const base = `@tesseract.js-data/${lang}/4.0.0_best_int/${lang}.traineddata.gz`;
  return [
    `https://cdn.jsdelivr.net/npm/${base}`,
    `https://unpkg.com/${base}`,
    `https://gcore.jsdelivr.net/npm/${base}`,
  ];
}

async function fetchLangGz(plugin, url, _timeoutMs = 60000) {
  if (typeof requestUrl !== "function") throw new Error("当前环境不支持网络请求");
  const resp = await requestUrl({ url, method: "GET", throw: false });
  if (resp.status >= 400) throw new Error(`HTTP ${resp.status}`);
  return new Uint8Array(resp.arrayBuffer);
}

async function ensureOcrLangCached(plugin, onProgress) {
  const gunzip = getFflateGunzip();
  if (!gunzip) throw new Error("解压模块不可用");

  for (const lang of OCR_LANGS) {
    const cacheKey = ocrLangCacheKey(lang);
    const cached = await idbKeyvalGet(cacheKey);
    if (cached) continue;

    const label = lang === "chi_sim" ? "中文" : "英文";
    onProgress?.(`正在准备${label}语言包…`);

    let gz = await readBundledLangGz(plugin, lang);
    if (gz) {
      onProgress?.(`正在解压内置${label}语言包…`);
    } else {
      let lastErr = null;
      for (const url of langDownloadUrls(lang)) {
        try {
          onProgress?.(`正在下载${label}语言包…`);
          gz = await fetchLangGz(plugin, url);
          break;
        } catch (e) {
          lastErr = e;
        }
      }
      if (!gz) {
        throw new Error(`语言包下载失败（${label}），请检查网络。${lastErr?.message || ""}`.trim());
      }
    }

    const data = gunzip(gz);
    await idbKeyvalSet(cacheKey, data);
  }
}

function formatOcrError(err) {
  if (err == null) {
    return "OCR 初始化失败，请检查 Obsidian 是否允许插件访问网络（设置 → 社区插件）";
  }
  if (typeof err === "string") {
    if (!err || err === "undefined") {
      return "OCR Worker 无法加载核心模块，请确认网络可用并重试";
    }
    return err;
  }
  const msg = err.message || err.reason || err.status;
  if (msg && msg !== "undefined") return String(msg);
  if (err instanceof ErrorEvent && err.filename) {
    return `OCR Worker 加载失败：${err.filename}`;
  }
  try {
    return JSON.stringify(err);
  } catch (_) {
    return String(err);
  }
}

function buildTesseractOptions(onProgress) {
  const ver = "7.0.0";
  const coreVer = "7.0.0";
  let workerPath = `https://cdn.jsdelivr.net/npm/tesseract.js@v${ver}/dist/worker.min.js`;
  let workerBlobURL = true;
  let localBlobUrl = "";

  if (typeof __MUMU_TESSERACT_WORKER__ === "string" && __MUMU_TESSERACT_WORKER__) {
    localBlobUrl = URL.createObjectURL(new Blob([__MUMU_TESSERACT_WORKER__], { type: "application/javascript" }));
    workerPath = localBlobUrl;
    workerBlobURL = false;
  }

  return {
    localBlobUrl,
    options: {
      workerPath,
      workerBlobURL,
      corePath: `https://cdn.jsdelivr.net/npm/tesseract.js-core@v${coreVer}`,
      cachePath: OCR_CACHE_PATH,
      cacheMethod: "readwrite",
      logger: (m) => {
        if (!onProgress || !m) return;
        if (m.status === "loading tesseract core") {
          onProgress("正在加载 OCR 核心…");
        } else if (m.status === "loading language traineddata") {
          onProgress("正在加载语言包…");
        } else if (m.status === "initializing api") {
          onProgress("正在初始化 OCR…");
        } else if (m.status === "recognizing text" && typeof m.progress === "number") {
          onProgress(`识别中 ${Math.round(m.progress * 100)}%`);
        }
      },
    },
  };
}

async function runTesseractOcr(blob, plugin, onProgress) {
  const Tesseract = getMumuTesseract();
  if (!Tesseract) throw new Error("无法加载 OCR 引擎");

  await ensureOcrLangCached(plugin, onProgress);
  const { localBlobUrl, options } = buildTesseractOptions(onProgress);

  try {
    if (Tesseract.createWorker) {
      let worker;
      try {
        worker = await Tesseract.createWorker("chi_sim+eng", 1, options);
      } catch (e) {
        throw new Error(formatOcrError(e));
      }
      try {
        const { data } = await worker.recognize(blob);
        return data?.text || "";
      } finally {
        await worker.terminate();
      }
    }
    if (Tesseract.recognize) {
      const result = await Tesseract.recognize(blob, "chi_sim+eng", options);
      return result?.data?.text || "";
    }
    throw new Error("OCR API 不可用");
  } catch (e) {
    if (e instanceof Error && e.message && !e.message.includes("OCR")) {
      throw new Error(formatOcrError(e));
    }
    throw e;
  } finally {
    if (localBlobUrl) URL.revokeObjectURL(localBlobUrl);
  }
}

async function preloadOcrLangPack(plugin, onProgress) {
  await ensureOcrLangCached(plugin, onProgress);
  plugin.settings.ocrLangCached = true;
  await plugin.saveSettings();
}

class OcrCapturePanel {
  constructor(plugin, callbacks) {
    this.plugin = plugin;
    this.callbacks = callbacks || {};
    this.preview = null;
    this.pasteHandler = null;
    this._imageBlobUrl = null;
  }

  revokeImageBlobUrl() {
    if (!this._imageBlobUrl) return;
    URL.revokeObjectURL(this._imageBlobUrl);
    this._imageBlobUrl = null;
  }

  render(parent) {
    renderCaptureShell(parent, (card) => {
      const { scroll, footer, isMobile } = captureMobileRegions(card);
      const top = scroll;
      const buildDrop = (container, fillStyle) => {
        const drop = container.createDiv({ cls: "plg-ocr-drop" });
        if (fillStyle) addClasses(drop, "plg-ocr-drop-fill");
        drop.createDiv({ cls: "plg-ocr-drop-icon", text: "📷" });
        drop.createDiv({
          cls: "plg-ocr-drop-text",
          text: "点击上传 / 粘贴截图",
        });
        drop.createDiv({
          cls: "plg-ocr-drop-sub plg-muted",
          text: "支持微信 · 支付宝 · 银行 App",
        });
        this.previewImg = divCls(drop, "plg-ocr-preview-img hidden");
        const fileInput = container.createEl("input", { type: "file", cls: "plg-file-input-hidden", attr: { accept: "image/*" } });
        drop.onclick = () => fileInput.click();
        fileInput.onchange = () => {
          const f = fileInput.files?.[0];
          if (f) this.processImage(f);
        };
        return drop;
      };

      if (isMobile) {
        buildDrop(top, false);
        this.statusEl = divCls(top, "plg-ocr-status plg-muted");
        this.statusEl.setText("");
        this.langRow = top.createDiv({ cls: "plg-ocr-lang-row" });
        this.renderLangRow();
        this.resultEl = divCls(top, "plg-capture-preview hidden");
        footer.addClass("plg-capture-mobile-footer-empty");
      } else {
        card.addClass("plg-capture-card-desktop-fill");
        const fill = card.createDiv({ cls: "plg-capture-input-box" });
        buildDrop(fill, true);
        this.statusEl = divCls(card, "plg-ocr-status plg-muted");
        this.statusEl.setText("");
        this.langRow = card.createDiv({ cls: "plg-ocr-lang-row" });
        this.renderLangRow();
        this.resultEl = divCls(card, "plg-capture-preview hidden");
      }

      if (this.pasteHandler) parent.removeEventListener("paste", this.pasteHandler);
      this.pasteHandler = (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;
        for (const item of items) {
          if (item.type.startsWith("image/")) {
            e.preventDefault();
            this.processImage(item.getAsFile());
            return;
          }
        }
      };
      parent.addEventListener("paste", this.pasteHandler);
    }, "plg-ocr-panel");
  }

  renderLangRow() {
    if (!this.langRow) return;
    this.langRow.empty();
    if (this.plugin.settings.ocrLangCached) {
      this.langRow.createSpan({ cls: "plg-ocr-lang-ready", text: "✓ OCR 语言包已就绪" });
      return;
    }
    this.langRow.createSpan({
      cls: "plg-ocr-lang-note",
      text: "桌面版优先使用内置语言包；首次约需解压/下载 4MB",
    });
    elCls(this.langRow, "button", "plg-btn-ghost plg-ocr-lang-preload", {
      text: "预下载",
      attr: { type: "button" },
    }).onclick = () => this.runLangPreload();
  }

  async runLangPreload() {
    if (!this.statusEl) return;
    try {
      this.statusEl.setText("正在下载语言包…");
      await preloadOcrLangPack(this.plugin, (msg) => {
        if (this.statusEl) this.statusEl.setText(msg);
      });
      new Notice("OCR 语言包已就绪，可粘贴截图识别");
      this.statusEl.setText("语言包已就绪，请粘贴或上传截图");
      this.renderLangRow();
    } catch (e) {
      const msg = formatOcrError(e);
      this.statusEl.setText("下载失败：" + msg);
      new Notice("语言包下载失败：" + msg);
    }
  }

  async processImage(file) {
    if (!file) return;
    this.statusEl.setText("准备识别…");
    this.revokeImageBlobUrl();
    this._imageBlobUrl = URL.createObjectURL(file);
    this.previewImg.empty();
    this.previewImg.removeClass("hidden");
    this.previewImg.createEl("img", { attr: { src: this._imageBlobUrl } });

    try {
      const text = await runTesseractOcr(file, this.plugin, (msg) => {
        if (this.statusEl) this.statusEl.setText(msg);
      });
      if (!text.trim()) {
        this.statusEl.setText("未识别到文字，请换一张更清晰的截图");
        return;
      }
      this.statusEl.setText(`识别文字：${text.slice(0, 80)}${text.length > 80 ? "…" : ""}`);
      const parsed = parseOcrReceiptText(
        text,
        this.plugin.store.data.categories,
        this.plugin.settings.categoryKeywords,
        this.plugin.store.data.transactions
      );
      if (parsed?.error) {
        this.statusEl.setText(parsed.error + " · 可切换到「智能」手动改文字");
        return;
      }
      parsed.note = (parsed.note ? parsed.note + " · " : "") + "截图识别";
      this.preview = parsed;
      if (!this.plugin.settings.ocrLangCached) {
        this.plugin.settings.ocrLangCached = true;
        await this.plugin.saveSettings();
        this.renderLangRow();
      }
      this.renderResult(parsed);
    } catch (e) {
      this.statusEl.setText("OCR 失败：" + formatOcrError(e));
    }
  }

  renderResult(parsed) {
    if (!this.resultEl) return;
    renderCapturePreview(this.resultEl, parsed, {
      plugin: this.plugin,
      mode: "ocr",
      draftSource: "ocr-draft",
      getPreview: () => this.preview,
      setPreview: (p) => { this.preview = p; },
      listEl: null,
      onClose: () => this.callbacks.onClose?.(),
      onConfirm: (keepOpen) => this.confirmSave(keepOpen),
    });
  }

  resetOcrForm() {
    this.preview = null;
    this._lastOcrText = "";
    this.revokeImageBlobUrl();
    this.previewImg?.empty();
    this.previewImg?.addClass("hidden");
    if (this.statusEl) this.statusEl.setText("");
    this.renderResult(null);
  }

  clearDraft() {
    this.resetOcrForm();
    new Notice("已清除草稿");
  }

  async confirmSave(keepOpen = false) {
    if (!this.preview) return new Notice("请先粘贴或上传截图并完成识别");
    const tx = parsedToTransaction(this.preview, this.plugin.store.data.ledger, "ocr");
    await this.plugin.store.addTransaction(tx, {
      learnText: this.preview.raw || this.preview.note || "",
    });
    new Notice("已记账");
    if (keepOpen) this.resetOcrForm();
    this.callbacks.onSaved?.({ keepOpen });
  }
}

// ─── Capture panel entry ───────────────────────────────────────────────────────

function openCapturePanel(plugin, opts = {}) {
  document.querySelectorAll(".modal-container").forEach((container) => {
    if (container.querySelector(".plg-capture-overlay, .plg-capture-modal-wrap")) {
      container.remove();
    }
  });
  document.body.removeClass("plg-mobile-force-top");
  document.body.removeClass("plg-capture-sheet-open");
  document.body.removeClass("plg-capture-kb-open");

  let mode = opts.mode || "smart";
  const initialPreview = opts.initialPreview || null;
  let smartPanel;
  let manualPanel;
  let ocrPanel;
  let modeBar;
  let bodyEl;
  let tabRoots = null;
  let tabsMounted = false;
  let tabSwitchLock = false;

  const allModes = [
    { id: "smart", label: "智能", hint: "例：前天咖啡18、工资11000、6.5午餐30、6月5日买菜42" },
    { id: "manual", label: "手动", hint: "点选分类，有二级时点开选择；再填金额保存" },
    { id: "ocr", label: "截图", hint: "粘贴或上传支付截图，OCR 识别后确认" },
  ];
  const mobileCapture = Platform.isMobile;
  const modes = mobileCapture ? allModes.filter((m) => m.id !== "ocr") : allModes;
  if (mobileCapture && mode === "ocr") mode = "smart";
  if (mode !== "smart" && mode !== "manual" && mode !== "ocr") mode = "smart";

  const modeHints = Object.fromEntries(modes.map((m) => [m.id, m.hint]));
  let modeHintEl;

  const mountCaptureTabs = () => {
    if (tabsMounted || !bodyEl) return;
    tabsMounted = true;
    tabRoots = {
      smart: divCls(bodyEl, "plg-capture-tab-pane"),
      manual: divCls(bodyEl, "plg-capture-tab-pane hidden"),
      ocr: divCls(bodyEl, "plg-capture-tab-pane hidden"),
    };
    Object.entries(tabRoots).forEach(([id, el]) => {
      el.setAttr("role", "tabpanel");
      el.id = `plg-capture-panel-${id}`;
      el.setAttr("aria-labelledby", `plg-capture-tab-${id}`);
    });
    manualPanel.rootEl = tabRoots.manual;
    smartPanel.render(tabRoots.smart);
    manualPanel.render(tabRoots.manual);
    ocrPanel.render(tabRoots.ocr);
    applyCaptureTabVisibility(tabRoots, mode);
  };

  const setMode = (next) => {
    if (next === mode || tabSwitchLock) return;
    tabSwitchLock = true;
    manualPanel?.closeSubPopover?.();
    mountCaptureTabs();

    blurCaptureFocusWithin(bodyEl);
    mode = next;
    modeBar?.querySelectorAll("button").forEach((b) => {
      const on = b.dataset.mode === mode;
      b.toggleClass("active", on);
      b.setAttr("aria-selected", on ? "true" : "false");
      b.setAttr("tabindex", on ? "0" : "-1");
    });
    if (modeHintEl) {
      modeHintEl.setText(
        mobileCapture
          ? `${modeHints[mode] || ""} · 截图 OCR 请在桌面端使用`
          : (modeHints[mode] || "")
      );
    }
    applyCaptureTabVisibility(tabRoots, mode);

    const panel = bodyEl?.closest?.(".plg-overlay-panel");
    updateCaptureSheetMode(panel, mode);
    afterCaptureTabSwitch(bodyEl, panel);
    window.setTimeout(() => { tabSwitchLock = false; }, 120);
  };

  openPlgOverlay({
    title: "记一笔",
    cls: "plg-capture-overlay",
    wide: true,
    build: (body, close) => {
      let releaseDesktopLayout = null;
      const closePanel = () => {
        document.removeEventListener("keydown", onPanelKey, true);
        manualPanel?.teardown?.();
        manualPanel?.closeSubPopover?.();
        ocrPanel?.revokeImageBlobUrl?.();
        releaseDesktopLayout?.();
        close();
      };
      // Esc 关最上层（有二级 popover 时先关它）；⌘↩ / Ctrl+↩ 保存当前这一笔
      const onPanelKey = (e) => {
        if (e.key === "Escape") {
          if (document.querySelector(".plg-sub-popover")) {
            manualPanel?.closeSubPopover?.();
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          e.preventDefault();
          closePanel();
          return;
        }
        if (e.key !== "Enter" || !(e.metaKey || e.ctrlKey)) return;
        if (e.isComposing || e.keyCode === 229) return;
        e.preventDefault();
        e.stopPropagation();
        if (mode === "manual") void manualPanel?.save(false);
        else if (mode === "ocr") void ocrPanel?.confirmSave(false);
        else if (smartPanel?.preview) void smartPanel.confirmSave(false);
        else smartPanel?.runParse();
      };
      document.addEventListener("keydown", onPanelKey, true);
      addClasses(body, "plg-capture-modal");
      const cbs = {
        onSaved: (opts = {}) => {
          plugin.refreshView();
          if (!opts.keepOpen) closePanel();
        },
        onClose: () => closePanel(),
      };
      manualPanel = new ManualCapturePanel(plugin, cbs);
      smartPanel = new SmartCapturePanel(plugin, cbs);
      ocrPanel = new OcrCapturePanel(plugin, {
        ...cbs,
        onSendToSmart: (text) => {
          setMode("smart");
          mountCaptureTabs();
          if (smartPanel.textarea) {
            smartPanel.textarea.value = text || "";
            focusCaptureField(smartPanel.textarea);
            smartPanel.runParse?.();
          }
        },
      });

      modeBar = body.createDiv({ cls: "plg-mode-tabs" });
      modeBar.setAttr("role", "tablist");
      modeBar.setAttr("aria-label", "记账录入方式");
      modes.forEach((m) => {
        const btn = modeBar.createEl("button", {
          text: m.label,
          attr: {
            type: "button",
            id: `plg-capture-tab-${m.id}`,
            title: m.hint,
            role: "tab",
            "aria-selected": mode === m.id ? "true" : "false",
            "aria-controls": `plg-capture-panel-${m.id}`,
            tabindex: mode === m.id ? "0" : "-1",
          },
        });
        if (mode === m.id) btn.addClass("active");
        btn.dataset.mode = m.id;
        btn.onclick = () => setMode(m.id);
      });
      modeBar.addEventListener("keydown", (e) => {
        const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
        if (!keys.includes(e.key)) return;
        e.preventDefault();
        const btns = [...modeBar.querySelectorAll("button[role='tab']")];
        const i = btns.findIndex((b) => b.dataset.mode === mode);
        let next = i;
        if (e.key === "ArrowLeft") next = (i - 1 + btns.length) % btns.length;
        if (e.key === "ArrowRight") next = (i + 1) % btns.length;
        if (e.key === "Home") next = 0;
        if (e.key === "End") next = btns.length - 1;
        setMode(btns[next].dataset.mode);
        btns[next].focus();
      });

      const hintRow = divCls(body, "plg-capture-mode-hint-row");
      modeHintEl = divCls(hintRow, "plg-capture-mode-hint plg-muted");
      modeHintEl.setText(
        mobileCapture
          ? `${modeHints[mode] || ""} · 截图 OCR 请在桌面端使用`
          : (modeHints[mode] || "")
      );
      const clearBtn = elCls(hintRow, "button", "plg-btn-ghost plg-capture-clear-btn", {
        text: "清除",
        attr: { type: "button", title: "清除当前页草稿", "aria-label": "清除当前页草稿" },
      });
      clearBtn.onclick = () => {
        const panel = mode === "ocr" ? ocrPanel : mode === "manual" ? manualPanel : smartPanel;
        panel?.clearDraft?.();
      };

      bodyEl = body.createDiv({ cls: "plg-capture-modal-body" });
      mountCaptureTabs();
      updateCaptureSheetMode(body.closest(".plg-overlay-panel"), mode);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          syncDesktopCaptureLayout(bodyEl);
          releaseDesktopLayout = bindDesktopCaptureLayoutResize(bodyEl);
          resetCaptureScrollAnchors(bodyEl);
          syncMobileCaptureOverlay();
          const panel = body.closest(".plg-overlay-panel");
          if (panel) syncMobileCaptureFooterInset(panel);
          if (mode === "smart") focusCaptureField(smartPanel.textarea);
        });
      });

      if (initialPreview) {
        if (mode === "smart") {
          smartPanel.preview = initialPreview;
          smartPanel.renderPreview(initialPreview);
          if (smartPanel.textarea && initialPreview.raw) {
            smartPanel.textarea.value = initialPreview.raw;
          }
        } else if (mode === "ocr") {
          ocrPanel.preview = initialPreview;
          ocrPanel.renderResult(initialPreview);
        }
        scheduleDesktopCaptureLayoutSync(bodyEl);
      }
    },
  });
}

// ─── iconfont.cn 图标搜索与选择 ───────────────────────────────────────────────

function svgHtmlToDataUrl(svgHtml) {
  const svg = normalizeIconfontSvg(svgHtml);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function isSvgIconUrl(iconUrl) {
  return String(iconUrl || "").startsWith("data:image/svg+xml");
}

function decodeSvgDataUrl(dataUrl) {
  const raw = String(dataUrl || "");
  const utf8Prefix = "data:image/svg+xml;charset=utf-8,";
  try {
    if (raw.startsWith(utf8Prefix)) return decodeURIComponent(raw.slice(utf8Prefix.length));
    if (raw.startsWith("data:image/svg+xml,")) return decodeURIComponent(raw.slice("data:image/svg+xml,".length));
    const base64Match = raw.match(/^data:image\/svg\+xml;base64,(.+)$/i);
    if (base64Match) return atob(base64Match[1]);
  } catch (_) {
    return "";
  }
  return "";
}

function normalizeIconfontSvg(svgHtml) {
  let s = String(svgHtml || "").trim();
  if (!s) return "";
  s = s.replace(/\sclass="[^"]*"/gi, "");
  s = s.replace(/\sstyle="[^"]*"/gi, "");
  s = s.replace(/fill:\s*currentColor/gi, 'fill="#333333"');
  if (!/xmlns=/i.test(s)) {
    s = s.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  let w = 1024;
  let h = 1024;
  const vb = s.match(/viewBox=["']([^"']+)["']/i);
  if (vb) {
    const parts = vb[1].trim().split(/[\s,]+/).map(Number);
    if (parts.length >= 4 && parts[2] > 0 && parts[3] > 0) {
      w = parts[2];
      h = parts[3];
    }
  }
  s = s.replace(/\swidth="[^"]*"/gi, "").replace(/\sheight="[^"]*"/gi, "");
  s = s.replace(/<svg\b/i, `<svg width="${w}" height="${h}"`);
  return s;
}

async function iconfontSvgToIconUrl(svgHtml) {
  const svg = normalizeIconfontSvg(svgHtml);
  if (!svg) return "";
  const png = await rasterizeSvgToPngDataUrl(svg);
  if (png && png.length > 120) return png;
  return svgHtmlToDataUrl(svg);
}

function rasterizeSvgToPngDataUrl(svg) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const maxPx = 128;
      let w = img.naturalWidth || 0;
      let h = img.naturalHeight || 0;
      if (!w || !h) {
        const vb = svg.match(/viewBox=["']([^"']+)["']/i);
        if (vb) {
          const parts = vb[1].trim().split(/[\s,]+/).map(Number);
          if (parts.length >= 4) { w = parts[2] || 1024; h = parts[3] || 1024; }
        }
      }
      if (!w || !h) { w = 1024; h = 1024; }
      const scale = Math.min(1, maxPx / Math.max(w, h, 1));
      const tw = Math.max(1, Math.round(w * scale));
      const th = Math.max(1, Math.round(h * scale));
      const canvas = document.createElement("canvas");
      canvas.width = tw;
      canvas.height = th;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.drawImage(img, 0, 0, tw, th);
      try {
        const dataUrl = canvas.toDataURL("image/png");
        resolve(dataUrl && dataUrl.length > 120 ? dataUrl : "");
      } catch {
        resolve("");
      }
    };
    img.onerror = () => resolve("");
    img.src = svgHtmlToDataUrl(svg);
  });
}

async function searchIconfontIcons(query, page = 1, pageSize = 24) {
  const q = String(query || "").trim();
  if (!q) return { icons: [], total: 0 };
  if (typeof requestUrl !== "function") throw new Error("当前环境不支持网络请求");
  const body = new URLSearchParams({
    q,
    page: String(page),
    pageSize: String(Math.min(pageSize, 54)),
    sortType: "updated_at",
    t: String(Date.now()),
  }).toString();
  const res = await requestUrl({
    url: "https://www.iconfont.cn/api/icon/search.json",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Referer: `https://www.iconfont.cn/search/index?q=${encodeURIComponent(q)}`,
    },
    body,
  });
  const json = res.json;
  if (!json || json.code !== 200) {
    throw new Error(json?.message || "iconfont 搜索失败");
  }
  const icons = (json.data?.icons || []).filter((i) => i.show_svg);
  return { icons, total: json.data?.count || icons.length };
}

function openIconfontPicker(onPick, opts = {}) {
  let page = 1;
  let query = opts.initialQuery || "";
  let loading = false;
  let debounceTimer = null;

  openPlgOverlay({
    title: "从 iconfont 选择图标",
    cls: "plg-iconfont-overlay",
    wide: true,
    stack: true,
    tier: 2,
    build: (body, close) => {
      addClasses(body, "plg-modal", "plg-iconfont-modal");
      body.createDiv({
        cls: "plg-muted plg-iconfont-hint",
        text: "数据来自 iconfont.cn，仅供个人学习使用；选中后自动压缩为统一尺寸",
      });

      const searchRow = body.createDiv({ cls: "plg-iconfont-search" });
      const input = searchRow.createEl("input", {
        type: "search",
        cls: "plg-iconfont-search-input",
        attr: { placeholder: "搜索图标，如：水果、购物车、尿不湿" },
      });
      input.value = query;
      const searchBtn = searchRow.createEl("button", {
        text: "搜索",
        cls: "plg-btn-plain",
        attr: { type: "button" },
      });

      const statusEl = body.createDiv({ cls: "plg-muted plg-iconfont-status", text: "输入关键词后搜索" });
      const grid = body.createDiv({ cls: "plg-iconfont-grid" });
      const foot = body.createDiv({ cls: "plg-iconfont-foot" });
      const prevBtn = foot.createEl("button", { text: "上一页", cls: "plg-btn-plain", attr: { type: "button" } });
      const pageInfo = foot.createSpan({ cls: "plg-iconfont-page", text: "" });
      const nextBtn = foot.createEl("button", { text: "下一页", cls: "plg-btn-plain", attr: { type: "button" } });
      foot.createEl("button", { text: "取消", cls: "plg-btn-plain", attr: { type: "button" } }).onclick = close;

      const renderGrid = (icons) => {
        grid.empty();
        if (!icons.length) {
          grid.createDiv({ cls: "plg-empty", text: "未找到相关图标，换个关键词试试" });
          return;
        }
        icons.forEach((icon) => {
          const cell = grid.createDiv({
            cls: "plg-iconfont-cell",
            attr: { title: String(icon.name || "").trim() || "图标" },
          });
          setSvgContent(cell, normalizeIconfontSvg(icon.show_svg));
          cell.onclick = async () => {
            if (loading) return;
            loading = true;
            statusEl.setText("正在导入图标…");
            try {
              const iconUrl = await iconfontSvgToIconUrl(icon.show_svg);
              onPick?.({
                iconUrl,
                name: String(icon.name || "").trim(),
                iconfontId: icon.id,
              });
              close();
            } catch (e) {
              new Notice(e.message || "导入失败");
              statusEl.setText("导入失败，请重试");
            } finally {
              loading = false;
            }
          };
        });
      };

      const runSearch = async (nextPage = 1) => {
        query = input.value.trim();
        if (!query) {
          statusEl.setText("请输入搜索关键词");
          grid.empty();
          pageInfo.setText("");
          return;
        }
        if (loading) return;
        loading = true;
        page = nextPage;
        statusEl.setText("搜索中…");
        grid.empty();
        grid.createDiv({ cls: "plg-empty", text: "加载中…" });
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        try {
          const { icons, total } = await searchIconfontIcons(query, page, 24);
          renderGrid(icons);
          statusEl.setText(`共 ${total} 个结果`);
          pageInfo.setText(`第 ${page} 页`);
          prevBtn.disabled = page <= 1;
          nextBtn.disabled = icons.length < 24;
        } catch (e) {
          grid.empty();
          grid.createDiv({ cls: "plg-empty", text: "搜索失败，请检查网络后重试" });
          statusEl.setText(e.message || "搜索失败");
          pageInfo.setText("");
        } finally {
          loading = false;
        }
      };

      const scheduleSearch = () => {
        window.clearTimeout(debounceTimer);
        debounceTimer = window.setTimeout(() => runSearch(1), 420);
      };

      input.addEventListener("input", scheduleSearch);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          window.clearTimeout(debounceTimer);
          runSearch(1);
        }
      });
      searchBtn.onclick = () => {
        window.clearTimeout(debounceTimer);
        runSearch(1);
      };
      prevBtn.onclick = () => { if (page > 1) runSearch(page - 1); };
      nextBtn.onclick = () => runSearch(page + 1);

      if (query) runSearch(1);
    },
  });
}

function attachIconfontPickerButton(tools, app, onSelected, draftName = "") {
  const btn = tools.createEl("button", {
    text: "iconfont",
    cls: "plg-btn-plain",
    attr: { type: "button", title: "从 iconfont.cn 搜索选择" },
  });
  btn.onclick = () => {
    openIconfontPicker((picked) => onSelected(picked), {
      initialQuery: draftName || "",
    });
  };
  return btn;
}

// ─── Settings: categories & recurring ────────────────────────────────────────

function fitCompactSettingInput(textComponent) {
  const input = textComponent?.inputEl;
  if (!input) return;
  const sync = () => {
    const text = input.value || input.placeholder || "";
    input.size = Math.min(Math.max(text.length, 3), 40);
  };
  sync();
  input.addEventListener("input", sync);
}

function addSettingsRowActions(parent, handlers = {}) {
  const acts = parent.createDiv({ cls: "plg-cat-row-actions plg-settings-row-actions" });
  acts.createEl("button", { text: "编辑", cls: "plg-btn-plain", attr: { type: "button" } }).onclick = (e) => {
    e.stopPropagation();
    handlers.onEdit?.();
  };
  acts.createEl("button", { text: "删除", cls: "plg-btn-plain", attr: { type: "button" } }).onclick = (e) => {
    e.stopPropagation();
    handlers.onDelete?.();
  };
  return acts;
}

function countCategoryTx(plugin, catName) {
  return plugin.store.data.transactions.filter((t) => t.category === catName).length;
}

function countSubcategoryTx(plugin, catName, subName) {
  return plugin.store.data.transactions.filter((t) => t.category === catName && t.subcategory === subName).length;
}

function buildMigrateTargetPicker(parent, plugin, opts = {}) {
  const wrap = parent.createDiv({ cls: "plg-migrate-picker" });
  const catRow = wrap.createDiv({ cls: "plg-modal-row" });
  catRow.createSpan({ text: "迁移到" });
  const catSel = catRow.createEl("select");
  const subRow = wrap.createDiv({ cls: "plg-modal-row" });
  subRow.createSpan({ text: "二级分类" });
  const subSel = subRow.createEl("select");

  const cats = plugin.store.data.categories.filter((c) => {
    if (opts.excludeCat && c.name === opts.excludeCat) return false;
    if (opts.flow && c.flow !== opts.flow) return false;
    return true;
  });

  const refreshSubs = () => {
    const cat = plugin.store.data.categories.find((c) => c.name === catSel.value);
    const subs = [{ value: "", label: "（无）" }];
    (cat?.subcategories || []).forEach((s) => {
      const name = subcategoryName(s);
      if (opts.excludeSub && catSel.value === (opts.defaultCat || "") && name === opts.excludeSub) return;
      subs.push({ value: name, label: name });
    });
    appendSelectOptions(subSel, subs, opts.defaultSub || "");
  };

  appendSelectOptions(
    catSel,
    cats.map((c) => ({ value: c.name, label: c.name })),
    opts.defaultCat || cats[0]?.name || ""
  );
  catSel.onchange = refreshSubs;
  refreshSubs();

  return {
    getTarget: () => ({ category: catSel.value, subcategory: subSel.value }),
    catSel,
    subSel,
  };
}

function openDeleteCategoryDialog(app, plugin, cat, onDone) {
  const txCount = countCategoryTx(plugin, cat.name);
  openPlgOverlay({
    title: `删除 · ${cat.name}`,
    cls: "plg-cat-edit-modal",
    stack: true,
    build: (body, close) => {
      addClasses(body, "plg-modal");
      let picker = null;
      if (txCount) {
        body.createEl("p", {
          text: `「${cat.name}」下已有 ${txCount} 笔账单，无法直接删除。请先选择迁移目标：`,
        });
        picker = buildMigrateTargetPicker(body, plugin, {
          excludeCat: cat.name,
          flow: cat.flow,
        });
        if (!picker.catSel.options.length) {
          body.createEl("p", { cls: "plg-muted", text: "没有可迁移的其他分类，请先新建分类。" });
        }
      } else {
        body.createEl("p", { text: `确定删除「${cat.name}」吗？` });
      }
      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = close;
      const confirmBtn = btnRow.createEl("button", {
        text: txCount ? "迁移并删除" : "删除",
        cls: "plg-btn-danger mod-cta",
        attr: { type: "button" },
      });
      if (txCount && picker && !picker.catSel.options.length) {
        confirmBtn.disabled = true;
      }
      confirmBtn.onclick = async () => {
        try {
          const migrateTo = txCount && picker ? picker.getTarget() : null;
          await plugin.store.deleteCategory(cat.name, migrateTo);
          new Notice(txCount ? `已迁移 ${txCount} 笔并删除分类` : "已删除分类");
          onDone?.();
          close();
        } catch (err) {
          new Notice(err.message || "删除失败");
        }
      };
    },
  });
}

function openDeleteSubcategoryDialog(app, plugin, catName, subMeta, onDone) {
  const subName = subMeta.name;
  const cat = plugin.store.data.categories.find((c) => c.name === catName);
  const txCount = countSubcategoryTx(plugin, catName, subName);
  openPlgOverlay({
    title: `删除 · ${subName}`,
    cls: "plg-cat-edit-modal",
    stack: true,
    build: (body, close) => {
      addClasses(body, "plg-modal");
      let picker = null;
      if (txCount) {
        body.createEl("p", {
          text: `「${subName}」下已有 ${txCount} 笔账单，无法直接删除。请先选择迁移目标：`,
        });
        picker = buildMigrateTargetPicker(body, plugin, {
          excludeSub: subName,
          defaultCat: catName,
          flow: cat?.flow,
        });
      } else {
        body.createEl("p", { text: `确定删除二级分类「${subName}」吗？` });
      }
      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = close;
      btnRow.createEl("button", {
        text: txCount ? "迁移并删除" : "删除",
        cls: "plg-btn-danger mod-cta",
        attr: { type: "button" },
      }).onclick = async () => {
        try {
          const migrateTo = txCount && picker ? picker.getTarget() : null;
          await plugin.store.deleteSubcategory(catName, subMeta, migrateTo);
          new Notice(txCount ? `已迁移 ${txCount} 笔并删除二级分类` : "已删除二级分类");
          onDone?.();
          close();
        } catch (err) {
          new Notice(err.message || "删除失败");
        }
      };
    },
  });
}

function buildCategoryIdentityEditor(parent, draft, opts = {}) {
  const app = opts.app;
  const card = parent.createDiv({ cls: "plg-cat-identity-card" });
  const top = card.createDiv({ cls: "plg-cat-identity-top" });
  const previewWrap = top.createDiv({ cls: "plg-cat-icon-preview plg-cat-icon-preview-lg" });

  const fields = top.createDiv({ cls: "plg-cat-identity-fields" });
  const nameRow = fields.createDiv({ cls: "plg-cat-identity-name-row" });
  const nameInput = nameRow.createEl("input", { type: "text", attr: { placeholder: "分类名称" } });
  nameInput.value = draft.name || "";
  nameInput.classList.add("plg-cat-name-inline-input");

  let flowSel;
  if (opts.showFlow) {
    flowSel = nameRow.createEl("select", { cls: "plg-cat-identity-flow-select" });
    appendSelectOptions(
      flowSel,
      [
        { value: "expense", label: "支出" },
        { value: "income", label: "收入" },
      ],
      draft.flow || "expense"
    );
  }

  const tools = card.createDiv({ cls: "plg-cat-identity-tools" });
  const emojiInput = tools.createEl("input", {
    type: "text",
    attr: { placeholder: "Emoji", title: "输入 emoji 作为图标" },
  });
  emojiInput.classList.add("plg-cat-emoji-field");
  emojiInput.value = draft.iconUrl ? "" : (draft.icon || categoryInitialIcon(draft.name));

  let emojiManual = !!(draft.iconUrl ? false : (draft.icon && draft.icon !== categoryInitialIcon(draft.name)));

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/png,image/jpeg,image/webp,image/gif,image/svg+xml";
  fileInput.classList.add("plg-file-input-hidden");
  card.appendChild(fileInput);

  const uploadBtn = tools.createEl("button", { text: "上传图标", cls: "plg-btn-plain", attr: { type: "button" } });
  attachIconfontPickerButton(tools, app, (picked) => {
    draft.iconUrl = picked.iconUrl;
    emojiManual = false;
    emojiInput.value = "";
    fileInput.value = "";
    renderPreview();
  }, draft.name || nameInput.value.trim());
  const clearBtn = tools.createEl("button", { text: "清除图片", cls: "plg-btn-plain", attr: { type: "button" } });
  card.createDiv({
    cls: "plg-muted plg-cat-identity-hint",
    text: "默认使用名称首字；可上传图片、从 iconfont 搜索或输入 emoji，三者互斥",
  });

  const renderPreview = () => {
    previewWrap.empty();
    previewWrap.removeClass("no-bg", "has-svg");
    if (draft.iconUrl) {
      if (isSvgIconUrl(draft.iconUrl)) {
        const svg = decodeSvgDataUrl(draft.iconUrl);
        if (svg) {
          previewWrap.addClass("has-svg");
          const slot = previewWrap.createDiv({ cls: "plg-cat-icon-svg" });
          setSvgContent(slot, normalizeIconfontSvg(svg));
          return;
        }
      }
      previewWrap.createEl("img", {
        cls: "plg-cat-icon-img",
        attr: { src: draft.iconUrl, alt: draft.name || "icon" },
      });
    } else {
      previewWrap.addClass("no-bg");
      previewWrap.createDiv({
        cls: "plg-cat-icon",
        text: effectiveCategoryIcon({ name: draft.name, icon: draft.icon, iconUrl: "" }),
      });
    }
  };

  const syncIconFromName = () => {
    draft.name = nameInput.value.trim();
    if (draft.iconUrl || emojiManual) return;
    draft.icon = categoryInitialIcon(draft.name);
    emojiInput.value = draft.icon;
  };

  nameInput.addEventListener("input", () => {
    syncIconFromName();
    renderPreview();
  });

  emojiInput.addEventListener("input", () => {
    emojiManual = true;
    draft.iconUrl = "";
    fileInput.value = "";
    draft.icon = emojiInput.value.trim() || categoryInitialIcon(nameInput.value.trim());
    renderPreview();
  });

  uploadBtn.onclick = () => fileInput.click();
  clearBtn.onclick = () => {
    draft.iconUrl = "";
    fileInput.value = "";
    emojiManual = false;
    draft.icon = categoryInitialIcon(nameInput.value.trim());
    emojiInput.value = draft.icon;
    renderPreview();
  };

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    try {
      draft.iconUrl = await compressIconImageFile(file);
      emojiManual = false;
      emojiInput.value = "";
      renderPreview();
    } catch {
      new Notice("图片处理失败，请换一张试试");
    }
  });

  renderPreview();

  const getIconPayload = () => {
    const name = nameInput.value.trim();
    if (draft.iconUrl) {
      return { icon: draft.icon || categoryInitialIcon(name), iconUrl: draft.iconUrl };
    }
    const icon = emojiInput.value.trim() || categoryInitialIcon(name);
    return { icon, iconUrl: "" };
  };

  return { nameInput, emojiInput, flowSel, getIconPayload, renderPreview };
}

const CYCLE_OPTIONS = [
  { value: "weekly", label: "每周" },
  { value: "monthly", label: "每月" },
  { value: "quarterly", label: "每季" },
  { value: "yearly", label: "每年" },
  { value: "custom", label: "自定义" },
];

function resolveRenewalStoreItem(plugin, api) {
  const id = api.item?.id;
  if (!id) return api.item;
  if (api.kind === "subscription") {
    return (plugin.store.data.subscriptions || []).find((s) => s.id === id) || api.item;
  }
  return (plugin.store.data.recurring || []).find((r) => r.id === id) || api.item;
}

function refreshRenewalApi(plugin, api) {
  const item = resolveRenewalStoreItem(plugin, api);
  return api.kind === "subscription" ? getSubscriptionRenewalApi(item) : getRecurringRenewalApi(item);
}

function billedSubcategoryNames(categoryName, txs) {
  const names = new Set();
  (txs || []).forEach((t) => {
    if (t.flow !== "expense" || t.category !== categoryName) return;
    const sub = (t.subcategory || "").trim();
    if (sub) names.add(sub);
  });
  return names;
}

function collectBillSubcategoryNames(categoryName, categories, txs, extra = []) {
  const names = new Set();
  const cat = (categories || []).find((c) => c.name === categoryName);
  (cat?.subcategories || []).forEach((s) => {
    const n = subcategoryName(s).trim();
    if (n) names.add(n);
  });
  billedSubcategoryNames(categoryName, txs).forEach((n) => names.add(n));
  (extra || []).forEach((n) => {
    const t = String(n || "").trim();
    if (t) names.add(t);
  });
  return [...names].sort((a, b) => a.localeCompare(b, "zh"));
}

function mountBillSubcategoryField(parent, opts) {
  const fieldId = `plg-bill-sub-${uid()}`;
  const input = parent.createEl("input", {
    type: "search",
    cls: "plg-bill-sub-search",
    attr: {
      list: fieldId,
      placeholder: "搜索已有二级，无匹配可输入新建",
      autocomplete: "off",
    },
  });
  const datalist = parent.createEl("datalist", { attr: { id: fieldId } });
  let value = opts.value || "";

  const refresh = () => {
    const names = collectBillSubcategoryNames(
      opts.getCategory(),
      opts.categories,
      opts.txs,
      opts.keep || [],
    );
    datalist.textContent = "";
    names.forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      datalist.appendChild(opt);
    });
    if (value && !input.value) input.value = value;
  };

  input.value = value;
  const emit = () => {
    value = input.value.trim();
    opts.onChange?.(value);
  };
  input.addEventListener("change", emit);
  input.addEventListener("input", emit);
  refresh();

  return {
    refresh,
    getValue: () => input.value.trim(),
    setValue: (v) => {
      value = v || "";
      input.value = value;
    },
  };
}

function bindDateInputQuickFill(input, onChange) {
  input.title = "双击填入今天";
  input.classList.add("plg-date-quick-fill");
  input.addEventListener("dblclick", () => {
    input.value = dateKey(new Date());
    onChange?.();
    input.dispatchEvent(new Event("change"));
  });
}

function mountDateField(parent, opts = {}) {
  const wrap = parent.createDiv({ cls: "plg-date-field-wrap" });
  const input = wrap.createEl("input", { type: "date", cls: "plg-date-field-input" });
  input.value = opts.value ? String(opts.value).slice(0, 10) : "";
  const emit = () => opts.onChange?.(input.value || "");
  bindDateInputQuickFill(input, emit);
  input.addEventListener("change", emit);
  input.addEventListener("input", emit);
  if (opts.optional) {
    wrap.createEl("button", {
      text: "清除",
      cls: "plg-btn-plain plg-date-clear-btn",
      attr: { type: "button" },
    }).onclick = () => {
      input.value = "";
      emit();
    };
  }
  return {
    getValue: () => input.value || "",
    setValue: (v) => { input.value = v ? String(v).slice(0, 10) : ""; },
    setToday: () => { input.value = dateKey(new Date()); emit(); },
    clear: () => { input.value = ""; emit(); },
    input,
  };
}

function mountSubscriptionBatchDateRow(form, label, defaultVal, onChange, rowOpts = {}) {
  const row = form.createDiv({ cls: "plg-bill-form-row plg-date-form-row plg-supplement-date-row" });
  row.createSpan({ cls: "plg-bill-form-label plg-supplement-date-label", text: label });
  const ctrl = row.createDiv({ cls: "plg-bill-form-control" });
  const picker = mountDateField(ctrl, { value: defaultVal, onChange, optional: false });
  const actionBtn = row.createEl("button", {
    text: rowOpts.optional ? "清除" : "今天",
    cls: "plg-btn-plain plg-date-row-action",
    attr: { type: "button" },
  });
  actionBtn.onclick = () => {
    if (rowOpts.optional) picker.clear();
    else picker.setToday();
  };
  return picker;
}

function subscriptionRenewalDayMap(item, txs) {
  const map = new Map();
  txsForSubscriptionRenewalRecords(item, txs).forEach((t) => {
    const d = t.datetime.slice(0, 10);
    if (!map.has(d)) map.set(d, t);
  });
  return map;
}

function splitDatesByExistingDays(dates, existingDays) {
  const toAdd = [];
  let skipped = 0;
  for (const d of dates) {
    if (existingDays.has(d)) skipped++;
    else toAdd.push(d);
  }
  return { toAdd, skipped };
}

function buildSubscriptionRenewalTx(item, dateStr, amount, ledger) {
  return {
    id: uid(),
    datetime: cycleTimeOnDate(dateStr, item),
    flow: "expense",
    category: item.category || DEFAULT_SUBSCRIPTION_LEDGER_CATEGORY,
    subcategory: item.subcategory || item.name || "",
    amount,
    ledger: ledger || "",
    accountOut: "",
    accountIn: "",
    note: item.name || "",
    reimburse: false,
    discount: 0,
    tags: ["订阅"],
    member: "",
    source: "",
    linkedSubscriptionId: item.id,
    linkedRecurringId: "",
  };
}

function patchSubscriptionRenewalTx(tx, item, dateStr, amount) {
  return {
    ...tx,
    amount,
    datetime: cycleTimeOnDate(dateStr, item),
    linkedSubscriptionId: item.id,
    tags: [...new Set([...(tx.tags || []), "订阅"])],
    category: tx.category || item.category || DEFAULT_SUBSCRIPTION_LEDGER_CATEGORY,
    subcategory: tx.subcategory || item.subcategory || item.name || "",
    note: tx.note || item.name || "",
  };
}

async function applySubscriptionBatchSupplement(plugin, item, dates, amount) {
  return applyRenewalBatchSupplement(plugin, getSubscriptionRenewalApi(item), dates, amount);
}

/** 补录 / 修改阶段 — 统一表单（金额、周期、期数、起止日期） */
function buildBillingItemForBatchForm(item, startDate, cycle, cycleIntervalDays) {
  const billingItem = {
    ...item,
    cycle: cycle || item.cycle || "monthly",
    cycleIntervalDays: cycle === "custom" ? (parseInt(cycleIntervalDays, 10) || 0) : 0,
  };
  if (startDate) applyBillingAnchorFromDate(billingItem, startDate);
  return billingItem;
}

function mountSubscriptionBatchForm(form, item, opts = {}) {
  addClasses(form, "plg-supplement-form");
  const mode = opts.mode === "edit" ? "edit" : "add";
  const isNewPhase = opts.intent === "newPhase";
  form.createDiv({
    cls: "plg-muted plg-bill-form-hint plg-bill-form-hint-top",
    text: isNewPhase
      ? "开启新的续费阶段：开始日默认今天；结束日留空则只配置下一笔自动生成，填写结束日可一并补录该区间账单。"
      : (mode === "edit"
        ? "可调整金额、周期或起止日期，下方会预览期数与合计；保存后同步更新该阶段全部账单。"
        : "填写金额、周期与起止日期；系统按周期计算各期扣费日，已有同日账单会自动跳过。"),
  });

  const inferredFromTxs = opts.phaseTxs?.length
    ? resolveBillingItemForPhase(item, opts.phaseTxs)
    : null;
  const initialCycle = opts.defaultCycle || inferredFromTxs?.cycle || item.cycle || "monthly";
  const initialInterval = opts.defaultCycleIntervalDays
    ?? inferredFromTxs?.cycleIntervalDays
    ?? item.cycleIntervalDays
    ?? 0;

  const metaRow = form.createDiv({ cls: "plg-supplement-meta-row" });

  const amountItem = metaRow.createDiv({ cls: "plg-supplement-meta-item" });
  amountItem.createSpan({ cls: "plg-supplement-meta-label", text: "金额" });
  const amountInput = amountItem.createEl("input", {
    type: "number",
    cls: "plg-field-box",
    attr: { step: "0.01" },
  });
  amountInput.value = opts.defaultAmount != null ? String(opts.defaultAmount) : "";

  const cycleItem = metaRow.createDiv({ cls: "plg-supplement-meta-item" });
  cycleItem.createSpan({ cls: "plg-supplement-meta-label", text: "周期" });
  const cycleSelect = cycleItem.createEl("select", { cls: "plg-field-box plg-supplement-cycle-select" });
  fillCycleSelect(cycleSelect, initialCycle);

  const periodsItem = metaRow.createDiv({ cls: "plg-supplement-meta-item" });
  periodsItem.createSpan({ cls: "plg-supplement-meta-label", text: "期数" });
  const periodsVal = periodsItem.createEl("input", {
    type: "number",
    cls: "plg-field-box plg-field-box-readonly",
    attr: { readonly: "true", tabindex: "-1", "aria-readonly": "true", min: "0", step: "1" },
  });
  periodsVal.value = "0";

  const intervalRow = form.createDiv({ cls: "plg-bill-form-row plg-supplement-interval-row" });
  intervalRow.createSpan({ cls: "plg-supplement-interval-label", text: "间隔天数" });
  const intervalInput = intervalRow.createEl("input", {
    type: "number",
    cls: "plg-field-box",
    attr: { min: "1", step: "1", placeholder: "如 30" },
  });
  intervalInput.value = initialInterval ? String(initialInterval) : "";

  function syncIntervalRow() {
    intervalRow.toggleClass("plg-is-hidden", cycleSelect.value !== "custom");
  }

  const dateRows = form.createDiv({ cls: "plg-supplement-date-rows" });
  const startDateField = mountSubscriptionBatchDateRow(dateRows, "开始", opts.defaultStart || "", () => updatePreview());
  const endDateField = mountSubscriptionBatchDateRow(
    dateRows,
    "结束",
    opts.defaultEnd ?? "",
    () => updatePreview(),
    { optional: isNewPhase },
  );
  const summaryHint = form.createDiv({ cls: "plg-muted plg-bill-form-hint plg-bill-form-hint-top plg-supplement-summary" });

  const recordLabel = opts.recordLabel || "续费记录";
  const cycleLabel = opts.cycleLabel || "订阅周期";

  function getBillingItem() {
    const start = startDateField?.getValue?.() || "";
    const cycle = cycleSelect.value;
    const interval = cycle === "custom" ? parseInt(intervalInput.value, 10) || 0 : 0;
    return buildBillingItemForBatchForm(item, start, cycle, interval);
  }

  function updatePreview() {
    const start = startDateField?.getValue?.() || "";
    const end = endDateField?.getValue?.() || "";
    const amount = parseFloat(amountInput?.value) || 0;
    const billingItem = getBillingItem();
    const dates = (start && end) ? computeSubscriptionPeriodDates(billingItem, start, end) : [];
    periodsVal.value = String(dates.length);
    const existingDays = opts.getExistingDays?.() || new Set();
    const { toAdd, skipped } = splitDatesByExistingDays(dates, existingDays);
    const cycleHint = ` · ${formatRecurringLabel(billingItem)}`;
    if (!start) {
      summaryHint.textContent = "请选择开始日期";
    } else if (isNewPhase && !end) {
      periodsVal.value = "0";
      summaryHint.textContent = `预览：不补录历史，从 ${start} 起按此周期自动生成下一笔${cycleHint}`;
    } else if (!end) {
      summaryHint.textContent = "请选择结束日期";
    } else if (start > end) {
      summaryHint.textContent = "结束日期不能早于开始日期";
    } else if (cycleSelect.value === "custom" && !(parseInt(intervalInput.value, 10) > 0)) {
      summaryHint.textContent = "请填写自定义间隔天数";
    } else if (!dates.length) {
      summaryHint.textContent = `该区间内没有符合${cycleLabel}的扣费日${cycleHint}`;
    } else if (mode === "edit") {
      summaryHint.textContent = `预览：${dates.length} 笔 · 合计 ${fmtMoney(dates.length * amount)} · 保存后同步更新${cycleHint}`;
    } else if (skipped && !toAdd.length) {
      summaryHint.textContent = `所选区间 ${dates.length} 个扣费日均已有记录，无需补录${cycleHint}`;
    } else if (skipped) {
      summaryHint.textContent = `预览：将补录 ${toAdd.length} 笔（跳过 ${skipped} 笔已有）· 合计 ${fmtMoney(toAdd.length * amount)} · 写入总账本与${recordLabel}${cycleHint}`;
    } else {
      summaryHint.textContent = `预览：将补录 ${toAdd.length} 笔 · 合计 ${fmtMoney(toAdd.length * amount)} · 写入总账本与${recordLabel}${cycleHint}`;
    }
    opts.onPreview?.({ start, end, amount, dates, toAdd, skipped, billingItem });
  }

  amountInput.oninput = updatePreview;
  cycleSelect.onchange = () => { syncIntervalRow(); updatePreview(); };
  intervalInput.oninput = updatePreview;
  syncIntervalRow();
  updatePreview();

  return {
    amountInput,
    startDateField,
    endDateField,
    periodsVal,
    summaryHint,
    cycleSelect,
    intervalInput,
    getBillingItem,
    updatePreview,
  };
}

async function saveSubscriptionPhaseEdit(plugin, item, phase, start, end, amount) {
  return saveRenewalPhaseEdit(plugin, getSubscriptionRenewalApi(item), phase, start, end, amount);
}

function billFormRow(parent, label, buildControl) {
  const row = parent.createDiv({ cls: "plg-bill-form-row" });
  row.createSpan({ cls: "plg-bill-form-label", text: label });
  const ctrl = row.createDiv({ cls: "plg-bill-form-control" });
  buildControl(ctrl);
  return { row, ctrl };
}

function fillCycleSelect(selectEl, value) {
  selectEl.textContent = "";
  CYCLE_OPTIONS.forEach((o) => {
    const opt = document.createElement("option");
    opt.value = o.value;
    opt.textContent = o.label;
    selectEl.appendChild(opt);
  });
  selectEl.value = value || "monthly";
}

function buildBillIdentityEditor(parent, draft, meta = {}) {
  const kind = meta.kind === "recurring" ? "recurring" : "subscription";
  const app = meta.app;
  const card = parent.createDiv({ cls: "plg-cat-identity-card plg-sub-identity-card" });
  const top = card.createDiv({ cls: "plg-cat-identity-top" });
  const previewWrap = top.createDiv({ cls: "plg-cat-icon-preview plg-cat-icon-preview-lg plg-sub-icon-preview-slot" });
  const fields = top.createDiv({ cls: "plg-cat-identity-fields" });
  if (kind === "recurring" && !meta.hideRuleNameLabel) {
    fields.createDiv({ cls: "plg-recurring-rule-name-label", text: "规则名称" });
  }
  const nameRow = fields.createDiv({ cls: "plg-cat-identity-name-row" });
  const nameInput = nameRow.createEl("input", {
    type: "text",
    attr: {
      placeholder: kind === "recurring" ? "如 父亲健康险、房贷、水电" : "如 哔哩哔哩大会员",
    },
  });
  nameInput.value = kind === "recurring" ? (draft.title || "") : (draft.name || "");
  nameInput.classList.add("plg-cat-name-inline-input");

  const readName = () => nameInput.value.trim();

  const resolveDefaultIcon = (name) => {
    if (kind === "recurring") {
      const catIcon = meta.getCategoryIcon?.()?.icon;
      return catIcon || subscriptionAbbr(name);
    }
    return subscriptionAbbr(name);
  };

  const tools = card.createDiv({ cls: "plg-cat-identity-tools" });
  const emojiInput = tools.createEl("input", {
    type: "text",
    attr: { placeholder: "Emoji", title: "输入 emoji 作为图标" },
  });
  emojiInput.classList.add("plg-cat-emoji-field");
  emojiInput.value = draft.iconUrl ? "" : (draft.icon || resolveDefaultIcon(readName()));

  let emojiManual = !!(draft.iconUrl ? false : (
    draft.icon &&
    draft.icon !== subscriptionAbbr(readName()) &&
    !meta.preset?.abbr &&
    !(kind === "recurring" && meta.getCategoryIcon?.()?.icon === draft.icon)
  ));

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/png,image/jpeg,image/webp,image/gif,image/svg+xml";
  fileInput.classList.add("plg-file-input-hidden");
  card.appendChild(fileInput);

  const uploadBtn = tools.createEl("button", { text: "上传图标", cls: "plg-btn-plain", attr: { type: "button" } });
  attachIconfontPickerButton(tools, app, (picked) => {
    draft.iconUrl = picked.iconUrl;
    draft.domain = "";
    emojiManual = false;
    emojiInput.value = "";
    fileInput.value = "";
    renderPreview();
    if (kind === "recurring") meta.onIdentityIconManualEdit?.();
  }, readName() || (kind === "recurring" ? draft.title : draft.name) || "");
  tools.createEl("button", { text: "清除图片", cls: "plg-btn-plain", attr: { type: "button" } }).onclick = () => {
    draft.iconUrl = "";
    fileInput.value = "";
    emojiManual = false;
    if (kind === "subscription") applyPresetForName(readName());
    else {
      draft.icon = resolveDefaultIcon(readName());
      emojiInput.value = draft.icon;
      renderPreview();
    }
    if (kind === "recurring") meta.onIdentityIconManualEdit?.();
  };
  card.createDiv({
    cls: "plg-muted plg-cat-identity-hint",
    text: meta.identityHint || (kind === "recurring"
      ? "先选上方入账位置，再填规则名称；选中二级可继承图标"
      : "默认使用预设或名称首字；可上传图片、从 iconfont 搜索或输入 emoji"),
  });

  const previewItem = () => {
    const name = readName();
    const catMeta = kind === "recurring" ? (meta.getCategoryIcon?.() || {}) : {};
    if (kind === "subscription") {
      const preset = findSubscriptionPreset(name) || meta.preset;
      if (draft.iconUrl) {
        return { name, icon: draft.icon, iconUrl: draft.iconUrl, domain: "", color: draft.color || preset?.color || "" };
      }
      if (emojiManual) {
        return { name, icon: draft.icon || subscriptionAbbr(name), iconUrl: "", domain: "", color: draft.color || preset?.color || "" };
      }
      return {
        name,
        icon: preset?.abbr || draft.icon || subscriptionAbbr(name),
        iconUrl: "",
        domain: preset?.domain || draft.domain || "",
        color: preset?.color || draft.color || "",
      };
    }
    if (draft.iconUrl) {
      return { name, icon: draft.icon, iconUrl: draft.iconUrl, domain: "", color: draft.color || catMeta.color || "" };
    }
    if (emojiManual) {
      return { name, icon: draft.icon || subscriptionAbbr(name), iconUrl: "", domain: "", color: draft.color || catMeta.color || "" };
    }
    return {
      name,
      icon: draft.icon || catMeta.icon || subscriptionAbbr(name),
      iconUrl: "",
      domain: draft.domain || "",
      color: draft.color || catMeta.color || "",
    };
  };

  const renderPreview = () => {
    previewWrap.empty();
    renderSubscriptionIcon(previewWrap, previewItem(), meta.plugin);
  };

  const applyPresetForName = (name) => {
    if (kind !== "subscription") return;
    const preset = findSubscriptionPreset(name);
    meta.preset = preset;
    if (draft.iconUrl || emojiManual) return;
    if (preset) {
      draft.icon = preset.abbr;
      draft.domain = preset.domain || "";
      draft.color = preset.color || "";
      emojiInput.value = "";
    } else {
      draft.icon = subscriptionAbbr(name);
      draft.domain = "";
      emojiInput.value = draft.icon;
    }
    renderPreview();
  };

  nameInput.addEventListener("input", () => {
    if (kind === "recurring") {
      draft.title = readName();
      if (!draft.iconUrl && !emojiManual) {
        draft.icon = resolveDefaultIcon(draft.title);
        emojiInput.value = draft.icon;
        renderPreview();
      }
      return;
    }
    draft.name = readName();
    applyPresetForName(draft.name);
  });

  emojiInput.addEventListener("input", () => {
    emojiManual = true;
    draft.iconUrl = "";
    draft.domain = "";
    fileInput.value = "";
    draft.icon = emojiInput.value.trim() || subscriptionAbbr(readName());
    renderPreview();
    if (kind === "recurring") meta.onIdentityIconManualEdit?.();
  });

  uploadBtn.onclick = () => fileInput.click();

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    try {
      draft.iconUrl = await compressIconImageFile(file);
      draft.domain = "";
      emojiManual = false;
      emojiInput.value = "";
      renderPreview();
      if (kind === "recurring") meta.onIdentityIconManualEdit?.();
    } catch {
      new Notice("图片处理失败，请换一张试试");
    }
  });

  renderPreview();

  return {
    nameInput,
    titleInput: nameInput,
    renderPreview,
    applyIdentity(payload = {}, opts = {}) {
      if (!opts.keepTitle) {
        const name = String(payload.title ?? payload.name ?? readName()).trim();
        if (name || payload.title !== undefined || payload.name !== undefined) {
          if (kind === "recurring") draft.title = name;
          else draft.name = name;
          if (name) nameInput.value = name;
        }
      }
      const displayName = readName();

      if (payload.iconUrl) {
        draft.iconUrl = payload.iconUrl;
        draft.icon = payload.icon || subscriptionAbbr(displayName);
        draft.domain = payload.domain || "";
        draft.color = payload.color || "";
        emojiManual = false;
        emojiInput.value = "";
        fileInput.value = "";
      } else if (payload.icon !== undefined || opts.fromSubcategory) {
        draft.iconUrl = "";
        fileInput.value = "";
        const icon = payload.icon || (displayName ? resolveDefaultIcon(displayName) : draft.icon);
        draft.icon = icon;
        draft.domain = payload.domain ?? draft.domain ?? "";
        draft.color = payload.color ?? draft.color ?? "";
        if (opts.fromSubcategory) emojiManual = false;
        else emojiManual = !!opts.manualIcon;
        emojiInput.value = icon;
      }
      renderPreview();
    },
    getIconPayload: () => {
      const name = readName();
      const item = previewItem();
      return {
        icon: item.icon,
        iconUrl: item.iconUrl || "",
        domain: item.domain || "",
        color: item.color || "",
        name,
      };
    },
  };
}

function buildSubscriptionIdentityEditor(parent, draft, meta = {}) {
  return buildBillIdentityEditor(parent, draft, { ...meta, kind: "subscription" });
}

function enrichRecurringItem(item, categories, storeData = null) {
  const cat = (categories || []).find((c) => c.name === item.category);
  const subName = String(item.subcategory || item.title || "").trim();
  const subMeta = subName ? findSubcategoryMeta(cat, subName) : null;
  const subNorm = subMeta ? normalizeSubcategory(subMeta) : (subName ? { name: subName, icon: "", iconUrl: "" } : null);
  const catMeta = getCategoryMeta(categories, item.category);
  const title = item.title || "";
  const subs = storeData?.subscriptions;
  const recurring = storeData?.recurring;
  const enrichedSub = subNorm
    ? enrichSubcategoryWithPreset(subNorm, item.category, subs, recurring)
    : null;
  const preset = subName
    ? resolveSubscriptionPreset({ name: subName, subcategory: subName, category: item.category })
    : null;
  if (item.iconUrl) {
    return {
      name: title,
      ...item,
      color: item.color || preset?.color || catMeta.color || "",
    };
  }
  return {
    name: title,
    icon: item.icon || enrichedSub?.icon || subNorm?.icon || catMeta.icon || subscriptionAbbr(title),
    iconUrl: enrichedSub?.iconUrl || subNorm?.iconUrl || "",
    domain: item.domain || enrichedSub?.domain || preset?.domain || "",
    color: item.color || enrichedSub?.color || preset?.color || catMeta.color || "",
  };
}

function openSubcategoryEdit(app, subMeta, onSave, opts = {}) {
  const isNew = !!opts.isNew;
  const draft = isNew
    ? { name: "", icon: "", iconUrl: "", keywords: [] }
    : { ...normalizeSubcategory(subMeta), keywords: [...(normalizeSubcategory(subMeta).keywords || [])] };
  const originalName = draft.name;
  openPlgOverlay({
    title: opts.title || (isNew ? "新增二级分类" : `编辑 · ${draft.name}`),
    cls: "plg-cat-edit-modal",
    stack: true,
    build: (body, close) => {
      const { content, actions } = createMobileModalShell(body);
      const editor = buildCategoryIdentityEditor(content, draft, { app });
      content.createEl("h4", { text: "智能关键词" });
      content.createEl("p", {
        cls: "plg-muted",
        text: "本二级分类专用，空格分隔；智能记账时会优先匹配到本二级",
      });
      const kwInput = content.createEl("textarea", {
        cls: "plg-kw-bulk-input",
        attr: { placeholder: "如 斗地主 麻将", rows: "2" },
      });
      kwInput.value = formatKeywordInput(draft.keywords);
      const btnRow = actions || content.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = close;
      btnRow.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).onclick = async () => {
        const name = editor.nameInput.value.trim();
        if (!name) return new Notice("请填写名称");
        const { icon, iconUrl } = editor.getIconPayload();
        const next = { name, icon, iconUrl, keywords: parseKeywordInput(kwInput.value) };
        try {
          await onSave(next, isNew ? null : originalName);
          close();
        } catch (e) {
          new Notice(e.message || "保存失败");
        }
      };
    },
  });
}

function openCategoryEdit(app, plugin, categoryName, flowDefault, onSaved) {
  const isNew = !categoryName;
  const oldName = categoryName || "";
  const cat = categoryName ? plugin.store.data.categories.find((c) => c.name === categoryName) : null;
  const draft = cat
    ? {
      name: cat.name,
      flow: cat.flow,
      icon: cat.iconUrl ? cat.icon : (cat.icon || categoryInitialIcon(cat.name)),
      iconUrl: cat.iconUrl || "",
      keywords: [...(cat.keywords || [])],
      subcategories: (cat.subcategories || []).map((s) => normalizeSubcategory(s)),
    }
    : { name: "", flow: flowDefault || "expense", icon: "", iconUrl: "", keywords: [], subcategories: [] };

  openPlgOverlay({
    title: isNew ? "新增一级分类" : `编辑 · ${oldName}`,
    cls: "plg-cat-edit-modal",
    wide: true,
    stack: true,
    build: (body, close) => {
      const { content, actions } = createMobileModalShell(body);
      const subRenames = new Map();
      const editor = buildCategoryIdentityEditor(content, draft, { showFlow: true, app });

      const subHead = content.createDiv({ cls: "plg-section-head" });
      subHead.createEl("h4", { text: "二级分类" });
      const subList = content.createDiv({ cls: "plg-sub-edit-list" });

      const renderSubs = () => {
        subList.empty();
        if (!draft.subcategories.length) {
          subList.createDiv({ cls: "plg-muted", text: "暂无二级分类" });
          return;
        }
        draft.subcategories.forEach((sub) => {
          const meta = normalizeSubcategory(sub);
          const line = subList.createDiv({ cls: "plg-sub-edit-row" });
          renderCategoryLabel(line, meta, {
            categoryName: draft.name || oldName,
            subscriptions: plugin.store.data.subscriptions,
          });
          const acts = line.createDiv({ cls: "plg-cat-row-actions" });
          acts.createEl("button", { text: "编辑", cls: "plg-btn-plain", attr: { type: "button" } }).onclick = () => {
            openSubcategoryEdit(app, meta, async (next, oldSubName) => {
              if (draft.subcategories.some((x) => subcategoryName(x) === next.name && subcategoryName(x) !== oldSubName)) {
                throw new Error("名称已存在");
              }
              if (isNew) {
                if (oldSubName) {
                  if (next.name !== oldSubName) subRenames.set(oldSubName, next.name);
                  draft.subcategories = draft.subcategories
                    .map((x) => (subcategoryName(x) === oldSubName ? next : x))
                    .sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
                } else {
                  draft.subcategories.push(normalizeSubcategory(next));
                  draft.subcategories.sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
                }
              } else if (oldSubName) {
                if (next.name !== oldSubName) subRenames.set(oldSubName, next.name);
                await plugin.store.updateSubcategory(oldName, oldSubName, next);
                const freshCat = plugin.store.data.categories.find((c) => c.name === oldName);
                if (freshCat) {
                  draft.subcategories = (freshCat.subcategories || []).map((s) => normalizeSubcategory(s));
                }
                plugin.refreshView?.();
              } else {
                await plugin.store.addSubcategory(oldName, next);
                const freshCat = plugin.store.data.categories.find((c) => c.name === oldName);
                if (freshCat) {
                  draft.subcategories = (freshCat.subcategories || []).map((s) => normalizeSubcategory(s));
                }
                plugin.refreshView?.();
              }
              renderSubs();
            });
          };
          acts.createEl("button", { text: "删除", cls: "plg-btn-plain", attr: { type: "button" } }).onclick = () => {
            draft.subcategories = draft.subcategories.filter((x) => subcategoryName(x) !== meta.name);
            renderSubs();
          };
        });
      };

      subHead.createEl("button", {
        text: "新增",
        cls: "plg-btn-plain",
        attr: { type: "button" },
      }).onclick = () => {
        openSubcategoryEdit(app, { name: "", icon: "", iconUrl: "", keywords: [] }, async (next) => {
          if (draft.subcategories.some((x) => subcategoryName(x) === next.name)) {
            throw new Error("名称已存在");
          }
          draft.subcategories.push(normalizeSubcategory(next));
          draft.subcategories.sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
          renderSubs();
        }, { isNew: true });
      };
      renderSubs();

      const kwBlock = content.createDiv({ cls: "plg-cat-kw-block" });
      kwBlock.createDiv({ cls: "plg-muted plg-cat-kw-label", text: "一级分类关键词" });
      const kwInput = kwBlock.createEl("input", {
        type: "text",
        cls: "plg-cat-kw-input",
        attr: { placeholder: "逗号分隔，如：外卖, 美团" },
      });
      kwInput.value = formatKeywordInput(draft.keywords || []);

      const btnRow = actions || content.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = close;
      btnRow.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).onclick = async () => {
        try {
          const { icon, iconUrl } = editor.getIconPayload();
          const payload = {
            name: editor.nameInput.value.trim(),
            flow: editor.flowSel?.value || draft.flow || "expense",
            icon,
            iconUrl,
            keywords: parseKeywordInput(kwInput.value),
            subcategories: draft.subcategories,
          };
          if (!payload.name) return new Notice("请填写分类名称");
          if (!isNew) {
            subRenames.forEach((nextSub, oldSub) => {
              plugin.store.migrateSubcategoryMeta(oldName, oldSub, {
                category: payload.name,
                subcategory: nextSub,
              });
              plugin.store.data.transactions.forEach((t) => {
                const catMatch = t.category === oldName || t.category === payload.name;
                if (catMatch && t.subcategory === oldSub) {
                  if (t.category === oldName && payload.name !== oldName) t.category = payload.name;
                  t.subcategory = nextSub;
                }
              });
            });
          }
          if (isNew) await plugin.store.addCategory(payload);
          else await plugin.store.updateCategory(oldName, payload);
          new Notice("分类已保存");
          plugin.refreshView?.();
          onSaved?.();
          close();
        } catch (e) {
          new Notice(e.message || "保存失败");
        }
      };
    },
  });
}

class CategoryEditModal {
  constructor(app, plugin, categoryName, flowDefault, onSaved) {
    this.app = app;
    this.plugin = plugin;
    this.categoryName = categoryName;
    this.flowDefault = flowDefault;
    this.onSaved = onSaved;
  }
  open() {
    openCategoryEdit(this.app, this.plugin, this.categoryName, this.flowDefault, this.onSaved);
  }
}

class RecurringBillModal {
  constructor(app, plugin, item, onSaved) {
    this.app = app;
    this.plugin = plugin;
    this.item = item;
    this.onSaved = onSaved;
  }
  open() {
    openRecurringBill(this.app, this.plugin, this.item, this.onSaved);
  }
}

function enrichBillSubcategoryMeta(categories, categoryName, subName, subscriptions, recurring) {
  const cat = (categories || []).find((c) => c.name === categoryName);
  const sn = String(subName || "").trim();
  if (!cat || !sn) return null;
  const subMeta = findSubcategoryMeta(cat, sn);
  if (!subMeta) return null;
  return enrichSubcategoryWithPreset(normalizeSubcategory(subMeta), categoryName, subscriptions, recurring);
}

function openRecurringBill(app, plugin, item, onSaved, opts = {}) {
  const cats = plugin.store.data.categories || [];
  const defaultCat = cats.find((c) => c.flow !== "income")?.name || "";
  const isNew = !item;
  const newPhaseMode = !!opts.newPhase;
  const bill = item ? { ...item } : {
    id: uid(),
    title: "",
    icon: "",
    iconUrl: "",
    domain: "",
    color: "",
    amount: 0,
    category: "",
    subcategory: "",
    flow: "expense",
    cycle: "monthly",
    cycleDay: 1,
    cycleMonth: new Date().getMonth() + 1,
    cycleWeekday: new Date().getDay(),
    cycleIntervalDays: 0,
    cycleTime: "12:00",
    billingAnchor: "",
    startDate: "",
    nextDate: "",
    active: true,
    generatedCount: 0,
    note: "",
    pausedAt: "",
    phases: [],
  };
  if (!isNew) normalizeSingleRecurringPhases(bill);
  const activePhase = getActiveRecurringPhase(bill);
  if (newPhaseMode && !isNew) {
    const today = dateKey(new Date());
    bill.startDate = today;
    bill.pausedAt = "";
    bill.active = true;
    if (activePhase) {
      bill.amount = activePhase.amount;
      bill.cycle = activePhase.cycle || "monthly";
      bill.cycleIntervalDays = activePhase.cycleIntervalDays || 0;
    }
    applyBillingAnchorFromDate(bill, today);
  }
  if (bill.active === undefined) bill.active = true;
  if (!bill.category) bill.category = defaultCat;
  if (!bill.cycleTime) bill.cycleTime = "12:00";
  if (isNew && !bill.startDate) {
    bill.startDate = dateKey(new Date());
    applyBillingAnchorFromDate(bill, bill.startDate);
  }

  const iconDraft = {
    title: bill.title || "",
    icon: bill.icon || "",
    iconUrl: bill.iconUrl || "",
    domain: bill.domain || "",
    color: bill.color || "",
  };
  Object.assign(iconDraft, seedBillIconFromSubcategory({
    category: bill.category,
    subcategory: bill.subcategory || bill.title,
    title: bill.title,
    icon: iconDraft.icon,
    iconUrl: iconDraft.iconUrl,
  }, plugin.store.data.categories));

  const state = {
    flow: bill.flow || "expense",
    category: bill.category || defaultCat,
    subcategory: bill.subcategory || "",
    cycle: bill.cycle || "monthly",
    active: bill.active !== false,
  };

  const modalTitle = isNew ? "新增周期" : (newPhaseMode ? `开启新阶段 · ${bill.title}` : `编辑 · ${bill.title}`);

  openPlgOverlay({
    title: modalTitle,
    cls: "plg-recurring-overlay plg-subscription-overlay",
    wide: true,
    stack: true,
    tier: 2,
    build: (body, close) => {
      addClasses(body, "plg-modal", "plg-recurring-form");
      const form = body.createDiv({ cls: "plg-recurring-form-inner plg-recurring-edit-form" });

      let identityEditor;
      let amountInput;
      let flowSelect;
      let catSelect;
      let subField;
      let cycleSelect;
      let intervalInput;
      let intervalRow;
      let hintEl;
      let startDateField;
      let noteInput;
      let identityIconManual = !!bill.iconUrl;
      const storeData = () => plugin.store.data;

      const syncSubcategoryIconToIdentity = () => {
        const subName = (subField?.getValue() || state.subcategory || "").trim();
        state.subcategory = subName;
        const enriched = enrichBillSubcategoryMeta(
          storeData().categories,
          state.category,
          subName,
          storeData().subscriptions,
          storeData().recurring,
        );
        if (!enriched) return false;
        state.subcategory = subcategoryName(enriched);
        if (identityIconManual || !identityEditor) return true;
        identityEditor.applyIdentity({
          icon: enriched.icon,
          iconUrl: enriched.iconUrl || "",
          domain: enriched.domain || "",
          color: enriched.color || "",
        }, { fromSubcategory: true, keepTitle: true });
        return true;
      };

      form.createDiv({ cls: "plg-recurring-section-label", text: "入账位置" });
      const catRow = form.createDiv({ cls: "plg-recurring-cat-row plg-recurring-cat-row-top" });
      const cat1Item = catRow.createDiv({ cls: "plg-recurring-cat-item" });
      cat1Item.createSpan({ cls: "plg-recurring-cat-label", text: "入账一级" });
      catSelect = cat1Item.createEl("select", { cls: "plg-field-box plg-recurring-cat-select" });

      const cat2Item = catRow.createDiv({ cls: "plg-recurring-cat-item plg-recurring-cat-item-sub" });
      cat2Item.createSpan({ cls: "plg-recurring-cat-label", text: "入账二级" });
      const subCtrl = cat2Item.createDiv({ cls: "plg-recurring-cat-sub-wrap" });
      subField = mountBillSubcategoryField(subCtrl, {
        value: state.subcategory || bill.subcategory || "",
        categories: plugin.store.data.categories,
        txs: plugin.store.data.transactions || [],
        keep: [bill.subcategory, bill.title, state.subcategory],
        getCategory: () => state.category,
        onChange: (v) => {
          state.subcategory = v;
          syncSubcategoryIconToIdentity();
        },
      });

      form.createDiv({ cls: "plg-recurring-section-label", text: "规则名称" });
      identityEditor = buildBillIdentityEditor(form, iconDraft, {
        kind: "recurring",
        app,
        plugin,
        hideRuleNameLabel: true,
        getCategoryIcon: () => getCategoryMeta(plugin.store.data.categories, state.category),
        onIdentityIconManualEdit: () => { identityIconManual = true; },
      });

      const metaRow = form.createDiv({ cls: "plg-recurring-meta-row" });

      const flowItem = metaRow.createDiv({ cls: "plg-recurring-meta-item" });
      flowItem.createSpan({ cls: "plg-recurring-meta-label", text: "类型" });
      flowSelect = flowItem.createEl("select", { cls: "plg-field-box plg-recurring-meta-flow" });
      appendSelectOptions(flowSelect, [
        { value: "expense", label: "支出" },
        { value: "income", label: "收入" },
      ], state.flow);

      const amountItem = metaRow.createDiv({ cls: "plg-recurring-meta-item" });
      amountItem.createSpan({ cls: "plg-recurring-meta-label", text: "金额" });
      amountInput = amountItem.createEl("input", {
        type: "number",
        cls: "plg-field-box",
        attr: { step: "0.01", placeholder: "0.00" },
      });
      amountInput.value = bill.amount ? String(bill.amount) : "";

      const cycleItem = metaRow.createDiv({ cls: "plg-recurring-meta-item" });
      cycleItem.createSpan({ cls: "plg-recurring-meta-label", text: "周期" });
      cycleSelect = cycleItem.createEl("select", { cls: "plg-field-box plg-recurring-meta-cycle" });
      fillCycleSelect(cycleSelect, state.cycle);
      cycleSelect.onchange = () => {
        state.cycle = cycleSelect.value;
        if (intervalRow) intervalRow.row.toggleClass("plg-is-hidden", state.cycle !== "custom");
        if (hintEl) hintEl.textContent = cycleHintText(state.cycle);
      };

      billFormRow(form, "备注", (ctrl) => {
        noteInput = ctrl.createEl("input", {
          type: "text",
          attr: { placeholder: "匹配历史账单，默认可与规则名称相同" },
        });
        noteInput.value = bill.note || "";
      });

      intervalRow = billFormRow(form, "间隔天数", (ctrl) => {
        intervalInput = ctrl.createEl("input", {
          type: "number",
          attr: { min: "1", step: "1", placeholder: "如 30" },
        });
        intervalInput.value = bill.cycleIntervalDays ? String(bill.cycleIntervalDays) : "";
      });
      intervalRow.row.toggleClass("plg-is-hidden", state.cycle !== "custom");

      const statusRow = form.createDiv({ cls: "plg-bill-form-row plg-recurring-status-row" });
      statusRow.createSpan({ cls: "plg-bill-form-label", text: "状态" });
      const statusCtrl = statusRow.createDiv({ cls: "plg-bill-form-control plg-recurring-status-control" });
      const switchLabel = statusCtrl.createEl("label", {
        cls: "plg-slide-switch",
        attr: { "aria-label": "自动生成状态" },
      });
      const toggle = switchLabel.createEl("input", { type: "checkbox" });
      toggle.checked = state.active;
      switchLabel.createSpan({ cls: "plg-slide-track" });
      const statusHint = statusCtrl.createSpan({ cls: "plg-muted plg-recurring-status-hint" });

      function updateStatus() {
        statusHint.textContent = state.active
          ? "生效中 · 将按周期自动生成账单"
          : "已暂停 · 不自动生成，历史记账记录保留";
        statusHint.classList.toggle("paused", !state.active);
      }
      toggle.onchange = () => {
        state.active = toggle.checked;
        updateStatus();
      };

      billFormRow(form, "开始时间", (ctrl) => {
        startDateField = mountDateField(ctrl, {
          value: billingDateValue(bill),
          onChange: (v) => { if (v) applyBillingAnchorFromDate(bill, v); },
        });
      });

      hintEl = form.createDiv({
        cls: "plg-muted plg-bill-form-hint",
        text: "同一二级下可有多条规则（如父亲/母亲健康险）；入账走二级，名称区分各条。续费变更请用「开启新阶段」。",
      });

      updateStatus();

      const refreshCats = () => {
        const list = plugin.store.data.categories.filter((c) =>
          state.flow === "income" ? c.flow === "income" : c.flow !== "income",
        );
        const preferred = bill.category || defaultCat;
        const selected = list.some((c) => c.name === state.category)
          ? state.category
          : (list.some((c) => c.name === preferred) ? preferred : list[0]?.name || "");
        state.category = selected;
        catSelect.textContent = "";
        list.forEach((c) => {
          const opt = document.createElement("option");
          opt.value = c.name;
          opt.textContent = `${c.icon} ${c.name}`;
          catSelect.appendChild(opt);
        });
        catSelect.value = selected;
        subField?.refresh();
        syncSubcategoryIconToIdentity();
      };

      catSelect.onchange = () => {
        state.category = catSelect.value;
        subField?.refresh();
        syncSubcategoryIconToIdentity();
      };

      flowSelect.onchange = () => {
        state.flow = flowSelect.value;
        refreshCats();
      };

      refreshCats();

      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = close;
      btnRow.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).onclick = async () => {
        const title = identityEditor.titleInput.value.trim();
        const amount = parseFloat(amountInput.value);
        if (!title) return new Notice("请填写名称");
        if (!amount) return new Notice("请填写金额");
        if (!state.category) return new Notice("请选择入账一级");
        const subName = (subField?.getValue() || state.subcategory || title).trim();
        if (!subName) return new Notice("请填写入账二级");
        const startDate = startDateField.getValue();
        if (!startDate) return new Notice("请选择开始时间");
        if (state.cycle === "custom" && !(parseInt(intervalInput.value, 10) > 0)) {
          return new Notice("请填写自定义间隔天数");
        }
        applyBillingAnchorFromDate(bill, startDate);
        const { icon, iconUrl, domain, color } = identityEditor.getIconPayload();
        const formData = {
          amount,
          cycle: cycleSelect.value,
          cycleDay: bill.cycleDay,
          cycleMonth: bill.cycleMonth,
          cycleWeekday: bill.cycleWeekday,
          cycleIntervalDays: cycleSelect.value === "custom" ? parseInt(intervalInput.value, 10) || 0 : 0,
          startDate,
        };
        Object.assign(bill, {
          title,
          icon,
          iconUrl,
          domain,
          color,
          amount,
          category: state.category,
          subcategory: subName,
          flow: state.flow,
          note: noteInput?.value?.trim() || title,
          cycle: formData.cycle,
          cycleIntervalDays: formData.cycleIntervalDays,
          active: state.active,
          startDate,
        });
        if (isNew) {
          bill.phases = [{
            id: uid(),
            ...formData,
            endDate: state.active ? "" : dateKey(new Date()),
          }];
          syncRecurringFromPhase(bill, bill.phases[0]);
        } else if (newPhaseMode || recurringPhaseFormChanged(activePhase, formData)) {
          startRecurringPhase(bill, formData);
          if (!state.active) closeRecurringPhase(bill, dateKey(new Date()));
        } else {
          const phase = getActiveRecurringPhase(bill);
          if (phase) {
            Object.assign(phase, formData);
            if (!state.active && !phase.endDate) phase.endDate = dateKey(new Date());
            syncRecurringFromPhase(bill, phase);
          }
          bill.active = state.active;
        }
        bill.nextDate = computeInitialNextDate(bill, new Date());
        const backfilled = await plugin.store.saveRecurring(bill);
        new Notice(
          newPhaseMode
            ? "已开启新阶段"
            : (isNew && backfilled > 0
              ? `已保存，并补录 ${backfilled} 期账单`
              : (isNew ? "已保存周期规则" : "已保存")),
        );
        onSaved?.();
        close();
      };
    },
  });
}

function openSubscriptionBill(app, plugin, item, preset, onSaved, opts = {}) {
  const defaultCat = "软件续费";
  const isNewSub = !item;
  const newPhaseMode = !!opts.newPhase;
  const sub = item ? { ...item } : {
    id: uid(),
    name: preset?.name || "",
    icon: preset?.abbr || "",
    iconUrl: "",
    domain: preset?.domain || "",
    color: preset?.color || "",
    amount: 0,
    category: preset?.category || defaultCat,
    subcategory: preset?.subcategory || preset?.name || "",
    cycle: "monthly",
    cycleDay: 1,
    cycleMonth: new Date().getMonth() + 1,
    cycleWeekday: new Date().getDay(),
    cycleIntervalDays: 0,
    cycleTime: "12:00",
    billingAnchor: "",
    startDate: "",
    pausedAt: "",
    nextDate: "",
    source: "manual",
    active: true,
    generatedCount: 0,
    phases: [],
  };
  if (!isNewSub) normalizeSingleSubscriptionPhases(sub);
  const activePhase = getActiveSubscriptionPhase(sub);
  if (newPhaseMode && !isNewSub) {
    const today = dateKey(new Date());
    sub.startDate = today;
    sub.pausedAt = "";
    if (activePhase) {
      sub.amount = activePhase.amount;
      sub.cycle = activePhase.cycle || "monthly";
      sub.cycleIntervalDays = activePhase.cycleIntervalDays || 0;
    }
    applySubscriptionStartDate(sub, today);
  }
  if (preset && !item) {
    sub.domain = preset.domain || sub.domain;
    sub.color = preset.color || sub.color;
  }
  if (isNewSub) {
    sub.source = "manual";
    if (sub.active === undefined) sub.active = true;
    if (!sub.startDate) sub.startDate = dateKey(new Date());
    applySubscriptionStartDate(sub, sub.startDate);
  } else if (sub.active === undefined) {
    sub.active = isSubscriptionRenewing(sub);
  }
  if (!sub.cycleTime) sub.cycleTime = "12:00";

  const presetMatch = preset || findSubscriptionPreset(sub.name);
  const iconDraft = {
    name: sub.name || "",
    icon: sub.icon || presetMatch?.abbr || "",
    iconUrl: sub.iconUrl || "",
    domain: sub.iconUrl ? "" : (sub.domain || presetMatch?.domain || ""),
    color: sub.color || presetMatch?.color || "",
  };
  Object.assign(iconDraft, seedBillIconFromSubcategory({
    category: sub.category,
    subcategory: sub.subcategory || sub.name,
    name: sub.name,
    title: sub.name,
    icon: iconDraft.icon,
    iconUrl: iconDraft.iconUrl,
  }, plugin.store.data.categories));
  if (iconDraft.iconUrl) iconDraft.icon = iconDraft.icon || subscriptionAbbr(sub.name);
  const state = {
    category: sub.category || defaultCat,
    subcategory: sub.subcategory || "",
    cycle: sub.cycle || "monthly",
  };
  const modalTitle = isNewSub
    ? "新增订阅"
    : (newPhaseMode ? `新阶段 · ${sub.name}` : `编辑 · ${sub.name}`);

  openPlgOverlay({
    title: modalTitle,
    cls: "plg-recurring-overlay plg-subscription-overlay",
    wide: true,
    stack: true,
    tier: 2,
    build: (body, close) => {
      addClasses(body, "plg-modal", "plg-recurring-form");
      const form = body.createDiv({ cls: "plg-recurring-form-inner" });

      let identityEditor;
      let amountInput;
      let catSelect;
      let subField;
      let cycleSelect;
      let intervalInput;
      let intervalRow;
      let hintEl;

      identityEditor = buildSubscriptionIdentityEditor(form, iconDraft, { preset: presetMatch, app, plugin });

      billFormRow(form, "金额", (ctrl) => {
        amountInput = ctrl.createEl("input", { type: "number", attr: { step: "0.01", placeholder: "0.00" } });
        amountInput.value = sub.amount ? String(sub.amount) : "";
      });

      billFormRow(form, "入账分类", (ctrl) => {
        catSelect = ctrl.createEl("select");
      });

      billFormRow(form, "入账二级", (ctrl) => {
        subField = mountBillSubcategoryField(ctrl, {
          value: state.subcategory || sub.subcategory || "",
          categories: plugin.store.data.categories,
          txs: plugin.store.data.transactions || [],
          keep: [sub.subcategory, sub.name, state.subcategory],
          getCategory: () => state.category,
          onChange: (v) => { state.subcategory = v; },
        });
      });

      const cycleRow = billFormRow(form, "周期", (ctrl) => {
        cycleSelect = ctrl.createEl("select");
        fillCycleSelect(cycleSelect, state.cycle);
        cycleSelect.onchange = () => {
          state.cycle = cycleSelect.value;
          if (intervalRow) intervalRow.row.toggleClass("plg-is-hidden", state.cycle !== "custom");
          if (hintEl) hintEl.textContent = cycleHintText(state.cycle);
        };
      });

      intervalRow = billFormRow(form, "间隔天数", (ctrl) => {
        intervalInput = ctrl.createEl("input", {
          type: "number",
          attr: { min: "1", step: "1", placeholder: "如 30" },
        });
        intervalInput.value = sub.cycleIntervalDays ? String(sub.cycleIntervalDays) : "";
      });
      intervalRow.row.toggleClass("plg-is-hidden", state.cycle !== "custom");

      const statusRow = form.createDiv({ cls: "plg-bill-form-row" });
      statusRow.createSpan({ cls: "plg-bill-form-label", text: "状态" });
      const statusEl = statusRow.createDiv({ cls: "plg-bill-form-control plg-sub-status-text" });

      let startDateField;
      let pausedDateField;

      function updateStatus() {
        const paused = pausedDateField?.getValue() || "";
        statusEl.textContent = paused
          ? `已暂停（${paused} 起不再自动续费）`
          : "续费中 · 将按当前阶段自动生成账单";
        statusEl.classList.toggle("paused", !!paused);
      }

      billFormRow(form, "开始时间", (ctrl) => {
        startDateField = mountDateField(ctrl, {
          value: subscriptionDateValue(sub, "startDate") || billingDateValue(sub),
          onChange: (v) => { if (v) applySubscriptionStartDate(sub, v); },
        });
      });

      billFormRow(form, "暂停时间", (ctrl) => {
        pausedDateField = mountDateField(ctrl, {
          value: subscriptionDateValue(sub, "pausedAt"),
          optional: true,
          onChange: () => updateStatus(),
        });
      });

      hintEl = form.createDiv({
        cls: "plg-muted plg-bill-form-hint",
        text: "入账分类决定账单在总账本中的位置（默认软件续费，可改）。开始时间决定扣费日；暂停时间留空表示续费中。金额/周期变更将自动保存为新阶段。",
      });

      updateStatus();

      const refreshCats = () => {
        const list = plugin.store.data.categories.filter((c) => c.flow !== "income");
        const preferred = sub.category || defaultCat;
        const selected = list.some((c) => c.name === state.category)
          ? state.category
          : (list.some((c) => c.name === preferred) ? preferred : list[0]?.name || "");
        state.category = selected;
        catSelect.textContent = "";
        list.forEach((c) => {
          const opt = document.createElement("option");
          opt.value = c.name;
          opt.textContent = `${c.icon} ${c.name}`;
          catSelect.appendChild(opt);
        });
        catSelect.value = selected;
        subField?.refresh();
      };

      catSelect.onchange = () => {
        state.category = catSelect.value;
        subField?.refresh();
      };

      refreshCats();

      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = close;
      btnRow.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).onclick = async () => {
        const name = identityEditor.nameInput.value.trim();
        const amount = parseFloat(amountInput.value);
        if (!name) return new Notice("请填写名称");
        if (!amount) return new Notice("请填写金额");
        const startDate = startDateField.getValue();
        if (!startDate) return new Notice("请选择开始时间");
        const pausedAt = pausedDateField.getValue() || "";
        if (state.cycle === "custom" && !(parseInt(intervalInput.value, 10) > 0)) {
          return new Notice("请填写自定义间隔天数");
        }
        const { icon, iconUrl, domain, color } = identityEditor.getIconPayload();
        applySubscriptionStartDate(sub, startDate);
        const formData = {
          amount,
          cycle: cycleSelect.value,
          cycleDay: sub.cycleDay,
          cycleMonth: sub.cycleMonth,
          cycleWeekday: sub.cycleWeekday,
          cycleIntervalDays: cycleSelect.value === "custom" ? parseInt(intervalInput.value, 10) || 0 : 0,
          startDate,
        };
        Object.assign(sub, {
          name,
          icon,
          iconUrl,
          domain,
          color,
          category: state.category,
          subcategory: subField?.getValue() || state.subcategory || name,
          cycle: formData.cycle,
          cycleIntervalDays: formData.cycleIntervalDays,
        });

        if (isNewSub) {
          sub.phases = [{
            id: uid(),
            ...formData,
            endDate: pausedAt,
          }];
          syncSubscriptionFromPhase(sub, sub.phases[0]);
          sub.source = "manual";
          if (!pausedAt) sub.userActivated = true;
        } else if (newPhaseMode || subscriptionPhaseFormChanged(activePhase, formData)) {
          startSubscriptionPhase(sub, formData);
          if (pausedAt) closeSubscriptionPhase(sub, pausedAt);
          sub.userActivated = true;
        } else {
          const phase = getActiveSubscriptionPhase(sub);
          if (phase) {
            Object.assign(phase, formData);
            phase.endDate = pausedAt;
            syncSubscriptionFromPhase(sub, phase);
          }
          if (!pausedAt) sub.userActivated = true;
        }

        sub.nextDate = computeInitialNextDate(sub, new Date());
        await plugin.store.saveSubscription(sub);
        new Notice(newPhaseMode ? "已保存新阶段" : "已保存订阅");
        onSaved?.();
        close();
      };
    },
  });
}

function renderSettingsCategories(container, plugin) {
  const toolbar = container.createDiv({ cls: "plg-cat-toolbar" });
  const flowToggle = toolbar.createDiv({
    cls: "plg-segments plg-seg-capsule plg-seg-capsule-accent plg-cat-flow-toggle",
  });
  let showFlow = "expense";
  const expBtn = flowToggle.createEl("button", { text: "支出", cls: "active" });
  const incBtn = flowToggle.createEl("button", { text: "收入" });
  toolbar.createEl("button", { text: "+ 新增一级", cls: "plg-btn-primary" }).onclick = () => {
    new CategoryEditModal(plugin.app, plugin, null, showFlow === "income" ? "income" : "expense", () => renderList()).open();
  };

  const listEl = container.createDiv({ cls: "plg-settings-cat-list" });
  const expanded = new Set();

  const renderList = () => {
    listEl.empty();
    plugin.store.data.categories
      .filter((c) => (showFlow === "income" ? c.flow === "income" : c.flow !== "income"))
      .forEach((cat) => {
        const block = listEl.createDiv({ cls: "plg-cat-block" + (expanded.has(cat.name) ? " open" : "") });
        const head = block.createDiv({ cls: "plg-settings-cat-row" });
        renderCategoryLabel(head, cat, {
          multiline: true,
          subtitle: (() => {
            const subN = (cat.subcategories || []).length;
            const kw2 = (cat.subcategories || []).reduce(
              (n, s) => n + (normalizeSubcategory(s).keywords?.length || 0),
              0
            );
            return `${subN} 个二级${kw2 ? ` · ${kw2} 个关键词` : ""}`;
          })(),
        });
        head.createEl("button", {
          text: "新增",
          cls: "plg-btn-plain plg-add-sub-btn",
          attr: { type: "button" },
        }).onclick = (e) => {
          e.stopPropagation();
          openSubcategoryEdit(plugin.app, { name: "", icon: "", iconUrl: "", keywords: [] }, async (next) => {
            if ((cat.subcategories || []).some((s) => subcategoryName(s) === next.name)) {
              throw new Error("名称已存在");
            }
            await plugin.store.addSubcategory(cat.name, next);
            expanded.add(cat.name);
            plugin.refreshView();
            renderList();
          }, { isNew: true });
        };
        addSettingsRowActions(head, {
          onEdit: () => new CategoryEditModal(plugin.app, plugin, cat.name, cat.flow, () => renderList()).open(),
          onDelete: () => {
            openDeleteCategoryDialog(plugin.app, plugin, cat, () => {
              expanded.delete(cat.name);
              renderList();
            });
          },
        });

        const toggleExpand = () => {
          if (expanded.has(cat.name)) expanded.delete(cat.name);
          else expanded.add(cat.name);
          renderList();
        };
        head.onclick = (e) => {
          if (e.target.closest(".plg-settings-row-actions, .plg-cat-row-actions, .plg-add-sub-btn")) return;
          toggleExpand();
        };

        if (expanded.has(cat.name)) {
          const body = block.createDiv({ cls: "plg-cat-block-body" });
          const subs = cat.subcategories || [];
          if (subs.length) {
            body.createDiv({ cls: "plg-muted plg-settings-sub-head", text: "二级分类" });
          } else {
            body.createDiv({ cls: "plg-muted plg-settings-sub-head", text: "暂无二级分类，可点「新增」添加" });
          }
          subs.forEach((sub) => {
            const meta = normalizeSubcategory(sub);
            const subRow = body.createDiv({ cls: "plg-settings-sub-row plg-settings-sub-row-clickable" });
            const kwN = (meta.keywords || []).length;
            renderCategoryLabel(subRow, meta, {
              categoryName: cat.name,
              subscriptions: plugin.store.data.subscriptions,
              recurring: plugin.store.data.recurring,
              nameClass: "plg-settings-sub-name",
              subtitle: kwN ? `${kwN} 个关键词` : "",
            });
            addSettingsRowActions(subRow, {
              onEdit: () => {
                expanded.add(cat.name);
                openSubcategoryEdit(plugin.app, meta, async (next, oldName) => {
                  await plugin.store.updateSubcategory(cat.name, oldName, next);
                  expanded.add(cat.name);
                  plugin.refreshView();
                  renderList();
                });
              },
              onDelete: () => {
                openDeleteSubcategoryDialog(plugin.app, plugin, cat.name, meta, () => {
                  expanded.add(cat.name);
                  renderList();
                });
              },
            });
            subRow.onclick = (e) => {
              if (e.target.closest(".plg-settings-row-actions, .plg-cat-row-actions, button")) return;
              openSubcategoryHistory(plugin.app, plugin, cat.name, meta, () => {
                plugin.refreshView();
                renderList();
              });
            };
          });

          const catKwBlock = body.createDiv({ cls: "plg-cat-kw-block" });
          catKwBlock.createDiv({ cls: "plg-muted plg-cat-kw-label", text: "一级分类关键词" });
          const catKwInput = catKwBlock.createEl("input", {
            type: "text",
            cls: "plg-cat-kw-input",
            attr: { placeholder: "多个关键词用逗号分隔" },
          });
          catKwInput.value = formatKeywordInput(cat.keywords || []);
          catKwInput.onchange = async () => {
            try {
              await plugin.store.updateCategory(cat.name, { keywords: parseKeywordInput(catKwInput.value) });
              plugin.refreshView();
            } catch (e) {
              new Notice(e.message || "保存失败");
            }
          };
        }
      });
  };

  expBtn.onclick = () => { showFlow = "expense"; expBtn.addClass("active"); incBtn.removeClass("active"); renderList(); };
  incBtn.onclick = () => { showFlow = "income"; incBtn.addClass("active"); expBtn.removeClass("active"); renderList(); };
  renderList();
}

class PlgSettingsModal {
  constructor(app, plugin, onRefresh) {
    this.app = app;
    this.plugin = plugin;
    this.onRefresh = onRefresh;
  }
  open() {
    openPlgSettings(this.app, this.plugin, this.onRefresh);
  }
}

function openPlgSettings(app, plugin, onRefresh, focusOpts = null) {
  if (focusOpts) {
    plugin._settingsFocus = focusOpts;
    plugin.pendingSettingsTab = resolvePlgSettingsTabFromFocus(focusOpts);
  }
  plugin.openPluginSettings();
  onRefresh?.();
}

function renderPendingDuesPanel(parent, plugin, opts = {}) {
  const dues = collectPendingDues(plugin.store.data);
  if (!dues.length) {
    if (!opts.showEmpty) return null;
    parent.createDiv({
      cls: "plg-empty plg-pending-dues-empty",
      text: "本月暂无待入账项",
    });
    return parent;
  }
  const total = dues.reduce((s, d) => s + d.amount, 0);
  const overdueN = dues.filter((d) => d.overdue).length;
  const limit = opts.limit || 5;
  const collapsible = !!opts.collapsible;
  const expanded = collapsible
    ? !!plugin.settings.uiState?.pendingDuesExpanded
    : true;
  const card = parent.createDiv({
    cls: "plg-pending-dues-card"
      + (opts.compact ? " compact" : "")
      + (opts.variant === "mobile-budget" ? " mobile-budget-slot" : "")
      + (collapsible ? " collapsible" : "")
      + (expanded ? " open" : ""),
  });
  const head = card.createDiv({
    cls: "plg-pending-dues-head" + (collapsible ? " clickable" : ""),
  });
  if (collapsible) {
    head.setAttr("role", "button");
    head.setAttr("tabindex", "0");
    head.setAttr("aria-expanded", expanded ? "true" : "false");
  }
  const titleRow = head.createDiv({ cls: "plg-pending-dues-title-row" });
  titleRow.createSpan({
    cls: "plg-pending-dues-title",
    text: overdueN
      ? `本月待入账 ${dues.length} 笔 · ${overdueN} 笔已到期`
      : `本月待入账 ${dues.length} 笔`,
  });
  head.createDiv({ cls: "plg-pending-dues-total", text: fmtMoney(total) });
  const toggle = () => {
    if (!collapsible) return;
    plugin.settings.uiState = plugin.settings.uiState || {};
    const next = !expanded;
    plugin.settings.uiState.pendingDuesExpanded = next;
    if (!next) plugin.settings.uiState.pendingDuesShowAll = false;
    plugin.saveSettings();
    opts.onRefresh?.();
  };
  if (collapsible) {
    head.addEventListener("click", toggle);
    head.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  }
  const list = (opts.variant === "mobile-budget" && opts.listHost)
    ? opts.listHost.createDiv({ cls: "plg-pending-dues-list" + (collapsible && !expanded ? " hidden" : "") })
    : card.createDiv({ cls: "plg-pending-dues-list" + (collapsible && !expanded ? " hidden" : "") });
  dues.slice(0, limit).forEach((d) => {
    const row = list.createDiv({ cls: "plg-pending-dues-row" + (d.overdue ? " overdue" : "") });
    const top = row.createDiv({ cls: "plg-pending-dues-row-top" });
    top.createDiv({
      cls: "plg-pending-dues-name",
      text: d.title,
      attr: { title: d.title },
    });
    top.createDiv({ cls: "plg-pending-dues-amt", text: fmtMoney(d.amount) });
    const metaParts = [`${d.date.slice(5).replace("-", "/")} · ${d.subcategory || d.category}`];
    if (d.overdue) metaParts.push("已到期");
    const bottom = row.createDiv({ cls: "plg-pending-dues-row-bottom" });
    bottom.createDiv({
      cls: "plg-pending-dues-meta",
      text: metaParts.join(" · "),
    });
    const actions = bottom.createDiv({ cls: "plg-pending-dues-actions" });
    actions.createEl("button", {
      text: "入账",
      cls: "plg-btn-primary plg-pending-dues-record",
      attr: { type: "button" },
    }).onclick = async (e) => {
      e.stopPropagation();
      const ok = await plugin.store.recordPendingDue(d.kind, d.id);
      if (ok) {
        new Notice(`已入账：${d.title}`);
        plugin.refreshView();
        opts.onRefresh?.();
      } else {
        new Notice("入账失败或已存在相同账单");
      }
    };
    actions.createEl("button", {
      text: "详情",
      cls: "plg-btn-ghost plg-pending-dues-detail",
      attr: { type: "button" },
    }).onclick = (e) => {
      e.stopPropagation();
      plugin.openDashboardSettings({
        section: d.kind === "recurring" ? "recurring" : "subscription",
        id: d.id,
      });
    };
  });
  if (dues.length > limit) {
    const moreHost = (opts.variant === "mobile-budget" && opts.listHost) ? opts.listHost : card;
    const more = moreHost.createDiv({
      cls: "plg-pending-dues-more plg-pending-dues-more-link",
      text: `还有 ${dues.length - limit} 笔，查看全部 →`,
    });
    more.onclick = () => {
      plugin.settings.uiState = plugin.settings.uiState || {};
      plugin.settings.uiState.pendingDuesExpanded = true;
      plugin.settings.uiState.pendingDuesShowAll = true;
      plugin.saveSettings();
      plugin.refreshView?.();
      opts.onRefresh?.();
    };
  }
  if (opts.variant === "mobile-budget" && opts.listHost) {
    opts.listHost.toggleClass("has-items", expanded);
  }
  return card;
}

function renderGlobalKeywords(container, plugin, onRefresh) {
  if (!plugin.settings.categoryKeywords) plugin.settings.categoryKeywords = {};
  // 折叠块标题已有说明，这里只留一行短例，避免三段文案叠在一起。
  container.createDiv({
    cls: "plg-muted plg-global-kw-hint",
    text: "例：关键词「瑞幸」→ 餐饮·咖啡。记账时也会自动学习。",
  });
  const listEl = container.createDiv({ cls: "plg-global-kw-list" });

  const renderList = () => {
    listEl.empty();
    const entries = Object.entries(plugin.settings.categoryKeywords || {}).sort((a, b) => a[0].localeCompare(b[0], "zh"));
    if (!entries.length) {
      listEl.createDiv({ cls: "plg-empty", text: "暂无全局关键词" });
      return;
    }
    entries.forEach(([kw, meta]) => {
      const row = listEl.createDiv({ cls: "plg-global-kw-row" });
      row.createDiv({ cls: "plg-global-kw-kw", text: kw });
      const catLabel = meta?.subcategory
        ? `${meta.category || "—"} · ${meta.subcategory}`
        : (meta?.category || "—");
      row.createDiv({ cls: "plg-global-kw-cat", text: catLabel });
      row.createEl("button", {
        text: "删除",
        cls: "plg-btn-ghost plg-global-kw-del",
        attr: { type: "button" },
      }).onclick = async () => {
        delete plugin.settings.categoryKeywords[kw];
        await plugin.saveSettings();
        renderList();
        onRefresh?.();
      };
    });
  };

  const addBox = container.createDiv({ cls: "plg-global-kw-add" });
  const row = addBox.createDiv({ cls: "plg-global-kw-add-row plg-global-kw-add-row-grid" });
  const kwInput = row.createEl("input", {
    type: "text",
    cls: "plg-global-kw-input",
    attr: { placeholder: "关键词，如瑞幸" },
  });
  const catSel = row.createEl("select", { cls: "plg-global-kw-cat-select" });
  catSel.createEl("option", { value: "", text: "选择分类" });
  const subSel = row.createEl("select", { cls: "plg-global-kw-sub-select" });
  subSel.createEl("option", { value: "", text: "二级（可选）" });
  const addBtn = row.createEl("button", {
    text: "添加",
    cls: "plg-btn-primary plg-global-kw-add-btn",
    attr: { type: "button" },
  });

  const refreshSubOptions = () => {
    while (subSel.options.length > 1) subSel.remove(1);
    const cat = plugin.store.data.categories.find((c) => c.name === catSel.value);
    (cat?.subcategories || []).forEach((sub) => {
      const name = subcategoryName(sub);
      subSel.createEl("option", { value: name, text: name });
    });
  };

  plugin.store.data.categories.forEach((cat) => {
    catSel.createEl("option", { value: cat.name, text: cat.name });
  });
  catSel.onchange = () => refreshSubOptions();

  addBtn.onclick = async () => {
    const kw = kwInput.value.trim();
    const category = catSel.value;
    if (!kw) return new Notice("请输入关键词");
    if (!category) return new Notice("请选择分类");
    if (!plugin.settings.categoryKeywords) plugin.settings.categoryKeywords = {};
    const cat = plugin.store.data.categories.find((c) => c.name === category);
    plugin.settings.categoryKeywords[kw] = {
      category,
      subcategory: subSel.value || "",
      flow: cat?.flow || "expense",
    };
    await plugin.saveSettings();
    kwInput.value = "";
    subSel.value = "";
    renderList();
    onRefresh?.();
    new Notice("已添加关键词");
  };

  renderList();
}

async function confirmDataFolderChange(app, plugin, nextFolder) {
  const oldFolder = normalizePath(plugin.settings.dataFolder);
  const target = normalizePath(nextFolder || DEFAULT_SETTINGS.dataFolder);
  if (target === oldFolder) return "same";
  const oldFile = normalizePath(`${oldFolder}/ledger.json`);
  const adapter = app.vault.adapter;
  const hasOld = await adapter.exists(oldFile);
  if (!hasOld) return "switch";

  return new Promise((resolve) => {
    openPlgOverlay({
      title: "更改数据目录",
      stack: true,
      build: (body, close) => {
        addClasses(body, "plg-modal");
        body.createEl("p", {
          cls: "plg-muted",
          text: `当前目录 ${oldFolder} 已有 ledger.json。请选择如何处理：`,
        });
        const actions = body.createDiv({ cls: "plg-modal-actions plg-modal-actions-stack" });
        actions.createEl("button", {
          text: "迁移数据到新目录",
          cls: "mod-cta",
          attr: { type: "button" },
        }).onclick = async () => {
          try {
            const raw = await adapter.read(oldFile);
            plugin.settings.dataFolder = target;
            await plugin.saveSettings();
            await plugin.store.load();
            await adapter.write(plugin.store.filePath(), raw);
            await plugin.store.load();
            new Notice("已迁移数据到新目录");
            resolve("migrate");
            close();
          } catch (err) {
            new Notice("迁移失败：" + (err.message || String(err)));
          }
        };
        actions.createEl("button", {
          text: "仅切换路径（需自行复制文件）",
          attr: { type: "button" },
        }).onclick = async () => {
          plugin.settings.dataFolder = target;
          await plugin.saveSettings();
          await plugin.store.load();
          new Notice("已切换路径；若新目录无 ledger.json 将显示空账本");
          resolve("switch");
          close();
        };
        actions.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = () => {
          resolve("cancel");
          close();
        };
      },
    });
  });
}

function openOnboardingOverlay(app, plugin, onDone) {
  openPlgOverlay({
    title: "欢迎使用 PlainLedger",
    cls: "plg-onboarding-overlay",
    build: (body, close) => {
      addClasses(body, "plg-modal", "plg-onboarding-modal");
      body.createEl("p", {
        cls: "plg-muted",
        text: "数据保存在库内 JSON，可随 Obsidian 库同步。默认开启月结：每月 1 日将当年累计净收支结转至当月（可在设置关闭）。请选择如何开始：",
      });
      const grid = body.createDiv({ cls: "plg-onboarding-grid" });
      const finish = async (choice) => {
        plugin.settings.onboardingChoice = choice;
        plugin.settings.onboardingComplete = true;
        plugin.settings.initialized = true;
        await plugin.saveSettings();
        if (choice === "sample") {
          await plugin.store.importBundledDefault(true);
          new Notice(`已加载示例数据 ${plugin.store.data.transactions.length} 笔`);
        } else if (choice === "blank") {
          plugin.store.data = {
            version: 1,
            ledger: "默认账本",
            categories: [],
            transactions: [],
            recurring: [],
            subscriptions: [],
          };
          await plugin.store.save();
          new Notice("已创建空白账本");
        }
        close();
        onDone?.();
      };

      const mkCard = (title, desc, choice, primary = false) => {
        const card = grid.createDiv({ cls: "plg-onboarding-card" + (primary ? " primary" : "") });
        card.createEl("h3", { text: title });
        card.createEl("p", { text: desc, cls: "plg-muted" });
        card.createEl("button", {
          text: "选择",
          cls: primary ? "mod-cta" : "",
          attr: { type: "button" },
        }).onclick = async () => {
          if (choice === "import") {
            close();
            openImportLedgerOverlay(app, plugin, () => onDone?.(), {
              onSuccess: async () => {
                plugin.settings.onboardingChoice = "import";
                plugin.settings.onboardingComplete = true;
                plugin.settings.initialized = true;
                await plugin.saveSettings();
              },
            });
            return;
          }
          await finish(choice);
        };
      };

      mkCard("使用示例数据", bundledSampleHint() + "，适合快速体验", "sample", true);
      mkCard("导入 Excel / JSON", "PlainLedger Excel 或 JSON；Excel 默认合并流水", "import");
      mkCard("空白开始", "从零记账；启用月结后每月 1 日自动结转累计结余", "blank");
    },
  });
}

function addSettingsTierHeader(container, title, desc) {
  const tier = container.createDiv({ cls: "plg-settings-tier" });
  const heading = new Setting(tier).setName(title).setHeading().setClass("plg-settings-tier-title");
  if (desc) heading.setDesc(desc);
  return tier;
}

function formatSettingsFootStats(plugin) {
  const tx = plugin.store.data.transactions?.length || 0;
  const cats = plugin.store.data.categories?.length || 0;
  const subs = (plugin.store.data.categories || []).reduce((n, c) => n + (c.subcategories?.length || 0), 0);
  const ver = typeof PLUGIN_VERSION !== "undefined" ? PLUGIN_VERSION : "";
  const isPublic = typeof PLUGIN_EDITION === "string" && (PLUGIN_EDITION === "public" || PLUGIN_EDITION === "trial24h");
  if (isPublic && tx <= 10) {
    return `${tx} 笔示意 · ${cats} 类 · ${subs} 二级 · v${ver}`;
  }
  return `${tx} 笔 · ${cats} 类 · ${subs} 二级 · v${ver}`;
}

function addSettingsGroupHeader(container, title, desc) {
  if (title) new Setting(container).setName(title).setHeading().setClass("plg-settings-group-title");
  if (desc) container.createDiv({ cls: "plg-muted plg-settings-group-desc", text: desc });
}

function addCollapsibleSettingsSection(container, plugin, sectionId, title, desc, buildBody, focusOpts, onRefresh) {
  const section = container.createDiv({
    cls: "plg-settings-section plg-settings-section-collapsible",
  });
  section.setAttr("data-settings-section", sectionId);
  const focusOpen = focusOpts?.section === sectionId;
  let expanded = focusOpen || !!plugin.settings.uiState?.settingsSections?.[sectionId];
  if (!expanded && sectionId === "categories" && typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public") {
    expanded = true;
  }
  if (expanded) section.addClass("open");

  const head = section.createDiv({ cls: "plg-settings-section-head clickable" });
  head.setAttr("role", "button");
  head.setAttr("tabindex", "0");
  head.setAttr("aria-expanded", expanded ? "true" : "false");
  const heading = new Setting(head).setName(title).setHeading();
  if (desc) heading.setDesc(desc);

  const body = section.createDiv({
    cls: "plg-settings-section-body" + (expanded ? "" : " hidden"),
  });
  buildBody(body);

  const sync = (open) => {
    expanded = open;
    section.toggleClass("open", open);
    body.toggleClass("hidden", !open);
    head.setAttr("aria-expanded", open ? "true" : "false");
  };

  const toggle = () => {
    sync(!expanded);
    plugin.settings.uiState = plugin.settings.uiState || {};
    plugin.settings.uiState.settingsSections = plugin.settings.uiState.settingsSections || {};
    plugin.settings.uiState.settingsSections[sectionId] = expanded;
    plugin.saveSettings();
  };
  head.addEventListener("click", toggle);
  head.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });

  return section;
}

function addSettingsSection(container, title, desc, buildBody, attrs = null) {
  const section = container.createDiv({ cls: "plg-settings-section" });
  if (attrs) Object.entries(attrs).forEach(([k, v]) => section.setAttr(k, v));
  const head = section.createDiv({ cls: "plg-settings-section-head" });
  const heading = new Setting(head).setName(title).setHeading();
  if (desc) heading.setDesc(desc);
  const body = section.createDiv({ cls: "plg-settings-section-body" });
  buildBody(body);
  return section;
}

async function openPlgLedgerFile(plugin) {
  const fp = plugin.store.filePath();
  const file = plugin.app.vault.getAbstractFileByPath(fp);
  if (file) {
    await plugin.app.workspace.getLeaf().openFile(file);
    return;
  }
  new Notice(`账本文件：${fp}`);
}

async function openPlgPluginDataFile(plugin) {
  const path = normalizePath(`.obsidian/plugins/${plugin.manifest.id}/data.json`);
  const file = plugin.app.vault.getAbstractFileByPath(path);
  if (file) {
    await plugin.app.workspace.getLeaf().openFile(file);
    return;
  }
  new Notice(`设置文件：${path}`);
}

function renderPlgLicensePanel(panel, plugin, onRefresh) {
  let trialHint = "";
  if (typeof isTrialEdition === "function" && isTrialEdition() && !plugin.settings.licenseActivated) {
    if (isTrialActive(plugin.app, plugin.settings)) {
      trialHint = `试用中 · 剩余 ${formatTrialRemaining(getTrialRemainingMs(plugin.app, plugin.settings))}`;
    } else if (!plugin.settings.trialWelcomeSeen) {
      trialHint = `可在侧边栏点击「开启 ${getTrialHoursLabel()} 试用」`;
    }
  }
  renderLifeOsLicenseSettingsPanel(panel, {
    desc: "本安装包需激活后使用全部功能。",
    trialHint,
    getFingerprint: () => getVaultFingerprint(plugin.app),
    licenseKey: plugin.settings.licenseKey || "",
    activated: plugin.settings.licenseActivated,
    onCopyFingerprint: async (fp) => {
      const ok = await copyTextToClipboard(fp);
      new Notice(ok ? "设备指纹已复制" : "请手动全选复制指纹");
    },
    onActivate: async (key) => {
      const wasActivated = plugin.settings.licenseActivated;
      if (!key) {
        new Notice("请输入激活码");
        return;
      }
      plugin.settings.licenseKey = key;
      syncLicenseState(plugin.app, plugin.settings);
      if (plugin.settings.licenseActivated) {
        new Notice("激活成功，之后将永久有效");
      } else {
        new Notice("激活码无效，请核对后再试");
        await plugin.saveSettings();
        onRefresh?.();
        return;
      }
      await plugin.saveSettings();
      if (!wasActivated) await plugin.onLicenseActivated();
      else plugin.refreshView(true);
      onRefresh?.();
    },
  });
}

function renderPlgCommonPanel(panel, plugin, onRefresh) {
  const grid = panel.createDiv({ cls: "plg-settings-grid" });
  const budgetCard = createPlgSettingsBlock(
    grid,
    "基础与预算",
    "本月预算与月结结转；数据目录在「数据」页管理。"
  );
  new Setting(budgetCard)
    .setName("本月预算")
    .addText((t) => {
      t.setValue(String(plugin.settings.monthlyBudget || ""));
      t.onChange(async (v) => {
        plugin.settings.monthlyBudget = parseFloat(v) || 0;
        await plugin.saveSettings();
        plugin.refreshView?.();
      });
    });
  new Setting(budgetCard)
    .setName("月结结转")
    .addToggle((tg) => tg.setValue(plugin.settings.carryoverEnabled !== false).onChange(async (v) => {
      plugin.settings.carryoverEnabled = v;
      await plugin.saveSettings();
      await plugin.store.processCarryovers();
      plugin.refreshView?.();
    }));
  budgetCard.createEl("p", {
    cls: "plg-settings-section-hint",
    text: "每年 1 月重置；每月 1 日将当年 1 月至上月累计净收支结转至当月。预算与图表不计结转。0 预算表示不启用提醒。",
  });

  const noteCard = createPlgSettingsBlock(
    grid,
    "日记联动",
    "记账后追加一行到当日 Markdown 笔记。"
  );
  new Setting(noteCard)
    .setName("写入日记")
    .addToggle((tg) => tg.setValue(!!plugin.settings.dailyNoteOnSave).onChange(async (v) => {
      plugin.settings.dailyNoteOnSave = v;
      await plugin.saveSettings();
    }));
  new Setting(noteCard)
    .setName("日记目录")
    .addText((t) => {
      t.setValue(plugin.settings.dailyNoteFolder || "Daily Notes");
      t.onChange(async (v) => {
        plugin.settings.dailyNoteFolder = v.trim() || "Daily Notes";
        await plugin.saveSettings();
      });
    });
}

function renderPlgCategoriesPanel(panel, plugin, focusOpts) {
  const grid = panel.createDiv({ cls: "plg-settings-grid" });
  const card = createPlgSettingsBlock(
    grid,
    "分类管理",
    "一级 / 二级分类、图标与关键词。"
  );
  card.addClass("plg-settings-rich-block");
  card.setAttr("data-settings-section", "categories");
  renderSettingsCategories(card, plugin);
  if (focusOpts?.section === "categories") {
    window.requestAnimationFrame(() => {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function renderPlgRulesPanel(panel, plugin, onRefresh, focusOpts) {
  const grid = panel.createDiv({ cls: "plg-settings-grid plg-rules-grid" });
  const focusSection = focusOpts?.section || "";

  const pending = createPlgCollapsibleBlock(
    grid,
    plugin,
    "pendingDues",
    "待入账",
    "订阅与周期待付项；首页也可快捷入账。",
    (body) => {
      body.addClass("plg-settings-rich-block");
      renderPendingDuesPanel(body, plugin, {
        limit: 20,
        collapsible: false,
        compact: true,
        showEmpty: true,
        onRefresh,
      });
    },
    { forceOpen: focusSection === "pendingDues" },
  );
  pending.addClass("plg-rules-section");

  const subscription = createPlgCollapsibleBlock(
    grid,
    plugin,
    "subscription",
    "订阅服务",
    "续费周期、支出统计与服务列表。",
    (body) => {
      body.addClass("plg-settings-rich-block");
      renderSettingsSubscriptions(body, plugin, focusOpts);
    },
    { forceOpen: focusSection === "subscription" },
  );
  subscription.addClass("plg-rules-section");

  const recurring = createPlgCollapsibleBlock(
    grid,
    plugin,
    "recurring",
    "周期 / 分期",
    "固定周期自动记账规则。",
    (body) => {
      body.addClass("plg-settings-rich-block");
      renderSettingsRecurring(body, plugin, focusOpts);
    },
    { forceOpen: focusSection === "recurring" },
  );
  recurring.addClass("plg-rules-section");

  const keywords = createPlgCollapsibleBlock(
    grid,
    plugin,
    "globalKeywords",
    "全局关键词",
    "跨分类统一映射商户词，优先于分类内关键词。",
    (body) => {
      body.addClass("plg-settings-rich-block");
      renderGlobalKeywords(body, plugin, onRefresh);
    },
    { forceOpen: focusSection === "globalKeywords" },
  );
  keywords.addClass("plg-rules-section");

  if (focusSection) {
    window.requestAnimationFrame(() => {
      panel.querySelector(`[data-settings-section="${focusSection}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function renderPlgDataPanel(panel, plugin, onRefresh) {
  const grid = panel.createDiv({ cls: "plg-settings-grid" });

  createPlgCollapsibleBlock(
    grid,
    plugin,
    "dataImportExport",
    "数据管理",
    "导入与导出备份；建议定期导出 JSON。",
    (body) => {
      new Setting(body)
        .setName("导入账单")
        .setClass("plg-settings-action-row")
        .addButton((b) => b.setButtonText("选择文件").onClick(() => {
          openImportLedgerOverlay(plugin.app, plugin, () => {
            plugin.refreshView();
            onRefresh?.();
          });
        }));
      if (plugin.settings.lastImportFile) {
        body.createEl("p", {
          cls: "plg-settings-section-hint",
          text: `上次导入：${plugin.settings.lastImportFile}`,
        });
      }
      new Setting(body)
        .setName("导出 JSON")
        .setClass("plg-settings-action-row")
        .addButton((b) => b.setButtonText("导出").onClick(() => exportLedgerJson(plugin)));
      new Setting(body)
        .setName("导出 CSV")
        .setClass("plg-settings-action-row")
        .addButton((b) => b.setButtonText("导出").onClick(() => exportLedgerMumuCsv(plugin)));
    },
  );

  createPlgCollapsibleBlock(
    grid,
    plugin,
    "dataFolder",
    "数据目录",
    "账单 JSON 与导出文件存放位置；更改时会提示迁移或仅切换。",
    (body) => {
      let folderInput;
      new Setting(body)
        .setName("目录路径")
        .addText((t) => {
          folderInput = t;
          t.setValue(plugin.settings.dataFolder);
          t.onChange(async (v) => {
            const next = v || DEFAULT_SETTINGS.dataFolder;
            const action = await confirmDataFolderChange(plugin.app, plugin, next);
            if (action === "cancel" || action === "same") {
              folderInput.setValue(plugin.settings.dataFolder);
              return;
            }
            if (action === "migrate" || action === "switch") {
              folderInput.setValue(plugin.settings.dataFolder);
              onRefresh?.();
              plugin.refreshView?.();
            }
          });
        });
    },
  );

  createPlgCollapsibleBlock(
    grid,
    plugin,
    "dataFiles",
    "数据文件",
    "插件设置与账本 JSON 路径（随库 / iCloud 同步）。",
    (body) => {
      const ledgerPath = plugin.store.filePath();
      const settingsPath = normalizePath(`.obsidian/plugins/${plugin.manifest.id}/data.json`);
      const addDataFileRow = (label, path, onOpen) => {
        const row = body.createDiv({ cls: "plg-settings-data-file-row" });
        const text = row.createDiv({ cls: "plg-settings-data-file-text" });
        text.createDiv({ cls: "plg-settings-data-file-label", text: label });
        text.createDiv({ cls: "plg-settings-data-file-path", text: path });
        row
          .createEl("button", { text: "打开", cls: "plg-text-btn", attr: { type: "button" } })
          .addEventListener("click", () => void onOpen());
      };
      addDataFileRow("全部账单、分类、订阅与周期规则。", ledgerPath, () => openPlgLedgerFile(plugin));
      addDataFileRow("预算、数据目录、激活状态等插件设置。", settingsPath, () => openPlgPluginDataFile(plugin));
    },
  );

  if (typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public") {
    createPlgCollapsibleBlock(
      grid,
      plugin,
      "dataDanger",
      "危险操作",
      "不可逆，请先导出 JSON 备份。",
      (body) => {
        body.addClass("plg-settings-danger-block");
        new Setting(body)
          .setName("恢复样例")
          .addButton((b) => {
            b.setButtonText("恢复");
            b.setClass("mod-warning");
            b.onClick(() => {
              confirmPlgAction({
                title: "恢复内置样例",
                message: `${bundledSampleHint()}。将覆盖当前 ${plugin.store.data.transactions.length} 笔账单与订阅/周期，分类树完整保留。`,
                danger: true,
                confirmText: "确认恢复",
                onConfirm: async () => {
                  await plugin.store.importBundledDefault(true);
                  const cats = plugin.store.data.categories?.length || 0;
                  const subs = (plugin.store.data.categories || []).reduce((n, c) => n + (c.subcategories?.length || 0), 0);
                  new Notice(`已恢复 ${plugin.store.data.transactions.length} 笔示意账单 · ${cats} 类 · ${subs} 二级`);
                  plugin.refreshView();
                  onRefresh?.();
                },
              });
            });
          });
        body.createEl("p", { cls: "plg-settings-section-hint", text: bundledSampleHint() });
      },
      { defaultExpanded: false },
    );
  }

  const foot = panel.createDiv({ cls: "plg-settings-foot" });
  const isPublic = typeof PLUGIN_EDITION === "string" && (PLUGIN_EDITION === "public" || PLUGIN_EDITION === "trial24h");
  foot.createEl("p", { text: formatSettingsFootStats(plugin) });
  if (isPublic) {
    foot.createEl("p", { text: "公版为示意数据；完整个人账单请使用个人版或独立库。" });
  }
}

function renderPluginSettings(container, plugin, onRefresh, focusOpts = null) {
  container.empty();
  container.removeClass("plg-settings-panel");
  injectPlgSettingsCompactStyles();

  const isMobile = plugin.app.isMobile || Platform.isMobileApp;
  container.addClass("plg-settings-compact");
  container.toggleClass("plg-settings-mobile", isMobile);
  applyPlgMobileSettingsLayout(container, plugin.app);

  if (!isMobile) {
    new Setting(container)
      .setName(
        typeof formatPluginSettingsTitle === "function"
          ? formatPluginSettingsTitle("PlainLedger 配置", getPlgEditionLabel(plugin))
          : `PlainLedger 配置 · ${getPlgEditionLabel(plugin)}`
      )
      .setHeading()
      .setClass("plg-settings-page-title");
  }
  container.createEl("p", {
    cls: "plg-settings-intro",
    text: typeof PLUGIN_PHILOSOPHY_SUBTITLE !== "undefined"
      ? PLUGIN_PHILOSOPHY_SUBTITLE
      : "记账不必离开笔记——PlainLedger 把账单保存在 Obsidian 库内，随 iCloud / Git 同步。",
  });
  // 版式由 styles.css .plg-settings-intro 负责；勿 inline !important（Scorecard Risk）

  const licenseRequired = typeof isLicenseRequired === "function" && isLicenseRequired();
  const locked = licenseRequired && !isPluginLicensed(plugin.app, plugin.settings);
  if (locked) {
    container.createEl("p", {
      cls: "plg-settings-locked-hint",
      text: "未激活时仅可查看数据、快捷指令与关于；授权后解锁常用 / 外观 / 分类 / 规则。",
    });
  }
  const tabDefs = [];
  if (licenseRequired) tabDefs.push({ id: "license", label: "授权" });
  if (!locked) {
    tabDefs.push(
      { id: "common", label: "常用" },
      { id: "appearance", label: "外观" },
      { id: "categories", label: "分类" },
      { id: "rules", label: "规则" },
    );
  }
  tabDefs.push({ id: "data", label: "数据" });
  tabDefs.push({ id: "shortcuts", label: "快捷指令" });
  tabDefs.push({ id: "about", label: "关于" });

  const pendingTab = plugin.pendingSettingsTab || resolvePlgSettingsTabFromFocus(focusOpts);
  plugin.pendingSettingsTab = null;
  const { panels } = buildPlgSettingsTabs(container, plugin, tabDefs, pendingTab);

  if (licenseRequired) renderPlgLicensePanel(panels.license, plugin, () => renderPluginSettings(container, plugin, onRefresh, focusOpts));
  if (!locked) {
    renderPlgCommonPanel(panels.common, plugin, onRefresh);
    renderPlgNavAppearancePanel(panels.appearance, plugin, focusOpts);
    renderPlgCategoriesPanel(panels.categories, plugin, focusOpts);
    renderPlgRulesPanel(panels.rules, plugin, onRefresh, focusOpts);
  }
  renderPlgDataPanel(panels.data, plugin, onRefresh);
  renderPlainLedgerShortcutsSettingsPanel(panels.shortcuts, plugin);
  renderLifeOsAboutPanel(panels.about, plugin, {
    openUsageGuide: () => openUsageGuideInNewTab(plugin.app, plugin.settings, () => plugin.saveSettings()),
  });
}

/** @deprecated use renderPluginSettings */
function renderBasicPluginSettings(container, plugin, onRefresh) {
  renderPluginSettings(container, plugin, onRefresh);
}

/** @deprecated use renderPluginSettings */
function renderDashboardSettings(container, plugin, onRefresh, focusOpts = null) {
  renderPluginSettings(container, plugin, onRefresh, focusOpts);
}

function recurringTxFilter(txs, items) {
  return attributeRecurringTxs(txs, items).map((x) => x.tx);
}

/** 将账单归属到具体周期规则（优先 linkedRecurringId，否则选匹配度最高的一条） */
function attributeRecurringTxs(txs, items) {
  const rules = items || [];
  const expenses = (txs || []).filter((t) => t.flow === "expense");
  const out = [];

  for (const t of expenses) {
    const tid = t.id || `${t.datetime}\0${t.amount}\0${t.note}\0${t.subcategory}`;
    const lid = String(t.linkedRecurringId || "").trim();
    if (lid) {
      const item = rules.find((r) => r.id === lid);
      if (item) {
        out.push({
          tx: t,
          ruleTitle: item.title || "周期",
          ruleId: item.id,
          category: item.category || t.category || "",
          subcategory: item.subcategory || t.subcategory || "",
        });
        continue;
      }
    }

    let best = null;
    for (const item of rules) {
      if (txIsAutoRecurringBill(item, t)) {
        const pick = {
          score: 900,
          ruleTitle: item.title || "周期",
          ruleId: item.id,
          category: item.category || t.category || "",
          subcategory: item.subcategory || t.subcategory || "",
        };
        if (!best || pick.score > best.score) best = pick;
        continue;
      }
      if (!recurringTxMatchesExact(item, t)) continue;

      let score = 10;
      const note = (t.note || "").trim();
      const title = (item.title || "").trim();
      const ruleNote = (item.note || "").trim();
      if (note === title || note === ruleNote) score = 100;
      else if (ruleNote && note.includes(ruleNote)) score = 85;
      else if (title && note.includes(title)) score = 70;
      else if ((t.subcategory || "").trim() === (item.subcategory || "").trim()) score = 40;

      const pick = {
        score,
        ruleTitle: item.title || "周期",
        ruleId: item.id,
        category: item.category || t.category || "",
        subcategory: item.subcategory || t.subcategory || "",
      };
      if (!best || pick.score > best.score) best = pick;
    }

    if (best) {
      out.push({
        tx: t,
        ruleTitle: best.ruleTitle,
        ruleId: best.ruleId,
        category: best.category,
        subcategory: best.subcategory,
      });
    }
  }

  return out;
}

/** 周期支出弹层：按入账二级汇总（同一二级下多条规则合并） */
function recurringExpenseBreakdown(attributed, predicate) {
  const filtered = (attributed || []).filter(({ tx }) => predicate(tx));
  const total = filtered.reduce((s, { tx }) => s + tx.amount, 0);
  const map = new Map();
  filtered.forEach(({ tx, category, subcategory }) => {
    const cat = (category || tx.category || "").trim();
    const sub = (subcategory || tx.subcategory || "").trim() || "（无二级）";
    const key = `${cat}\0${sub}`;
    map.set(key, (map.get(key) || 0) + tx.amount);
  });
  const items = [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([key, amt]) => {
      const [cat, sub] = key.split("\0");
      const name = cat ? `${cat}·${sub}` : sub;
      return {
        name,
        amt,
        pct: total > 0 ? Math.round((amt / total) * 1000) / 10 : 0,
      };
    });
  return { total, items };
}

function recurringCardSubMeta(item) {
  const sub = (item.subcategory || "").trim() || "（无二级）";
  return `${sub} · ${fmtMoney(item.amount)} · ${formatRecurringLabel(item)}`;
}

function subscriptionCardSubMeta(item) {
  const sub = (item.subcategory || "").trim() || item.name || "（无二级）";
  return `${sub} · ${fmtMoney(item.amount)} · ${formatRecurringLabel(item)}`;
}

function renderSettingsRecurring(container, plugin, focusOpts = null) {
  const headRow = container.createDiv({ cls: "plg-sub-head-row" });
  const searchInput = headRow.createEl("input", {
    type: "search",
    cls: "plg-sub-search-input",
    attr: { placeholder: "搜索周期名称" },
  });
  headRow.createEl("button", {
    text: "+ 新增周期",
    cls: "plg-btn-primary",
    attr: { type: "button" },
  }).onclick = () => {
    openRecurringBill(plugin.app, plugin, null, () => {
      plugin.refreshView();
      renderAll();
    });
  };

  const searchResults = container.createDiv({ cls: "plg-sub-search-results" });
  searchResults.removeClass("is-block"); searchResults.removeClass("is-grid");

  const overview = container.createDiv({ cls: "plg-sub-overview" });
  const listEl = container.createDiv({ cls: "plg-sub-list plg-recurring-list", attr: { id: "plg-rec-list-anchor" } });

  const renderSearch = () => {
    const q = searchInput.value.trim().toLowerCase();
    searchResults.empty();
    if (!q) {
      searchResults.removeClass("is-block"); searchResults.removeClass("is-grid");
      return;
    }
    const items = (plugin.store.data.recurring || []).filter((r) =>
      (r.title || "").toLowerCase().includes(q) ||
      (r.category || "").toLowerCase().includes(q),
    );
    if (!items.length) {
      searchResults.createDiv({ cls: "plg-empty", text: "未找到匹配的周期规则" });
      searchResults.removeClass("is-grid"); searchResults.addClass("is-block");
      return;
    }
    items.forEach((item) => {
      const enriched = enrichRecurringItem(item, plugin.store.data.categories, plugin.store.data);
      const cell = searchResults.createDiv({ cls: "plg-sub-search-cell", attr: { title: item.title } });
      renderSubscriptionIcon(cell, enriched, plugin);
      cell.createDiv({ cls: "plg-sub-search-name", text: item.title });
      cell.onclick = () => {
        openRecurringBill(plugin.app, plugin, { ...item }, () => {
          plugin.refreshView();
          renderAll();
        });
      };
    });
    searchResults.removeClass("is-block"); searchResults.addClass("is-grid");
  };

  searchInput.addEventListener("input", renderSearch);

  const renderAll = () => {
    renderOverview();
    renderList();
    renderSearch();
  };

  const renderOverview = () => {
    overview.empty();
    const metricsGrid = overview.createDiv({ cls: "plg-sub-metrics-grid" });
    const items = plugin.store.data.recurring || [];
    const attributed = attributeRecurringTxs(plugin.store.data.transactions, items);
    const recTxs = attributed.map((x) => x.tx);
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}`;
    const yearKey = `${now.getFullYear()}-`;
    const monthBreak = recurringExpenseBreakdown(attributed, (tx) => tx.datetime.startsWith(monthKey));
    const yearBreak = recurringExpenseBreakdown(attributed, (tx) => tx.datetime.startsWith(yearKey));
    const totalBreak = recurringExpenseBreakdown(attributed, () => true);
    const firstDate = recTxs.length
      ? recTxs.map((t) => parseDateTime(t.datetime)).sort((a, b) => a - b)[0]
      : null;
    const days = firstDate ? Math.max(1, Math.ceil((now - firstDate) / 86400000)) : 1;
    const daily = totalBreak.total / days;
    const activeItems = items.filter((r) => isRecurringActive(r));
    const pausedItems = items.filter((r) => !isRecurringActive(r));
    const allTxs = plugin.store.data.transactions || [];

    [
      {
        label: "总支出",
        val: fmtMoney(totalBreak.total),
        cls: "green",
        icon: "💳",
        popLines: totalBreak.items.map((i) => ({ name: i.name, amt: i.amt, pct: i.pct })),
        popEmpty: "暂无周期支出",
      },
      {
        label: "本年支出",
        val: fmtMoney(yearBreak.total),
        cls: "teal",
        icon: "🗓️",
        popLines: yearBreak.items.map((i) => ({ name: i.name, amt: i.amt, pct: i.pct })),
        popEmpty: "本年暂无周期支出",
      },
      {
        label: "本月支出",
        val: fmtMoney(monthBreak.total),
        cls: "blue",
        icon: "📅",
        popLines: monthBreak.items.map((i) => ({ name: i.name, amt: i.amt, pct: i.pct })),
        popEmpty: "本月暂无周期支出",
      },
      {
        label: "日均支出",
        val: fmtMoney(daily),
        cls: "orange",
        icon: "📈",
        popLines: totalBreak.items.map((i) => ({
          name: i.name,
          amt: i.amt,
          pct: i.pct,
          sub: `日均 ${fmtMoney(i.amt / days)}`,
        })),
        popEmpty: "暂无周期支出",
      },
      {
        label: "生效规则",
        val: String(activeItems.length),
        cls: "purple",
        icon: "🔄",
        popLines: [
          ...activeItems.map((r) => ({
            name: r.title,
            amtText: fmtMoney(r.amount),
            sub: formatRecurringLabel(r),
          })),
          ...pausedItems.map((r) => {
            const st = recurringRenewalDisplayStats(r, allTxs);
            return {
              name: r.title,
              amtText: fmtMoney(st.amount),
              sub: "已暂停 · 不自动生成",
            };
          }),
        ],
        popEmpty: "暂无生效中的周期",
        onClick: () => listEl.scrollIntoView({ behavior: "smooth", block: "start" }),
      },
    ].forEach((m) => {
      const card = metricsGrid.createDiv({ cls: `plg-sub-metric ${m.cls}` + (m.popLines ? " has-pop" : "") });
      card.createDiv({ cls: "plg-sub-metric-icon", text: m.icon });
      card.createDiv({ cls: "plg-sub-metric-label", text: m.label });
      card.createDiv({ cls: "plg-sub-metric-val", text: m.val });
      renderSubMetricPop(card, m.popLines, m.popEmpty);
      if (m.onClick) {
        card.addClass("clickable");
        card.onclick = m.onClick;
      }
    });
  };

  const renderList = () => {
    listEl.empty();
    const items = plugin.store.data.recurring || [];
    const allTxs = plugin.store.data.transactions || [];
    if (!items.length) {
      listEl.createDiv({ cls: "plg-empty", text: "暂无周期账单，点击上方「新增」" });
      return;
    }
    items.forEach((item) => {
      normalizeSingleRecurringPhases(item);
      const enriched = enrichRecurringItem(item, plugin.store.data.categories, plugin.store.data);
      const isActive = isRecurringActive(item);
      const stats = recurringRenewalDisplayStats(item, allTxs);
      const renewalRecords = txsForRecurringRenewalRecords(item, allTxs);
      const derivedPhases = buildSubscriptionRenewalPhases(renewalRecords);
      const phaseHint = derivedPhases.length > 1 ? `${derivedPhases.length} 阶段 · ` : "";
      const card = listEl.createDiv({
        cls: "plg-recurring-card plg-sub-card plg-sub-card-clickable plg-sub-card-v2" + (isActive ? "" : " paused"),
      });
      card.dataset.recId = item.id;

      const top = card.createDiv({ cls: "plg-sub-card-top" });
      const identity = top.createDiv({ cls: "plg-sub-card-identity" });
      const label = identity.createDiv({ cls: "plg-recurring-icon plg-cat-label plg-sub-cat-label" });
      renderCategoryIcon(label, enriched);
      const textCol = label.createDiv({ cls: "plg-cat-label-text" });
      const nameRow = textCol.createDiv({ cls: "plg-sub-card-name-row" });
      nameRow.createSpan({ cls: "plg-recurring-title plg-sub-card-name", text: item.title || "周期" });
      nameRow.createSpan({
        cls: "plg-sub-card-badge" + (isActive ? " is-active" : " is-paused"),
        text: isActive ? "生效中" : "已暂停",
      });
      textCol.createDiv({
        cls: "plg-sub-card-meta plg-muted",
        text: recurringCardSubMeta(item),
      });
      textCol.createDiv({
        cls: "plg-sub-card-stats",
        text: isActive
          ? `${phaseHint}开始 ${stats.start} · 已记 ${stats.periods} 期 · ${fmtMoney(stats.amount)}`
          : `${phaseHint}开始 ${stats.start} · ${stats.periods} 笔 · 累计 ${fmtMoney(stats.amount)}`,
      });

      const side = top.createDiv({ cls: "plg-sub-card-side" });
      if (isActive) {
        side.createDiv({ cls: "plg-sub-card-next", text: `下一笔 ${item.nextDate || "—"}` });
      } else {
        side.createDiv({
          cls: "plg-sub-card-next paused",
          text: stats.amount > 0 ? `累计 ${fmtMoney(stats.amount)}` : "暂无记录",
        });
        side.createDiv({ cls: "plg-sub-card-side-hint", text: "已暂停 · 不自动生成" });
      }
      side.onclick = (e) => {
        e.stopPropagation();
        openRecurringPhaseHistory(plugin.app, plugin, item, () => renderAll());
      };

      card.onclick = (e) => {
        if (e.target.closest("button, .plg-sub-card-actions, .plg-sub-card-side")) return;
        openRecurringPhaseHistory(plugin.app, plugin, item, () => renderAll());
      };

      const actions = card.createDiv({ cls: "plg-recurring-actions plg-sub-card-actions" });
      actions.createEl("button", {
        text: "记录",
        cls: "plg-btn-ghost",
        attr: { type: "button" },
      }).onclick = (e) => {
        e.stopPropagation();
        openRecurringPhaseHistory(plugin.app, plugin, item, () => renderAll());
      };
      actions.createEl("button", { text: "生成", cls: "plg-btn-primary", attr: { type: "button" } }).onclick = async (e) => {
        e.stopPropagation();
        await plugin.store.generateRecurring(item.id);
        new Notice("已生成本期账单");
        plugin.refreshView();
        renderAll();
      };
      actions.createEl("button", {
        text: isActive ? "暂停" : "开启新阶段",
        cls: isActive ? "plg-btn-ghost" : "plg-btn-primary",
        attr: {
          type: "button",
          title: isActive
            ? "暂停自动生成，当前阶段保留在记账记录中"
            : "从今天起新建一个续费阶段（金额、周期可在此设置）",
        },
      }).onclick = async (e) => {
        e.stopPropagation();
        if (isActive) {
          closeRecurringPhase(item, dateKey(new Date()));
          await plugin.store.saveRecurring(item);
          plugin.refreshView?.();
          renderAll();
        } else {
          openStartNewRecurringPhase(plugin.app, plugin, item, () => renderAll());
        }
      };
      actions.createEl("button", { text: "编辑", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = (e) => {
        e.stopPropagation();
        openRecurringBill(plugin.app, plugin, { ...item }, () => renderAll());
      };
      actions.createEl("button", { text: "删除", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = (e) => {
        e.stopPropagation();
        confirmPlgAction({
          title: "删除周期规则",
          message: "确定删除这条周期记账规则吗？已入账的历史账单不会被删除。",
          confirmText: "删除",
          danger: true,
          onConfirm: async () => {
            await plugin.store.deleteRecurring(item.id);
            renderAll();
          },
        });
      };
    });
  };

  renderAll();
  if (focusOpts?.section === "recurring" && focusOpts.id) {
    window.requestAnimationFrame(() => {
      const el = listEl.querySelector(`[data-rec-id="${focusOpts.id}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.addClass("plg-settings-focus-highlight");
        window.setTimeout(() => el.removeClass("plg-settings-focus-highlight"), 2400);
      }
    });
  }
}

function txsForSubcategory(catName, subName, txs) {
  const cat = (catName || "").trim();
  const sub = (subcategoryName(subName) || "").trim();
  return (txs || []).filter((t) => {
    if ((t.category || "").trim() !== cat) return false;
    if (!sub) return !(t.subcategory || "").trim();
    return (t.subcategory || "").trim() === sub;
  });
}

function openTransactionHistoryDialog(app, plugin, opts) {
  openPlgOverlay({
    title: opts.title,
    cls: "plg-tx-history-overlay wide",
    wide: true,
    stack: true,
    tier: 3,
    build: (body, close) => {
      addClasses(body, "plg-modal");
      const summaryEl = body.createDiv({ cls: "plg-sub-history-summary plg-muted" });
      const listEl = body.createDiv({ cls: "plg-sub-history-list" });
      const emptyEl = body.createDiv({ cls: "plg-empty", text: "暂无历史账单" });

      const refreshList = () => {
        listEl.empty();
        const matched = (opts.getTransactions() || []).sort((a, b) => b.datetime.localeCompare(a.datetime));
        if (!matched.length) {
          summaryEl.addClass("hidden");
          listEl.addClass("hidden");
          emptyEl.removeClass("hidden");
          return;
        }
        summaryEl.removeClass("hidden");
        listEl.removeClass("hidden");
        emptyEl.addClass("hidden");
        const total = matched.reduce((s, t) => s + t.amount, 0);
        summaryEl.setText(`共 ${matched.length} 笔 · 合计 ${fmtMoney(total)}`);
        matched.forEach((t) => {
          const row = listEl.createDiv({ cls: "plg-sub-history-row plg-tx-history-row-clickable" });
          row.createSpan({ cls: "plg-sub-history-date", text: t.datetime.slice(0, 16) });
          row.createSpan({ cls: "plg-sub-history-amt", text: fmtMoney(t.amount) });
          const detail = [t.note].filter((x) => x && x !== opts.title).join(" · ");
          if (detail) row.createSpan({ cls: "plg-sub-history-note plg-muted", text: detail });
          const editBtn = row.createEl("button", {
            text: "修改",
            cls: "plg-btn-ghost plg-history-edit-btn",
            attr: { type: "button" },
          });
          const openEdit = () => {
            openEditTransaction(app, plugin, { ...t }, () => {
              opts.onRefresh?.();
              refreshList();
            }, () => {
              opts.onRefresh?.();
              refreshList();
            });
          };
          editBtn.onclick = (e) => {
            e.stopPropagation();
            openEdit();
          };
          row.onclick = (e) => {
            if (e.target.closest("button")) return;
            openEdit();
          };
        });
      };

      refreshList();

      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "关闭", cls: "mod-cta", attr: { type: "button" } }).onclick = close;
    },
  });
}

function openSubcategoryHistory(app, plugin, catName, subMeta, onRefresh) {
  const subName = subcategoryName(subMeta);
  openTransactionHistoryDialog(app, plugin, {
    title: `${catName} · ${subName}`,
    getTransactions: () => txsForSubcategory(catName, subName, plugin.store.data.transactions),
    onRefresh,
  });
}

function resolveLinkedSubscriptionForTx(plugin, tx) {
  const id = String(tx.linkedSubscriptionId || "").trim();
  if (id) {
    return (plugin.store.data.subscriptions || []).find((s) => s.id === id) || null;
  }
  if (tx.source === "subscription") {
    return (plugin.store.data.subscriptions || []).find((s) => subscriptionTxMatchesStrict(s, tx)) || null;
  }
  return null;
}

function resolveLinkedRecurringForTx(plugin, tx) {
  const id = String(tx.linkedRecurringId || "").trim();
  if (id) {
    return (plugin.store.data.recurring || []).find((r) => r.id === id) || null;
  }
  if (tx.source === "recurring") {
    return (plugin.store.data.recurring || []).find((r) =>
      r.category === tx.category
      && (r.subcategory || "") === (tx.subcategory || "")
      && r.amount === tx.amount
    ) || null;
  }
  return null;
}

function subscriptionTxFilter(txs, subs) {
  const items = subs || [];
  return (txs || []).filter((t) => items.some((s) => txBelongsToSubscriptionStats(s, t)));
}

function enrichSubscriptionItem(item, storeData = null) {
  const categories = storeData?.categories;
  const subscriptions = storeData?.subscriptions;
  const preset = resolveSubscriptionPreset(item);
  let enriched = {
    ...item,
    name: item.name,
    domain: item.iconUrl ? "" : (item.domain || preset?.domain || ""),
    color: item.color || preset?.color || "",
    icon: item.icon || preset?.abbr || subscriptionAbbr(item.name),
    iconUrl: item.iconUrl || preset?.iconUrl || "",
  };
  enriched = seedBillIconFromSubcategory({
    ...enriched,
    category: item.category,
    subcategory: item.subcategory || item.name,
    title: item.name,
  }, categories);
  if (enriched.iconUrl) {
    return { ...enriched, domain: "" };
  }
  const cat = (categories || []).find((c) => c.name === item.category);
  const subMeta = findSubcategoryMeta(cat, item.subcategory || item.name);
  if (subMeta) {
    const fromSub = enrichSubcategoryWithPreset(
      normalizeSubcategory(subMeta),
      item.category,
      subscriptions,
      storeData?.recurring,
    );
    if (fromSub.iconUrl) {
      return {
        ...enriched,
        iconUrl: fromSub.iconUrl,
        icon: fromSub.icon || enriched.icon,
        domain: "",
        color: fromSub.color || enriched.color,
      };
    }
    if (!enriched.domain && fromSub.domain) {
      enriched.domain = fromSub.domain;
      enriched.color = fromSub.color || enriched.color;
    }
  }
  return enriched;
}

function txIsAutoSubscriptionBill(item, tx) {
  return tx.source === "subscription" && (
    String(tx.linkedSubscriptionId || "") === item.id
    || subscriptionTxMatchesExact(item, tx)
  );
}

function dedupeTxsByDay(txs) {
  const bestByDay = new Map();
  (txs || []).forEach((t) => {
    const key = sameDayExpenseKey(t);
    const prev = bestByDay.get(key);
    if (!prev || txSourceRank(t) < txSourceRank(prev)) bestByDay.set(key, t);
  });
  return [...bestByDay.values()];
}

function txBelongsToSubscriptionStats(item, t) {
  if (!item || !t || t.flow !== "expense") return false;
  if (String(t.linkedSubscriptionId || "") === item.id) return true;
  if (txIsAutoSubscriptionBill(item, t)) return true;
  if (t.source === "subscription") return false;
  return subscriptionTxMatchesExact(item, t);
}

/** 订阅统计：自动续费 + 手动关联 + 字段完全一致的真实账单 */
function txsForSubscriptionStats(item, txs) {
  const matched = (txs || []).filter((t) => txBelongsToSubscriptionStats(item, t));
  return dedupeTxsByDay(matched);
}

/** 订阅详情列表：仅自动续费记录，不含手动关联 */
function txsForSubscriptionHistory(item, txs) {
  const matched = (txs || []).filter((t) => txIsAutoSubscriptionBill(item, t));
  return dedupeTxsByDay(matched);
}

function txsForSubscription(item, txs) {
  return txsForSubscriptionStats(item, txs);
}

function subscriptionItemStats(item, txs) {
  const auto = txsForSubscriptionHistory(item, txs);
  const all = txsForSubscriptionStats(item, txs);
  const linkedCount = all.filter((t) => String(t.linkedSubscriptionId || "") === item.id).length;
  const exactCount = Math.max(0, all.length - auto.length - linkedCount);
  if (all.length) {
    return {
      start: all.map((t) => t.datetime).sort()[0].slice(0, 10),
      periods: all.length,
      amount: all.reduce((s, t) => s + t.amount, 0),
      autoPeriods: auto.length,
      linkedPeriods: linkedCount,
      exactPeriods: exactCount,
    };
  }
  return {
    start: item.billingAnchor ? String(item.billingAnchor).slice(0, 10) : (item.nextDate || "—"),
    periods: 0,
    amount: 0,
    autoPeriods: 0,
    linkedPeriods: 0,
    exactPeriods: 0,
  };
}

/** 与续费记录弹窗一致的统计（列表卡片展示用） */
function subscriptionRenewalDisplayStats(item, txs) {
  const records = txsForSubscriptionRenewalRecords(item, txs);
  if (!records.length) {
    const fallback = subscriptionItemStats(item, txs);
    return {
      start: fallback.start,
      periods: fallback.periods,
      amount: fallback.amount,
    };
  }
  const sorted = records.map((t) => t.datetime).sort();
  return {
    start: sorted[0].slice(0, 10),
    periods: records.length,
    amount: records.reduce((s, t) => s + t.amount, 0),
  };
}

/** 续费记录：自动续费 + 手动补录/关联 + 名称/金额一致的历史账单 */
function txsForSubscriptionRenewalRecords(item, txs) {
  return dedupeTxsByDay((txs || []).filter((t) => {
    if (!item || !t || t.flow !== "expense") return false;
    if (String(t.linkedSubscriptionId || "") === item.id) return true;
    if (txIsAutoSubscriptionBill(item, t)) return true;
    if (t.source === "subscription") return false;
    return subscriptionTxMatchesExact(item, t);
  }));
}

// ─── 周期记账：阶段 / 补录 / 关联（与订阅平行，入账分类自选） ───

function txIsAutoRecurringBill(item, tx) {
  return tx.source === "recurring" && (
    String(tx.linkedRecurringId || "") === item.id
    || recurringTxMatchesExact(item, tx)
  );
}

function recurringMatchKeys(item) {
  const title = (item.title || "").trim();
  const baseTitle = recurringTitleBase(title);
  const ruleNote = (item.note || "").trim();
  return [...new Set([title, baseTitle, ruleNote].filter(Boolean))];
}

function recurringTxMatchesExact(item, t) {
  if (!item || !t) return false;
  if ((item.category || "") !== (t.category || "")) return false;
  const keys = recurringMatchKeys(item);
  const title = (item.title || "").trim();
  const note = (t.note || "").trim();
  const sub = (item.subcategory || "").trim();
  if (sub && (t.subcategory || "").trim() !== sub) {
    if (!keys.some((k) => note && note.includes(k))) return false;
  }
  if (!title && !keys.length) return true;
  const tSub = (t.subcategory || "").trim();
  if (keys.some((k) => note === k || tSub === k)) return true;
  if (keys.some((k) => note && note.includes(k))) return true;
  if (!note && sub) return true;
  return false;
}

function recurringTxMatchesLoose(item, t) {
  if (!item || !t) return false;
  if ((item.category || "") !== (t.category || "")) return false;
  const keys = recurringMatchKeys(item);
  if (!keys.length) return true;
  const note = (t.note || "").trim();
  const sub = (t.subcategory || "").trim();
  return keys.some((k) => note === k || sub === k || (note && note.includes(k)));
}

function txsForRecurringRenewalRecords(item, txs) {
  const flow = item.flow || "expense";
  return dedupeTxsByDay((txs || []).filter((t) => {
    if (!item || !t || t.flow !== flow) return false;
    if (String(t.linkedRecurringId || "") === item.id) return true;
    if (txIsAutoRecurringBill(item, t)) return true;
    if (t.source === "recurring") return false;
    return recurringTxMatchesExact(item, t);
  }));
}

function recurringRenewalDayMap(item, txs) {
  const map = new Map();
  txsForRecurringRenewalRecords(item, txs).forEach((t) => {
    const d = t.datetime.slice(0, 10);
    if (!map.has(d)) map.set(d, t);
  });
  return map;
}

function buildRecurringRenewalTx(item, dateStr, amount, ledger) {
  return {
    id: uid(),
    datetime: cycleTimeOnDate(dateStr, item),
    flow: item.flow || "expense",
    category: item.category || "",
    subcategory: item.subcategory || "",
    amount,
    ledger: ledger || "",
    accountOut: "",
    accountIn: "",
    note: item.note || item.title || "周期记账",
    reimburse: false,
    discount: 0,
    tags: ["周期"],
    member: "",
    source: "",
    linkedRecurringId: item.id,
    linkedSubscriptionId: "",
  };
}

function patchRecurringRenewalTx(tx, item, dateStr, amount) {
  return {
    ...tx,
    amount,
    datetime: cycleTimeOnDate(dateStr, item),
    flow: item.flow || tx.flow || "expense",
    linkedRecurringId: item.id,
    tags: [...new Set([...(tx.tags || []), "周期"])],
    category: tx.category || item.category || "",
    subcategory: tx.subcategory || item.subcategory || "",
    note: tx.note || item.note || item.title || "",
  };
}

function recurringItemStats(item, txs) {
  const records = txsForRecurringRenewalRecords(item, txs);
  if (records.length) {
    const sorted = records.map((t) => t.datetime).sort();
    return {
      start: sorted[0].slice(0, 10),
      periods: records.length,
      amount: records.reduce((s, t) => s + t.amount, 0),
    };
  }
  return {
    start: item.billingAnchor ? String(item.billingAnchor).slice(0, 10) : (item.nextDate || "—"),
    periods: 0,
    amount: 0,
  };
}

function recurringRenewalDisplayStats(item, txs) {
  const records = txsForRecurringRenewalRecords(item, txs);
  if (!records.length) return recurringItemStats(item, txs);
  const sorted = records.map((t) => t.datetime).sort();
  return {
    start: sorted[0].slice(0, 10),
    periods: records.length,
    amount: records.reduce((s, t) => s + t.amount, 0),
  };
}

function findLinkableRecurringCandidates(item, txs) {
  const flow = item.flow || "expense";
  const included = new Set(txsForRecurringRenewalRecords(item, txs).map((t) => t.id));
  const occupiedDays = new Set(recurringRenewalDayMap(item, txs).keys());
  return (txs || []).filter((t) => {
    if (t.flow !== flow) return false;
    if (included.has(t.id)) return false;
    if (occupiedDays.has(t.datetime.slice(0, 10))) return false;
    if (String(t.linkedRecurringId || "")) return false;
    if (t.source === "recurring") return false;
    return recurringTxMatchesExact(item, t) || recurringTxMatchesLoose(item, t);
  }).sort((a, b) => b.datetime.localeCompare(a.datetime));
}

function getSubscriptionRenewalApi(item) {
  return {
    kind: "subscription",
    item,
    displayName: item.name || "订阅",
    phaseTitle: "续费阶段",
    recordLabel: "续费记录",
    supplementTitle: `补录 · ${item.name}`,
    linkTitle: `${item.name} · 关联已有账单`,
    linkHint: "选择总账本中尚未计入续费阶段的账单，关联后将出现在续费记录里。",
    emptyText: "暂无续费记录",
    getRecords: (txs) => txsForSubscriptionRenewalRecords(item, txs),
    getDayMap: (txs) => subscriptionRenewalDayMap(item, txs),
    buildTx: (d, amt, ledger) => buildSubscriptionRenewalTx(item, d, amt, ledger),
    patchTx: (tx, d, amt) => patchSubscriptionRenewalTx(tx, item, d, amt),
    defaultStart: (txs) => {
      const stats = subscriptionRenewalDisplayStats(item, txs);
      if (stats.start && stats.start !== "—") return stats.start;
      return subscriptionDateValue(item, "startDate") || billingDateValue(item);
    },
    defaultAmount: () => item.amount || "",
    getTxTag: (t) => (
      String(t.linkedSubscriptionId || "") === item.id && t.source !== "subscription"
        ? "补录"
        : (t.source === "subscription" ? "自动" : "")
    ),
    linkPatch: (t) => ({
      ...t,
      linkedSubscriptionId: item.id,
      tags: [...new Set([...(t.tags || []), "订阅"])],
    }),
    findLinkable: (txs) => findLinkableSubscriptionCandidates(item, txs),
    deleteConfirmMsg: (periods) => `确定删除该阶段 ${periods} 笔续费记录？此操作不可恢复。`,
    deleteNotice: (periods) => `已删除 ${periods} 笔续费记录`,
    supplementDoneMsg: (added, skipped) => (
      skipped > 0
        ? `已补录 ${added} 笔，跳过 ${skipped} 笔已有记录`
        : `已补录 ${added} 笔续费账单`
    ),
  };
}

function getRecurringRenewalApi(item) {
  const title = item.title || "周期";
  return {
    kind: "recurring",
    item,
    displayName: title,
    phaseTitle: "记账阶段",
    recordLabel: "记录",
    supplementTitle: `补录 · ${title}`,
    linkTitle: `${title} · 关联已有账单`,
    linkHint: "选择总账本中尚未计入记账阶段的账单，关联后将出现在记账记录里。",
    emptyText: "暂无记账记录",
    getRecords: (txs) => txsForRecurringRenewalRecords(item, txs),
    getDayMap: (txs) => recurringRenewalDayMap(item, txs),
    buildTx: (d, amt, ledger) => buildRecurringRenewalTx(item, d, amt, ledger),
    patchTx: (tx, d, amt) => patchRecurringRenewalTx(tx, item, d, amt),
    defaultStart: (txs) => {
      const stats = recurringRenewalDisplayStats(item, txs);
      if (stats.start && stats.start !== "—") return stats.start;
      if (item.billingAnchor) return String(item.billingAnchor).slice(0, 10);
      return billingDateValue(item);
    },
    defaultAmount: () => item.amount || "",
    getTxTag: (t) => (
      String(t.linkedRecurringId || "") === item.id && t.source !== "recurring"
        ? "补录"
        : (t.source === "recurring" ? "自动" : "")
    ),
    linkPatch: (t) => ({
      ...t,
      linkedRecurringId: item.id,
      tags: [...new Set([...(t.tags || []), "周期"])],
    }),
    findLinkable: (txs) => findLinkableRecurringCandidates(item, txs),
    deleteConfirmMsg: (periods) => `确定删除该阶段 ${periods} 笔记账记录？此操作不可恢复。`,
    deleteNotice: (periods) => `已删除 ${periods} 笔记账记录`,
    supplementDoneMsg: (added, skipped) => (
      skipped > 0
        ? `已补录 ${added} 笔，跳过 ${skipped} 笔已有记录`
        : `已补录 ${added} 笔周期账单`
    ),
  };
}

async function applyRenewalBatchSupplement(plugin, api, dates, amount) {
  const txs = [...(plugin.store.data.transactions || [])];
  const renewalByDay = api.getDayMap(txs);
  const { toAdd, skipped } = splitDatesByExistingDays(dates, new Set(renewalByDay.keys()));

  if (!toAdd.length) {
    return {
      added: 0,
      skipped,
      message: skipped
        ? `所选扣费日均已有记录（${skipped} 笔），无需补录`
        : "没有需要补录的账单",
    };
  }

  const ledger = plugin.store.data.ledger || "";
  for (const d of toAdd) {
    const newTx = api.buildTx(d, amount, ledger);
    plugin.store._ensureCategoryForTx(newTx);
    txs.unshift(newTx);
  }

  plugin.store.data.transactions = txs;
  await plugin.store.save();

  return {
    added: toAdd.length,
    skipped,
    message: api.supplementDoneMsg(toAdd.length, skipped),
  };
}

async function saveRenewalPhaseEdit(plugin, api, phase, start, end, amount, billingItem) {
  const item = api.item;
  const cycleItem = billingItem || resolveBillingItemForPhase(item, phase.txs || []);
  const targetDates = computeSubscriptionPeriodDates(cycleItem, start, end);
  if (!targetDates.length) return { error: "该区间内没有符合周期的扣费日" };

  const targetSet = new Set(targetDates);
  const phaseTxs = phase.txs || [];
  const phaseIds = new Set(phaseTxs.map((t) => t.id).filter(Boolean));
  const phaseByDay = new Map(phaseTxs.map((t) => [t.datetime.slice(0, 10), t]));

  let txs = [...(plugin.store.data.transactions || [])];
  let removed = 0;
  txs = txs.filter((t) => {
    if (!phaseIds.has(t.id)) return true;
    if (!targetSet.has(t.datetime.slice(0, 10))) {
      removed++;
      return false;
    }
    return true;
  });

  const renewalByDay = api.getDayMap(txs);
  let added = 0;
  let updated = 0;
  const ledger = plugin.store.data.ledger || "";

  for (const d of targetDates) {
    const phaseTx = phaseByDay.get(d);
    let idx = phaseTx ? txs.findIndex((t) => t.id === phaseTx.id) : -1;
    if (idx >= 0) {
      txs[idx] = api.patchTx(txs[idx], d, amount);
      updated++;
      continue;
    }
    const existing = renewalByDay.get(d);
    if (existing) {
      idx = txs.findIndex((t) => t.id === existing.id);
      if (idx >= 0) {
        txs[idx] = api.patchTx(txs[idx], d, amount);
        updated++;
        continue;
      }
    }
    const newTx = api.buildTx(d, amount, ledger);
    plugin.store._ensureCategoryForTx(newTx);
    txs.unshift(newTx);
    renewalByDay.set(d, newTx);
    added++;
  }

  plugin.store.data.transactions = txs;
  await plugin.store.save();

  const parts = [];
  if (added) parts.push(`新增 ${added} 笔`);
  if (updated) parts.push(`更新 ${updated} 笔`);
  if (removed) parts.push(`移除 ${removed} 笔`);
  return {
    message: parts.length ? `已保存：${parts.join("，")}` : "已保存该阶段",
    added,
    updated,
    removed,
  };
}

function openSupplementRenewalBill(app, plugin, api, onSaved) {
  if (api.kind === "subscription") normalizeSingleSubscriptionPhases(api.item);
  if (api.kind === "recurring") normalizeSingleRecurringPhases(api.item);
  const item = api.item;
  const allTxs = plugin.store.data.transactions || [];
  const defaultStart = api.defaultStart(allTxs);
  const defaultEnd = dateKey(new Date());
  const cycleLabel = api.kind === "recurring" ? "周期" : "订阅周期";

  openPlgOverlay({
    title: api.supplementTitle,
    cls: "plg-recurring-overlay plg-subscription-overlay",
    wide: true,
    stack: true,
    tier: 3,
    build: (body, close) => {
      addClasses(body, "plg-modal", "plg-recurring-form");
      const form = body.createDiv({ cls: "plg-recurring-form-inner" });
      const fields = mountSubscriptionBatchForm(form, item, {
        mode: "add",
        defaultAmount: api.defaultAmount(),
        defaultStart,
        defaultEnd,
        recordLabel: api.recordLabel,
        cycleLabel,
        getRecords: () => api.getRecords(plugin.store.data.transactions || []),
        getExistingDays: () => new Set(
          api.getDayMap(plugin.store.data.transactions || []).keys(),
        ),
      });

      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = close;
      const confirmBtn = btnRow.createEl("button", { text: "确定", cls: "mod-cta", attr: { type: "button" } });
      confirmBtn.onclick = async () => {
        if (confirmBtn.disabled) return;
        const amount = parseFloat(fields.amountInput.value);
        const start = fields.startDateField.getValue();
        const end = fields.endDateField.getValue();
        if (!amount) return new Notice("请填写金额");
        if (!start || !end) return new Notice("请选择开始与结束日期");
        if (start > end) return new Notice("结束日期不能早于开始日期");
        if (fields.cycleSelect.value === "custom" && !(parseInt(fields.intervalInput.value, 10) > 0)) {
          return new Notice("请填写自定义间隔天数");
        }
        const dates = computeSubscriptionPeriodDates(fields.getBillingItem(), start, end);
        if (!dates.length) return new Notice(`该区间内没有符合${cycleLabel}的扣费日`);

        confirmBtn.disabled = true;
        confirmBtn.textContent = "处理中…";
        try {
          const result = await applyRenewalBatchSupplement(plugin, api, dates, amount);
          new Notice(result.message);
          if (result.added > 0) {
            plugin.refreshView?.();
            onSaved?.();
            close();
          }
        } catch (err) {
          console.error("[PlainLedger] supplement", err);
          new Notice("补录失败：" + (err.message || String(err)));
        } finally {
          confirmBtn.disabled = false;
          confirmBtn.textContent = "确定";
        }
      };
    },
  });
}

async function confirmStartNewRenewalPhase(plugin, api, start, end, amount, billingItem) {
  const item = resolveRenewalStoreItem(plugin, api);
  const liveApi = refreshRenewalApi(plugin, api);
  const today = dateKey(new Date());

  if (api.kind === "subscription") normalizeSingleSubscriptionPhases(item);
  else normalizeSingleRecurringPhases(item);

  const phaseData = {
    amount,
    cycle: billingItem.cycle || "monthly",
    cycleDay: billingItem.cycleDay,
    cycleMonth: billingItem.cycleMonth,
    cycleWeekday: billingItem.cycleWeekday,
    cycleIntervalDays: billingItem.cycleIntervalDays || 0,
    startDate: start,
  };

  if (api.kind === "subscription") {
    if (isSubscriptionRenewing(item)) closeSubscriptionPhase(item, today);
    startSubscriptionPhase(item, phaseData);
  } else {
    if (isRecurringActive(item)) closeRecurringPhase(item, today);
    startRecurringPhase(item, phaseData);
  }

  const dates = (end && start && start <= end)
    ? computeSubscriptionPeriodDates(billingItem, start, end)
    : [];
  let supplementMsg = "";
  if (dates.length) {
    const result = await applyRenewalBatchSupplement(plugin, liveApi, dates, amount);
    supplementMsg = result.added > 0 ? `，已入账 ${result.added} 笔` : "";
  }

  item.nextDate = computeInitialNextDate(item, new Date());
  item.active = true;

  if (api.kind === "subscription") await plugin.store.saveSubscription(item);
  else await plugin.store.saveRecurring(item);

  return { nextDate: item.nextDate, supplementMsg };
}

function openStartNewRenewalPhase(app, plugin, api, onSaved) {
  const liveApi = refreshRenewalApi(plugin, api);
  const item = liveApi.item;
  if (liveApi.kind === "subscription") normalizeSingleSubscriptionPhases(item);
  else normalizeSingleRecurringPhases(item);

  const today = dateKey(new Date());
  const cycleLabel = liveApi.kind === "recurring" ? "周期" : "订阅周期";
  const presetAmount = item.amount || liveApi.defaultAmount() || "";
  const presetCycle = item.cycle || "monthly";

  openPlgOverlay({
    title: `开启新阶段 · ${liveApi.displayName}`,
    cls: "plg-recurring-overlay plg-subscription-overlay",
    wide: true,
    stack: true,
    tier: 3,
    build: (body, close) => {
      addClasses(body, "plg-modal", "plg-recurring-form");
      const form = body.createDiv({ cls: "plg-recurring-form-inner" });
      const fields = mountSubscriptionBatchForm(form, item, {
        mode: "add",
        intent: "newPhase",
        defaultAmount: presetAmount,
        defaultStart: today,
        defaultEnd: "",
        defaultCycle: presetCycle,
        defaultCycleIntervalDays: item.cycleIntervalDays || 0,
        recordLabel: liveApi.recordLabel,
        cycleLabel,
        getExistingDays: () => new Set(
          liveApi.getDayMap(plugin.store.data.transactions || []).keys(),
        ),
      });

      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = close;
      const confirmBtn = btnRow.createEl("button", { text: "开启", cls: "mod-cta", attr: { type: "button" } });
      confirmBtn.onclick = async () => {
        if (confirmBtn.disabled) return;
        const amount = parseFloat(fields.amountInput.value);
        const start = fields.startDateField.getValue();
        const end = fields.endDateField.getValue();
        if (!amount) return new Notice("请填写金额");
        if (!start) return new Notice("请选择开始日期");
        if (end && start > end) return new Notice("结束日期不能早于开始日期");
        if (fields.cycleSelect.value === "custom" && !(parseInt(fields.intervalInput.value, 10) > 0)) {
          return new Notice("请填写自定义间隔天数");
        }
        const billingItem = fields.getBillingItem();
        if (end) {
          const dates = computeSubscriptionPeriodDates(billingItem, start, end);
          if (!dates.length) return new Notice(`该区间内没有符合${cycleLabel}的扣费日`);
        }

        confirmBtn.disabled = true;
        confirmBtn.textContent = "处理中…";
        try {
          const result = await confirmStartNewRenewalPhase(
            plugin,
            liveApi,
            start,
            end,
            amount,
            billingItem,
          );
          plugin.refreshView?.();
          onSaved?.();
          close();
          new Notice(`已开启新阶段，下一笔 ${result.nextDate || "—"}${result.supplementMsg || ""}`);
        } catch (err) {
          console.error("[PlainLedger] new phase", err);
          new Notice("开启失败：" + (err.message || String(err)));
        } finally {
          confirmBtn.disabled = false;
          confirmBtn.textContent = "开启";
        }
      };
    },
  });
}

function openStartNewSubscriptionPhase(app, plugin, item, onSaved) {
  openStartNewRenewalPhase(app, plugin, getSubscriptionRenewalApi(item), onSaved);
}

function openStartNewRecurringPhase(app, plugin, item, onSaved) {
  openStartNewRenewalPhase(app, plugin, getRecurringRenewalApi(item), onSaved);
}

function openSupplementSubscriptionBill(app, plugin, item, onSaved) {
  openSupplementRenewalBill(app, plugin, getSubscriptionRenewalApi(item), onSaved);
}

function openSupplementRecurringBill(app, plugin, item, onSaved) {
  openSupplementRenewalBill(app, plugin, getRecurringRenewalApi(item), onSaved);
}

function findLinkableSubscriptionCandidates(item, txs) {
  const included = new Set(txsForSubscriptionRenewalRecords(item, txs).map((t) => t.id));
  const occupiedDays = new Set(subscriptionRenewalDayMap(item, txs).keys());
  return (txs || []).filter((t) => {
    if (t.flow !== "expense") return false;
    if (included.has(t.id)) return false;
    if (occupiedDays.has(t.datetime.slice(0, 10))) return false;
    if (String(t.linkedSubscriptionId || "")) return false;
    if (t.source === "subscription") return false;
    return subscriptionTxMatchesExact(item, t) || subscriptionTxMatchesStrict(item, t);
  }).sort((a, b) => b.datetime.localeCompare(a.datetime));
}

function openLinkExistingRenewalBills(app, plugin, api, onSaved) {
  openPlgOverlay({
    title: api.linkTitle,
    cls: "plg-tx-history-overlay",
    wide: true,
    stack: true,
    tier: 3,
    build: (body, close) => {
      addClasses(body, "plg-modal");
      body.createDiv({
        cls: "plg-muted plg-bill-form-hint",
        text: api.linkHint,
      });
      const listEl = body.createDiv({ cls: "plg-sub-link-candidate-list" });

      const refresh = () => {
        listEl.empty();
        const candidates = api.findLinkable(plugin.store.data.transactions || []);
        if (!candidates.length) {
          listEl.createDiv({ cls: "plg-empty", text: "暂无可关联的账单" });
          return;
        }
        candidates.forEach((t) => {
          const row = listEl.createDiv({ cls: "plg-sub-history-row plg-tx-history-row-clickable" });
          row.createSpan({ cls: "plg-sub-history-date", text: t.datetime.slice(0, 16) });
          row.createSpan({ cls: "plg-sub-history-amt", text: fmtMoney(t.amount) });
          const detail = [t.subcategory, t.note].filter(Boolean).join(" · ");
          if (detail) row.createSpan({ cls: "plg-sub-history-note plg-muted", text: detail });
          row.createEl("button", {
            text: "关联",
            cls: "plg-btn-primary plg-sub-link-btn",
            attr: { type: "button" },
          }).onclick = async (e) => {
            e.stopPropagation();
            await plugin.store.updateTransaction(api.linkPatch(t));
            new Notice("已关联");
            plugin.refreshView?.();
            refresh();
            onSaved?.();
          };
        });
      };

      refresh();
      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "完成", cls: "mod-cta", attr: { type: "button" } }).onclick = close;
    },
  });
}

function openLinkExistingSubscriptionBills(app, plugin, item, onSaved) {
  openLinkExistingRenewalBills(app, plugin, getSubscriptionRenewalApi(item), onSaved);
}

function openLinkExistingRecurringBills(app, plugin, item, onSaved) {
  openLinkExistingRenewalBills(app, plugin, getRecurringRenewalApi(item), onSaved);
}

const SUBSCRIPTION_PHASE_GAP_DAYS = 45;

function buildSubscriptionRenewalPhases(txs) {
  const sorted = dedupeTxsByDay(txs || []).sort((a, b) => a.datetime.localeCompare(b.datetime));
  if (!sorted.length) return [];

  const byAmount = new Map();
  sorted.forEach((t) => {
    const k = Number(t.amount).toFixed(2);
    if (!byAmount.has(k)) byAmount.set(k, []);
    byAmount.get(k).push(t);
  });

  const phases = [];
  const splitByGap = (list, unitAmount) => {
    if (!list.length) return;
    let chunk = [list[0]];
    for (let i = 1; i < list.length; i++) {
      const prev = new Date(list[i - 1].datetime.slice(0, 10));
      const cur = new Date(list[i].datetime.slice(0, 10));
      const gap = (cur - prev) / 86400000;
      if (gap > SUBSCRIPTION_PHASE_GAP_DAYS) {
        phases.push(finalizeSubscriptionPhase(chunk, unitAmount));
        chunk = [list[i]];
      } else {
        chunk.push(list[i]);
      }
    }
    phases.push(finalizeSubscriptionPhase(chunk, unitAmount));
  };

  byAmount.forEach((list, amtKey) => splitByGap(list, parseFloat(amtKey)));
  phases.sort((a, b) => a.start.localeCompare(b.start));
  return phases;
}

function finalizeSubscriptionPhase(txs, unitAmount) {
  const sorted = [...txs].sort((a, b) => a.datetime.localeCompare(b.datetime));
  const billingItem = resolveBillingItemForPhase({ cycle: "monthly" }, sorted);
  return {
    start: sorted[0].datetime.slice(0, 10),
    end: sorted[sorted.length - 1].datetime.slice(0, 10),
    periods: sorted.length,
    amount: sorted.reduce((s, t) => s + t.amount, 0),
    unitAmount,
    txs: sorted,
    billingItem,
    cycleLabel: formatRecurringLabel(billingItem),
  };
}

function openEditRenewalPhase(app, plugin, api, phase, phaseIndex, onSaved) {
  const item = api.item;
  const cycleLabel = api.kind === "recurring" ? "周期" : "订阅周期";
  openPlgOverlay({
    title: `修改 · 阶段 ${phaseIndex + 1}`,
    cls: "plg-recurring-overlay plg-subscription-overlay",
    wide: true,
    stack: true,
    tier: 3,
    build: (body, close) => {
      addClasses(body, "plg-modal", "plg-recurring-form");
      const form = body.createDiv({ cls: "plg-recurring-form-inner" });
      const fields = mountSubscriptionBatchForm(form, item, {
        mode: "edit",
        defaultAmount: phase.unitAmount,
        defaultStart: phase.start,
        defaultEnd: phase.end,
        defaultCycle: phase.billingItem?.cycle,
        defaultCycleIntervalDays: phase.billingItem?.cycleIntervalDays,
        recordLabel: api.recordLabel,
        cycleLabel,
        phaseTxs: phase.txs,
      });

      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = close;
      const saveBtn = btnRow.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } });
      saveBtn.onclick = async () => {
        if (saveBtn.disabled) return;
        const amount = parseFloat(fields.amountInput.value);
        const start = fields.startDateField.getValue();
        const end = fields.endDateField.getValue();
        if (!amount) return new Notice("请填写金额");
        if (!start || !end) return new Notice("请选择开始与结束日期");
        if (start > end) return new Notice("结束日期不能早于开始日期");
        if (fields.cycleSelect.value === "custom" && !(parseInt(fields.intervalInput.value, 10) > 0)) {
          return new Notice("请填写自定义间隔天数");
        }
        saveBtn.disabled = true;
        saveBtn.textContent = "保存中…";
        try {
          const result = await saveRenewalPhaseEdit(
            plugin,
            api,
            phase,
            start,
            end,
            amount,
            fields.getBillingItem(),
          );
          if (result.error) {
            new Notice(result.error);
            return;
          }
          plugin.refreshView?.();
          onSaved?.();
          close();
          new Notice(result.message);
        } catch (err) {
          console.error("[PlainLedger] save phase", err);
          new Notice("保存失败：" + (err.message || String(err)));
        } finally {
          saveBtn.disabled = false;
          saveBtn.textContent = "保存";
        }
      };
    },
  });
}

function openRenewalPhaseHistory(app, plugin, api, onOuterRefresh) {
  const item = api.item;
  openPlgOverlay({
    title: `${api.displayName} · ${api.phaseTitle}`,
    cls: "plg-tx-history-overlay plg-sub-phase-overlay wide",
    wide: true,
    stack: true,
    tier: 2,
    build: (body, close) => {
      addClasses(body, "plg-modal");
      const header = body.createDiv({ cls: "plg-sub-phase-header" });
      const summaryEl = header.createDiv({ cls: "plg-sub-phase-summary" });
      const headerActions = header.createDiv({ cls: "plg-sub-phase-header-actions" });
      headerActions.createEl("button", {
        text: "补录",
        cls: "plg-btn-ghost",
        attr: { type: "button", title: "补录过往账单" },
      }).onclick = () => {
        openSupplementRenewalBill(app, plugin, refreshRenewalApi(plugin, api), () => {
          refreshList();
          onOuterRefresh?.();
        });
      };
      headerActions.createEl("button", {
        text: "开启新阶段",
        cls: "plg-btn-primary",
        attr: { type: "button", title: "从今天起新建续费阶段" },
      }).onclick = () => {
        openStartNewRenewalPhase(app, plugin, api, () => {
          refreshList();
          onOuterRefresh?.();
        });
      };
      headerActions.createEl("button", {
        text: "关联已有",
        cls: "plg-btn-ghost",
        attr: { type: "button", title: "从总账本关联历史账单" },
      }).onclick = () => {
        openLinkExistingRenewalBills(app, plugin, refreshRenewalApi(plugin, api), () => {
          refreshList();
          onOuterRefresh?.();
        });
      };

      const listEl = body.createDiv({ cls: "plg-sub-phase-list" });
      const emptyEl = body.createDiv({ cls: "plg-empty", text: api.emptyText });

      const refreshList = () => {
        listEl.empty();
        summaryEl.empty();
        const allTxs = plugin.store.data.transactions || [];
        const records = api.getRecords(allTxs);
        const phases = buildSubscriptionRenewalPhases(records)
          .sort((a, b) => a.start.localeCompare(b.start));
        if (!phases.length) {
          summaryEl.addClass("hidden");
          listEl.addClass("hidden");
          emptyEl.removeClass("hidden");
          return;
        }
        summaryEl.removeClass("hidden");
        listEl.removeClass("hidden");
        emptyEl.addClass("hidden");
        const totalAmt = phases.reduce((s, p) => s + p.amount, 0);
        const totalPeriods = phases.reduce((s, p) => s + p.periods, 0);
        summaryEl.createSpan({ text: `共 ${phases.length} 个阶段 · ${totalPeriods} 笔 · 合计 ` });
        summaryEl.createSpan({ cls: "plg-sub-phase-summary-amt", text: fmtMoney(totalAmt) });

        phases.forEach((phase, idx) => {
          const block = listEl.createDiv({ cls: "plg-sub-phase-block" });
          const bodyRow = block.createDiv({ cls: "plg-sub-phase-body" });
          const bodyMain = bodyRow.createDiv({ cls: "plg-sub-phase-body-main" });
          const headMain = bodyMain.createDiv({ cls: "plg-sub-phase-head-main" });
          headMain.createSpan({ cls: "plg-sub-phase-title", text: `阶段 ${idx + 1}` });
          const range = phase.start === phase.end ? phase.start : `${phase.start} — ${phase.end}`;
          headMain.createSpan({ cls: "plg-sub-phase-range", text: range });
          const stats = bodyMain.createDiv({ cls: "plg-sub-phase-stats" });
          stats.createSpan({ cls: "plg-sub-phase-stat-unit", text: `单价 ${fmtMoney(phase.unitAmount)}` });
          stats.createSpan({ cls: "plg-sub-phase-stat-sep", text: "·" });
          if (phase.cycleLabel) {
            stats.createSpan({ cls: "plg-sub-phase-stat-cycle", text: phase.cycleLabel });
            stats.createSpan({ cls: "plg-sub-phase-stat-sep", text: "·" });
          }
          stats.createSpan({ cls: "plg-sub-phase-stat-periods", text: `${phase.periods} 笔` });
          stats.createSpan({ cls: "plg-sub-phase-stat-sep", text: "·" });
          stats.createSpan({ cls: "plg-sub-phase-stat-total", text: `合计 ${fmtMoney(phase.amount)}` });
          const headActions = bodyRow.createDiv({ cls: "plg-sub-phase-actions" });
          headActions.createEl("button", {
            text: "修改",
            cls: "plg-btn-plain plg-sub-phase-btn",
            attr: { type: "button" },
          }).onclick = (e) => {
            e.stopPropagation();
            openEditRenewalPhase(app, plugin, api, phase, idx, () => {
              refreshList();
              onOuterRefresh?.();
            });
          };
          headActions.createEl("button", {
            text: "删除",
            cls: "plg-btn-plain plg-sub-phase-btn plg-sub-phase-btn-danger",
            attr: { type: "button" },
          }).onclick = (e) => {
            e.stopPropagation();
            confirmPlgAction({
              title: `删除 · 阶段 ${idx + 1}`,
              message: api.deleteConfirmMsg(phase.periods),
              confirmText: "删除",
              danger: true,
              onConfirm: async () => {
                for (const t of phase.txs) {
                  await plugin.store.deleteTransaction(t.id);
                }
                plugin.refreshView?.();
                refreshList();
                onOuterRefresh?.();
                new Notice(api.deleteNotice(phase.periods));
              },
            });
          };
          const detail = block.createDiv({ cls: "plg-sub-phase-detail hidden" });
          phase.txs.slice().sort((a, b) => a.datetime.localeCompare(b.datetime)).forEach((t) => {
            const row = detail.createDiv({ cls: "plg-sub-history-row plg-sub-phase-tx-row plg-tx-history-row-clickable" });
            row.createSpan({ cls: "plg-sub-history-date", text: t.datetime.slice(0, 16) });
            row.createSpan({ cls: "plg-sub-history-amt", text: fmtMoney(t.amount) });
            const tag = api.getTxTag(t);
            if (tag) row.createSpan({ cls: "plg-sub-phase-tx-tag", text: tag });
            if (t.note) row.createSpan({ cls: "plg-sub-history-note plg-muted", text: t.note });
            row.onclick = () => {
              openEditTransaction(app, plugin, { ...t }, () => {
                plugin.refreshView?.();
                refreshList();
                onOuterRefresh?.();
              }, async () => {
                await plugin.store.deleteTransaction(t.id);
                plugin.refreshView?.();
                refreshList();
                onOuterRefresh?.();
              });
            };
          });
          headMain.onclick = () => {
            detail.toggleClass("hidden");
            block.toggleClass("open");
          };
        });
      };

      refreshList();
      body.createDiv({ cls: "plg-modal-actions" }).createEl("button", {
        text: "关闭",
        attr: { type: "button" },
      }).onclick = close;
    },
  });
}

function openSubscriptionPhaseHistory(app, plugin, item, onOuterRefresh) {
  openRenewalPhaseHistory(app, plugin, getSubscriptionRenewalApi(item), onOuterRefresh);
}

function openRecurringPhaseHistory(app, plugin, item, onOuterRefresh) {
  openRenewalPhaseHistory(app, plugin, getRecurringRenewalApi(item), onOuterRefresh);
}

function openSubscriptionHistory(app, plugin, item, mode = "auto") {
  if (mode === "auto") {
    openSubscriptionPhaseHistory(app, plugin, item);
    return;
  }
  const allTxs = plugin.store.data.transactions || [];
  openTransactionHistoryDialog(app, plugin, {
    title: `${item.name} · 全部账单`,
    getTransactions: () => txsForSubscriptionStats(item, allTxs),
    onRefresh: () => plugin.refreshView(),
  });
}

function subscriptionExpenseBreakdown(txs, predicate) {
  const filtered = (txs || []).filter((t) => t.flow === "expense" && predicate(t));
  const total = filtered.reduce((s, t) => s + t.amount, 0);
  const map = new Map();
  filtered.forEach((t) => {
    const key = (t.note || t.subcategory || "其他").trim() || "其他";
    map.set(key, (map.get(key) || 0) + t.amount);
  });
  const items = [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, amt]) => ({
      name,
      amt,
      pct: total > 0 ? Math.round((amt / total) * 1000) / 10 : 0,
    }));
  return { total, items };
}

function renderSubMetricPop(parent, lines, emptyText) {
  const pop = parent.createDiv({ cls: "plg-sub-metric-pop" });
  if (!lines.length) {
    pop.createDiv({ cls: "plg-sub-metric-pop-empty", text: emptyText || "暂无数据" });
    return;
  }
  lines.forEach((line) => {
    const row = pop.createDiv({ cls: "plg-sub-metric-pop-row" });
    row.createSpan({ cls: "plg-sub-metric-pop-name", text: line.name });
    row.createSpan({ cls: "plg-sub-metric-pop-amt", text: line.amtText || fmtMoney(line.amt) });
    if (line.pct != null) row.createSpan({ cls: "plg-sub-metric-pop-pct", text: `${line.pct}%` });
    if (line.sub) row.createSpan({ cls: "plg-sub-metric-pop-sub", text: line.sub });
  });
}

function renderSettingsSubscriptions(container, plugin, focusOpts = null) {
  const headRow = container.createDiv({ cls: "plg-sub-head-row" });
  const searchInput = headRow.createEl("input", {
    type: "search",
    cls: "plg-sub-search-input",
    attr: { placeholder: "搜索订阅服务名称" },
  });
  headRow.createEl("button", {
    text: "+ 新增订阅",
    cls: "plg-btn-primary",
    attr: { type: "button" },
  }).onclick = () => {
    openSubscriptionBill(plugin.app, plugin, null, null, () => {
      plugin.refreshView();
      renderAll();
    });
  };

  const searchResults = container.createDiv({ cls: "plg-sub-search-results" });
  searchResults.removeClass("is-block"); searchResults.removeClass("is-grid");

  const overview = container.createDiv({ cls: "plg-sub-overview" });
  const listEl = container.createDiv({ cls: "plg-sub-list", attr: { id: "plg-sub-list-anchor" } });

  const openPreset = (p) => {
    const existing = (plugin.store.data.subscriptions || []).find((s) => s.name === p.name);
    openSubscriptionBill(plugin.app, plugin, existing ? { ...existing } : null, p, () => {
      plugin.refreshView();
      renderAll();
    });
  };

  const renderSearch = () => {
    const q = searchInput.value.trim().toLowerCase();
    searchResults.empty();
    if (!q) {
      searchResults.removeClass("is-block"); searchResults.removeClass("is-grid");
      return;
    }
    const presets = SUBSCRIPTION_PRESETS.filter((p) =>
      p.name.toLowerCase().includes(q) || (p.subcategory || "").toLowerCase().includes(q)
    );
    const custom = (plugin.store.data.subscriptions || []).filter((s) =>
      s.name.toLowerCase().includes(q) && !presets.some((p) => p.name === s.name)
    );
    if (!presets.length && !custom.length) {
      searchResults.createDiv({ cls: "plg-empty", text: "未找到匹配的订阅服务" });
      searchResults.removeClass("is-grid"); searchResults.addClass("is-block");
      return;
    }
    presets.forEach((p) => {
      const cell = searchResults.createDiv({ cls: "plg-sub-search-cell", attr: { title: p.name } });
      renderSubscriptionIcon(cell, p, plugin);
      cell.createDiv({ cls: "plg-sub-search-name", text: p.name });
      cell.onclick = () => openPreset(p);
    });
    custom.forEach((s) => {
      const cell = searchResults.createDiv({ cls: "plg-sub-search-cell", attr: { title: s.name } });
      renderSubscriptionIcon(cell, enrichSubscriptionItem(s, plugin.store.data), plugin);
      cell.createDiv({ cls: "plg-sub-search-name", text: s.name });
      cell.onclick = () => {
        openSubscriptionBill(plugin.app, plugin, { ...s }, null, () => {
          plugin.refreshView();
          renderAll();
        });
      };
    });
    searchResults.removeClass("is-block"); searchResults.addClass("is-grid");
  };

  searchInput.addEventListener("input", renderSearch);

  const renderAll = () => {
    renderOverview();
    renderList();
    renderSearch();
  };

  const renderOverview = () => {
    overview.empty();
    const metricsGrid = overview.createDiv({ cls: "plg-sub-metrics-grid" });
    const subs = plugin.store.data.subscriptions || [];
    const subTxs = subscriptionTxFilter(plugin.store.data.transactions, subs);
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}`;
    const yearKey = `${now.getFullYear()}-`;
    const monthBreak = subscriptionExpenseBreakdown(subTxs, (t) => t.datetime.startsWith(monthKey));
    const yearBreak = subscriptionExpenseBreakdown(subTxs, (t) => t.datetime.startsWith(yearKey));
    const totalBreak = subscriptionExpenseBreakdown(subTxs, () => true);
    const firstDate = subTxs.length
      ? subTxs.map((t) => parseDateTime(t.datetime)).sort((a, b) => a - b)[0]
      : null;
    const days = firstDate ? Math.max(1, Math.ceil((now - firstDate) / 86400000)) : 1;
    const daily = totalBreak.total / days;
    const activeSubs = subs.filter((s) => isSubscriptionRenewing(s));
    const pausedSubs = subs.filter((s) => !isSubscriptionRenewing(s));
    const allTxs = plugin.store.data.transactions || [];

    [
      {
        label: "总支出",
        val: fmtMoney(totalBreak.total),
        cls: "green",
        icon: "💳",
        popLines: totalBreak.items.map((i) => ({ name: i.name, amt: i.amt, pct: i.pct })),
        popEmpty: "暂无订阅支出",
      },
      {
        label: "本年支出",
        val: fmtMoney(yearBreak.total),
        cls: "teal",
        icon: "🗓️",
        popLines: yearBreak.items.map((i) => ({ name: i.name, amt: i.amt, pct: i.pct })),
        popEmpty: "本年暂无订阅支出",
      },
      {
        label: "本月支出",
        val: fmtMoney(monthBreak.total),
        cls: "blue",
        icon: "📅",
        popLines: monthBreak.items.map((i) => ({ name: i.name, amt: i.amt, pct: i.pct })),
        popEmpty: "本月暂无订阅支出",
      },
      {
        label: "日均支出",
        val: fmtMoney(daily),
        cls: "orange",
        icon: "📈",
        popLines: totalBreak.items.map((i) => ({
          name: i.name,
          amt: i.amt,
          pct: i.pct,
          sub: `日均 ${fmtMoney(i.amt / days)}`,
        })),
        popEmpty: "暂无订阅支出",
      },
      {
        label: "自动续费",
        val: String(activeSubs.length),
        cls: "purple",
        icon: "🔄",
        popLines: [
          ...activeSubs.map((s) => ({
            name: s.name,
            amtText: fmtMoney(s.amount),
            sub: formatRecurringLabel(s),
          })),
          ...pausedSubs.map((s) => {
            const st = subscriptionItemStats(s, allTxs);
            return {
              name: s.name,
              amtText: fmtMoney(st.amount),
              sub: "已暂停 · 不计入自动续费",
            };
          }),
        ],
        popEmpty: "暂无生效中的订阅",
        onClick: () => listEl.scrollIntoView({ behavior: "smooth", block: "start" }),
      },
    ].forEach((m) => {
      const card = metricsGrid.createDiv({ cls: `plg-sub-metric ${m.cls}` + (m.popLines ? " has-pop" : "") });
      card.createDiv({ cls: "plg-sub-metric-icon", text: m.icon });
      card.createDiv({ cls: "plg-sub-metric-label", text: m.label });
      card.createDiv({ cls: "plg-sub-metric-val", text: m.val });
      renderSubMetricPop(card, m.popLines, m.popEmpty);
      if (m.onClick) {
        card.addClass("clickable");
        card.onclick = m.onClick;
      }
    });
  };

  const renderList = () => {
    listEl.empty();
    const items = plugin.store.data.subscriptions || [];
    const allTxs = plugin.store.data.transactions || [];
    if (!items.length) {
      listEl.createDiv({ cls: "plg-empty", text: "暂无订阅，可搜索服务名称或点「新增订阅」" });
      return;
    }
    items.forEach((item) => {
      normalizeSingleSubscriptionPhases(item);
      const renewing = isSubscriptionRenewing(item);
      const enriched = enrichSubscriptionItem(item, plugin.store.data);
      const stats = subscriptionRenewalDisplayStats(item, allTxs);
      const card = listEl.createDiv({
        cls: "plg-sub-card plg-recurring-card plg-sub-card-clickable plg-sub-card-v2" + (renewing ? "" : " paused"),
      });
      card.dataset.subId = item.id;

      const openAllHistory = () => openSubscriptionHistory(plugin.app, plugin, item, "all");

      const top = card.createDiv({ cls: "plg-sub-card-top" });
      const identity = top.createDiv({ cls: "plg-sub-card-identity" });
      const label = identity.createDiv({ cls: "plg-recurring-icon plg-cat-label plg-sub-cat-label" });
      renderCategoryIcon(label, enriched);
      const textCol = label.createDiv({ cls: "plg-cat-label-text" });
      const nameRow = textCol.createDiv({ cls: "plg-sub-card-name-row" });
      nameRow.createSpan({ cls: "plg-sub-card-name", text: item.name });
      nameRow.createSpan({
        cls: "plg-sub-card-badge" + (renewing ? " is-active" : " is-paused"),
        text: renewing ? "续费中" : "已暂停",
      });
      textCol.createDiv({
        cls: "plg-sub-card-meta plg-muted",
        text: subscriptionCardSubMeta(item),
      });
      const statsParts = [];
      const fullStats = subscriptionItemStats(item, allTxs);
      if (fullStats.periods > stats.periods) {
        statsParts.push(`含 ${fullStats.periods - stats.periods} 笔未计入续费记录`);
      }
      const statsHint = statsParts.length ? ` · ${statsParts.join(" · ")}` : "";
      textCol.createDiv({
        cls: "plg-sub-card-stats",
        text: renewing
          ? `开始 ${stats.start} · 已扣 ${stats.periods} 期 · ${fmtMoney(stats.amount)}${statsHint}`
          : `开始 ${stats.start} · ${stats.periods} 笔 · 累计 ${fmtMoney(stats.amount)}${statsHint}`,
      });

      const side = top.createDiv({ cls: "plg-sub-card-side" });
      if (renewing) {
        side.createDiv({ cls: "plg-sub-card-next", text: `下一笔 ${item.nextDate || "—"}` });
      } else {
        const pauseHint = item.pausedAt ? `已于 ${item.pausedAt} 暂停` : "已暂停 · 不自动续费";
        side.createDiv({
          cls: "plg-sub-card-next paused",
          text: stats.amount > 0 ? `累计 ${fmtMoney(stats.amount)}` : "暂无支出",
        });
        side.createDiv({ cls: "plg-sub-card-side-hint", text: pauseHint });
      }
      side.onclick = (e) => {
        e.stopPropagation();
        openSubscriptionPhaseHistory(plugin.app, plugin, item, () => renderAll());
      };

      card.onclick = (e) => {
        if (e.target.closest("button, .plg-sub-card-actions, .plg-sub-card-side")) return;
        openAllHistory();
      };

      const actions = card.createDiv({ cls: "plg-sub-card-actions" });
      actions.createEl("button", {
        text: "续费记录",
        cls: "plg-btn-ghost",
        attr: { type: "button" },
      }).onclick = (e) => {
        e.stopPropagation();
        openSubscriptionPhaseHistory(plugin.app, plugin, item, () => renderAll());
      };
      actions.createEl("button", { text: "编辑", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = (e) => {
        e.stopPropagation();
        openSubscriptionBill(plugin.app, plugin, { ...item }, null, () => renderAll());
      };
      actions.createEl("button", {
        text: renewing ? "暂停" : "开启新阶段",
        cls: renewing ? "plg-btn-ghost" : "plg-btn-primary",
        attr: { type: "button" },
      }).onclick = async (e) => {
        e.stopPropagation();
        if (renewing) {
          closeSubscriptionPhase(item, dateKey(new Date()));
          await plugin.store.saveSubscription(item);
          plugin.refreshView?.();
          renderAll();
        } else {
          openStartNewSubscriptionPhase(plugin.app, plugin, item, () => renderAll());
        }
      };
      actions.createEl("button", { text: "删除", cls: "plg-btn-ghost", attr: { type: "button" } }).onclick = (e) => {
        e.stopPropagation();
        confirmPlgAction({
          title: "删除订阅规则",
          message: "确定删除这条订阅规则吗？已入账的历史账单不会被删除。",
          confirmText: "删除",
          danger: true,
          onConfirm: async () => {
            await plugin.store.deleteSubscription(item.id);
            renderAll();
          },
        });
      };
    });
  };

  renderAll();
  if (focusOpts?.section === "subscription" && focusOpts.id) {
    window.requestAnimationFrame(() => {
      listEl.scrollIntoView({ behavior: "smooth", block: "start" });
      const el = listEl.querySelector(`[data-sub-id="${focusOpts.id}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.addClass("plg-settings-focus-highlight");
        window.setTimeout(() => el.removeClass("plg-settings-focus-highlight"), 2400);
      }
    });
  }
}

/** PlainLedger 导航/面板彩色图标（恢复自 4.0.3） */
const PLG_NAV_ICON_SVG = {
  ledger: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M741.939 95.754l-415.984 0c-131.539 0-157.866 30.505-157.985 155.152 4.099-0.146 4.099 0.608 4.099 0.608l-3.466 0c-34.467 0-44.053 28.16-44.053 62.877 0 34.724 9.586 62.874 44.053 62.874l-0.231-1.043 0 87.646 0.231-5.419c-34.467 0-44.053 28.151-44.053 62.867 0 34.733 9.586 62.877 44.053 62.877l-0.231-6.385 0 96.411 0.231-8.834c-34.467 0-44.053 28.144-44.053 62.858 0 34.733 2.26 70.631 36.728 70.631 0 0 0 0 6.445-0.068 0.933 109.403 25.781 129.585 158.233 129.585l415.984 0c115.763 0 153.895-27.271 153.895-136.519l0-541.113c0-132.162-34.573-155.007-153.895-155.007zM676.716 560.278c22.632 0 34.427 12.154 35.478 35.059 1.053 22.938-10.835 37.147-38.995 37.043-16.098-0.034-92.892-1.985-92.892-1.985l0 78.881c0 22.923-21.73 26.91-44.509 26.91-22.774 0-43.138-3.987-43.138-26.91l0-78.881-96.409 0c-22.586 0-35.059-12.137-35.059-35.059 0-15.236-0.298-5.153-0.205-6.283 1.739-21.329 13.781-28.776 35.264-28.776l96.41 0 0-52.588-96.41 0c-16.597 0-32.969-3.989-32.969-41.88 0-22.929 13.943-37 36.728-37l73.452 0-50.122-46.383-23.419-23.588c-15.185-15.296-15.526-39.304-2.038-55.61 0.805-0.976 1.139-2.191 2.038-3.115 16.109-16.212 42.197-16.212 58.305 0l3.074 3.115 75.003 75.527 78.069-78.642c16.108-16.212 42.188-16.212 58.287 0 16.1 16.21 16.1 42.522 0 58.725l-70.648 69.971 73.456 0c22.775 0 36.727 14.071 36.727 37 0 22.93-12.702 41.88-35.478 41.88l-96.41 0 0 52.588 96.41 0z\" fill=\"#1296db\"></path></svg>",
  stats: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h1024v1024H0V0z\" fill=\"#202425\" opacity=\".01\"></path><path d=\"M921.6 546.133333A443.733333 443.733333 0 1 1 477.866667 102.4v443.733333h443.733333z\" fill=\"#11AA66\"></path><path d=\"M989.866667 477.866667A443.733333 443.733333 0 0 0 546.133333 34.133333v443.733334h443.733334z\" fill=\"#FFAA44\"></path></svg>",
  add: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M530.485895 1.347368a485.052632 485.052632 0 1 1 0 970.105264 485.052632 485.052632 0 0 1 0-970.105264z m11.587368 242.526316h-23.174737a40.421053 40.421053 0 0 0-40.421052 40.421053V434.391579l-150.096842 0.053895a40.421053 40.421053 0 0 0-40.421053 40.421052v23.120842c0 22.312421 18.108632 40.421053 40.421053 40.421053h150.096842v150.096842c0 22.366316 18.162526 40.421053 40.421052 40.421053h23.174737a40.421053 40.421053 0 0 0 40.421053-40.421053V538.408421h150.096842a40.421053 40.421053 0 0 0 40.421053-40.421053v-23.066947a40.421053 40.421053 0 0 0-40.421053-40.421053h-150.150737V284.240842a40.421053 40.421053 0 0 0-40.421053-40.421053z\" fill=\"#EA5624\"></path></svg>",
  reports: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M865.2 887H158.8c-23.5 0-42.5-19-42.5-42.5s19-42.5 42.5-42.5h706.4c23.5 0 42.5 19 42.5 42.5s-19 42.5-42.5 42.5z\" fill=\"#5F6165\"></path><path d=\"M235.6 753.5h-58c-18.8 0-34-15.2-34-34V552.4c0-18.8 15.2-34 34-34h58c18.8 0 34 15.2 34 34v167.1c0 18.7-15.3 34-34 34z\" fill=\"#F65509\"></path><path d=\"M438.7 753.5h-57.1c-19 0-34.5-15.4-34.5-34.5V291.4c0-19 15.4-34.5 34.5-34.5h57.1c19 0 34.5 15.4 34.5 34.5V719c0 19-15.5 34.5-34.5 34.5zM642.9 753.5h-58.2c-18.7 0-33.9-15.2-33.9-33.9V426.8c0-18.7 15.2-33.9 33.9-33.9h58.2c18.7 0 33.9 15.2 33.9 33.9v292.7c0 18.8-15.2 34-33.9 34zM846.4 753.5h-57.8c-18.8 0-34.1-15.3-34.1-34.1V171.1c0-18.8 15.3-34.1 34.1-34.1h57.8c18.8 0 34.1 15.3 34.1 34.1v548.3c-0.1 18.8-15.3 34.1-34.1 34.1z\" fill=\"#5F6165\"></path></svg>",
  settings: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M999.327304 629.365605c-45.555661-19.322766-77.546995-64.494531-77.546996-117.088285s31.991335-97.765519 77.546996-117.088285c19.322766-8.189782 29.559993-29.815924 23.161726-49.650552-7.549955-22.905796-16.507529-45.171765-26.872721-66.669941-8.957574-18.682939-31.351508-27.896444-50.546309-19.962593-46.067522 18.93887-100.964652 9.853331-138.458497-27.640513-38.261636-38.261636-46.963279-94.822316-26.360859-141.529665 8.573678-19.322766 1.023723-42.228562-17.659217-52.081893-26.616791-14.076187-54.6412-25.976964-83.689332-35.446399-19.962593-6.526232-41.46077 3.83896-49.650551 23.161726-19.322766 45.683626-64.494531 77.674961-117.216251 77.674961-52.72172 0-97.893484-32.1193-117.216251-77.802926-7.933851-19.450732-29.432028-29.815924-49.39462-23.289692-27.000687 8.829608-53.105616 19.706662-78.058857 32.503196-18.171078 9.34147-27.256617 31.223543-19.962593 50.290379 17.275321 45.29973 7.67792 98.533311-28.920167 135.131397-36.470122 36.470122-89.447772 46.067522-134.747502 29.048132-19.066836-7.166059-40.948908 2.047445-50.162412 20.346489-12.412638 24.185449-23.033761 49.650552-31.607439 76.011412-6.526232 19.962593 3.710995 41.588735 23.161726 49.906482 45.555661 19.322766 77.546995 64.494531 77.546996 117.088285s-31.991335 97.765519-77.546996 117.088285C5.804412 637.555387-4.56078 659.181529 1.965452 679.272087c8.573678 26.36086 19.194801 51.825962 31.607439 76.267343 9.213504 18.171078 30.967612 27.512548 50.162412 20.346488 45.29973-17.147355 98.27738-7.42199 134.747502 29.048132 36.598087 36.598087 46.067522 89.703703 28.920167 135.131398-7.42199 19.706662 2.687272 41.46077 21.498177 50.930205 23.673588 12.028742 48.242933 22.393934 73.836001 30.839647 20.730385 6.910128 43.38025-3.199133 51.442066-23.545622 18.682939-46.963279 64.494531-80.106302 118.112008-80.106303s99.429068 33.143023 118.112008 80.106303c8.061816 20.346489 30.711681 30.455751 51.442066 23.545622 18.427009-6.142336 36.342156-13.18043 53.745442-21.242246 19.322766-8.829608 29.815924-30.839647 22.265969-50.546309-17.147355-45.29973-7.67792-98.533311 28.920167-135.003433 38.645532-38.645532 96.10197-47.21921 142.937283-25.593068 19.066836 8.829608 41.972631 1.407619 52.209859-16.891424 16.379563-29.432028 29.943889-60.655571 40.565012-93.158767 6.526232-20.218524-3.83896-41.844666-23.161726-50.034448zM512.163258 685.926285c-95.718074 0-174.032861-78.314787-174.032861-174.032861s78.314787-174.032861 174.032861-174.032861 174.032861 78.314787 174.032861 174.032861-78.314787 174.032861-174.032861 174.032861z\" fill=\"#36A99E\"></path></svg>",
  bill: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M814.250667 159.914667H210.432A39.253333 39.253333 0 0 0 170.666667 198.997333v715.434667a39.253333 39.253333 0 0 0 39.082666 39.253333h365.226667a17.066667 17.066667 0 0 0 13.312-27.136 231.594667 231.594667 0 0 1-38.912-76.458666 17.066667 17.066667 0 0 0-5.12-7.850667l-4.096-3.925333a76.288 76.288 0 0 1-22.528-54.272 256 256 0 0 1 127.829333-221.866667 75.776 75.776 0 0 1 58.026667-7.68l5.802667 1.706667a18.090667 18.090667 0 0 0 9.557333 0 227.84 227.84 0 0 1 113.322667 1.365333 17.066667 17.066667 0 0 0 21.162666-15.189333V198.997333a39.253333 39.253333 0 0 0-39.082666-39.082666z\" fill=\"#FFDEAD\"></path><path d=\"M568.149333 153.6V119.466667a34.133333 34.133333 0 0 0-34.133333-34.133334h-44.032a34.133333 34.133333 0 0 0-34.133333 34.133334v34.133333h-55.296v68.266667h223.573333V153.6z\" fill=\"#96DDFF\"></path><path d=\"M773.12 784.042667m-156.501333 0a156.501333 156.501333 0 1 0 313.002666 0 156.501333 156.501333 0 1 0-313.002666 0Z\" fill=\"#79DEB4\"></path><path d=\"M594.432 784.042667H773.12l-89.429333-154.965334a178.517333 178.517333 0 0 0-89.258667 154.965334z\" fill=\"#FCFEFF\"></path><path d=\"M758.272 271.701333H266.410667a17.066667 17.066667 0 0 0-17.066667 17.066667V870.4a17.066667 17.066667 0 0 0 17.066667 17.066667h271.872a17.066667 17.066667 0 0 0 13.653333-7.168 17.066667 17.066667 0 0 0 2.048-15.36c-1.536-4.608-3.242667-9.216-4.608-13.994667a17.066667 17.066667 0 0 0-5.12-7.850667l-4.096-3.925333a76.288 76.288 0 0 1-22.528-54.272 256 256 0 0 1 127.829333-221.866667 75.776 75.776 0 0 1 58.026667-7.68l5.802667 1.706667a18.090667 18.090667 0 0 0 9.557333 0 217.941333 217.941333 0 0 1 40.448-5.632 17.066667 17.066667 0 0 0 15.701333-17.066667V288.426667a17.066667 17.066667 0 0 0-16.725333-16.725334z\" fill=\"#FFF6E6\"></path><path d=\"M266.410667 403.114667m-134.144 0a134.144 134.144 0 1 0 268.288 0 134.144 134.144 0 1 0-268.288 0Z\" fill=\"#FFA742\"></path><path d=\"M580.266667 920.064H210.432a5.461333 5.461333 0 0 1-5.461333-5.632v-373.76a144.725333 144.725333 0 0 0 44.714666 12.288V870.4a17.066667 17.066667 0 0 0 17.066667 17.066667h209.237333a17.066667 17.066667 0 0 0 0-34.133334h-192.853333V552.96a150.698667 150.698667 0 0 0 97.962667-247.808h360.448v229.205333a17.066667 17.066667 0 0 0 34.133333 0V288.426667a17.066667 17.066667 0 0 0-17.066667-17.066667H341.333333a148.992 148.992 0 0 0-136.533333-5.973333v-66.389334a5.461333 5.461333 0 0 1 5.461333-5.632h173.568V221.866667a17.066667 17.066667 0 0 0 17.066667 17.066666h223.573333a17.066667 17.066667 0 0 0 17.066667-17.066666v-28.501334h172.714667a5.461333 5.461333 0 0 1 5.461333 5.632v351.402667a17.066667 17.066667 0 0 0 34.133333 0V198.997333a39.253333 39.253333 0 0 0-39.082666-39.082666H640.853333V153.6a17.066667 17.066667 0 0 0-17.066666-17.066667h-38.741334V119.466667a51.2 51.2 0 0 0-51.2-50.346667h-43.861333a51.2 51.2 0 0 0-50.346667 51.2v17.066667h-39.082666a17.066667 17.066667 0 0 0-17.066667 17.066666v5.632H210.432A39.253333 39.253333 0 0 0 170.666667 198.997333v86.869334a150.869333 150.869333 0 0 0 0 234.325333v394.24a39.253333 39.253333 0 0 0 39.082666 39.253333H580.266667a17.066667 17.066667 0 0 0 0-34.133333zM489.984 103.936h44.714667a17.066667 17.066667 0 0 1 17.066666 17.066667v17.066666h-78.506666v-17.066666a17.066667 17.066667 0 0 1 16.725333-17.066667zM417.28 170.666667h190.122667v34.133333H417.28zM148.992 403.114667a117.418667 117.418667 0 1 1 117.76 117.248 117.589333 117.589333 0 0 1-117.76-117.248z\" fill=\"#3D3D63\"></path><path d=\"M773.12 610.816a174.592 174.592 0 0 0-71.509333 15.701333l-3.413334-5.802666a17.066667 17.066667 0 0 0-22.869333-6.314667 196.437333 196.437333 0 0 0-97.621333 169.472 17.066667 17.066667 0 0 0 17.066666 17.066667h6.314667A173.226667 173.226667 0 1 0 773.12 610.816z m-95.061333 41.984L744.106667 768h-131.925334a162.816 162.816 0 0 1 65.877334-115.2z m95.061333 271.018667a139.776 139.776 0 0 1-138.581333-123.050667h138.581333a17.066667 17.066667 0 0 0 14.506667-25.088l-69.290667-119.466667a139.776 139.776 0 1 1 54.784 267.605334zM415.232 588.629333a17.066667 17.066667 0 0 0-23.722667 0L341.333333 638.122667a17.066667 17.066667 0 0 0 0 23.722666 16.042667 16.042667 0 0 0 11.776 4.949334 17.066667 17.066667 0 0 0 11.946667-4.949334l37.546667-37.546666 34.133333 34.133333a17.066667 17.066667 0 0 0 23.722667 0l64.341333-64.512 29.354667 29.354667a17.066667 17.066667 0 0 0 23.722666 0L682.666667 520.021333a17.066667 17.066667 0 0 0 0-23.722666 17.066667 17.066667 0 0 0-23.722667 0l-91.818667 91.989333-29.354666-29.354667a17.066667 17.066667 0 0 0-23.722667 0l-64.512 64.512zM220.672 419.157333a44.202667 44.202667 0 0 0 34.133333 4.437334l32.426667-8.704a10.752 10.752 0 0 1 8.533333 1.194666 10.069333 10.069333 0 0 1 5.12 6.656 11.264 11.264 0 0 1-7.850666 13.824l-48.64 12.970667a17.066667 17.066667 0 0 0 4.437333 32.938667c1.365333 0 20.48-4.949333 20.48-4.949334l1.536 5.461334a17.066667 17.066667 0 0 0 16.042667 12.458666 13.312 13.312 0 0 0 4.437333 0 17.066667 17.066667 0 0 0 11.776-20.48l-1.365333-5.461333a44.714667 44.714667 0 1 0-23.210667-86.357333l-32.256 8.704a11.434667 11.434667 0 0 1-8.533333-1.024 11.776 11.776 0 0 1-5.290667-6.826667 11.264 11.264 0 0 1 8.021333-13.653333l48.469334-13.141334a17.066667 17.066667 0 0 0 11.946666-20.48A17.066667 17.066667 0 0 0 279.893333 324.266667l-16.042666 4.437333-1.536-5.461333a17.066667 17.066667 0 0 0-32.426667 8.704l1.536 5.461333a44.714667 44.714667 0 0 0-10.752 81.92zM671.232 358.4H470.016a17.066667 17.066667 0 1 0 0 34.133333h201.216a17.066667 17.066667 0 1 0 0-34.133333zM671.232 414.208h-123.050667a17.066667 17.066667 0 0 0 0 34.133333h123.050667a17.066667 17.066667 0 0 0 0-34.133333z\" fill=\"#3D3D63\"></path></svg>",
  calendar: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M76.5 195.2c0-5.2 4.4-9.4 9.7-9.4h846.1c5.4 0 9.7 4.2 9.7 9.4v176.4H76.5V195.2zM928.5 886.2h-827c-5.2 0-9.5-4.2-9.5-9.4V401h846v475.8c0 5.1-4.3 9.4-9.5 9.4z\" fill=\"#FFFFFF\"></path><path d=\"M896.7 856.2H85.3c-5.1 0-9.3-4.2-9.3-9.4V371h830v475.8c0 5.1-4.2 9.4-9.3 9.4z\" fill=\"#F7DF8A\"></path><path d=\"M76.5 195.2c0-5.2 4.2-9.4 9.3-9.4H897c5.1 0 9.3 4.2 9.3 9.4v176.4H76.5V195.2z\" fill=\"#65D5EF\"></path><path d=\"M264 266c-19.8 0-35.8-16-35.8-35.8v-109c0-19.8 16-35.8 35.8-35.8 19.8 0 35.8 16 35.8 35.8v109c0 19.8-16 35.8-35.8 35.8zM774.6 266c-19.8 0-35.8-16-35.8-35.8v-109c0-19.8 16-35.8 35.8-35.8 19.8 0 35.8 16 35.8 35.8v109c0 19.8-16 35.8-35.8 35.8z\" fill=\"#E87A66\"></path><path d=\"M926.9 156.4h-96.8v-31.7c0-31.8-25.9-57.8-57.8-57.8s-57.8 25.9-57.8 57.8v31.7H322.2v-31.7c0-31.8-25.9-57.8-57.8-57.8s-57.8 25.9-57.8 57.8v31.7h-98.3c-21.4 0-38.8 17.4-38.8 38.8v681.6c0 21.4 17.4 38.8 38.8 38.8h818.5c21.4 0 38.8-17.4 38.8-38.8V195.2c0-21.4-17.4-38.8-38.7-38.8z m-183-31.7c0-15.7 12.7-28.4 28.4-28.4s28.4 12.7 28.4 28.4v101.8c0 15.7-12.7 28.4-28.4 28.4s-28.4-12.7-28.4-28.4V124.7z m-507.9 0c0-15.7 12.7-28.4 28.4-28.4s28.4 12.7 28.4 28.4v101.8c0 15.7-12.7 28.4-28.4 28.4S236 242.2 236 226.5V124.7z m-127.6 61.1h98.3v40.7c0 31.8 25.9 57.8 57.8 57.8s57.8-25.9 57.8-57.8v-40.7h392.4v40.7c0 31.8 25.9 57.8 57.8 57.8 31.8 0 57.8-25.9 57.8-57.8v-40.7h96.8c5.2 0 9.4 4.2 9.4 9.4v176.4H99v-28.3h431c8.1 0 14.7-6.6 14.7-14.7s-6.6-14.7-14.7-14.7H99V195.2c0-5.2 4.2-9.4 9.4-9.4z m818.5 700.4H108.4c-5.2 0-9.4-4.2-9.4-9.4V401h837.3v475.8c0 5.1-4.3 9.4-9.4 9.4z\" fill=\"#274359\"></path><path d=\"M605.7 343.3h33.6c8.1 0 14.7-6.6 14.7-14.7s-6.6-14.7-14.7-14.7h-33.6c-8.1 0-14.7 6.6-14.7 14.7s6.6 14.7 14.7 14.7zM778.5 514.6H256.8c-8.1 0-14.7 6.6-14.7 14.7s6.6 14.7 14.7 14.7h521.7c8.1 0 14.7-6.6 14.7-14.7s-6.6-14.7-14.7-14.7zM778.5 621.9H256.8c-8.1 0-14.7 6.6-14.7 14.7s6.6 14.7 14.7 14.7h521.7c8.1 0 14.7-6.6 14.7-14.7s-6.6-14.7-14.7-14.7zM541.7 729.3H256.8c-8.1 0-14.7 6.6-14.7 14.7s6.6 14.7 14.7 14.7h284.9c8.1 0 14.7-6.6 14.7-14.7s-6.6-14.7-14.7-14.7z\" fill=\"#274359\"></path></svg>",
  year: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M298.666667 227.555556c-17.066667 0-28.444444-11.377778-28.444445-28.444445V85.333333c0-17.066667 11.377778-28.444444 28.444445-28.444444s28.444444 11.377778 28.444444 28.444444v113.777778c0 17.066667-11.377778 28.444444-28.444444 28.444445zM696.888889 227.555556c-17.066667 0-28.444444-11.377778-28.444445-28.444445V85.333333c0-17.066667 11.377778-28.444444 28.444445-28.444444s28.444444 11.377778 28.444444 28.444444v113.777778c0 17.066667-11.377778 28.444444-28.444444 28.444445zM514.844444 603.022222c-11.377778 0-19.911111 2.844444-25.6 11.377778s-8.533333 17.066667-8.533333 28.444444c0 14.222222 2.844444 25.6 11.377778 34.133334s14.222222 14.222222 25.6 14.222222 19.911111-5.688889 25.6-14.222222 8.533333-19.911111 8.533333-31.288889c0-28.444444-11.377778-42.666667-36.977778-42.666667z\" fill=\"#18C283\"></path><path d=\"M839.111111 142.222222H739.555556v56.888889c0 22.755556-19.911111 42.666667-42.666667 42.666667S654.222222 221.866667 654.222222 199.111111V142.222222H341.333333v56.888889c0 22.755556-19.911111 42.666667-42.666666 42.666667S256 221.866667 256 199.111111V142.222222H156.444444c-62.577778 0-113.777778 51.2-113.777777 113.777778v568.888889c0 62.577778 51.2 113.777778 113.777777 113.777778h682.666667c62.577778 0 113.777778-51.2 113.777778-113.777778V256c0-62.577778-51.2-113.777778-113.777778-113.777778zM358.4 711.111111c-17.066667 14.222222-42.666667 19.911111-71.111111 19.911111-25.6 0-48.355556-5.688889-65.422222-14.222222v-48.355556c17.066667 14.222222 36.977778 19.911111 59.733333 19.911112 14.222222 0 25.6-2.844444 34.133333-8.533334s14.222222-14.222222 14.222223-28.444444c0-11.377778-5.688889-22.755556-14.222223-28.444445s-25.6-8.533333-42.666666-8.533333h-22.755556v-42.666667h19.911111c34.133333 0 51.2-11.377778 51.2-34.133333 0-22.755556-14.222222-34.133333-39.822222-34.133333-17.066667 0-34.133333 5.688889-51.2 17.066666v-45.511111c17.066667-8.533333 39.822222-14.222222 62.577778-14.222222 25.6 0 45.511111 5.688889 59.733333 17.066667s22.755556 25.6 22.755556 45.511111c0 34.133333-17.066667 54.044444-51.2 62.577778 17.066667 2.844444 31.288889 8.533333 42.666666 19.911111s17.066667 25.6 17.066667 39.822222c0 31.288889-8.533333 51.2-25.6 65.422222z m221.866667-5.688889c-17.066667 17.066667-36.977778 25.6-62.577778 25.6-28.444444 0-51.2-11.377778-68.266667-31.288889s-22.755556-51.2-22.755555-88.177777c0-42.666667 11.377778-79.644444 31.288889-105.244445s48.355556-39.822222 85.333333-39.822222c19.911111 0 34.133333 2.844444 45.511111 5.688889v45.511111c-14.222222-8.533333-28.444444-11.377778-42.666667-11.377778-19.911111 0-36.977778 8.533333-48.355555 22.755556s-17.066667 36.977778-17.066667 59.733333c11.377778-19.911111 31.288889-28.444444 54.044445-28.444444 22.755556 0 39.822222 8.533333 51.2 22.755555s19.911111 34.133333 19.911111 56.888889c0 28.444444-8.533333 48.355556-25.6 65.422222z m199.111111 2.844445c-17.066667 17.066667-42.666667 25.6-71.111111 25.6-25.6 0-45.511111-2.844444-62.577778-11.377778v-45.511111c17.066667 11.377778 36.977778 17.066667 56.888889 17.066666 14.222222 0 28.444444-2.844444 36.977778-11.377777s14.222222-17.066667 14.222222-31.288889c0-25.6-17.066667-39.822222-54.044445-39.822222-14.222222 0-28.444444 0-45.511111 2.844444l8.533334-142.222222H796.444444V512h-93.866666l-2.844445 56.888889h25.6c25.6 0 45.511111 5.688889 59.733334 19.911111s22.755556 31.288889 22.755555 56.888889c0 22.755556-8.533333 45.511111-28.444444 62.577778z\" fill=\"#18C283\"></path></svg>",
  month: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M455.92381 582.704762v31.695238h121.904761v-31.695238h-121.904761z m0-65.828572v31.695239h121.904761v-31.695239h-121.904761z m-195.04762-95.085714v346.209524h502.24762V421.790476H260.87619z m348.64762 292.571429c-4.87619 7.314286-14.628571 12.190476-26.819048 12.190476h-60.952381c-2.438095-14.628571-4.87619-26.819048-9.752381-41.447619h46.32381c14.628571 0 21.942857-4.87619 21.942857-17.066667v-19.504762h-121.904762c-4.87619 19.504762-7.314286 34.133333-14.628572 46.32381-4.87619 9.752381-14.628571 21.942857-26.819047 31.695238l-36.571429-29.257143c14.628571-14.628571 26.819048-31.695238 31.695238-46.323809 4.87619-21.942857 7.314286-46.32381 4.876191-70.704762v-102.4h199.923809v195.047619c2.438095 17.066667-2.438095 29.257143-7.314285 41.447619zM512 24.380952C243.809524 24.380952 24.380952 243.809524 24.380952 512s219.428571 487.619048 487.619048 487.619048 487.619048-219.428571 487.619048-487.619048S780.190476 24.380952 512 24.380952z m124.342857 219.428572c0-12.190476 9.752381-19.504762 21.942857-19.504762h14.628572c12.190476 0 21.942857 7.314286 21.942857 19.504762v80.457143c0 9.752381-9.752381 17.066667-21.942857 17.066666H658.285714c-12.190476 0-21.942857-9.752381-21.942857-17.066666V243.809524z m-304.761905 0c0-12.190476 9.752381-19.504762 21.942858-19.504762h12.190476c12.190476 0 21.942857 7.314286 21.942857 19.504762v80.457143c0 9.752381-9.752381 17.066667-21.942857 17.066666h-14.628572c-12.190476 0-21.942857-9.752381-21.942857-17.066666V243.809524zM804.571429 768c0 21.942857-19.504762 41.447619-43.885715 41.447619H260.87619c-21.942857 0-41.447619-17.066667-41.447619-41.447619v-438.857143c0-21.942857 19.504762-41.447619 41.447619-41.447619h43.885715v34.133333c0 24.380952 21.942857 46.32381 48.761905 46.32381h14.628571c26.819048 0 46.32381-19.504762 46.323809-46.32381v-34.133333h195.04762v34.133333c0 24.380952 21.942857 46.32381 48.761904 46.32381h14.628572c26.819048 0 46.32381-19.504762 46.323809-46.32381v-34.133333h41.447619c24.380952 0 41.447619 17.066667 41.447619 41.447619v438.857143z\" fill=\"#688529\"></path></svg>",
  week: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M928 134.4h-68.8v56c0 41.6-33.6 76.8-80 76.8h-24c-43.2 0-80-33.6-80-76.8V134.4h-320v56c0 41.6-33.6 76.8-80 76.8h-24c-43.2 0-80-33.6-80-76.8V134.4H104c-38.4 0-68.8 28.8-68.8 67.2v731.2c0 38.4 30.4 67.2 68.8 67.2h820.8c38.4 0 68.8-28.8 70.4-67.2V201.6c1.6-38.4-28.8-67.2-67.2-67.2zM104 932.8V355.2h820.8s0 577.6 1.6 577.6H104z\" fill=\"#ea9518\"></path><path d=\"M753.6 222.4h24c19.2 0 33.6-14.4 33.6-32V57.6c0-19.2-14.4-33.6-33.6-33.6h-24c-19.2 0-33.6 14.4-33.6 33.6v131.2c-1.6 19.2 14.4 33.6 33.6 33.6zM251.2 222.4h24c19.2 0 33.6-14.4 33.6-32V57.6c0-19.2-14.4-33.6-33.6-33.6h-24c-19.2 0-33.6 14.4-33.6 33.6v131.2c-1.6 19.2 14.4 33.6 33.6 33.6zM611.2 673.6H420.8v137.6h56v-20.8h136v-116.8z m-56 76.8h-76.8v-35.2h76.8v35.2z\" fill=\"#ea9518\"></path><path d=\"M323.2 456v190.4c1.6 83.2-12.8 144-41.6 184 17.6 12.8 33.6 27.2 51.2 41.6 33.6-49.6 51.2-123.2 51.2-219.2v-145.6h100.8v28.8h-76.8v41.6h76.8v28.8h-89.6v40h236.8v-41.6H544V576h76.8v-41.6H544v-28.8h99.2v270.4c0 8 0 16-4.8 22.4-1.6 6.4-14.4 11.2-36.8 11.2-14.4 0-32 0-44.8-1.6 4.8 19.2 8 38.4 12.8 59.2H640c20.8-1.6 38.4-8 49.6-22.4 11.2-12.8 17.6-35.2 17.6-62.4V456h-384z\" fill=\"#ea9518\"></path></svg>",
  income: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M805.3 311.4h-15.4c-1.6 0-2.2-2.1-0.9-3l66.1-45.4c9.7-6.6 5-21.8-6.8-21.8h-33.9c-5 0-9.1-4.1-9.1-9.1v-51.5c0-8.4-6.8-15.3-15.3-15.3H666.5c-8.4 0-15.3 6.8-15.3 15.3V232c0 5-4.1 9.1-9.1 9.1h-33.9c-11.7 0-16.4 15.2-6.8 21.8l66.2 45.4c1.3 0.9 0.7 2.9-0.9 2.9H219.2c-45.6 0-82.9 37.3-82.9 82.9v346.1c0 45.6 37.3 82.9 82.9 82.9h586.1c45.6 0 82.9-37.3 82.9-82.9v-346c0-45.5-37.3-82.8-82.9-82.8z\" fill=\"#FEAC33\"></path><path d=\"M136.4 662.5v77.8c0 16 4.6 30.9 12.5 43.6 2.2 3.1 4.5 6.3 6.7 9.3 15.2 18.3 38.1 29.9 63.6 29.9H263c-55.1-41.3-99-96.6-126.6-160.6zM830.2 280.1l24.9-17.1c9.7-6.6 5-21.8-6.8-21.8h-33.9c-5 0-9.1-4.1-9.1-9.1v-51.5c0-8.4-6.8-15.3-15.3-15.3h-80.9c48.1 29.3 89.3 68.5 121.1 114.8zM888.2 394.2c0-24.4-10.7-46.4-27.6-61.6 11.7 24.3 21 49.9 27.6 76.6v-15zM888.2 740.3V600.7c-22.3 90.2-75.3 168.3-147.4 222.5h64.5c45.6 0 82.9-37.3 82.9-82.9z\" fill=\"#FEAC33\"></path><path d=\"M888.2 600.7V409.3c-6.6-26.7-15.9-52.3-27.6-76.6-14.7-13.2-34.1-21.3-55.3-21.3h-15.4c-1.6 0-2.2-2.1-0.9-3l41.2-28.3c-31.7-46.3-73-85.5-121-114.8h-42.7c-8.4 0-15.3 6.8-15.3 15.3v5.7c105.2 58.6 176.4 171 176.4 300 0 167.3-119.7 306.6-278.2 337h191.3c72.2-54.3 125.2-132.4 147.5-222.6zM141.3 486.2c0-60.7 15.8-117.8 43.5-167.2-28.5 13.2-48.4 42-48.4 75.3v268.2C164 726.5 208 781.8 263 823.2h156.5c-158.5-30.4-278.2-169.7-278.2-337z\" fill=\"#FEB133\"></path><path d=\"M827.6 486.2c0-129-71.2-241.3-176.4-300V232c0 3.9-2.5 7.3-6 8.6 67.1 52.8 110.2 134.8 110.2 226.8 0 159.3-129.1 288.5-288.5 288.5S178.6 626.7 178.6 467.4c0-57.5 16.8-111.1 45.8-156.1h-5.2c-12.3 0-24 2.7-34.5 7.6-27.7 49.5-43.5 106.5-43.5 167.2 0 167.3 119.7 306.6 278.2 337h130.1c158.4-30.3 278.1-169.6 278.1-336.9z\" fill=\"#FEB633\"></path><path d=\"M467 755.9c159.3 0 288.5-129.1 288.5-288.5 0-92-43.1-174-110.2-226.8-1 0.4-2 0.6-3.1 0.6h-33.9c-11.7 0-16.4 15.2-6.8 21.8l66.2 45.4c1.3 0.9 0.7 2.9-0.9 2.9h-28c28 38.5 44.6 86 44.6 137.3 0 129.1-104.6 233.7-233.7 233.7S215.9 577.7 215.9 448.6c0-51.3 16.5-98.7 44.6-137.3h-36c-29 45-45.8 98.6-45.8 156.1-0.1 159.3 129 288.5 288.3 288.5z\" fill=\"#FFBC34\"></path><path d=\"M449.6 682.4c129.1 0 233.7-104.6 233.7-233.7 0-51.3-16.5-98.7-44.6-137.3h-72.4c27.9 31.6 44.9 73.1 44.9 118.5 0 98.9-80.1 179-179 179s-179-80.1-179-179c0-45.4 16.9-86.9 44.9-118.5h-37.6c-28 38.5-44.6 86-44.6 137.3 0 129 104.6 233.7 233.7 233.7z\" fill=\"#FFC134\"></path><path d=\"M432.2 608.9c98.9 0 179-80.1 179-179 0-45.4-16.9-86.9-44.9-118.5h-77.4c30.4 22.7 50.1 58.9 50.1 99.7 0 68.6-55.6 124.3-124.3 124.3s-124.3-55.6-124.3-124.3c0-40.8 19.7-77.1 50.1-99.7H298c-27.9 31.6-44.9 73.1-44.9 118.5 0.1 98.8 80.2 179 179.1 179z\" fill=\"#FFC634\"></path><path d=\"M290.5 411.1c0 68.6 55.6 124.3 124.3 124.3S539 479.7 539 411.1c0-40.8-19.7-77.1-50.1-99.7H340.6c-30.4 22.6-50.1 58.8-50.1 99.7z\" fill=\"#FFCB34\"></path><path d=\"M805.3 832.1H219.2c-50.7 0-91.9-41.2-91.9-91.9V394.1c0-50.7 41.2-91.9 91.9-91.9h423.6l-46.5-31.9c-7.7-5.3-10.9-14.5-8.1-23.5 2.8-9 10.6-14.8 20-14.8h33.9l0.1-0.1v-51.4c0-13.4 10.9-24.3 24.3-24.3H790c13.4 0 24.3 10.9 24.3 24.3V232l0.1 0.1h33.9c9.4 0 17.3 5.8 20.1 14.8 2.8 9-0.5 18.2-8.2 23.4l-47 32.3c47 4 84.1 43.5 84.1 91.5v346c-0.1 50.8-41.3 92-92 92zM219.2 320.2c-40.7 0-73.9 33.2-73.9 73.9v346.1c0 40.7 33.2 73.9 73.9 73.9h586.1c40.7 0 73.9-33.2 73.9-73.9v-346c0-40.7-33.2-73.8-73.9-73.8h-15.4c-4.7 0-8.7-3-10.1-7.5-1.4-4.5 0.2-9.3 4.1-11.9l66.1-45.4c1.5-1 1.5-2.3 1.2-3.3-0.3-1-1-2.1-2.9-2.1h-33.9c-10 0-18.1-8.1-18.1-18.1v-51.5c0-3.5-2.8-6.3-6.3-6.3H666.5c-3.5 0-6.3 2.8-6.3 6.3V232c0 10-8.1 18.1-18.1 18.1h-33.9c-1.8 0-2.5 1.1-2.8 2.1-0.3 1-0.3 2.3 1.1 3.3l66.2 45.4c3.9 2.7 5.5 7.5 4.1 11.9-1.4 4.4-5.5 7.4-10.1 7.4H219.2z\" fill=\"#FFA820\"></path><path d=\"M753.5 648.3c-3.4 0-6.2-2.8-6.2-6.2v-14.6c0-2.3 1.7-4.4 4-4.8 36-6.5 55-34.9 55-65.9 0-33-17-52.9-60.2-67.9-31.1-11.2-43.8-19.1-43.8-30.7 0-10.1 7.6-20.6 31.1-20.6 16.3 0 29 3.2 38.5 6.7 7.4 2.8 15.7-1.5 17.7-9.2 1.2-4.9 2.7-10.1 3.9-14.6 1.7-6.6-1.8-13.4-8.1-15.8-9.5-3.6-20.8-6.3-36.1-7.2-2.2-0.1-4-2-4-4.2V376c0-5.8-4.7-10.5-10.5-10.5H717c-5.8 0-10.5 4.7-10.5 10.5v20.4c0 2-1.4 3.8-3.3 4.2-36.6 8-56.1 32.4-56.1 63.7 0 35.1 26.4 53.1 65.1 66.2 27.2 9 38.8 17.8 38.8 31.5 0 14.1-14.1 22.4-35.1 22.4-17.1 0-32.9-4-46.2-9.3-7.4-3-15.8 1.2-17.8 9-1.3 5.2-2.8 10.9-4 15.7-1.7 6.7 1.9 13.7 8.3 16.1 13 4.9 30.3 9 47.5 10.2 2.6 0.2 4.6 2.3 4.6 4.9v11.2c0 3.4-2.8 6.2-6.2 6.2H185.5c-10.8 0-19.5 8.8-19.5 19.5v36c0 10.8 8.8 19.5 19.5 19.5h655.3c10.8 0 19.5-8.8 19.5-19.5v-36c0-10.8-8.8-19.5-19.5-19.5h-87.3v-0.1z\" fill=\"#FFE3B4\"></path><path d=\"M191.8 458.4c-9.9 0-18-8.1-18-18v-16.3c0-42.4 34.5-76.9 76.9-76.9h38.6c9.9 0 18 8.1 18 18s-8.1 18-18 18h-38.6c-22.5 0-40.9 18.3-40.9 40.9v16.3c0 9.9-8 18-18 18zM191.8 528c-9.9 0-18-8.1-18-18v-10.5c0-9.9 8.1-18 18-18s18 8.1 18 18V510c0 9.9-8 18-18 18z\" fill=\"#FFFFFF\"></path></svg>",
  expense: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M808.1 285.4v-40.9c0-5 4.1-9.1 9.1-9.1h33.9c11.7 0 16.4-15.2 6.8-21.8l-104.1-71.5a40.07 40.07 0 0 0-45.4 0l-104.1 71.5c-9.7 6.6-5 21.8 6.8 21.8H645c5 0 9.1 4.1 9.1 9.1v40.9H222c-45.6 0-82.9 37.3-82.9 82.9v346.1c0 45.6 37.3 82.9 82.9 82.9h586.1c45.6 0 82.9-37.3 82.9-82.9V368.3c0-45.6-37.3-82.9-82.9-82.9z\" fill=\"#FEAC33\"></path><path d=\"M810.1 238.8c1.7-2.1 4.2-3.4 7.1-3.4h33.9c11.7 0 16.4-15.2 6.8-21.8l-104.1-71.5a40.07 40.07 0 0 0-45.4 0l-17.8 12.2c45 20.7 85.5 49.5 119.5 84.5zM863 306.4c10.4 16.7 19.6 34.2 27.4 52.5-2.4-20.8-12.5-39.3-27.4-52.5zM139.1 368.3v49.5C151 371 171.2 327.5 198 289c-34 10.3-58.9 42-58.9 79.3zM139.1 714.4c0 45.6 37.3 82.9 82.9 82.9h21.2c-49.7-49.7-86.2-112.6-104.1-182.8v99.9zM891 714.4v-42.3c-20.1 47.1-49 89.5-84.6 125.2h1.7c45.6 0 82.9-37.3 82.9-82.9z\" fill=\"#FEAC33\"></path><path d=\"M164.2 497.4c0-80 27.4-153.6 73.2-211.9H222c-8.3 0-16.4 1.3-24 3.6-26.8 38.5-47 82-58.9 128.8v196.6c17.9 70.3 54.4 133.1 104.1 182.8h97.3c-105.2-58.7-176.3-171-176.3-299.9zM891 368.3c0-3.2-0.2-6.3-0.6-9.5-7.9-18.2-17-35.8-27.4-52.5-14.6-13-33.9-20.9-54.9-21v-40.9c0-2.2 0.8-4.2 2-5.7-34.1-35.1-74.6-63.9-119.6-84.5L647.4 184c119.7 53.6 203.1 173.7 203.1 313.4 0 129-71.1 241.3-176.3 299.9h132.1c35.6-35.7 64.5-78.1 84.6-125.2l0.1-303.8z\" fill=\"#FEB133\"></path><path d=\"M850.5 497.4c0-139.7-83.4-259.8-203.1-313.4l-43.1 29.6s-0.1 0-0.1 0.1c14.3 6.2 28 13.5 41 21.8 3.6 0.1 6.7 2.3 8.1 5.4 75.6 52 125.2 139.1 125.2 237.8 0 159.3-129.1 288.5-288.5 288.5S201.5 637.9 201.5 478.6c0-74.3 28.1-142 74.2-193.2h-38.3c-45.9 58.4-73.2 131.9-73.2 211.9 0 129 71.1 241.3 176.3 299.9h333.8c105.1-58.6 176.2-170.9 176.2-299.8z\" fill=\"#FEB633\"></path><path d=\"M611 235.4H645.2c-13-8.3-26.7-15.6-41-21.8-9.6 6.7-4.9 21.8 6.8 21.8zM489.9 767c159.3 0 288.5-129.1 288.5-288.5 0-98.7-49.6-185.8-125.2-237.8 0.5 1.1 0.8 2.4 0.8 3.7v40.9h-25.9c47.9 42.8 78.1 105.1 78.1 174.4 0 129.1-104.6 233.7-233.7 233.7S238.8 588.9 238.8 459.8c0-69.3 30.2-131.6 78.1-174.4h-41.2c-46.1 51.1-74.2 118.9-74.2 193.2 0 159.3 129.1 288.4 288.4 288.4z\" fill=\"#FFBC34\"></path><path d=\"M238.8 459.8c0 129.1 104.6 233.7 233.7 233.7s233.7-104.6 233.7-233.7c0-69.3-30.2-131.6-78.1-174.4h-84.5c54 30.8 90.5 88.9 90.5 155.6 0 98.9-80.1 179-179 179s-179-80.1-179-179c0-66.6 36.4-124.8 90.5-155.6H317c-48 42.8-78.2 105.1-78.2 174.4z\" fill=\"#FFC134\"></path><path d=\"M276.1 441c0 98.9 80.1 179 179 179s179-80.1 179-179c0-66.6-36.4-124.8-90.5-155.6H366.5c-54 30.8-90.4 89-90.4 155.6z m161.6-143c68.6 0 124.3 55.6 124.3 124.3s-55.6 124.3-124.3 124.3S313.4 491 313.4 422.3 369 298 437.7 298z\" fill=\"#FFC634\"></path><path d=\"M313.4 422.2a124.3 124.3 0 1 0 248.6 0 124.3 124.3 0 1 0-248.6 0Z\" fill=\"#FFCB34\"></path><path d=\"M808.1 806.3H222c-50.7 0-91.9-41.2-91.9-91.9V368.3c0-50.7 41.2-91.9 91.9-91.9h423.1v-31.9l-0.1-0.1h-33.9c-9.4 0-17.3-5.8-20.1-14.8-2.8-9 0.5-18.2 8.2-23.4l104.1-71.5c16.9-11.6 38.7-11.6 55.6 0L863 206.2c7.7 5.3 10.9 14.5 8.1 23.5-2.8 9-10.6 14.8-20 14.8h-33.9l-0.1 0.1v32.3c46.5 4.5 82.9 43.8 82.9 91.5v346.1c0 50.6-41.2 91.8-91.9 91.8zM222 294.4c-40.7 0-73.9 33.2-73.9 73.9v346.1c0 40.7 33.2 73.9 73.9 73.9h586.1c40.7 0 73.9-33.2 73.9-73.9V368.3c0-40.7-33.2-73.9-73.9-73.9h-9v-49.9c0-10 8.1-18.1 18.1-18.1h33.9c1.8 0 2.5-1.1 2.8-2.1 0.3-1 0.3-2.3-1.1-3.3l-104.1-71.5c-10.7-7.3-24.5-7.3-35.2 0L609.4 221c-1.5 1-1.5 2.3-1.2 3.3 0.3 1 1 2.1 2.9 2.1H645c10 0 18.1 8.1 18.1 18.1v49.9H222z\" fill=\"#FFA820\"></path><path d=\"M756.3 621.1c-3.4 0-6.2-2.8-6.2-6.2v-14.6c0-2.3 1.7-4.4 4-4.8 36-6.5 55-34.9 55-65.9 0-33-17-52.9-60.2-67.9-31.1-11.2-43.8-19.1-43.8-30.7 0-10.1 7.6-20.6 31.1-20.6 16.3 0 29 3.2 38.5 6.7 7.4 2.8 15.7-1.5 17.7-9.2 1.2-4.9 2.7-10.1 3.9-14.6 1.7-6.6-1.8-13.4-8.1-15.8-9.5-3.6-20.8-6.3-36.1-7.2-2.2-0.1-4-2-4-4.2v-17.3c0-5.8-4.7-10.5-10.5-10.5h-17.8c-5.8 0-10.5 4.7-10.5 10.5v20.4c0 2-1.4 3.8-3.3 4.2-36.6 8-56.1 32.4-56.1 63.7 0 35.1 26.4 53.1 65.1 66.2 27.2 9 38.8 17.8 38.8 31.5 0 14.1-14.1 22.4-35.1 22.4-17.1 0-32.9-4-46.2-9.3-7.4-3-15.8 1.2-17.8 9-1.3 5.2-2.8 10.9-4 15.7-1.7 6.7 1.9 13.7 8.3 16.1 13 4.9 30.3 9 47.5 10.2 2.6 0.2 4.6 2.3 4.6 4.9V615c0 3.4-2.8 6.2-6.2 6.2H188.3c-10.8 0-19.5 8.8-19.5 19.5v36c0 10.8 8.8 19.5 19.5 19.5h655.3c10.8 0 19.5-8.8 19.5-19.5v-36c0-10.8-8.8-19.5-19.5-19.5h-87.3v-0.1z\" fill=\"#FFE3B4\"></path><path d=\"M194.6 431.2c-9.9 0-18-8.1-18-18v-16.3c0-42.4 34.5-76.9 76.9-76.9h38.6c9.9 0 18 8.1 18 18s-8.1 18-18 18h-38.6c-22.5 0-40.9 18.3-40.9 40.9v16.3c0 9.9-8 18-18 18zM194.6 500.8c-9.9 0-18-8.1-18-18v-10.5c0-9.9 8.1-18 18-18s18 8.1 18 18v10.5c0 9.9-8 18-18 18z\" fill=\"#FFFFFF\"></path></svg>",
  balance: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64z m-4.352 564.48c-7.36-3.6864-14.72-1.2288-13.4912 8.576 3.6864 57.6128 45.3632 107.8784 104.192 121.3568 72.32 15.936 144.6528-29.4144 161.8176-101.7472v-2.4448c1.2288-3.6736 1.2288-4.9024-2.4576-6.1312a454.016 454.016 0 0 0-20.8384-6.1312c-4.9024-1.2288-6.1312 2.4576-6.1312 4.9024-1.216 2.4576-1.216 2.4576-1.216 3.6864-12.2624 55.1552-69.888 90.7008-125.0432 77.2224-33.088-8.576-58.8288-30.6432-71.0912-60.0704 0 0 15.936-2.4448 20.8384-2.4448 4.9024-1.2288 6.1312-7.36 1.2288-9.8048-4.9024-3.6864-42.9056-25.7408-47.808-26.9696z m-16.4096-250.2656H379.008l-2.6752 3.4048c-3.6736 4.608-7.7696 9.408-12.288 14.4256-4.6464 5.6064-10.4704 11.8016-17.4592 18.56a651.1872 651.1872 0 0 1-23.4368 21.5424c-9.984 8.5888-19.2 18.3296-27.6864 29.2224a164.096 164.096 0 0 0-32.9088 77.76c-2.1632 14.848-1.7536 30.3616 1.2416 46.5408 2.6624 14.528 8.1536 29.1456 16.4608 43.8272 8.32 14.6944 19.5328 27.9808 33.664 39.872 14.144 11.8784 31.3472 21.5424 51.6224 28.9664 20.288 7.424 43.5584 11.136 69.824 11.136 15.3856 0 29.6448-1.3056 43.0464-3.6224a181.8112 181.8112 0 0 1-18.048-79.0016c0.0512-77.568 48.1792-143.4368 115.2384-168.192l-0.832-0.9984a285.9904 285.9904 0 0 0-24.6912-24.512 414.1696 414.1696 0 0 1-25.4336-22.528 359.6032 359.6032 0 0 1-18.4448-19.072c-5.9904-6.272-10.9696-12.032-14.9632-17.3312z m176.9856 175.488c-4.9024-2.4576-9.8048-1.2288-13.4784 4.9024l-29.4272 45.3504-28.1856-45.3504c-3.6864-6.1312-9.8048-7.36-14.72-3.6736-4.8896 3.6736-7.3472 7.3472-4.8896 13.4784l29.4144 41.6768h-24.512c-3.6864 1.2288-4.9024 3.6864-4.9024 7.36 0 2.4448 1.216 4.9024 4.9024 7.3472h30.6432v13.4912h-30.6432c-3.6864 1.2288-4.9024 3.6736-4.9024 7.3472 0 3.6864 1.216 6.144 4.9024 7.36h30.6432v31.872c0 9.8048 4.9024 15.936 12.2496 14.72 7.36-1.2416 11.0336-4.9152 11.0336-14.72v-31.872h31.872c2.4576-1.2288 3.6864-3.6736 3.6864-7.36 0-2.4448-1.2288-4.9024-3.6864-7.3472h-31.872v-12.2624h31.872c2.4576-1.2288 3.6864-3.6736 3.6864-7.3472 0-2.4576-1.2288-4.9024-3.6864-7.36H643.712l29.4144-44.1344c2.4576-6.1184 1.2288-11.0208-4.9024-13.4784z m-9.8048-60.0704c-71.0912-15.936-144.64 31.872-159.36 102.976-1.216 6.1312 0 4.9024 3.6864 7.3472 3.6736 2.4576 13.4784 6.144 17.152 6.144 2.8672 0 4.2496-3.712 4.7104-5.376l0.2048-0.768c13.4784-56.384 71.0912-93.1584 126.2592-79.6672 35.5456 7.3472 61.2864 33.088 73.5488 63.744 0 0-19.6224 2.4448-23.296 2.4448-3.6736 0-4.9024 3.6736-1.2288 7.36 1.2288 1.216 46.592 26.9568 55.168 26.9568 3.6736 0 8.576-2.4448 7.3472-9.8048-3.6736-57.6-45.3504-107.8656-104.192-121.344zM473.28 264.832c-6.656-2.6368-11.968-3.136-15.9488-1.472-3.9936 1.6512-7.9872 4.288-11.9808 7.9104-3.328 3.3024-5.9904 5.632-7.9744 6.9376a4.864 4.864 0 0 1-2.496 0.9856 30.5152 30.5152 0 0 1-5.504-3.456 49.024 49.024 0 0 1-4.736-3.2256c-1.4848-1.152-2.8928-2.56-4.224-4.2112-2.6624-2.6368-6.656-4.3648-11.968-5.1968a20.7744 20.7744 0 0 0-14.464 2.7264c-5.6448 3.6224-9.6384 6.6816-11.968 9.1648-2.3296 2.4704-5.8112 4.1984-10.4704 5.184a16 16 0 0 1-8.7296-0.4864c-3.1488-0.9856-6.4-1.984-9.728-2.9696a55.04 55.04 0 0 0-9.472-1.984 11.1488 11.1488 0 0 0-8 1.9584c-4.6464 3.6352-6.144 8-4.48 13.12 1.664 5.12 4.6592 9.1648 8.96 12.1472 3.9936 2.9696 8.0768 6.3488 12.224 10.1504 4.16 3.7888 7.8976 8.1664 11.2256 13.12 1.664 2.6496 3.6608 5.6192 5.9776 8.9216 2.3296 3.3024 4.4928 6.592 6.4896 9.8944 2.3296 3.6352 4.6592 7.424 6.9888 11.392h103.2448l2.2656-3.3536c1.472-2.2784 2.88-4.6208 4.224-7.04 1.6512-2.9824 3.4816-5.952 5.4784-8.9216a302.272 302.272 0 0 1 15.4624-21.0432c3.328-4.1216 8.1536-8.1664 14.464-12.1344 2.6624-1.6512 4.9024-3.7888 6.7328-6.4384 1.8304-2.6368 2.9952-5.2736 3.4944-7.9104a12.2624 12.2624 0 0 0-0.9984-7.68c-1.152-2.4704-3.392-4.3648-6.7328-5.6832-2.9952-0.9856-5.568-1.3184-7.7312-0.9856-2.1504 0.32-4.3264 0.896-6.4768 1.728a196.224 196.224 0 0 0-6.7328 2.7264 21.6832 21.6832 0 0 1-8.4864 1.4848c-3.328 0-6.0672-0.576-8.2304-1.7408a30.208 30.208 0 0 1-5.9776-4.1984 1301.888 1301.888 0 0 1-5.7472-5.2096 20.1472 20.1472 0 0 0-7.9744-4.2112z\" fill=\"#29B484\"></path></svg>",
  insight: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M576 896a64 64 0 1 1 0 128H448a64 64 0 1 1 0-128h128zM640 704a64 64 0 1 1 0 128H384a64 64 0 1 1 0-128h256zM622.4 293.248a32 32 0 0 1 44.352 44.352l-4.096 5.056-64 64a32 32 0 0 1-45.312 0L512 365.248l-41.344 41.408a32 32 0 0 1-40.32 4.096l-4.992-4.096-64-64-4.096-5.056a32 32 0 0 1 44.352-44.352l5.056 4.096 41.344 41.408 41.344-41.408 5.056-4.096a32 32 0 0 1 40.256 4.096L576 338.752l41.344-41.408 5.056-4.096z\" fill=\"#5d2885\"></path><path d=\"M512 0a384 384 0 0 1 286.08 640H225.92A384 384 0 0 1 512 0z m0 128a256 256 0 0 0-221.696 384h443.392A256 256 0 0 0 512 128z\" fill=\"#5d2885\"></path></svg>",
};

const PLG_NAV_ICON_UPLOAD_MAX = 96;

const PLG_NAV_ICON_GROUPS = [
  {
    title: "底栏导航",
    slots: [
      { key: "ledger", label: "账本" },
      { key: "stats", label: "统计" },
      { key: "add", label: "记一笔" },
      { key: "reports", label: "报表" },
      { key: "settings", label: "设置" },
    ],
  },
  {
    title: "账本子导航",
    slots: [
      { key: "bill", label: "账单" },
      { key: "calendar", label: "日历" },
    ],
  },
  {
    title: "面板三卡",
    slots: [
      { key: "year", label: "本年" },
      { key: "month", label: "本月" },
      { key: "week", label: "本周" },
      { key: "income", label: "收入" },
      { key: "expense", label: "支出" },
      { key: "balance", label: "结余" },
      { key: "insight", label: "洞察" },
    ],
  },
];

const PLG_NAV_ICON_KEYS = PLG_NAV_ICON_GROUPS.flatMap((g) => g.slots.map((s) => s.key));

function normalizeNavIcons(navIcons) {
  const out = {};
  if (!navIcons || typeof navIcons !== "object") return out;
  for (const key of PLG_NAV_ICON_KEYS) {
    const raw = navIcons[key];
    if (!raw || typeof raw !== "object") continue;
    const iconUrl = String(raw.iconUrl || "").trim();
    const icon = String(raw.icon || "").trim();
    if (!iconUrl && !icon) continue;
    out[key] = { icon, iconUrl };
  }
  return out;
}

function getNavIconOverride(settings, key) {
  const raw = settings?.navIcons?.[key];
  if (!raw) return null;
  const iconUrl = String(raw.iconUrl || "").trim();
  const icon = String(raw.icon || "").trim();
  if (iconUrl) return { icon: icon || "📌", iconUrl };
  if (icon) return { icon, iconUrl: "" };
  return null;
}

function cloneNavIconDraft(settings, key) {
  const raw = settings?.navIcons?.[key];
  return {
    icon: String(raw?.icon || "").trim(),
    iconUrl: String(raw?.iconUrl || "").trim(),
  };
}

function isNavIconCustomized(draft) {
  return !!(draft?.iconUrl || draft?.icon);
}

function renderPlgNavIcon(parent, key, opts) {
  if (typeof opts === "string") opts = { extraCls: opts };
  opts = opts || {};
  if (!parent || !PLG_NAV_ICON_SVG[key]) return null;

  if (typeof parent.empty === "function") parent.empty();
  parent.addClass("plg-nav-icon");
  if (opts.extraCls) parent.addClass(opts.extraCls);
  parent.setAttr("aria-hidden", "true");

  const override = opts.settings ? getNavIconOverride(opts.settings, key) : null;
  if (override?.iconUrl && renderIconUrlContent(parent, override.iconUrl, key)) {
    return parent;
  }
  if (override?.icon) {
    parent.createDiv({ cls: "plg-nav-emoji", text: override.icon });
    return parent;
  }

  setSvgContent(parent, PLG_NAV_ICON_SVG[key]);
  return parent;
}

function buildPlgNavIconSlotEditor(parent, plugin, slot) {
  const app = plugin.app;
  const key = slot.key;
  const draft = cloneNavIconDraft(plugin.settings, key);

  const row = parent.createDiv({ cls: "plg-nav-icon-slot-row" });
  const head = row.createDiv({ cls: "plg-nav-icon-slot-head" });
  head.createSpan({ cls: "plg-nav-icon-slot-name", text: slot.label });

  const toolsRow = row.createDiv({ cls: "plg-nav-icon-slot-tools-row" });
  const previewHost = toolsRow.createDiv({ cls: "plg-nav-icon-slot-preview" });
  const tools = toolsRow.createDiv({ cls: "plg-nav-icon-slot-tools" });
  const emojiInput = tools.createEl("input", {
    type: "text",
    attr: { placeholder: "Emoji", title: "输入 Emoji 作为图标" },
  });
  emojiInput.classList.add("plg-cat-emoji-field");
  emojiInput.value = draft.iconUrl ? "" : draft.icon;

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/png,image/jpeg,image/webp,image/gif,image/svg+xml";
  fileInput.classList.add("plg-file-input-hidden");
  tools.appendChild(fileInput);

  const uploadBtn = tools.createEl("button", {
    text: "上传",
    cls: "plg-btn-plain",
    attr: { type: "button" },
  });
  attachIconfontPickerButton(tools, app, async (picked) => {
    draft.iconUrl = picked.iconUrl;
    draft.icon = "";
    emojiInput.value = "";
    fileInput.value = "";
    renderPreview();
    await persistDraft();
  }, slot.label);
  tools.createEl("button", {
    text: "默认",
    cls: "plg-btn-plain",
    attr: { type: "button" },
  }).onclick = async () => {
    draft.icon = "";
    draft.iconUrl = "";
    emojiInput.value = "";
    fileInput.value = "";
    renderPreview();
    await persistDraft();
  };

  const renderPreview = () => {
    previewHost.empty();
    const frame = previewHost.createDiv({ cls: "plg-nav-icon-slot-preview-frame" });
    const iconHost = frame.createDiv({ cls: "plg-nav-icon-slot-icon" });
    const tmpSettings = { navIcons: { ...(plugin.settings.navIcons || {}) } };
    if (isNavIconCustomized(draft)) {
      tmpSettings.navIcons[key] = { icon: draft.icon, iconUrl: draft.iconUrl };
    } else {
      delete tmpSettings.navIcons[key];
    }
    renderPlgNavIcon(iconHost, key, { settings: tmpSettings });
  };

  const persistDraft = async () => {
    plugin.settings.navIcons = plugin.settings.navIcons || {};
    if (!isNavIconCustomized(draft)) {
      delete plugin.settings.navIcons[key];
    } else {
      plugin.settings.navIcons[key] = { icon: draft.icon, iconUrl: draft.iconUrl };
    }
    plugin.settings.navIcons = normalizeNavIcons(plugin.settings.navIcons);
    await plugin.saveSettings();
    plugin.refreshView?.(true);
  };

  const syncEmojiDraft = () => {
    draft.iconUrl = "";
    fileInput.value = "";
    draft.icon = emojiInput.value.trim();
    renderPreview();
  };

  emojiInput.addEventListener("input", syncEmojiDraft);
  emojiInput.addEventListener("change", () => { persistDraft(); });
  emojiInput.addEventListener("blur", () => { persistDraft(); });
  uploadBtn.onclick = () => fileInput.click();
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    try {
      draft.iconUrl = await compressIconImageFile(file, PLG_NAV_ICON_UPLOAD_MAX);
      draft.icon = "";
      emojiInput.value = "";
      renderPreview();
      await persistDraft();
    } catch {
      new Notice("图片处理失败，请换一张试试");
    }
  });

  renderPreview();
  return row;
}

function renderPlgNavAppearancePanel(panel, plugin, focusOpts) {
  const grid = panel.createDiv({ cls: "plg-settings-grid" });
  const card = createPlgSettingsBlock(
    grid,
    "导航图标",
    "底栏、子导航与三卡图标位置固定，可单独自定义。支持 Emoji、上传或 iconfont，未设置时用内置彩色图标。",
  );
  card.addClass("plg-settings-rich-block", "plg-nav-appearance-card");
  card.setAttr("data-settings-section", "appearance");

  const topBar = card.createDiv({ cls: "plg-nav-appearance-topbar" });
  topBar.createSpan({ cls: "plg-nav-appearance-count", text: `${PLG_NAV_ICON_KEYS.length} 个槽位` });
  topBar.createEl("button", {
    text: "全部恢复默认",
    cls: "plg-btn-plain plg-nav-appearance-reset-all",
    attr: { type: "button" },
  }).onclick = async () => {
    plugin.settings.navIcons = {};
    await plugin.saveSettings();
    plugin.refreshView?.(true);
    panel.empty();
    renderPlgNavAppearancePanel(panel, plugin, focusOpts);
  };

  PLG_NAV_ICON_GROUPS.forEach((group) => {
    const section = card.createDiv({ cls: "plg-nav-appearance-group" });
    section.createDiv({ cls: "plg-nav-appearance-group-title", text: group.title });
    const list = section.createDiv({ cls: "plg-nav-appearance-list" });
    group.slots.forEach((slot) => buildPlgNavIconSlotEditor(list, plugin, slot));
  });

  if (focusOpts?.section === "appearance") {
    window.requestAnimationFrame(() => {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

// ─── Plugin bootstrap (obsidian import in src/00-obsidian.ts) ────────────────

const PLUGIN_VERSION = "4.0.27";
const VIEW_TYPE = "plain-ledger-dashboard";
const ICON_NAME = "wallet";

const DEFAULT_SETTINGS = {
  dataFolder: "Finance/PlainLedger",
  monthlyBudget: 8000,
  lastImportAt: "",
  lastImportFile: "",
  initialized: false,
  onboardingComplete: false,
  onboardingChoice: "",
  dailyNoteOnSave: false,
  dailyNoteFolder: "Daily Notes",
  categoryKeywords: {},
  carryoverEnabled: true,
  carryoverCategoryName: "月结",
  carryoverIntroShown: false,
  showAdvancedSettings: false,
  navIcons: {},
  ocrLangCached: false,
  licenseKey: "",
  publicSampleApplied: false,
  licenseActivated: false,
  trialStartedAt: "",
  trialWelcomeSeen: false,
  trialReminder2hSeen: false,
  trialReminder30mSeen: false,
  welcomeGuideVersion: "",
  usageGuideFileVersion: "",
  lastSeenVersion: "",
  uiState: {
    tab: "home",
    homeSubview: "list",
    period: "month",
    reportFlow: "expense",
    reportTopic: "",
    reportPresetId: "",
    reportGroupMode: "category",
    listCategory: "all",
    listReimburseOnly: false,
    listSearch: "",
    collapsedDays: [],
    pendingDuesExpanded: false,
    pendingDuesShowAll: false,
    settingsSections: {},
  },
};

// ─── Utilities ─────────────────────────────────────────────────────────────

const BALANCE_TERM_MONTHLY = "月度结余";

function ytdBalanceLabel(month) {
  return `年累计结余(1-${month}月)`;
}

function periodBalanceLabel(period) {
  if (period === "all") return "总结余";
  if (period === "year") return "年结余";
  if (period === "week") return "周结余";
  return BALANCE_TERM_MONTHLY;
}

const SETTLE_BALANCE_HELP =
  "按当年真实收支累计（不含月结结转行与转账）。每月 1 日系统自动生成结转账单；预算与图表也不计结转。";

function pad2(n) { return String(n).padStart(2, "0"); }

function openSettleBalanceHelp(app) {
  openPlgOverlay({
    title: "结余说明",
    stack: true,
    build: (body, close) => {
      addClasses(body, "plg-modal");
      body.createEl("p", { text: SETTLE_BALANCE_HELP, cls: "plg-muted" });
      body.createEl("p", {
        text: `· ${BALANCE_TERM_MONTHLY}：当月收入减支出（不含结转）`,
        cls: "plg-muted",
      });
      body.createEl("p", {
        text: `· ${ytdBalanceLabel(12)}：当年 1 月起至所选月份`,
        cls: "plg-muted",
      });
      const row = body.createDiv({ cls: "plg-modal-actions" });
      row.createEl("button", {
        text: "知道了",
        cls: "mod-cta",
        attr: { type: "button" },
      }).onclick = close;
    },
  });
}

function appendBalanceInfoBtn(parent, app) {
  const btn = parent.createEl("button", {
    text: "ⓘ",
    cls: "plg-balance-info-btn",
    attr: { type: "button", "aria-label": "结余说明" },
  });
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    openSettleBalanceHelp(app);
  });
  return btn;
}

const STATS_SCOPE_TIP = "统计与环比 · 不含月结结转\n进行中的月/年/周按「截至今日」同期对比（同比对去年同段，环比对上一同段）";
const REPORT_SCOPE_TIP = "按分类筛选查看支出/收入构成 · 不含月结结转";
const CAL_SCOPE_TIP = "日历热力按日支出统计，不含月结结转";
const PLG_SUMMARY_SCROLL_ROWS = 10;

function appendScopeTipBtn(parent, tip) {
  const tipText = Array.isArray(tip) ? tip.join("\n") : tip;
  const btn = parent.createEl("button", {
    text: "ⓘ",
    cls: "plg-balance-info-btn plg-scope-tip-btn",
    attr: { type: "button", "aria-label": tipText.replace(/\n/g, " ") },
  });
  bindPlgTipIcon(btn, tipText);
  return btn;
}

function fmtYoYPct(cmp) {
  if (!cmp) return "";
  return fmtPct(cmp.pct);
}

/** 环比：月→较上月，年→较上年，周→较上周；总→无 */
function periodSummaryChainCompare(allTx, period, refDate, flow) {
  if (period === "all") return null;
  return periodComparePercent(allTx, period, refDate, flow);
}

function periodYoYRefDate(period, refDate) {
  const prev = new Date(refDate);
  if (period === "year" || period === "month") {
    prev.setFullYear(prev.getFullYear() - 1);
    return prev;
  }
  if (period === "week") {
    prev.setDate(prev.getDate() - 365);
    return prev;
  }
  return null;
}

function periodCompareYoYAmount(allTx, period, refDate, flow) {
  const yoy = periodYoYWindow(period, refDate);
  if (!yoy) return null;
  const cur = flowSumInWindow(allTx, yoy.cur.start, yoy.cur.end, flow);
  const prev = flowSumInWindow(allTx, yoy.start, yoy.end, flow);
  if (prev <= 0) return null;
  return { pct: ((cur - prev) / prev) * 100, label: "同比" };
}

function periodCompareYoYCount(allTx, period, refDate, flow) {
  const yoy = periodYoYWindow(period, refDate);
  if (!yoy) return null;
  const cur = flowCountInWindow(allTx, yoy.cur.start, yoy.cur.end, flow);
  const prev = flowCountInWindow(allTx, yoy.start, yoy.end, flow);
  if (prev <= 0) return null;
  return { pct: ((cur - prev) / prev) * 100, label: "同比" };
}

function buildCalDaySummaryLines(info) {
  const lines = [];
  const row1 = [];
  if (info.income > 0) row1.push(`收入 ${fmtMoney(info.income)}`);
  if (info.expense > 0) row1.push(`支出 ${fmtMoney(info.expense)}`);
  if (row1.length) lines.push(row1.join(" · "));
  const row2 = [];
  if (info.income > 0 && info.expense > 0) {
    row2.push(`结余 ${fmtMoney(info.income - info.expense)}`);
  }
  if (info.count > 0) row2.push(`笔数${info.count}`);
  return lines.length ? lines : ["暂无收支"];
}

function bindPlgTipIcon(el, tip) {
  const tipText = Array.isArray(tip) ? tip.join("\n") : String(tip || "");
  el.setAttr("title", tipText);
  el.setAttr("role", "button");
  el.setAttr("tabindex", "0");
  el.setAttr("aria-label", tipText.replace(/\n/g, " "));
  const showNotice = () => {
    const lines = tipText.split("\n").map((s) => s.trim()).filter(Boolean);
    if (lines.length <= 1) {
      new Notice(tipText, 5000);
      return;
    }
    const frag = document.createDocumentFragment();
    lines.forEach((line, i) => {
      if (i > 0) frag.createEl("br");
      frag.appendChild(document.createTextNode(line));
    });
    new Notice(frag, 5000);
  };
  const show = (e) => {
    e.preventDefault();
    e.stopPropagation();
    showNotice();
  };
  el.addEventListener("click", show);
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") show(e);
  });
}

function compareTagClass(flow, pct) {
  const up = pct >= 0;
  if (flow === "income") return up ? "cmp-neg" : "cmp-pos";
  return up ? "cmp-pos" : "cmp-neg";
}

function buildDonutSliceStats(stats, limit = 8) {
  if (stats.length <= limit) return stats.slice();
  const top = stats.slice(0, limit);
  const rest = stats.slice(limit);
  top.push({
    name: "其他",
    key: "__other__",
    amount: rest.reduce((s, x) => s + (Number(x.amount) || 0), 0),
    pct: rest.reduce((s, x) => s + (Number(x.pct) || 0), 0),
    count: rest.reduce((s, x) => s + (Number(x.count) || 0), 0),
    meta: { color: "#c4b5a5", name: "其他", icon: "" },
  });
  return top;
}

function openCarryoverReadonlyOverlay(app, plugin, tx) {
  openPlgOverlay({
    title: "月结说明",
    stack: true,
    build: (body, close) => {
      addClasses(body, "plg-modal");
      body.createEl("p", { text: tx.note || "系统自动月结", cls: "plg-modal-lead" });
      body.createEl("p", {
        text: `金额 ${fmtMoney(tx.amount)} · ${tx.flow === "income" ? "收入" : "支出"} · 只读`,
        cls: "plg-muted",
      });
      body.createEl("p", {
        text: "由「月结自动结转」生成，关闭后不再新增。日合计「支」不含月结。",
        cls: "plg-muted",
      });
      const row = body.createDiv({ cls: "plg-modal-actions" });
      row.createEl("button", { text: "关闭", attr: { type: "button" } }).onclick = close;
      row.createEl("button", {
        text: "打开设置",
        cls: "mod-cta",
        attr: { type: "button" },
      }).onclick = () => {
        close();
        plugin.openDashboardSettings();
      };
    },
  });
}

function fmtMoney(n) {
  const v = Math.round(Number(n) || 0);
  return v.toLocaleString("zh-CN", { maximumFractionDigits: 0 });
}

function fillBudgetRingInner(ring, pctRaw, over) {
  const text = Number(pctRaw).toFixed(1) + "%";
  const inner = ring.createDiv({
    cls: "plg-ring-inner" + (over ? " over" : "") + (text.length >= 6 ? " is-long" : ""),
    text,
  });
  inner.setAttr("title", text);
  return inner;
}

/** 百分比展示：固定 1 位小数 */
function fmtPct(n) {
  const v = Number(n) || 0;
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(1)}%`;
}

function formatSyncTime(isoOrMs) {
  if (isoOrMs == null || isoOrMs === "") return "未知";
  const d = typeof isoOrMs === "number" ? new Date(isoOrMs) : new Date(isoOrMs);
  if (Number.isNaN(d.getTime())) return "未知";
  const diff = Date.now() - d.getTime();
  if (diff < 60000) return "刚刚";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`;
  return `${d.getMonth() + 1}/${d.getDate()} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function ledgerSyncSignature(data) {
  if (!data) return "";
  const txs = data.transactions || [];
  let sum = 0;
  for (let i = 0; i < txs.length; i++) {
    sum += Math.round((Number(txs[i].amount) || 0) * 100);
  }
  const first = txs[0]?.id || "";
  const last = txs[txs.length - 1]?.id || "";
  return `${data.exportedAt || ""}|${txs.length}|${sum}|${first}|${last}`;
}

function isTouchLedgerUi() {
  if (typeof isMobileCaptureUi === "function" && isMobileCaptureUi()) return true;
  if (typeof Platform !== "undefined" && Platform.isMobile) return true;
  return false;
}

function parseDateTime(s) {
  if (!s) return new Date();
  const [d, t = "00:00"] = String(s).split(" ");
  const [y, m, day] = d.split("-").map(Number);
  const [hh, mm] = t.split(":").map(Number);
  return new Date(y, m - 1, day, hh || 0, mm || 0);
}

function dateKey(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function formatCalShortAmt(amount) {
  const n = Number(amount) || 0;
  if (n >= 10000) return `${(n / 10000).toFixed(n >= 100000 ? 0 : 1)}w`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(Math.round(n));
}

/** 本月待付/已到期未入账的订阅与周期项（iCost 待办风格） */
function collectPendingDues(data, refDate = new Date()) {
  const today = dateKey(refDate);
  const monthPrefix = `${refDate.getFullYear()}-${pad2(refDate.getMonth() + 1)}`;
  const dues = [];
  const txExists = (item, dateStr, kind) => {
    const day = String(dateStr || "").slice(0, 10);
    return (data.transactions || []).some((t) => {
      if (kind === "subscription" && t.linkedSubscriptionId === item.id && t.datetime.startsWith(day)) return true;
      if (kind === "recurring" && t.linkedRecurringId === item.id && t.datetime.startsWith(day)) return true;
      const category = kind === "recurring" ? item.category : (item.category || "软件续费");
      const sub = item.subcategory || "";
      const amount = item.amount;
      return t.flow === "expense"
        && t.datetime.startsWith(day)
        && t.category === category
        && (t.subcategory || "") === sub
        && amountMatch(t.amount, amount);
    });
  };
  const push = (item, kind) => {
    if (item.active === false) return;
    const nd = item.nextDate;
    if (!nd || !String(nd).startsWith(monthPrefix)) return;
    if (txExists(item, nd, kind)) return;
    const title = kind === "recurring" ? (item.title || item.name || "周期") : (item.name || "订阅");
    dues.push({
      kind,
      id: item.id,
      title,
      date: nd,
      amount: Number(item.amount) || 0,
      category: kind === "recurring" ? item.category : (item.category || "软件续费"),
      subcategory: item.subcategory || "",
      overdue: nd < today,
    });
  };
  (data.subscriptions || []).forEach((s) => push(s, "subscription"));
  (data.recurring || []).forEach((r) => push(r, "recurring"));
  return dues.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title, "zh"));
}

function reportFilterTrendPoints(flowList, period, refDate) {
  if (!flowList.length) return [];
  if (period === "month") {
    const y = refDate.getFullYear();
    const m = refDate.getMonth() + 1;
    const daysInMonth = new Date(y, m, 0).getDate();
    const dayMap = {};
    flowList.forEach((t) => {
      const d = parseInt(String(t.datetime).slice(8, 10), 10);
      if (!d) return;
      dayMap[d] = (dayMap[d] || 0) + (Number(t.amount) || 0);
    });
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const val = dayMap[day] || 0;
      return {
        label: String(day),
        value: val,
        tip: `${m}月${day}日 ${fmtMoney(val)}`,
      };
    });
  }
  const monthMap = {};
  flowList.forEach((t) => {
    const mk = String(t.datetime).slice(0, 7);
    if (!mk) return;
    monthMap[mk] = (monthMap[mk] || 0) + (Number(t.amount) || 0);
  });
  const keys = Object.keys(monthMap).sort();
  if (period === "year") {
    const y = refDate.getFullYear();
    return Array.from({ length: 12 }, (_, i) => {
      const mk = `${y}-${pad2(i + 1)}`;
      const val = monthMap[mk] || 0;
      return { label: String(i + 1), value: val, tip: `${y}年${i + 1}月 ${fmtMoney(val)}` };
    });
  }
  return keys.slice(-12).map((mk) => {
    const val = monthMap[mk] || 0;
    const mm = parseInt(mk.slice(5, 7), 10);
    return { label: `${mm}月`, value: val, tip: `${mk.replace("-", "年")}月 ${fmtMoney(val)}` };
  });
}

function getRecentManualCategories(transactions, flow, limit = 6) {
  const cutoff = Date.now() - 30 * 86400000;
  const counts = new Map();
  (transactions || []).forEach((t) => {
    if (flow === "income" ? t.flow !== "income" : t.flow === "income") return;
    const ts = parseDateTime(t.datetime);
    if (!ts || ts.getTime() < cutoff) return;
    const key = `${t.category}\0${t.subcategory || ""}`;
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key]) => {
      const [category, subcategory] = key.split("\0");
      return { category, subcategory: subcategory || "" };
    });
}

function monthRange(year, month) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);
  return { start, end };
}

function weekRange(ref) {
  const d = new Date(ref);
  const day = d.getDay() || 7;
  const start = new Date(d);
  start.setDate(d.getDate() - day + 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function yearRange(year) {
  return { start: new Date(year, 0, 1), end: new Date(year, 11, 31, 23, 59, 59) };
}

function periodWindowEndClipped(period, refDate) {
  const d = refDate || new Date();
  const now = new Date();
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  if (period === "month") {
    const r = monthRange(d.getFullYear(), d.getMonth() + 1);
    const isCurrent = d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    return {
      start: r.start,
      end: isCurrent ? todayEnd : r.end,
      partial: isCurrent && now.getDate() < r.end.getDate(),
    };
  }
  if (period === "year") {
    const r = yearRange(d.getFullYear());
    const isCurrent = d.getFullYear() === now.getFullYear();
    return {
      start: r.start,
      end: isCurrent ? todayEnd : r.end,
      partial: isCurrent,
    };
  }
  if (period === "week") {
    const r = weekRange(d);
    const inWeek = todayEnd >= r.start && todayEnd <= r.end;
    return {
      start: r.start,
      end: inWeek ? todayEnd : r.end,
      partial: inWeek && todayEnd.getTime() < r.end.getTime(),
    };
  }
  return null;
}

function flowSumInWindow(allTx, start, end, flow) {
  return sumFlow(
    excludeCarryover(allTx.filter((t) => inRange(t.datetime, start, end))),
    flow,
  );
}

function flowCountInWindow(allTx, start, end, flow) {
  return excludeCarryover(allTx.filter((t) => inRange(t.datetime, start, end)))
    .filter((t) => t.flow === flow).length;
}

function periodChainWindow(period, refDate) {
  const cur = periodWindowEndClipped(period, refDate);
  if (!cur) return null;
  if (period === "month") {
    const y = refDate.getFullYear();
    const m = refDate.getMonth();
    const endDay = cur.end.getDate();
    const prevStart = new Date(y, m - 1, 1);
    const prevMonthDays = new Date(y, m, 0).getDate();
    const prevEnd = new Date(y, m - 1, Math.min(endDay, prevMonthDays), 23, 59, 59, 999);
    return { start: prevStart, end: prevEnd, cur };
  }
  if (period === "year") {
    const y = refDate.getFullYear() - 1;
    const start = new Date(y, 0, 1);
    const end = new Date(y, cur.end.getMonth(), cur.end.getDate(), 23, 59, 59, 999);
    return { start, end, cur };
  }
  if (period === "week") {
    const prevStart = new Date(cur.start);
    prevStart.setDate(prevStart.getDate() - 7);
    const prevEnd = new Date(cur.end);
    prevEnd.setDate(prevEnd.getDate() - 7);
    return { start: prevStart, end: prevEnd, cur };
  }
  return null;
}

function periodYoYWindow(period, refDate) {
  if (period !== "month") return null;
  const cur = periodWindowEndClipped(period, refDate);
  if (!cur) return null;
  const y = refDate.getFullYear() - 1;
  const start = new Date(y, cur.start.getMonth(), cur.start.getDate());
  const endDay = cur.end.getDate();
  const endMonth = cur.end.getMonth();
  const maxDay = new Date(y, endMonth + 1, 0).getDate();
  const end = new Date(y, endMonth, Math.min(endDay, maxDay), 23, 59, 59, 999);
  return { start, end, cur };
}

function inRange(dt, start, end) {
  const t = parseDateTime(dt).getTime();
  return t >= start.getTime() && t <= end.getTime();
}

function weekdayLabel(d) {
  return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][d.getDay()];
}

function todayLabel(d) {
  const now = new Date();
  const same = dateKey(d) === dateKey(now);
  return same ? "今天" : "";
}

function uid() {
  return "tx-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function escapeHtml(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function getFflate() {
  if (typeof __MUMU_FFLATE__ !== "undefined" && __MUMU_FFLATE__) return __MUMU_FFLATE__;
  if (typeof fflate !== "undefined") return fflate;
  throw new Error("fflate unavailable");
}

// ─── XLSX import (Mumu export format) ────────────────────────────────────────

function colLettersToIndex(col) {
  let n = 0;
  for (const c of col) n = n * 26 + (c.charCodeAt(0) - 64);
  return n - 1;
}

function parseSharedStrings(xml) {
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const out = [];
  doc.querySelectorAll("si").forEach((si) => {
    let t = "";
    si.querySelectorAll("t").forEach((node) => { t += node.textContent || ""; });
    out.push(t);
  });
  return out;
}

function cellValue(c, shared) {
  const t = c.getAttribute("t");
  const vNode = c.querySelector("v");
  if (!vNode) return "";
  const raw = vNode.textContent || "";
  if (t === "s") return shared[parseInt(raw, 10)] ?? "";
  return raw;
}

function parseSheetRows(sheetXml, shared) {
  const doc = new DOMParser().parseFromString(sheetXml, "text/xml");
  const rows = [];
  doc.querySelectorAll("sheetData row").forEach((row) => {
    const cells = {};
    row.querySelectorAll("c").forEach((c) => {
      const ref = c.getAttribute("r") || "";
      const m = ref.match(/^([A-Z]+)/);
      if (!m) return;
      cells[colLettersToIndex(m[1])] = cellValue(c, shared);
    });
    const arr = [];
    const max = Math.max(...Object.keys(cells).map(Number), 0);
    for (let i = 0; i <= max; i++) arr.push(cells[i] ?? "");
    if (arr.some((x) => x !== "")) rows.push(arr);
  });
  return rows;
}

function parseAmount(v) {
  if (v == null || v === "") return 0;
  return Math.abs(parseFloat(String(v).replace(/,/g, ""))) || 0;
}

function rowsToLedger(rows) {
  if (!rows.length) throw new Error("空表格");
  const headers = rows[0];
  const idx = (name) => headers.indexOf(name);
  const required = ["时间", "类型", "分类", "金额"];
  for (const h of required) if (idx(h) < 0) throw new Error("缺少列：" + h);

  const subcats = {};
  const transactions = [];
  let ledger = "";

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const dt = r[idx("时间")];
    if (!dt) continue;
    const flowRaw = r[idx("类型")];
    let flow = "expense";
    if (flowRaw === "收入") flow = "income";
    else if (flowRaw === "转账") flow = "transfer";
    const cat = r[idx("分类")] || "";
    const sub = idx("二级分类") >= 0 ? (r[idx("二级分类")] || "") : "";
    const amt = parseAmount(r[idx("金额")]);
    if (!ledger && idx("账本") >= 0) ledger = r[idx("账本")] || "";
    if (cat) {
      if (!subcats[cat]) subcats[cat] = new Set();
      if (sub) subcats[cat].add(sub);
    }
    transactions.push({
      id: `plg-${i}`,
      datetime: String(dt).replace(/\//g, "-"),
      flow,
      category: cat,
      subcategory: sub,
      amount: amt,
      ledger: idx("账本") >= 0 ? (r[idx("账本")] || "") : "",
      accountOut: idx("转出账户") >= 0 ? (r[idx("转出账户")] || "") : "",
      accountIn: idx("转入账户") >= 0 ? (r[idx("转入账户")] || "") : "",
      note: idx("备注") >= 0 ? (r[idx("备注")] || "") : "",
      reimburse: idx("报销") >= 0 ? !!r[idx("报销")] : false,
      discount: idx("优惠") >= 0 ? parseAmount(r[idx("优惠")]) : 0,
      tags: [],
      member: idx("成员") >= 0 ? (r[idx("成员")] || "") : "",
      source: "plg-import",
    });
  }

  const categories = buildCategoriesFromTransactions(transactions, subcats);
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    ledger: ledger || "默认账本",
    categories,
    transactions,
  };
}

function parseMumuXlsx(arrayBuffer) {
  const zip = getFflate().unzipSync(new Uint8Array(arrayBuffer));
  const sharedXml = zip["xl/sharedStrings.xml"];
  const sheetXml = zip["xl/worksheets/sheet1.xml"];
  if (!sheetXml) throw new Error("找不到 sheet1");
  const shared = sharedXml ? parseSharedStrings(new TextDecoder().decode(sharedXml)) : [];
  const rows = parseSheetRows(new TextDecoder().decode(sheetXml), shared);
  return rowsToLedger(rows);
}

function parseLedgerJson(text) {
  const data = JSON.parse(text);
  if (!data.transactions || !Array.isArray(data.transactions)) throw new Error("JSON 格式无效");
  if (!data.categories) data.categories = buildCategoriesFromTransactions(data.transactions);
  if (!data.recurring) data.recurring = [];
  if (!data.subscriptions) data.subscriptions = [];
  data.categories.forEach((c) => {
    if (!Array.isArray(c.keywords)) c.keywords = [];
    normalizeCategorySubs(c);
  });
  let dirty = false;
  if (purgeAutoSyncedRecurring(data)) dirty = true;
  if (purgeOrphanRecurringTransactions(data)) dirty = true;
  if (purgeSubscriptionBackfill(data)) dirty = true;
  if (normalizeSubscriptionActivePolicy(data)) dirty = true;
  if (normalizeSubscriptionPhases(data)) dirty = true;
  if (normalizeRecurringPhases(data)) dirty = true;
  if (normalizeSubscriptionLedgerCategory(data)) dirty = true;
  if (pruneSoftwareRenewalSubcategories(data)) dirty = true;
  if (syncSubcategoryDefaults(data)) dirty = true;
  if (syncSubscriptionsFromTransactions(data)) dirty = true;
  if (bootstrapInsuranceRecurring(data)) dirty = true;
  if (bootstrapBillSubcategoryIcons(data)) dirty = true;
  if (dedupeOverlappingAutoTransactions(data)) dirty = true;
  if (dedupeDuplicateTransactions(data)) dirty = true;
  if (dirty) data.__ledgerDirty = true;
  return data;
}

const CATEGORY_META = {
  "还贷": { icon: "🏠", color: "#FFB5A7" },
  "生活": { icon: "🛒", color: "#FFBF69" },
  "吞金兽": { icon: "👶", color: "#70D6BF" },
  "人情世故": { icon: "🎁", color: "#9BF6FF" },
  "行万里路": { icon: "🚗", color: "#5B9BD5" },
  "软件续费": { icon: "📱", color: "#FF9CEE" },
  "老有所依": { icon: "👴", color: "#BDB2FF" },
  "黑马王子": { icon: "👤", color: "#FFC6FF" },
  "医疗保健": { icon: "💊", color: "#A8DADC" },
  "恋爱": { icon: "💕", color: "#F4ACB7" },
  "工作": { icon: "💼", color: "#90BE6D" },
  "工作收入": { icon: "💰", color: "#52B788" },
  "其他收入": { icon: "💵", color: "#95D5B2" },
  "上月超支": { icon: "📉", color: "#E5989B" },
  "月结": { icon: "📊", color: "#B5838D" },
  "旅行娱乐": { icon: "✈️", color: "#6DAAF2" },
  "公主骑士": { icon: "👸", color: "#DDA15E" },
  "学习": { icon: "📚", color: "#BC6C25" },
};

function buildCategoriesFromTransactions(transactions, subcatMap) {
  const subs = subcatMap || {};
  const names = new Set();
  transactions.forEach((t) => { if (t.category) names.add(t.category); });
  return [...names].sort().map((name) => {
    const meta = CATEGORY_META[name] || { icon: "📌", color: "#CCCCCC" };
    const flow = (name === "工作收入" || name === "其他收入") ? "income" : "expense";
    const set = subs[name] || new Set();
    transactions.filter((t) => t.category === name && t.subcategory).forEach((t) => set.add(t.subcategory));
    return { name, flow, icon: meta.icon, color: meta.color, subcategories: [...set].sort() };
  });
}

function getCategoryMeta(categories, name) {
  const c = categories.find((x) => x.name === name);
  return c || { name, icon: "📌", color: "#ccc", subcategories: [] };
}

// ─── Analytics ───────────────────────────────────────────────────────────────

function filterTransactions(list, period, refDate) {
  const d = refDate || new Date();
  if (period === "all") return list;
  if (period === "year") {
    const r = yearRange(d.getFullYear());
    return list.filter((t) => inRange(t.datetime, r.start, r.end));
  }
  if (period === "week") {
    const r = weekRange(d);
    return list.filter((t) => inRange(t.datetime, r.start, r.end));
  }
  const r = monthRange(d.getFullYear(), d.getMonth() + 1);
  return list.filter((t) => inRange(t.datetime, r.start, r.end));
}

function isCarryoverTx(t) {
  return t?.source === "carryover";
}

function excludeCarryover(list) {
  return (list || []).filter((t) => !isCarryoverTx(t));
}

function buildPlainLedgerHomeSnapshot(plugin) {
  const data = plugin?.store?.data;
  if (!data?.transactions) return null;
  const now = new Date();
  const monthTx = filterTransactions(data.transactions, "month", now);
  const monthTxBase = excludeCarryover(monthTx);
  const yearTxBase = excludeCarryover(filterTransactions(data.transactions, "year", now));
  const weekTxBase = excludeCarryover(filterTransactions(data.transactions, "week", now));
  const mExp = sumFlow(monthTxBase, "expense");
  const mInc = sumFlow(monthTxBase, "income");
  const balance = mInc - mExp;
  const budget = Number(plugin.settings?.monthlyBudget) || 0;
  const budgetPct = budget > 0 ? Math.min(100, (mExp / budget) * 100) : 0;
  return {
    ts: Date.now(),
    monthLabel: `${now.getMonth() + 1}月`,
    monthExpense: mExp,
    monthIncome: mInc,
    monthBalance: balance,
    monthExpenseFmt: fmtMoney(mExp),
    monthIncomeFmt: fmtMoney(mInc),
    monthBalanceFmt: fmtMoney(balance),
    weekExpense: sumFlow(weekTxBase, "expense"),
    yearExpense: sumFlow(yearTxBase, "expense"),
    budget,
    budgetPct: Number(budgetPct.toFixed(1)),
  };
}

function refreshPlainLedgerHomeCache(plugin) {
  const snap = buildPlainLedgerHomeSnapshot(plugin);
  if (!snap) return null;
  plugin._homeSummaryCache = snap;
  try {
    sessionStorage.setItem("plg-home-cache-f", JSON.stringify(snap));
  } catch (e) { /* ignore */ }
  return snap;
}

function readPlainLedgerHomeCache(plugin) {
  if (plugin?._homeSummaryCache && Date.now() - (plugin._homeSummaryCache.ts || 0) < 3600000) {
    return { ...plugin._homeSummaryCache };
  }
  try {
    const raw = sessionStorage.getItem("plg-home-cache-f");
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return null;
}

function sumCarryoverSigned(list) {
  let net = 0;
  (list || []).filter(isCarryoverTx).forEach((t) => {
    const amt = Number(t.amount) || 0;
    if (t.flow === "income") net += amt;
    else if (t.flow === "expense") net -= amt;
  });
  return net;
}

function formatCarryoverText(net) {
  if (Math.abs(net) < 0.005) return "";
  const sign = net < 0 ? "-" : "+";
  return `结转 ${sign}${fmtMoney(Math.abs(net))}`;
}

function isSettleBaseTx(t) {
  if (!t || isCarryoverTx(t) || t.flow === "transfer") return false;
  return t.flow === "income" || t.flow === "expense";
}

function monthKeyFromDate(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
}

function monthKeyAddMonths(key, delta) {
  const [y, m] = key.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return monthKeyFromDate(d);
}

function monthSettleBalance(transactions, monthKey) {
  const [y, m] = monthKey.split("-").map(Number);
  const r = monthRange(y, m);
  let income = 0;
  let expense = 0;
  (transactions || []).forEach((t) => {
    if (!isSettleBaseTx(t)) return;
    if (!inRange(t.datetime, r.start, r.end)) return;
    const amt = Number(t.amount) || 0;
    if (t.flow === "income") income += amt;
    else expense += amt;
  });
  return income - expense;
}

function yearToDateSettleBalance(transactions, year, throughMonth) {
  if (!year || !throughMonth || throughMonth < 1) return 0;
  const start = monthRange(year, 1).start;
  const end = monthRange(year, throughMonth).end;
  let income = 0;
  let expense = 0;
  (transactions || []).forEach((t) => {
    if (!isSettleBaseTx(t)) return;
    if (!inRange(t.datetime, start, end)) return;
    const amt = Number(t.amount) || 0;
    if (t.flow === "income") income += amt;
    else expense += amt;
  });
  return income - expense;
}

function yearToDateSettleBalanceThroughDate(transactions, refDate) {
  const d = refDate || new Date();
  const y = d.getFullYear();
  const start = monthRange(y, 1).start;
  const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
  let income = 0;
  let expense = 0;
  (transactions || []).forEach((t) => {
    if (!isSettleBaseTx(t)) return;
    if (!inRange(t.datetime, start, end)) return;
    const amt = Number(t.amount) || 0;
    if (t.flow === "income") income += amt;
    else expense += amt;
  });
  return income - expense;
}

function carryoverYtdId(year, targetMonth) {
  return `carryover-ytd-${year}-${pad2(targetMonth)}`;
}

function isLegacyCarryoverId(id) {
  return typeof id === "string" && id.startsWith("carryover-") && !id.startsWith("carryover-ytd-");
}

function outgoingCarryoverForMonth(transactions, refMonthKey) {
  const [year, month] = refMonthKey.split("-").map(Number);
  const targetMonth = month + 1;
  if (targetMonth > 12) return null;
  const tx = (transactions || []).find((t) => t.id === carryoverYtdId(year, targetMonth));
  if (tx) {
    return {
      amount: Number(tx.amount) || 0,
      flow: tx.flow,
      balance: tx.carryover?.balance ?? (tx.flow === "income" ? tx.amount : -tx.amount),
    };
  }
  const balance = yearToDateSettleBalance(transactions, year, month);
  if (Math.abs(balance) < 0.005) return null;
  return {
    amount: Math.round(Math.abs(balance) * 100) / 100,
    flow: balance > 0 ? "income" : "expense",
    balance,
  };
}

function carryoverSourceMonthLabel(fromMonthKey) {
  if (!fromMonthKey) return "上月";
  const m = parseInt(String(fromMonthKey).split("-")[1], 10);
  return Number.isFinite(m) ? `${m}月` : "上月";
}

function carryoverNoteText(fromMonthKey, kind, opts = {}) {
  if (opts.ytdThroughMonth && opts.year) {
    const y = opts.year;
    const m = opts.ytdThroughMonth;
    return kind === "surplus"
      ? `${y}年1-${m}月累计结余结转`
      : `${y}年1-${m}月累计超支结转`;
  }
  const [y, m] = fromMonthKey.split("-").map(Number);
  return kind === "surplus"
    ? `${y}年${m}月结余结转`
    : `${y}年${m}月超支结转`;
}

function buildYtdCarryoverTransaction(year, targetMonth, balance, categoryName) {
  const amount = Math.round(Math.abs(balance) * 100) / 100;
  const kind = balance > 0 ? "surplus" : "deficit";
  const ytdThroughMonth = targetMonth - 1;
  return {
    id: carryoverYtdId(year, targetMonth),
    datetime: `${year}-${pad2(targetMonth)}-01 00:00`,
    flow: balance > 0 ? "income" : "expense",
    category: categoryName || "月结",
    subcategory: kind === "surplus" ? "结余结转" : "超支结转",
    amount,
    ledger: "",
    accountOut: "",
    accountIn: "",
    note: carryoverNoteText(null, kind, { year, ytdThroughMonth }),
    reimburse: false,
    discount: 0,
    tags: ["月结"],
    member: "",
    source: "carryover",
    linkedSubscriptionId: "",
    linkedRecurringId: "",
    carryover: { year, ytdThroughMonth, kind, balance },
  };
}

function buildCarryoverTransaction(fromMonthKey, balance, categoryName) {
  const targetMonth = monthKeyAddMonths(fromMonthKey, 1);
  const amount = Math.round(Math.abs(balance) * 100) / 100;
  const kind = balance > 0 ? "surplus" : "deficit";
  return {
    id: `carryover-${fromMonthKey}`,
    datetime: `${targetMonth}-01 00:00`,
    flow: balance > 0 ? "income" : "expense",
    category: categoryName || "月结",
    subcategory: kind === "surplus" ? "结余结转" : "超支结转",
    amount,
    ledger: "",
    accountOut: "",
    accountIn: "",
    note: carryoverNoteText(fromMonthKey, kind),
    reimburse: false,
    discount: 0,
    tags: ["月结"],
    member: "",
    source: "carryover",
    linkedSubscriptionId: "",
    linkedRecurringId: "",
    carryover: { fromMonth: fromMonthKey, kind, balance },
  };
}

function carryoverTxChanged(a, b) {
  if (!a && !b) return false;
  if (!a || !b) return true;
  return a.flow !== b.flow
    || !amountMatch(a.amount, b.amount)
    || a.note !== b.note
    || a.subcategory !== b.subcategory
    || a.datetime !== b.datetime
    || a.carryover?.ytdThroughMonth !== b.carryover?.ytdThroughMonth;
}

function earliestSettleYear(transactions) {
  let minYear = 0;
  (transactions || []).forEach((t) => {
    if (!isSettleBaseTx(t)) return;
    const y = parseInt(String(t.datetime || "").slice(0, 4), 10);
    if (y && (!minYear || y < minYear)) minYear = y;
  });
  return minYear;
}

function sumFlow(list, flow) {
  return list.filter((t) => t.flow === flow).reduce((a, t) => a + (Number(t.amount) || 0), 0);
}

function amountMatch(a, b) {
  return Math.round((Number(a) || 0) * 100) === Math.round((Number(b) || 0) * 100);
}

function monthDailyFlowPoints(allTx, refDate, flow = "expense") {
  const y = refDate.getFullYear();
  const m = refDate.getMonth() + 1;
  const map = dailyFlowMap(allTx, y, m);
  const days = monthRange(y, m).end.getDate();
  const flowLabel = flow === "income" ? "收入" : "支出";
  const points = [];
  for (let d = 1; d <= days; d++) {
    const val = flow === "income" ? map[d].income : map[d].expense;
    points.push({
      value: val,
      label: String(d),
      tip: `${m}月${d}日 ${flowLabel} ${fmtMoney(val)}`,
    });
  }
  return points;
}

function periodFlowSum(allTx, period, refDate, flow = "expense") {
  return sumFlow(excludeCarryover(filterTransactions(allTx, period, refDate)), flow);
}

function periodFlowCount(allTx, period, refDate, flow) {
  return excludeCarryover(filterTransactions(allTx, period, refDate))
    .filter((t) => t.flow === flow).length;
}

function periodCompareCountPercent(allTx, period, refDate, flow) {
  if (period === "all") return null;
  const chain = periodChainWindow(period, refDate);
  if (!chain) return null;
  const labels = { month: "较上月", week: "较上周", year: "较上年" };
  const cur = flowCountInWindow(allTx, chain.cur.start, chain.cur.end, flow);
  const prev = flowCountInWindow(allTx, chain.start, chain.end, flow);
  if (prev <= 0) return null;
  return {
    pct: ((cur - prev) / prev) * 100,
    label: labels[period],
    cur,
    prev,
  };
}

function fmtCompareDelta(cmp) {
  if (!cmp) return "";
  const sign = cmp.pct >= 0 ? "+" : "";
  return `${cmp.label} ${sign}${cmp.pct.toFixed(1)}%`;
}

function periodComparePercent(allTx, period, refDate, flow = "expense") {
  if (period === "all") return null;
  const chain = periodChainWindow(period, refDate);
  if (!chain) return null;
  const labels = { month: "较上月", week: "较上周", year: "较上年" };
  const curSum = flowSumInWindow(allTx, chain.cur.start, chain.cur.end, flow);
  const prevSum = flowSumInWindow(allTx, chain.start, chain.end, flow);
  if (prevSum <= 0) return null;
  return {
    pct: ((curSum - prevSum) / prevSum) * 100,
    label: labels[period],
    curSum,
    prevSum,
  };
}

function monthPeriodMoMPercent(allTx, refDate, flow = "expense") {
  const cmp = periodComparePercent(allTx, "month", refDate, flow);
  return cmp ? cmp.pct : null;
}

function sameMonthPartialDayRatio(refDate) {
  const now = new Date();
  if (refDate.getFullYear() !== now.getFullYear() || refDate.getMonth() !== now.getMonth()) return 1;
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return now.getDate() / daysInMonth;
}

function fixedAutoExpenseInPeriod(allTx, period, refDate) {
  return filterTransactions(allTx, period, refDate)
    .filter((t) => t.flow === "expense" && (
      t.source === "subscription"
      || t.source === "recurring"
      || (t.tags || []).includes("订阅")
      || (t.tags || []).includes("周期")
    ))
    .reduce((a, t) => a + (Number(t.amount) || 0), 0);
}

function budgetOverrunCategoryHints(list, categories, budgetTotal) {
  const budget = Number(budgetTotal) || 0;
  if (budget <= 0) return [];
  const exp = sumFlow(list, "expense");
  if (exp <= budget) return [];
  const overrun = exp - budget;
  let acc = 0;
  const out = [];
  categoryStats(list, categories, "expense").forEach((s) => {
    if (acc >= overrun) return;
    out.push(s);
    acc += s.amount;
  });
  return out.slice(0, 3);
}

function formatTxDateLabel(datetime) {
  const d = parseDateTime(datetime);
  const y = d.getFullYear();
  const now = new Date();
  if (y === now.getFullYear()) return `${d.getMonth() + 1}月${d.getDate()}日`;
  return `${y}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function buildTxSubline(t, opts = {}) {
  const parts = [];
  if (t.reimburse) parts.push("报销");
  if (opts.dateOnly) parts.push(formatTxDateLabel(t.datetime));
  else parts.push(t.datetime.slice(11, 16));
  if (t.note) parts.push(t.note);
  return parts.join(" · ");
}

function applyUiStateToView(view, uiState) {
  if (!uiState || !view) return;
  if (uiState.tab) view.tab = uiState.tab;
  if (uiState.homeSubview) view.homeSubview = uiState.homeSubview;
  if (uiState.period) view.period = uiState.period;
  if (uiState.reportFlow) view.reportFlow = uiState.reportFlow;
  if (typeof uiState.reportTopic === "string") view.reportTopic = uiState.reportTopic;
  if (uiState.reportPresetId) view._reportPresetId = uiState.reportPresetId;
  if (uiState.reportGroupMode) view.reportGroupMode = uiState.reportGroupMode;
  if (uiState.listCategory) view.listCategory = uiState.listCategory;
  if (typeof uiState.listReimburseOnly === "boolean") view.listReimburseOnly = uiState.listReimburseOnly;
  if (typeof uiState.listSearch === "string") view.listSearch = uiState.listSearch;
  if (Array.isArray(uiState.collapsedDays)) view.collapsedDays = new Set(uiState.collapsedDays);
}

function snapshotUiStateFromView(view) {
  const tab = view.tab === "settings" ? "home" : (view.tab || "home");
  return {
    tab,
    homeSubview: view.homeSubview || "list",
    period: view.period || "month",
    reportFlow: view.reportFlow || "expense",
    reportTopic: view.reportTopic || "",
    reportPresetId: view._reportPresetId || "",
    reportGroupMode: view.reportGroupMode || "category",
    listCategory: view.listCategory || "all",
    listReimburseOnly: !!view.listReimburseOnly,
    listSearch: view.listSearch || "",
    collapsedDays: [...(view.collapsedDays || new Set())],
  };
}

async function persistDashboardUiState(plugin, view) {
  if (!plugin?.settings || !view) return;
  plugin.settings.uiState = snapshotUiStateFromView(view);
  await plugin.saveSettings();
}

function formatPlainLedgerDailyNoteLine(tx) {
  const prefix = tx.flow === "income" ? "+" : tx.flow === "transfer" ? "↔" : "-";
  const cat = tx.subcategory ? `${tx.category}·${tx.subcategory}` : (tx.category || "未分类");
  const note = tx.note ? ` ${tx.note}` : "";
  const reimb = tx.reimburse ? " [报销]" : "";
  return `- ${prefix}${fmtMoney(tx.amount)} ${cat}${note}${reimb}`;
}

async function appendPlainLedgerDailyNote(app, plugin, tx) {
  if (!plugin?.settings?.dailyNoteOnSave || !tx) return;
  const folder = normalizePath(String(plugin.settings.dailyNoteFolder || "Daily Notes").trim() || "Daily Notes");
  const day = String(tx.datetime || "").slice(0, 10) || dateKey(new Date());
  const filePath = normalizePath(`${folder}/${day}.md`);
  const line = `${formatPlainLedgerDailyNoteLine(tx)}\n`;
  const adapter = app.vault.adapter;
  try {
    const parts = folder.split("/").filter(Boolean);
    let acc = "";
    for (const p of parts) {
      acc = acc ? `${acc}/${p}` : p;
      if (!await adapter.exists(acc)) await app.vault.createFolder(acc);
    }
    if (await adapter.exists(filePath)) {
      const prev = await adapter.read(filePath);
      const sep = prev.endsWith("\n") || !prev ? "" : "\n";
      await adapter.write(filePath, `${prev}${sep}${line}`);
    } else {
      await app.vault.create(filePath, `# ${day}\n\n${line}`);
    }
  } catch (err) {
    console.warn("[PlainLedger] daily note append", err);
  }
}

function weekLabel(refDate) {
  const r = weekRange(refDate);
  const d = r.start;
  const day = d.getDay() || 7;
  const th = new Date(d);
  th.setDate(d.getDate() + 4 - day);
  const ys = new Date(th.getFullYear(), 0, 1);
  const wk = Math.ceil((((th - ys) / 86400000) + 1) / 7);
  const fmt = (dt) => `${dt.getMonth() + 1}.${dt.getDate()}`;
  return `WK${wk}（${fmt(r.start)}-${fmt(r.end)}）`;
}

function matchTransactionSearch(t, q) {
  const hay = [
    t.note,
    t.category,
    t.subcategory,
    t.amount,
    t.datetime,
    t.subcategory ? `${t.category}·${t.subcategory}` : t.category,
  ].filter(Boolean).join(" ").toLowerCase();
  return hay.includes(q);
}

function groupByDate(list) {
  const map = new Map();
  list.forEach((t) => {
    const k = t.datetime.slice(0, 10);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(t);
  });
  return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
}

function categoryStats(list, categories, flow) {
  const filtered = list.filter((t) => t.flow === flow);
  const total = sumFlow(filtered, flow) || 1;
  const map = new Map();
  filtered.forEach((t) => {
    const k = t.category || "未分类";
    if (!map.has(k)) map.set(k, { amount: 0, count: 0 });
    const o = map.get(k);
    o.amount += Number(t.amount) || 0;
    o.count += 1;
  });
  return [...map.entries()]
    .map(([name, v]) => ({
      key: name,
      name,
      amount: v.amount,
      count: v.count,
      pct: (v.amount / total) * 100,
      meta: getCategoryMeta(categories, name),
    }))
    .sort((a, b) => b.amount - a.amount);
}

const REPORT_TOPIC_PRESETS = [
  {
    id: "insurance",
    label: "保险",
    terms: ["保险", "保费", "保单", "健康险", "意外险", "宝宝保险"],
  },
  {
    id: "dining",
    label: "餐饮",
    terms: [
      "早餐", "午饭", "午餐", "晚餐", "晚饭", "夜宵", "聚餐", "吃饭", "餐饮",
      "中饭", "早点", "早饭", "家庭聚餐",
    ],
  },
  {
    id: "transport",
    label: "交通",
    terms: ["交通", "地铁", "公交", "打车", "滴滴", "高铁", "火车", "机票", "加油", "停车", "过路费", "出租车"],
  },
  {
    id: "subscription",
    label: "订阅",
    terms: ["订阅", "会员", "续费", "软件续费", "Netflix", "Spotify", "iCloud", "云盘"],
  },
];

function buildTxReportHaystack(t, categories) {
  const parts = [
    t.category,
    t.subcategory,
    t.note,
    ...(t.tags || []),
  ].map((x) => String(x || "").toLowerCase()).filter(Boolean);
  const cat = (categories || []).find((c) => c.name === t.category);
  if (cat) {
    (cat.keywords || []).forEach((k) => parts.push(String(k).toLowerCase()));
    const subRaw = findSubcategoryMeta(cat, t.subcategory);
    if (subRaw) {
      const sub = normalizeSubcategory(subRaw);
      parts.push(subcategoryName(subRaw).toLowerCase());
      (sub.keywords || []).forEach((k) => parts.push(String(k).toLowerCase()));
    } else if (t.subcategory) {
      parts.push(String(t.subcategory).toLowerCase());
    }
  }
  return parts;
}

function resolveReportTopicTerms(topic, presetId) {
  if (presetId) {
    const preset = REPORT_TOPIC_PRESETS.find((p) => p.id === presetId);
    if (preset) return preset.terms.map((x) => x.toLowerCase());
  }
  const q = String(topic || "").trim();
  if (!q) return null;
  const preset = REPORT_TOPIC_PRESETS.find((p) => p.label === q);
  if (preset) return preset.terms.map((x) => x.toLowerCase());
  return q.toLowerCase().split(/\s+/).filter(Boolean);
}

function txMatchesReportTopic(t, categories, terms) {
  if (!terms || !terms.length) return true;
  const haystack = buildTxReportHaystack(t, categories);
  return terms.some((term) => haystack.some((h) => h.includes(term)));
}

function filterByReportTopic(list, categories, topic, presetId) {
  const terms = resolveReportTopicTerms(topic, presetId);
  if (!terms) return list;
  return list.filter((t) => txMatchesReportTopic(t, categories, terms));
}

function subcategoryStats(list, categories, flow) {
  const filtered = list.filter((t) => t.flow === flow);
  const total = sumFlow(filtered, flow) || 1;
  const map = new Map();
  filtered.forEach((t) => {
    const cat = t.category || "未分类";
    const sub = (t.subcategory || "").trim() || "（无二级）";
    const key = `${cat}\0${sub}`;
    if (!map.has(key)) map.set(key, { cat, sub, amount: 0, count: 0 });
    const o = map.get(key);
    o.amount += Number(t.amount) || 0;
    o.count += 1;
  });
  const subCounts = new Map();
  map.forEach((v) => subCounts.set(v.sub, (subCounts.get(v.sub) || 0) + 1));
  return [...map.entries()]
    .map(([key, v]) => {
      const catObj = (categories || []).find((c) => c.name === v.cat);
      const catMeta = getCategoryMeta(categories, v.cat);
      const subRaw = catObj ? findSubcategoryMeta(catObj, v.sub) : null;
      const subNorm = subRaw ? normalizeSubcategory(subRaw) : { name: v.sub };
      const displayName = subCounts.get(v.sub) > 1 ? `${v.cat} · ${v.sub}` : v.sub;
      const meta = {
        ...catMeta,
        name: displayName,
        iconUrl: subNorm.iconUrl || catMeta.iconUrl,
        emoji: subNorm.emoji || catMeta.emoji,
        color: subNorm.color || catMeta.color,
      };
      return {
        key,
        name: displayName,
        cat: v.cat,
        sub: v.sub,
        amount: v.amount,
        count: v.count,
        pct: (v.amount / total) * 100,
        meta,
      };
    })
    .sort((a, b) => b.amount - a.amount);
}

function reportStatsForGroup(list, categories, flow, groupMode) {
  return groupMode === "subcategory"
    ? subcategoryStats(list, categories, flow)
    : categoryStats(list, categories, flow);
}

function txMatchesReportGroup(t, stat, groupMode) {
  if (groupMode === "subcategory") {
    const cat = t.category || "未分类";
    const sub = (t.subcategory || "").trim() || "（无二级）";
    return `${cat}\0${sub}` === stat.key;
  }
  return (t.category || "未分类") === stat.name;
}

function dailyExpenseSeries(list, year, month) {
  const r = monthRange(year, month);
  const days = r.end.getDate();
  const arr = new Array(days).fill(0);
  list.filter((t) => t.flow === "expense").forEach((t) => {
    const d = parseDateTime(t.datetime);
    if (d >= r.start && d <= r.end) arr[d.getDate() - 1] += Number(t.amount) || 0;
  });
  return arr;
}

function monthlyFlowPoints(list, year, flow = "expense") {
  const arr = new Array(12).fill(0);
  list.filter((t) => t.flow === flow).forEach((t) => {
    const d = parseDateTime(t.datetime);
    if (d.getFullYear() === year) arr[d.getMonth()] += Number(t.amount) || 0;
  });
  return arr.map((value, i) => ({
    value,
    label: `${i + 1}月`,
    tip: `${year}年${i + 1}月${flow === "income" ? "收入" : "支出"} ${fmtMoney(value)}`,
  }));
}

function dailyExpensePoints(list, year, month) {
  const series = dailyExpenseSeries(list, year, month);
  const days = series.length;
  const step = days > 20 ? 5 : days > 12 ? 3 : 1;
  const points = [];
  series.forEach((value, i) => {
    if (i % step !== 0 && i !== days - 1) return;
    points.push({
      value,
      label: `${i + 1}日`,
      tip: `${month}月${i + 1}日支出 ${fmtMoney(value)}`,
    });
  });
  return points;
}

function recentWeeklyFlowPoints(allTx, refDate, count = 7, flow = "expense") {
  const wr = weekRange(refDate);
  const weekStart = wr.start;
  const flowLabel = flow === "income" ? "收入" : "支出";
  const points = [];
  for (let i = count - 1; i >= 0; i--) {
    const ws = new Date(weekStart.getTime() - i * 7 * 86400000);
    const we = new Date(ws);
    we.setDate(ws.getDate() + 6);
    we.setHours(23, 59, 59, 999);
    const total = allTx
      .filter((t) => t.flow === flow && inRange(t.datetime, ws, we))
      .reduce((a, t) => a + (Number(t.amount) || 0), 0);
    const day = ws.getDay() || 7;
    const th = new Date(ws);
    th.setDate(ws.getDate() + 4 - day);
    const ys = new Date(th.getFullYear(), 0, 1);
    const wk = Math.ceil((((th - ys) / 86400000) + 1) / 7);
    points.push({
      value: total,
      label: String(wk),
      tip: `${weekLabel(ws)} ${flowLabel} ${fmtMoney(total)}`,
    });
  }
  return points;
}

function weekDailyFlowPoints(allTx, refDate, flow = "expense") {
  const wr = weekRange(refDate);
  const flowLabel = flow === "income" ? "收入" : "支出";
  const weekdayLabels = ["一", "二", "三", "四", "五", "六", "日"];
  const points = [];
  for (let i = 0; i < 7; i++) {
    const ds = new Date(wr.start);
    ds.setDate(wr.start.getDate() + i);
    const de = new Date(ds);
    de.setHours(23, 59, 59, 999);
    const total = allTx
      .filter((t) => t.flow === flow && inRange(t.datetime, ds, de))
      .reduce((a, t) => a + (Number(t.amount) || 0), 0);
    points.push({
      value: total,
      label: weekdayLabels[i],
      tip: `${ds.getMonth() + 1}月${ds.getDate()}日 ${flowLabel} ${fmtMoney(total)}`,
    });
  }
  return points;
}

function buildPeriodAnalysis(list, period, refDate, categories, allTx, opts = {}) {
  const lines = [];
  const exp = sumFlow(list, "expense");
  const inc = sumFlow(list, "income");
  const budget = Number(opts.monthlyBudget) || 0;

  if (period === "year") {
    const y = refDate.getFullYear();
    const monthExp = monthlyFlowPoints(list, y, "expense");
    const monthInc = monthlyFlowPoints(list, y, "income");
    const expVals = monthExp.map((p) => p.value);
    const maxExp = Math.max(...expVals);
    const positiveExp = expVals.filter((v) => v > 0);
    const minExp = positiveExp.length ? Math.min(...positiveExp) : 0;
    if (maxExp > 0) {
      const maxIdx = expVals.indexOf(maxExp);
      lines.push(`${y}年${maxIdx + 1}月支出最高 ${fmtMoney(maxExp)}`);
    }
    if (minExp > 0 && minExp < maxExp) {
      const minIdx = expVals.indexOf(minExp);
      lines.push(`${y}年${minIdx + 1}月支出最低 ${fmtMoney(minExp)}`);
    }
    const incVals = monthInc.map((p) => p.value);
    const maxInc = Math.max(...incVals);
    if (maxInc > 0) {
      const maxIdx = incVals.indexOf(maxInc);
      lines.push(`${y}年${maxIdx + 1}月收入最高 ${fmtMoney(maxInc)}`);
    }
  }

  if (period === "month") {
    const fixed = fixedAutoExpenseInPeriod(allTx, "month", refDate);
    if (exp > 0 && fixed > 0) {
      lines.push(`订阅+周期固定支出 ${fmtMoney(fixed)}（占本月 ${((fixed / exp) * 100).toFixed(1)}%）`);
    }
    if (budget > 0 && exp > budget) {
      lines.push(`⚠️ 本月已超预算 ${fmtMoney(exp - budget)}`);
      const hints = budgetOverrunCategoryHints(list, categories, budget);
      if (hints.length) {
        lines.push(`超支主要来自：${hints.map((s) => `「${s.name}」${fmtMoney(s.amount)}`).join("、")}`);
      }
    }
    const days = monthDailyFlowPoints(excludeCarryover(allTx), refDate, "expense");
    const best = days.reduce((a, d) => (d.value > a.value ? d : a), { value: 0, tip: "" });
    if (best.value > 0) {
      lines.push(`${refDate.getMonth() + 1}月 ${best.tip.split(" 支出")[0]} 支出最高 ${fmtMoney(best.value)}`);
    }
  }

  if (period === "week") {
    const days = weekDailyFlowPoints(excludeCarryover(allTx), refDate, "expense");
    const best = days.reduce((a, d) => (d.value > a.value ? d : a), { value: 0, tip: "" });
    if (best.value > 0) lines.push(`本周 ${best.tip.split(" 支出")[0]} 支出最高 ${fmtMoney(best.value)}`);
  }

  const topExp = categoryStats(list, categories, "expense")[0];
  if (topExp?.amount > 0) {
    lines.push(`支出最多的是「${topExp.name}」${fmtMoney(topExp.amount)}（${topExp.pct.toFixed(1)}%）`);
  }
  const topInc = categoryStats(list, categories, "income")[0];
  if (topInc?.amount > 0 && period !== "week") {
    lines.push(`收入最多的是「${topInc.name}」${fmtMoney(topInc.amount)}（${topInc.pct.toFixed(1)}%）`);
  }

  return lines;
}

function renderInteractiveBarChart(host, points, opts = {}) {
  host.empty();
  if (!points.length) {
    host.createDiv({ cls: "plg-empty", text: "暂无趋势数据" });
    return;
  }
  const wrap = host.createDiv({ cls: "plg-chart-wrap" + (opts.mini ? " mini" : "") });
  const tip = wrap.createDiv({ cls: "plg-chart-tooltip is-empty", text: "悬停查看数值" });
  const chart = wrap.createDiv({ cls: "plg-bar-chart" + (opts.compact ? " compact" : "") + (opts.mini ? " mini" : "") });
  const max = Math.max(...points.map((p) => p.value), 1);
  const avg = points.reduce((a, p) => a + p.value, 0) / points.length;

  const showTip = (text) => {
    tip.removeClass("is-empty");
    tip.setText(text);
  };
  const hideTip = () => {
    tip.addClass("is-empty");
    tip.setText(isTouchLedgerUi() ? "点击查看数值" : "悬停查看数值");
  };

  points.forEach((p) => {
    const col = chart.createDiv({ cls: "plg-bar-col" });
    const bar = col.createDiv({ cls: "plg-bar" });
    applyCssProps(bar, {
      "--plg-bar-h": `${Math.max(4, (p.value / max) * 100)}%`,
      ...(p.color ? { "--plg-bar-bg": p.color } : {}),
    });
    const tipText = p.tip || `${p.label} ${fmtMoney(p.value)}`;
    bar.setAttr("title", tipText);
    bar.addEventListener("mouseenter", () => showTip(tipText));
    bar.addEventListener("mouseleave", hideTip);
    bar.addEventListener("click", () => showTip(tipText));
    col.createDiv({ cls: "plg-bar-label", text: p.label });
  });

  if (!opts.mini) wrap.createDiv({ cls: "plg-chart-avg", text: `均值: ${fmtMoney(avg)}` });
}

function bindDonutHover(donut, segments, tipEl) {
  if (!segments.length) return;
  const ranges = [];
  let acc = 0;
  segments.forEach((s) => {
    ranges.push({ ...s, start: acc, end: acc + s.pct });
    acc += s.pct;
  });

  let lastSeg = segments[0];

  const pick = (e) => {
    const rect = donut.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const outer = rect.width / 2;
    if (dist > outer) return null;
    if (dist < outer * 0.65) return lastSeg;
    let deg = Math.atan2(dx, -dy) * 180 / Math.PI;
    if (deg < 0) deg += 360;
    const pct = (deg / 360) * 100;
    return ranges.find((r) => pct >= r.start && pct < r.end) || ranges[ranges.length - 1];
  };

  const showSeg = (seg) => {
    if (!seg) return;
    lastSeg = seg;
    tipEl.removeClass("is-empty");
    const tipText = `${seg.name} ${seg.pct.toFixed(1)}% · ${fmtMoney(seg.amount)}`;
    tipEl.setText(tipText);
    tipEl.setAttr("title", tipText);
  };

  tipEl.addClass("is-empty");
  tipEl.setText(isTouchLedgerUi() ? "点击查看占比" : "悬停查看占比");

  donut.addEventListener("mousemove", (e) => {
    const seg = pick(e);
    if (seg) showSeg(seg);
  });
  donut.addEventListener("click", (e) => {
    const seg = pick(e);
    if (seg) showSeg(seg);
  });
  donut.addEventListener("mouseleave", () => {
    tipEl.addClass("is-empty");
    tipEl.setText(isTouchLedgerUi() ? "点击查看占比" : "悬停查看占比");
  });
}

function dailyFlowMap(list, year, month) {
  const r = monthRange(year, month);
  const days = r.end.getDate();
  const map = {};
  for (let i = 1; i <= days; i++) map[i] = { expense: 0, income: 0, count: 0 };
  list.forEach((t) => {
    if (isCarryoverTx(t)) return;
    const d = parseDateTime(t.datetime);
    if (d < r.start || d > r.end) return;
    const day = d.getDate();
    const amt = Number(t.amount) || 0;
    if (t.flow === "expense") map[day].expense += amt;
    else if (t.flow === "income") map[day].income += amt;
    map[day].count += 1;
  });
  return map;
}

function periodSummaryForRange(list) {
  const tx = excludeCarryover(list);
  const inc = sumFlow(tx, "income");
  const exp = sumFlow(tx, "expense");
  return { income: inc, expense: exp, balance: inc - exp, count: tx.length };
}

function fmtSummaryCellMoney(n, allowNegative = false) {
  const v = Number(n) || 0;
  if (!allowNegative && Math.abs(v) < 0.005) return "-";
  return fmtMoney(v);
}

function buildStatsPeriodAverage(allTx, period, refDate) {
  if (period === "all") return null;
  if (period === "year") {
    const y = refDate.getFullYear();
    const yearTx = filterTransactions(allTx, "year", refDate);
    const total = periodSummaryForRange(yearTx);
    let activeMonths = 0;
    for (let m = 1; m <= 12; m++) {
      const r = monthRange(y, m);
      if (excludeCarryover(allTx.filter((t) => inRange(t.datetime, r.start, r.end))).length) activeMonths++;
    }
    activeMonths = activeMonths || 1;
    return {
      label: "月均",
      income: total.income / activeMonths,
      expense: total.expense / activeMonths,
      balance: total.balance / activeMonths,
    };
  }
  if (period === "month") {
    const y = refDate.getFullYear();
    const m = refDate.getMonth() + 1;
    const monthTx = filterTransactions(allTx, "month", refDate);
    const total = periodSummaryForRange(monthTx);
    const dayMap = dailyFlowMap(allTx, y, m);
    const activeDays = Object.values(dayMap).filter((d) => d.count > 0).length || 1;
    return {
      label: "日均",
      income: total.income / activeDays,
      expense: total.expense / activeDays,
      balance: total.balance / activeDays,
    };
  }
  const weekTx = filterTransactions(allTx, "week", refDate);
  const total = periodSummaryForRange(weekTx);
  return {
    label: "日均",
    income: total.income / 7,
    expense: total.expense / 7,
    balance: total.balance / 7,
  };
}

function buildStatsSummaryRows(allTx, period, refDate) {
  const rows = [];
  const base = excludeCarryover(allTx || []);

  if (period === "all") {
    const years = new Set();
    base.forEach((t) => {
      const y = parseDateTime(t.datetime).getFullYear();
      if (y) years.add(y);
    });
    [...years].sort((a, b) => b - a).forEach((y) => {
      const r = yearRange(y);
      const slice = allTx.filter((t) => inRange(t.datetime, r.start, r.end));
      rows.push({ label: `${y}年`, ...periodSummaryForRange(slice), meta: "year", year: y });
    });
    return { rows };
  }

  if (period === "year") {
    const y = refDate.getFullYear();
    const now = new Date();
    const endMonth = y === now.getFullYear() ? now.getMonth() + 1 : 12;
    for (let m = endMonth; m >= 1; m--) {
      const r = monthRange(y, m);
      const slice = allTx.filter((t) => inRange(t.datetime, r.start, r.end));
      rows.push({ label: `${m}月`, ...periodSummaryForRange(slice), meta: "month", year: y, month: m });
    }
    return { rows };
  }

  if (period === "month") {
    const y = refDate.getFullYear();
    const m = refDate.getMonth() + 1;
    const dayMap = dailyFlowMap(allTx, y, m);
    const now = new Date();
    const daysInMonth = new Date(y, m, 0).getDate();
    const endDay = (y === now.getFullYear() && m === now.getMonth() + 1) ? now.getDate() : daysInMonth;
    for (let day = endDay; day >= 1; day--) {
      const info = dayMap[day] || { expense: 0, income: 0, count: 0 };
      rows.push({
        label: `${day}日`,
        income: info.income,
        expense: info.expense,
        balance: info.income - info.expense,
        meta: "day",
        year: y,
        month: m,
        day,
      });
    }
    return { rows };
  }

  const wr = weekRange(refDate);
  for (let i = 6; i >= 0; i--) {
    const ds = new Date(wr.start);
    ds.setDate(wr.start.getDate() + i);
    const de = new Date(ds);
    de.setHours(23, 59, 59, 999);
    const slice = allTx.filter((t) => inRange(t.datetime, ds, de));
    rows.push({
      label: `${ds.getMonth() + 1}/${ds.getDate()} ${weekdayLabel(ds)}`,
      ...periodSummaryForRange(slice),
      meta: "day",
      year: ds.getFullYear(),
      month: ds.getMonth() + 1,
      day: ds.getDate(),
    });
  }
  return { rows };
}

// ─── Data store ──────────────────────────────────────────────────────────────

function txSourceRank(t) {
  const src = t?.source || "";
  if (src === "carryover") return 3;
  if (src === "smart" || src === "manual") return 0;
  if (src === "recurring" || src === "subscription") return 2;
  return 1;
}

function autoTxDedupeKey(t) {
  if (!t) return null;
  const isAuto = t.source === "recurring" || t.source === "subscription";
  const dt = isAuto ? (t.datetime?.slice(0, 10) || "") : (t.datetime?.slice(0, 16) || "");
  return [
    dt,
    t.flow || "",
    t.category || "",
    t.subcategory || "",
    t.amount,
    isAuto ? "" : (t.note || ""),
    isAuto ? (t.source || "") : (t.source || ""),
  ].join("|");
}

function sameDayExpenseKey(t) {
  return [
    t.datetime?.slice(0, 10) || "",
    t.category || "",
    t.subcategory || "",
    t.amount,
  ].join("|");
}

/** 同一天已有手动/导入账单时，移除重复的订阅/周期自动生成 */
function dedupeOverlappingAutoTransactions(data) {
  if (!data?.transactions?.length) return false;
  const manualKeys = new Set();
  data.transactions.forEach((t) => {
    if (t.source === "subscription" || t.source === "recurring") return;
    if (t.flow !== "expense") return;
    manualKeys.add(sameDayExpenseKey(t));
  });
  if (!manualKeys.size) return false;
  const before = data.transactions.length;
  data.transactions = data.transactions.filter((t) => {
    if (t.source !== "subscription" && t.source !== "recurring") return true;
    if (t.flow !== "expense") return true;
    return !manualKeys.has(sameDayExpenseKey(t));
  });
  return data.transactions.length !== before;
}

function dedupeDuplicateTransactions(data) {
  if (!data?.transactions?.length) return false;
  const bestByKey = new Map();
  for (const t of data.transactions) {
    const key = autoTxDedupeKey(t);
    const prev = bestByKey.get(key);
    if (!prev || txSourceRank(t) < txSourceRank(prev)) bestByKey.set(key, t);
  }
  if (bestByKey.size === data.transactions.length) return false;
  const keep = new Set(bestByKey.values());
  data.transactions = data.transactions.filter((t) => keep.has(t));
  return true;
}

function countCategoryTree(categories) {
  const cats = categories || [];
  return {
    cats: cats.length,
    subs: cats.reduce((n, c) => n + (c.subcategories?.length || 0), 0),
  };
}

function getEmbeddedPublicDefault() {
  return typeof PLUGIN_PUBLIC_DEFAULT_LEDGER !== "undefined" && PLUGIN_PUBLIC_DEFAULT_LEDGER?.categories?.length
    ? PLUGIN_PUBLIC_DEFAULT_LEDGER
    : null;
}

class LedgerStore {
  constructor(plugin) {
    this.plugin = plugin;
    this.data = { version: 1, ledger: "", categories: [], transactions: [] };
    this._processDueRecurringBusy = false;
    this._processDueSubscriptionsBusy = false;
    this._saveQueue = Promise.resolve();
  }

  folder() {
    return normalizePath(this.plugin.settings.dataFolder);
  }

  filePath() {
    return normalizePath(`${this.folder()}/ledger.json`);
  }

  async ensureFolder() {
    const parts = this.folder().split("/");
    let acc = "";
    for (const p of parts) {
      acc = acc ? `${acc}/${p}` : p;
      if (!await this.plugin.app.vault.adapter.exists(acc)) {
        await this.plugin.app.vault.createFolder(acc);
      }
    }
  }

  async ensurePublicEditionDefaults() {
    const isSampleEdition = typeof PLUGIN_EDITION === "string"
      && (PLUGIN_EDITION === "public" || PLUGIN_EDITION === "trial24h");
    if (!isSampleEdition) return false;
    const bundled = await this.peekBundledDefault();
    if (!bundled?.categories?.length) return false;

    const fpExists = await this.plugin.app.vault.adapter.exists(this.filePath());
    if (!fpExists) return this.importPublicSampleLedger(true);
    if (!(this.data?.categories || []).length) return this.importPublicSampleLedger(true);
    return false;
  }

  async load() {
    await this.ensureFolder();
    const fp = this.filePath();
    const isPublic = typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public";

    if (!await this.plugin.app.vault.adapter.exists(fp)) {
      if (isPublic) {
        await this.importPublicSampleLedger(true);
      } else if (this.plugin.settings.onboardingChoice === "sample") {
        await this.importBundledDefault();
      } else if (this.plugin.settings.onboardingChoice === "blank" || this.plugin.settings.onboardingComplete) {
        this.data = {
          version: 1,
          ledger: "默认账本",
          categories: [],
          transactions: [],
          recurring: [],
          subscriptions: [],
        };
        await this.save();
      } else {
        this.data = {
          version: 1,
          ledger: "默认账本",
          categories: [],
          transactions: [],
          recurring: [],
          subscriptions: [],
        };
      }
      await this.processDueRecurring();
      await this.processDueSubscriptions();
      await this.processCarryovers();
      if (isPublic) {
        this.plugin.settings.onboardingComplete = true;
        this.plugin.settings.onboardingChoice = "sample";
        this.plugin.settings.initialized = true;
        await this.plugin.saveSettings();
      }
      return;
    }

    const raw = await this.plugin.app.vault.adapter.read(fp);
    this.data = parseLedgerJson(raw);
    if (!this.data.recurring) this.data.recurring = [];
    if (!this.data.subscriptions) this.data.subscriptions = [];
    if (this.data.__ledgerDirty) {
      delete this.data.__ledgerDirty;
      await this.save();
    }
    if (!this.data.iconFormatVersion || this.data.iconFormatVersion < 1) {
      try {
        const iconDirty = await normalizeAllStoredIcons(this.data);
        this.data.iconFormatVersion = 1;
        if (iconDirty) await this.save();
      } catch (e) {
        console.warn("[PlainLedger] normalize icons", e);
      }
    }
    if (this.repairOrphanedPendingDues()) await this.save();
    if (isPublic) {
      const seeded = await this.ensurePublicEditionDefaults();
      if (seeded) {
        this.plugin.settings.onboardingComplete = true;
        this.plugin.settings.onboardingChoice = "sample";
        this.plugin.settings.initialized = true;
        await this.plugin.saveSettings();
      }
    }
    await this.processDueRecurring();
    await this.processDueSubscriptions();
    await this.processCarryovers();
    if (!this.plugin.settings.onboardingComplete) {
      const hasData = (this.data.transactions?.length || 0) > 0
        || (this.data.categories?.length || 0) > 0;
      if (hasData) {
        this.plugin.settings.onboardingComplete = true;
        await this.plugin.saveSettings();
      }
    }
  }

  async save() {
    // 串行写盘，避免记账 / due / sync 并发覆盖
    const run = async () => {
      await this.ensureFolder();
      delete this.data.__ledgerDirty;
      this.data.exportedAt = new Date().toISOString();
      this._lastLocalSaveAt = Date.now();
      this._saveSuppressUntil = Date.now() + 1500;
      await this.plugin.app.vault.adapter.write(this.filePath(), JSON.stringify(this.data, null, 2));
    };
    const next = this._saveQueue.then(run, run);
    this._saveQueue = next.catch(() => {});
    return next;
  }

  async flushPendingSave() {
    try {
      await this._saveQueue;
    } catch {
      /* ignore */
    }
  }

  async reloadIfNewer() {
    if (this._saveSuppressUntil && Date.now() < this._saveSuppressUntil) return false;
    const fp = this.filePath();
    if (!await this.plugin.app.vault.adapter.exists(fp)) return false;
    try {
      const raw = await this.plugin.app.vault.adapter.read(fp);
      const incoming = parseLedgerJson(raw);
      const curSig = ledgerSyncSignature(this.data);
      const newSig = ledgerSyncSignature(incoming);
      if (newSig === curSig) return false;
      const curTs = this.data?.exportedAt || "";
      const newTs = incoming?.exportedAt || "";
      const curTime = Date.parse(curTs);
      const newTime = Date.parse(newTs);
      const haveTimes = !Number.isNaN(curTime) && !Number.isNaN(newTime);
      if (haveTimes && newTime < curTime) {
        if (this._lastLocalSaveAt && Date.now() - this._lastLocalSaveAt < 300000) {
          this.plugin._pendingSyncConflict = {
            localAt: curTs,
            remoteAt: newTs,
            remoteCount: incoming?.transactions?.length || 0,
            stale: true,
          };
        }
        return false;
      }
      if (
        curTs && newTs && curTs !== newTs
        && this._lastLocalSaveAt
        && Date.now() - this._lastLocalSaveAt < 120000
      ) {
        this.plugin._pendingSyncConflict = {
          localAt: curTs,
          remoteAt: newTs,
          remoteCount: incoming?.transactions?.length || 0,
        };
      }
      this.data = incoming;
      if (!this.data.recurring) this.data.recurring = [];
      if (!this.data.subscriptions) this.data.subscriptions = [];
      if (typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public") {
        await this.ensurePublicEditionDefaults();
      }
      await this.processDueRecurring();
      await this.processDueSubscriptions();
      await this.processCarryovers();
      return true;
    } catch (e) {
      console.warn("[PlainLedger] reloadIfNewer", e);
      return false;
    }
  }

  async readBundledDefaultRaw() {
    const pluginId = this.plugin.manifest.id;
    const pluginRel = normalizePath(`.obsidian/plugins/${pluginId}/default-ledger.json`);
    try {
      if (await this.plugin.app.vault.adapter.exists(pluginRel)) {
        return await this.plugin.app.vault.adapter.read(pluginRel);
      }
    } catch (_) { /* fallback */ }
    const candidates = ["Finance/PlainLedger/default-ledger.json", "Finance/MumuLedger/default-ledger.json"];
    for (const p of candidates) {
      try {
        if (await this.plugin.app.vault.adapter.exists(p)) {
          return await this.plugin.app.vault.adapter.read(p);
        }
      } catch (_) { /* try next */ }
    }
    return null;
  }

  async peekBundledDefault() {
    const embedded = getEmbeddedPublicDefault();
    if (embedded) return embedded;
    const raw = await this.readBundledDefaultRaw();
    if (!raw) return null;
    try {
      return parseLedgerJson(raw);
    } catch (_) {
      return null;
    }
  }

  async importPublicSampleLedger(force = false) {
    const bundled = await this.peekBundledDefault();
    if (!bundled?.categories?.length) {
      if (force) new Notice("未找到内置样例 default-ledger.json");
      return false;
    }
    const sampleTx = [...(bundled.transactions || [])];
    this.data = {
      version: bundled.version || 1,
      ledger: bundled.ledger || "PlainLedger 示例账本",
      categories: JSON.parse(JSON.stringify(bundled.categories)),
      transactions: sampleTx,
      subscriptions: [],
      recurring: [],
      exportedAt: new Date().toISOString(),
    };
    await this.save();
    this.plugin.settings.initialized = true;
    await this.plugin.saveSettings();
    return true;
  }

  async importBundledDefault(force = false) {
    if (typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public") {
      return this.importPublicSampleLedger(force);
    }
    const raw = await this.readBundledDefaultRaw();
    if (raw) {
      this.data = parseLedgerJson(raw);
      await this.save();
      await this.processCarryovers();
      this.plugin.settings.initialized = true;
      await this.plugin.saveSettings();
      return true;
    }
    if (!force) {
      this.data = { version: 1, ledger: "默认账本", categories: [], transactions: [], exportedAt: new Date().toISOString() };
      await this.save();
    } else {
      new Notice("未找到内置样例 default-ledger.json");
    }
    return false;
  }

  async importData(payload, sourceName, opts = {}) {
    const mergeTxOnly = opts.mergeTxOnly === true;
    const preserveRules = opts.preserveRules !== false && mergeTxOnly;
    const beforeCount = (this.data.transactions || []).length;

    if (mergeTxOnly) {
      const existing = { ...this.data, transactions: [...(this.data.transactions || [])], categories: [...(this.data.categories || [])] };
      const incomingTx = payload.transactions || [];
      const existingKeys = new Set(existing.transactions.map((t) => autoTxDedupeKey(t)));
      incomingTx.forEach((t) => {
        const key = autoTxDedupeKey(t);
        if (existingKeys.has(key)) return;
        existing.transactions.unshift(t);
        existingKeys.add(key);
      });
      (payload.categories || []).forEach((incCat) => {
        let cur = existing.categories.find((c) => c.name === incCat.name);
        if (!cur) {
          existing.categories.push(incCat);
          return;
        }
        normalizeCategorySubs(cur);
        (incCat.subcategories || []).forEach((sub) => {
          const name = subcategoryName(sub);
          if (!cur.subcategories.some((s) => subcategoryName(s) === name)) {
            cur.subcategories.push(normalizeSubcategory(sub));
          }
        });
        cur.subcategories.sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
      });
      if (payload.ledger) existing.ledger = payload.ledger;
      this.data = existing;
    } else {
      if (opts.preserveRules) {
        payload.recurring = payload.recurring?.length ? payload.recurring : (this.data.recurring || []);
        payload.subscriptions = payload.subscriptions?.length ? payload.subscriptions : (this.data.subscriptions || []);
      }
      if (!payload.recurring) payload.recurring = [];
      if (!payload.subscriptions) payload.subscriptions = [];
      this.data = payload;
    }

    if (!this.data.recurring) this.data.recurring = [];
    if (!this.data.subscriptions) this.data.subscriptions = [];
    if (!this.data.categories?.length) {
      this.data.categories = buildCategoriesFromTransactions(this.data.transactions);
    }
    await this.save();
    this.plugin.settings.initialized = true;
    this.plugin.settings.lastImportAt = new Date().toISOString();
    this.plugin.settings.lastImportFile = sourceName || "";
    await this.plugin.saveSettings();
    await this.processDueRecurring();
    await this.processDueSubscriptions();
    await this.processCarryovers();
    const afterCount = (this.data.transactions || []).length;
    return {
      added: Math.max(0, afterCount - beforeCount),
      total: afterCount,
      merged: mergeTxOnly,
    };
  }

  _ensureCategoryForTx(tx) {
    const cat = tx.category;
    if (cat && !this.data.categories.find((c) => c.name === cat)) {
      const meta = CATEGORY_META[cat] || { icon: "📌", color: "#ccc" };
      this.data.categories.push({
        name: cat,
        flow: tx.flow,
        icon: meta.icon,
        color: meta.color,
        subcategories: tx.subcategory ? [normalizeSubcategory(tx.subcategory)] : [],
        keywords: [],
      });
      this.data.categories.sort((a, b) => a.name.localeCompare(b.name, "zh"));
    } else if (cat && tx.subcategory) {
      const c = this.data.categories.find((x) => x.name === cat);
      if (c) {
        normalizeCategorySubs(c);
        if (!c.subcategories.some((s) => subcategoryName(s) === tx.subcategory)) {
          c.subcategories.push(normalizeSubcategory(tx.subcategory));
          c.subcategories.sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
        }
      }
    }
  }

  _purgeLegacyCarryovers() {
    const before = (this.data.transactions || []).length;
    this.data.transactions = (this.data.transactions || []).filter((t) => {
      if (!isCarryoverTx(t)) return true;
      return !isLegacyCarryoverId(t.id);
    });
    return before !== this.data.transactions.length;
  }

  _upsertYtdCarryover(year, targetMonth) {
    const catName = this.plugin.settings.carryoverCategoryName || "月结";
    const balance = yearToDateSettleBalance(this.data.transactions, year, targetMonth - 1);
    const id = carryoverYtdId(year, targetMonth);
    const existingIdx = (this.data.transactions || []).findIndex((t) => t.id === id);
    if (Math.abs(balance) < 0.005) {
      if (existingIdx >= 0) {
        this.data.transactions.splice(existingIdx, 1);
        return true;
      }
      return false;
    }
    const next = buildYtdCarryoverTransaction(year, targetMonth, balance, catName);
    next.ledger = this.data.ledger || "";
    const existing = existingIdx >= 0 ? this.data.transactions[existingIdx] : null;
    if (existing && !carryoverTxChanged(existing, next)) return false;
    this._ensureCategoryForTx(next);
    if (existingIdx >= 0) this.data.transactions[existingIdx] = next;
    else this.data.transactions.unshift(next);
    return true;
  }

  async processCarryovers(refDate = new Date()) {
    if (this.plugin.settings?.carryoverEnabled === false) return false;
    let dirty = this._purgeLegacyCarryovers();
    const currentKey = monthKeyFromDate(refDate);
    const [currentYear, currentMonth] = currentKey.split("-").map(Number);
    const startYear = earliestSettleYear(this.data.transactions) || currentYear;
    for (let year = startYear; year <= currentYear; year += 1) {
      const maxMonth = year === currentYear ? currentMonth : 12;
      for (let month = 2; month <= maxMonth; month += 1) {
        const targetKey = `${year}-${pad2(month)}`;
        if (targetKey > currentKey) break;
        if (this._upsertYtdCarryover(year, month)) {
          dirty = true;
          if (!this.plugin.settings.carryoverIntroShown) {
            this.plugin.settings.carryoverIntroShown = true;
            await this.plugin.saveSettings();
            new Notice("已生成本月结转账单（可在设置关闭自动月结）");
          }
        }
      }
    }
    if (dirty) {
      this.data.carryoverState = {
        lastProcessedMonth: currentKey,
        lastRunAt: new Date().toISOString(),
        mode: "ytd",
      };
      await this.save();
    }
    return dirty;
  }

  _autoTxExists(item, dateStr, source) {
    const day = String(dateStr || "").slice(0, 10);
    const category = source === "recurring" ? item.category : (item.category || "软件续费");
    const sub = item.subcategory || "";
    const amount = item.amount;
    const flow = source === "recurring" ? (item.flow || "expense") : "expense";
    return (this.data.transactions || []).some((t) => {
      if (source === "subscription" && t.linkedSubscriptionId === item.id && t.datetime.startsWith(day)) return true;
      if (source === "recurring" && t.linkedRecurringId === item.id && t.datetime.startsWith(day)) return true;
      return t.flow === flow
        && t.datetime.startsWith(day)
        && t.category === category
        && (t.subcategory || "") === sub
        && amountMatch(t.amount, amount);
    });
  }

  async addTransaction(tx, opts = {}) {
    this.data.transactions.unshift(tx);
    this._ensureCategoryForTx(tx);
    if (opts.learn !== false && !isCarryoverTx(tx)) {
      learnKeywordsFromTransaction(this.data, tx, opts.learnText);
    }
    await this.save();
    if (!isCarryoverTx(tx)) {
      await appendPlainLedgerDailyNote(this.plugin.app, this.plugin, tx);
    }
    await this.processCarryovers();
  }

  async updateTransaction(tx, opts = {}) {
    const i = this.data.transactions.findIndex((t) => t.id === tx.id);
    if (i >= 0) this.data.transactions[i] = tx;
    else this.data.transactions.unshift(tx);
    if (opts.learn !== false && !isCarryoverTx(tx)) {
      learnKeywordsFromTransaction(this.data, tx, opts.learnText || tx.note);
    }
    await this.save();
    await this.processCarryovers();
  }

  _dueDateInMonth(item, monthPrefix) {
    const [y, m] = monthPrefix.split("-").map(Number);
    if (!y || !m) return "";
    const fromNext = String(item.nextDate || "").slice(0, 7) === monthPrefix
      ? String(item.nextDate).slice(8, 10)
      : "";
    const targetDay = item.cycleDay || parseInt(fromNext, 10) || 1;
    const lastDay = new Date(y, m, 0).getDate();
    return `${monthPrefix}-${pad2(Math.min(targetDay, lastDay))}`;
  }

  _matchSubscriptionForTx(tx) {
    const subs = this.data.subscriptions || [];
    return subs.find((s) => {
      if (!amountMatch(s.amount, tx.amount)) return false;
      const sub = s.subcategory || "";
      const note = String(tx.note || "");
      return (sub && sub === (tx.subcategory || ""))
        || (s.name && (note === s.name || note.includes(s.name)));
    }) || null;
  }

  _matchRecurringForTx(tx) {
    const items = this.data.recurring || [];
    return items.find((r) => {
      if (!amountMatch(r.amount, tx.amount)) return false;
      const title = r.title || r.name || "";
      const note = String(tx.note || "");
      return (r.category === tx.category && (r.subcategory || "") === (tx.subcategory || ""))
        || (title && (note === title || note.includes(title)));
    }) || null;
  }

  _revertCycleItemAfterDelete(item, billedDateStr, kind) {
    const source = kind === "subscription" ? "subscription" : "recurring";
    if (this._autoTxExists(item, billedDateStr, source)) return false;
    const expectedNext = computeNextRecurringDate(item, billedDateStr);
    const monthPrefix = billedDateStr.slice(0, 7);
    if (item.nextDate === expectedNext) {
      item.nextDate = billedDateStr;
    } else if (item.nextDate > billedDateStr && billedDateStr.startsWith(monthPrefix)) {
      item.nextDate = billedDateStr;
    } else {
      return false;
    }
    item.generatedCount = Math.max(0, (item.generatedCount || 0) - 1);
    const list = kind === "subscription" ? this.data.subscriptions : this.data.recurring;
    const i = (list || []).findIndex((x) => x.id === item.id);
    if (i >= 0) list[i] = item;
    return true;
  }

  _revertCycleForDeletedTx(tx, billedDate) {
    if (!billedDate) return;
    let item = null;
    let kind = null;
    if (tx.linkedSubscriptionId) {
      item = (this.data.subscriptions || []).find((s) => s.id === tx.linkedSubscriptionId);
      kind = "subscription";
    } else if (tx.linkedRecurringId) {
      item = (this.data.recurring || []).find((r) => r.id === tx.linkedRecurringId);
      kind = "recurring";
    } else if (tx.source === "subscription" || (tx.tags || []).includes("订阅")) {
      item = this._matchSubscriptionForTx(tx);
      kind = "subscription";
    } else if (tx.source === "recurring" || (tx.tags || []).includes("周期")) {
      item = this._matchRecurringForTx(tx);
      kind = "recurring";
    }
    if (item && kind) this._revertCycleItemAfterDelete(item, billedDate, kind);
  }

  repairOrphanedPendingDues(refDate = new Date()) {
    const monthPrefix = `${refDate.getFullYear()}-${pad2(refDate.getMonth() + 1)}`;
    let dirty = false;
    const repair = (item, kind) => {
      if (item.active === false) return;
      const due = this._dueDateInMonth(item, monthPrefix);
      if (!due || !due.startsWith(monthPrefix)) return;
      if (this._autoTxExists(item, due, kind)) return;
      const expectedNext = computeNextRecurringDate(item, due);
      if (item.nextDate === expectedNext) {
        item.nextDate = due;
        dirty = true;
      }
    };
    (this.data.subscriptions || []).forEach((s) => repair(s, "subscription"));
    (this.data.recurring || []).forEach((r) => repair(r, "recurring"));
    return dirty;
  }

  async deleteTransaction(id) {
    const tx = this.data.transactions.find((t) => t.id === id);
    if (!tx) return false;
    const billedDate = String(tx.datetime || "").slice(0, 10);
    this.data.transactions = this.data.transactions.filter((t) => t.id !== id);
    this._revertCycleForDeletedTx(tx, billedDate);
    await this.save();
    await this.processCarryovers();
    return true;
  }

  _applyRecurringGeneration(item, dateStr) {
    if (this._autoTxExists(item, dateStr, "recurring")) {
      item.nextDate = computeNextRecurringDate(item, dateStr);
      return null;
    }
    const tx = {
      id: uid(),
      datetime: cycleTimeOnDate(dateStr, item),
      flow: item.flow || "expense",
      category: item.category,
      subcategory: item.subcategory || "",
      amount: item.amount,
      ledger: this.data.ledger || "",
      accountOut: "",
      accountIn: "",
      note: item.title || item.note || "周期记账",
      reimburse: false,
      discount: 0,
      tags: ["周期"],
      member: "",
      source: "recurring",
      linkedRecurringId: item.id,
      linkedSubscriptionId: "",
    };
    item.generatedCount = (item.generatedCount || 0) + 1;
    item.nextDate = computeNextRecurringDate(item, dateStr);
    const i = this.data.recurring.findIndex((r) => r.id === item.id);
    if (i >= 0) this.data.recurring[i] = item;
    return tx;
  }

  async backfillRecurringToToday(item) {
    const today = dateKey(new Date());
    const start = billingDateValue(item);
    if (!start || item.active === false) return 0;
    if (start > today) {
      item.nextDate = computeInitialNextDate(item, new Date());
      return 0;
    }
    const dates = computeSubscriptionPeriodDates(item, start, today);
    let generated = 0;
    for (const dateStr of dates) {
      const tx = this._applyRecurringGeneration(item, dateStr);
      if (!tx) continue;
      this.data.transactions.unshift(tx);
      this._ensureCategoryForTx(tx);
      generated++;
    }
    if (!dates.length || (generated === 0 && (!item.nextDate || item.nextDate <= today))) {
      item.nextDate = computeInitialNextDate(item, new Date());
    }
    const i = this.data.recurring.findIndex((r) => r.id === item.id);
    if (i >= 0) this.data.recurring[i] = item;
    return generated;
  }

  async processDueRecurring() {
    if (this._processDueRecurringBusy) return 0;
    this._processDueRecurringBusy = true;
    try {
      const today = dateKey(new Date());
      const items = this.data.recurring || [];
      let generated = 0;
      let dirty = false;
      for (const item of items) {
        if (item.active === false) continue;
        const linked = (this.data.transactions || []).filter(
          (t) => t.linkedRecurringId === item.id,
        ).length;
        if (linked === 0 && (item.generatedCount || 0) === 0) {
          const start = billingDateValue(item);
          if (start && start <= today) {
            generated += await this.backfillRecurringToToday(item);
            dirty = true; // 含仅推进 nextDate、未生成流水
            continue;
          }
        }
        if (!item.nextDate) item.nextDate = computeNextRecurringDate(item, today);
        let guard = 0;
        while (item.nextDate && item.nextDate <= today && guard++ < 60) {
          const before = item.nextDate;
          const created = await this._generateRecurringAt(item, item.nextDate, { persist: false });
          if (created) generated++;
          if (item.nextDate !== before) dirty = true;
          // 去重后 continue 追下一期；persist:false 避免每期都写盘
        }
      }
      if (dirty || generated > 0) await this.save();
      return generated;
    } finally {
      this._processDueRecurringBusy = false;
    }
  }

  async _generateRecurringAt(item, dateStr, opts = {}) {
    const persist = opts.persist !== false;
    const tx = this._applyRecurringGeneration(item, dateStr);
    if (!tx) {
      if (persist) await this.save();
      return false;
    }
    this.data.transactions.unshift(tx);
    this._ensureCategoryForTx(tx);
    if (persist) await this.save();
    return true;
  }

  async saveRecurring(item) {
    if (!this.data.recurring) this.data.recurring = [];
    const i = this.data.recurring.findIndex((r) => r.id === item.id);
    const isNew = i < 0;
    if (i >= 0) this.data.recurring[i] = item;
    else this.data.recurring.push(item);
    syncBillIconWithSubcategory(this.data, item);
    await this.save();

    if (item.active === false || !isNew) return 0;
    const backfilled = await this.backfillRecurringToToday(item);
    if (backfilled > 0) await this.save();
    return backfilled;
  }

  async deleteRecurring(id) {
    this.data.recurring = (this.data.recurring || []).filter((r) => r.id !== id);
    await this.save();
  }

  async generateRecurring(id) {
    const item = (this.data.recurring || []).find((r) => r.id === id);
    if (!item || item.active === false) return;
    const dateStr = item.nextDate || dateKey(new Date());
    await this._generateRecurringAt(item, dateStr);
  }

  async recordPendingDue(kind, id) {
    if (kind === "recurring") {
      const item = (this.data.recurring || []).find((r) => r.id === id);
      if (!item || item.active === false) return false;
      const dateStr = item.nextDate || dateKey(new Date());
      return !!(await this._generateRecurringAt(item, dateStr));
    }
    const item = (this.data.subscriptions || []).find((s) => s.id === id);
    if (!item || item.active === false) return false;
    const dateStr = item.nextDate || dateKey(new Date());
    return !!(await this._generateSubscriptionAt(item, dateStr));
  }

  async saveSubscription(item) {
    if (!this.data.subscriptions) this.data.subscriptions = [];
    if (item.source === "manual" && item.active !== false) item.userActivated = true;
    const i = this.data.subscriptions.findIndex((r) => r.id === item.id);
    if (i >= 0) this.data.subscriptions[i] = item;
    else this.data.subscriptions.push(item);
    syncBillIconWithSubcategory(this.data, item);
    await this.save();
  }

  async deleteSubscription(id) {
    this.data.subscriptions = (this.data.subscriptions || []).filter((r) => r.id !== id);
    await this.save();
  }

  async processDueSubscriptions() {
    if (this._processDueSubscriptionsBusy) return 0;
    this._processDueSubscriptionsBusy = true;
    try {
      const today = dateKey(new Date());
      const items = this.data.subscriptions || [];
      let generated = 0;
      let dirty = false;
      for (const item of items) {
        if (item.active === false) continue;
        if (!item.nextDate) item.nextDate = computeInitialNextDate(item);
        let guard = 0;
        while (item.nextDate && item.nextDate <= today && guard++ < 60) {
          const before = item.nextDate;
          const created = await this._generateSubscriptionAt(item, item.nextDate, { persist: false });
          if (created) generated++;
          if (item.nextDate !== before) dirty = true;
        }
      }
      if (dirty || generated > 0) await this.save();
      return generated;
    } finally {
      this._processDueSubscriptionsBusy = false;
    }
  }

  async _generateSubscriptionAt(item, dateStr, opts = {}) {
    const persist = opts.persist !== false;
    if (this._autoTxExists(item, dateStr, "subscription")) {
      item.nextDate = computeNextRecurringDate(item, dateStr);
      const i = this.data.subscriptions.findIndex((r) => r.id === item.id);
      if (i >= 0) this.data.subscriptions[i] = item;
      if (persist) await this.save();
      return false;
    }
    const tx = {
      id: uid(),
      datetime: cycleTimeOnDate(dateStr, item),
      flow: "expense",
      category: item.category || "软件续费",
      subcategory: item.subcategory || "",
      amount: item.amount,
      ledger: this.data.ledger || "",
      accountOut: "",
      accountIn: "",
      note: item.name || item.note || "订阅续费",
      reimburse: false,
      discount: 0,
      tags: ["订阅"],
      member: "",
      source: "subscription",
      linkedSubscriptionId: item.id,
      linkedRecurringId: "",
    };
    item.generatedCount = (item.generatedCount || 0) + 1;
    item.nextDate = computeNextRecurringDate(item, dateStr);
    const i = this.data.subscriptions.findIndex((r) => r.id === item.id);
    if (i >= 0) this.data.subscriptions[i] = item;
    this.data.transactions.unshift(tx);
    this._ensureCategoryForTx(tx);
    if (persist) await this.save();
    return true;
  }

  async addCategory(payload) {
    const name = (payload.name || "").trim();
    if (!name) throw new Error("请填写分类名称");
    if (this.data.categories.find((c) => c.name === name)) throw new Error("分类已存在");
    const meta = CATEGORY_META[name] || { icon: "📌", color: "#ccc" };
    this.data.categories.push({
      name,
      flow: payload.flow || "expense",
      icon: payload.icon || categoryInitialIcon(name) || meta.icon,
      iconUrl: payload.iconUrl || "",
      color: payload.color || meta.color,
      subcategories: (payload.subcategories || []).map((s) => normalizeSubcategory(typeof s === "string" ? { name: s } : s)),
      keywords: [...(payload.keywords || [])],
    });
    this.data.categories.sort((a, b) => a.name.localeCompare(b.name, "zh"));
    await this.save();
  }

  async updateCategory(oldName, payload) {
    const cat = this.data.categories.find((c) => c.name === oldName);
    if (!cat) return;
    const newName = (payload.name || oldName).trim();
    if (newName !== oldName && this.data.categories.some((c) => c.name === newName)) {
      throw new Error("分类名称已存在");
    }
    if (newName !== oldName) {
      this.data.transactions.forEach((t) => {
        if (t.category === oldName) t.category = newName;
      });
      cat.name = newName;
    }
    if (payload.flow !== undefined) cat.flow = payload.flow;
    if (payload.icon !== undefined) cat.icon = payload.icon;
    if (payload.iconUrl !== undefined) cat.iconUrl = payload.iconUrl;
    if (payload.color !== undefined) cat.color = payload.color;
    if (payload.subcategories !== undefined) {
      cat.subcategories = payload.subcategories.map((s) => normalizeSubcategory(typeof s === "string" ? { name: s } : s));
    }
    if (payload.keywords !== undefined) {
      cat.keywords = [...payload.keywords];
    } else if (!cat.keywords) {
      cat.keywords = [];
    }
    await this.save();
  }

  async deleteCategory(name, migrateTo) {
    const cat = this.data.categories.find((c) => c.name === name);
    if (!cat) return;
    const related = this.data.transactions.filter((t) => t.category === name);
    if (related.length) {
      const targetName = migrateTo?.category?.trim();
      if (!targetName) throw new Error("请选择迁移目标分类");
      if (targetName === name) throw new Error("请选择其他分类");
      const target = this.data.categories.find((c) => c.name === targetName);
      if (!target) throw new Error("目标分类不存在");
      const targetSub = migrateTo?.subcategory || "";
      related.forEach((t) => {
        t.category = targetName;
        t.subcategory = targetSub;
      });
      this.migrateCategoryMeta(name, { category: targetName, subcategory: targetSub });
    }
    this.data.categories = this.data.categories.filter((c) => c.name !== name);
    await this.save();
  }

  migrateCategoryMeta(fromName, to) {
    const { category, subcategory = "" } = to;
    (this.data.recurring || []).forEach((r) => {
      if (r.category === fromName) {
        r.category = category;
        if (subcategory) r.subcategory = subcategory;
      }
    });
    (this.data.subscriptions || []).forEach((s) => {
      if (s.category === fromName) {
        s.category = category;
        if (subcategory) s.subcategory = subcategory;
      }
    });
  }

  migrateSubcategoryMeta(catName, fromSub, to) {
    const destCat = to.category || catName;
    const destSub = to.subcategory ?? "";
    const fromSn = String(fromSub || "").trim();
    if (!fromSn) return;

    const touch = (bill) => {
      if (!billLinksToSubcategory(bill, catName, fromSn)) return;
      const sub = String(bill.subcategory || "").trim();
      const title = String(bill.title || bill.name || "").trim();
      bill.category = destCat;
      bill.subcategory = destSub;
      // 规则名曾与二级同名（旧数据或 1:1 规则）时一并改名
      if (title === fromSn && (!sub || sub === fromSn)) {
        if (bill.title === fromSn) bill.title = destSub;
        if (bill.name === fromSn) bill.name = destSub;
      }
    };

    (this.data.recurring || []).forEach(touch);
    (this.data.subscriptions || []).forEach(touch);
  }

  async addSubcategory(catName, payload) {
    const meta = normalizeSubcategory(payload);
    if (!meta.name) return;
    const cat = this.data.categories.find((c) => c.name === catName);
    if (!cat) return;
    normalizeCategorySubs(cat);
    if (!cat.subcategories.some((s) => subcategoryName(s) === meta.name)) {
      cat.subcategories.push(meta);
      cat.subcategories.sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
    }
    syncSubcategoryIconWithBills(this.data, catName, meta.name, { icon: meta.icon, iconUrl: meta.iconUrl });
    await this.save();
  }

  async deleteSubcategory(catName, subRef, migrateTo) {
    const refName = subcategoryName(subRef);
    const cat = this.data.categories.find((c) => c.name === catName);
    if (!cat) return;
    normalizeCategorySubs(cat);
    const related = this.data.transactions.filter((t) => t.category === catName && t.subcategory === refName);
    if (related.length) {
      if (!migrateTo) throw new Error("请选择迁移目标");
      const destCat = migrateTo.category || catName;
      const destSub = migrateTo.subcategory ?? "";
      if (destCat === catName && destSub === refName) throw new Error("请选择其他二级分类");
      related.forEach((t) => {
        t.category = destCat;
        t.subcategory = destSub;
      });
      this.migrateSubcategoryMeta(catName, refName, { category: destCat, subcategory: destSub });
    }
    cat.subcategories = cat.subcategories.filter((s) => subcategoryName(s) !== refName);
    await this.save();
  }

  async updateSubcategory(catName, oldSub, payload) {
    const oldName = subcategoryName(oldSub);
    const next = typeof payload === "string"
      ? { ...normalizeSubcategory(oldSub), name: payload.trim() }
      : {
        ...normalizeSubcategory(oldSub),
        ...normalizeSubcategory(payload),
        name: (payload.name || oldName).trim(),
        keywords: payload.keywords !== undefined
          ? [...(payload.keywords || [])]
          : [...(normalizeSubcategory(oldSub).keywords || [])],
      };
    if (!next.name) throw new Error("请填写名称");
    const cat = this.data.categories.find((c) => c.name === catName);
    if (!cat) return;
    normalizeCategorySubs(cat);
    if (cat.subcategories.some((s) => subcategoryName(s) === next.name && subcategoryName(s) !== oldName)) {
      throw new Error("二级分类已存在");
    }
    const i = cat.subcategories.findIndex((s) => subcategoryName(s) === oldName);
    if (i < 0) throw new Error("二级分类不存在");
    cat.subcategories[i] = next;
    cat.subcategories.sort((a, b) => subcategoryName(a).localeCompare(subcategoryName(b), "zh"));
    if (next.name !== oldName) {
      this.migrateSubcategoryMeta(catName, oldName, { category: catName, subcategory: next.name });
    }
    this.data.transactions.forEach((t) => {
      if (t.category === catName && t.subcategory === oldName) t.subcategory = next.name;
    });
    syncSubcategoryIconWithBills(this.data, catName, next.name, { icon: next.icon, iconUrl: next.iconUrl });
    await this.save();
  }

  async addKeyword(catName, kw) {
    const word = (kw || "").trim();
    if (!word) return;
    const cat = this.data.categories.find((c) => c.name === catName);
    if (!cat) return;
    if (!cat.keywords) cat.keywords = [];
    if (!cat.keywords.includes(word)) cat.keywords.push(word);
    await this.save();
  }

  async updateKeyword(catName, oldKw, newKw) {
    const next = (newKw || "").trim();
    if (!next) throw new Error("请填写关键词");
    const cat = this.data.categories.find((c) => c.name === catName);
    if (!cat) return;
    if (!cat.keywords) cat.keywords = [];
    if (cat.keywords.includes(next) && next !== oldKw) throw new Error("关键词已存在");
    const i = cat.keywords.indexOf(oldKw);
    if (i < 0) throw new Error("关键词不存在");
    cat.keywords[i] = next;
    await this.save();
  }

  async deleteKeyword(catName, kw) {
    const cat = this.data.categories.find((c) => c.name === catName);
    if (!cat?.keywords) return;
    cat.keywords = cat.keywords.filter((k) => k !== kw);
    await this.save();
  }
}

function openImportLedgerOverlay(app, plugin, onDone, opts = {}) {
  openPlgOverlay({
    title: "导入账单",
    stack: true,
    build: (body, close) => {
      addClasses(body, "plg-modal");
      body.createEl("p", {
        text: "支持 PlainLedger Excel 格式或 PlainLedger JSON。.xlsx 默认合并流水并保留订阅/周期规则；.json 整包替换。",
        cls: "plg-muted",
      });
      const input = body.createEl("input", { type: "file", attr: { accept: ".xlsx,.json" } });
      const mergeRow = body.createDiv({ cls: "plg-modal-row" });
      mergeRow.createSpan({ text: "Excel 合并导入（保留订阅/周期）" });
      const mergeChk = mergeRow.createEl("input", { type: "checkbox" });
      mergeChk.checked = true;
      const btnRow = body.createDiv({ cls: "plg-modal-actions" });
      btnRow.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = () => {
        if (opts.onCancel) opts.onCancel();
        close();
      };
      const runImport = async () => {
        const file = input.files?.[0];
        if (!file) return new Notice("请选择文件");
        try {
          let payload;
          const isJson = file.name.endsWith(".json");
          if (isJson) {
            payload = parseLedgerJson(await file.text());
          } else {
            payload = parseMumuXlsx(await file.arrayBuffer());
          }
          const result = await plugin.store.importData(payload, file.name, {
            mergeTxOnly: !isJson && mergeChk.checked,
            preserveRules: !isJson && mergeChk.checked,
          });
          const msg = result?.merged
            ? `已合并 ${result.added} 笔（共 ${result.total} 笔）`
            : `已导入 ${result?.total ?? payload.transactions.length} 笔账单`;
          new Notice(msg);
          if (opts.onSuccess) await opts.onSuccess();
          onDone?.();
          close();
        } catch (e) {
          new Notice("导入失败：" + e.message);
        }
      };
      btnRow.createEl("button", { text: "导入", cls: "mod-cta", attr: { type: "button" } }).onclick = async () => {
        const file = input.files?.[0];
        if (!file) return new Notice("请选择文件");
        const isJson = file.name.endsWith(".json");
        if (isJson) {
          let payload;
          try {
            payload = parseLedgerJson(await file.text());
          } catch (e) {
            return new Notice("导入失败：" + e.message);
          }
          confirmPlgAction({
            title: "确认导入 JSON",
            message: `将用文件中的 ${payload.transactions?.length || 0} 笔账单整包替换当前 ${plugin.store.data.transactions.length} 笔，订阅/周期规则也会被覆盖。建议先导出备份。`,
            danger: true,
            confirmText: "覆盖导入",
            onConfirm: runImport,
          });
          return;
        }
        if (!mergeChk.checked) {
          let payload;
          try {
            payload = parseMumuXlsx(await file.arrayBuffer());
          } catch (e) {
            return new Notice("导入失败：" + e.message);
          }
          confirmPlgAction({
            title: "确认覆盖导入 Excel",
            message: `未勾选「合并导入」。将用文件中的 ${payload.transactions?.length || 0} 笔账单整包替换当前 ${plugin.store.data.transactions.length} 笔，订阅/周期规则会被清空。建议先导出备份。`,
            danger: true,
            confirmText: "覆盖导入",
            onConfirm: runImport,
          });
          return;
        }
        await runImport();
      };
    },
  });
}

function ledgerToMumuRows(data) {
  const headers = ["时间", "类型", "分类", "二级分类", "金额", "账本", "转出账户", "转入账户", "备注", "报销", "优惠", "成员"];
  const rows = [headers];
  (data.transactions || []).forEach((t) => {
    const flowLabel = t.flow === "income" ? "收入" : t.flow === "transfer" ? "转账" : "支出";
    rows.push([
      t.datetime || "",
      flowLabel,
      t.category || "",
      t.subcategory || "",
      String(t.amount ?? ""),
      t.ledger || "",
      t.accountOut || "",
      t.accountIn || "",
      t.note || "",
      t.reimburse ? "是" : "",
      t.discount ? String(t.discount) : "",
      t.member || "",
    ]);
  });
  return rows;
}

function rowsToCsv(rows) {
  return rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
}

async function exportLedgerJson(plugin) {
  const json = JSON.stringify(plugin.store.data, null, 2);
  const name = `ledger-export-${dateKey(new Date())}.json`;
  const path = normalizePath(`${plugin.store.folder()}/${name}`);
  await plugin.store.ensureFolder();
  await plugin.app.vault.adapter.write(path, json);
  new Notice(`已导出 JSON：${path}`);
}

async function exportLedgerMumuCsv(plugin) {
  const csv = "\uFEFF" + rowsToCsv(ledgerToMumuRows(plugin.store.data));
  const name = `plain-ledger-export-${dateKey(new Date())}.csv`;
  const path = normalizePath(`${plugin.store.folder()}/${name}`);
  await plugin.store.ensureFolder();
  await plugin.app.vault.adapter.write(path, csv);
  new Notice(`已导出 CSV：${path}`);
}

const exportLedgerCsv = exportLedgerMumuCsv;

// ─── Import modal (legacy alias) ───────────────────────────────────────────────

class ImportFileModal {
  constructor(app, plugin, onDone) {
    this.app = app;
    this.plugin = plugin;
    this.onDone = onDone;
  }

  open() {
    openImportLedgerOverlay(this.app, this.plugin, this.onDone);
  }
}

// ─── Dashboard view ────────────────────────────────────────────────────────────

let _mumuSafeAreaProbe;

/** 读取 iOS safe-area（Obsidian WebView 内 env() 可用） */
function readMobileSafeAreaInsets() {
  if (typeof document === "undefined") return { top: 0, bottom: 0 };
  if (!_mumuSafeAreaProbe) {
    _mumuSafeAreaProbe = document.createElement("div");
    _mumuSafeAreaProbe.className = "plg-safe-area-probe";
    document.body.appendChild(_mumuSafeAreaProbe);
  }
  const st = getComputedStyle(_mumuSafeAreaProbe);
  return {
    top: parseFloat(st.paddingTop) || 0,
    bottom: parseFloat(st.paddingBottom) || 0,
  };
}

class LedgerDashboardView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    const ui = Object.assign({}, DEFAULT_SETTINGS.uiState, plugin.settings.uiState || {});
    if (ui.tab === "settings") ui.tab = "home";
    if (ui.tab === "calendar") { ui.tab = "home"; ui.homeSubview = "calendar"; }
    if (ui.tab === "year") { ui.tab = "reports"; ui.period = "year"; }
    this.tab = ui.tab;
    this.homeSubview = ui.homeSubview || "list";
    this.period = ui.period;
    this.refDate = new Date();
    this.reportFlow = ui.reportFlow || "expense";
    this.listSearch = ui.listSearch || "";
    this.listCategory = ui.listCategory || "all";
    this.listReimburseOnly = !!ui.listReimburseOnly;
    this.listGroupLimit = 20;
    this._billGroupTotal = 0;
    this._billScrollHandler = null;
    this.collapsedDays = new Set(ui.collapsedDays || []);
    this.expandedReportCats = new Set();
    this.reportTopic = ui.reportTopic || "";
    this._reportPresetId = ui.reportPresetId || null;
    this._reportTopicTimer = null;
    this.reportGroupMode = ui.reportGroupMode || "category";
    this.calendarMonth = new Date();
    this.selectedDay = null;
  }

  getViewType() { return VIEW_TYPE; }
  getDisplayText() { return "PlainLedger"; }
  getIcon() { return ICON_NAME; }

  async onOpen() {
    this.containerEl.empty();
    this.root = this.containerEl.createDiv({ cls: "plg-ledger-root" });
    if (typeof isMobileCaptureUi === "function" ? isMobileCaptureUi() : Platform.isMobile) {
      this.root.addClass("plg-mobile");
      this.root.addClass("plg-mobile-tab");
    }
    // 初始值靠近稳态，避免先 72 再跳到实测值造成底栏闪缩
    applyCssProps(this.root, {
      ["--plg-top-inset"]: Platform.isMobile ? "56px" : "0px",
      ["--plg-bottom-inset"]: Platform.isMobile ? "24px" : "24px",
    });
    this.insetHandler = () => this.syncMobileInsets();
    window.addEventListener("resize", this.insetHandler);
    if (window.visualViewport) {
      // 只听 resize：scroll 在 iOS 点按 Tab 时也会狂触发，导致底栏闪缩
      window.visualViewport.addEventListener("resize", this.insetHandler);
    }
    // 只观察本 leaf 与少量导航条，勿 observe .app-container（侧栏切换会连触发布局抖动）
    this.insetObserver = new ResizeObserver(() => this.syncMobileInsets());
    this.insetObserver.observe(this.containerEl);
    const observeInsetTargets = Platform.isMobile
      ? ".mobile-toolbar, .navbar-action-bar, .mobile-navbar"
      : ".status-bar";
    document.querySelectorAll(observeInsetTargets).forEach((el) => {
      try { this.insetObserver.observe(el); } catch (_) { /* ignore */ }
    });
    await this.render();
    if (Platform.isMobile) {
      // 首帧立刻落稳，再轻量补一次（等 Obsidian 导航条几何就绪）
      this._applyMobileLayout();
      window.setTimeout(() => this._applyMobileLayout(), 120);
    }
  }

  async onClose() {
    await persistDashboardUiState(this.plugin, this);
    if (this.insetHandler) {
      window.removeEventListener("resize", this.insetHandler);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", this.insetHandler);
      }
    }
    this.insetObserver?.disconnect();
    this.containerEl.empty();
  }

  syncMobileInsets() {
    if (!this.root) return;
    // 非当前活动 leaf 时跳过，避免侧栏切走/切回时无谓重算导致卡顿
    try {
      if (this.leaf && this.app?.workspace?.activeLeaf && this.app.workspace.activeLeaf !== this.leaf) {
        return;
      }
    } catch (_) { /* ignore */ }
    if (this._insetTimer) window.clearTimeout(this._insetTimer);
    this._insetTimer = window.setTimeout(() => {
      // 真机才走 safe-area + Obsidian 悬浮导航计算
      if (Platform.isMobile) this._applyMobileLayout();
      else this._applyBottomInset();
    }, 80);
  }

  /** 真机专用：按 safe-area 与 Obsidian 悬浮导航算动态 top/bottom inset */
  _applyMobileLayout() {
    if (!Platform.isMobile || !this.root) return;

    const ih = window.innerHeight || document.documentElement.clientHeight || 640;
    const safe = readMobileSafeAreaInsets();
    const leaf = this.containerEl?.closest(".workspace-leaf-content");
    const lr = leaf?.getBoundingClientRect();
    const leafTop = lr?.top ?? 0;
    const leafBottom = lr?.bottom ?? ih;
    const gapBelowLeaf = Math.max(0, ih - leafBottom);
    const m = typeof measureMobileVisualViewport === "function"
      ? measureMobileVisualViewport()
      : null;

    // 清除此前错误的根视图缩放（曾导致搜索顶栏叠状态栏、底栏消失）
    this.root.removeClass("plg-kb-open");
    this.root.style.removeProperty("height");
    this.root.style.removeProperty("max-height");
    this.root.style.removeProperty("margin-top");

    // 顶栏：view-header 已隐藏，内容贴顶——必须始终让出状态栏，避免账单/日历重影叠入
    const safeTop = Math.max(safe.top || 0, 47);
    let topInset;
    if (leafTop >= safeTop - 4) {
      // Obsidian 已把 leaf 顶到状态栏下方：只需少量内边距
      topInset = 10;
    } else if (leafTop > 8) {
      topInset = Math.max(10, Math.round(safeTop - leafTop + 10));
    } else {
      // leaf 贴屏幕顶（常见于隐藏 view-header）：完整让出状态栏
      topInset = Math.max(18, Math.round(safeTop + 10));
    }
    topInset = Math.min(64, Math.max(10, topInset));
    // 搜索收起英雄区后：若 leaf 贴顶，必须让出状态栏
    if (this.root.hasClass("plg-search-focus-root")) {
      if (leafTop < 24) {
        topInset = Math.max(topInset, Math.round(safeTop + 8));
      } else {
        topInset = Math.max(topInset, 14);
      }
    }

    // ── 底栏：按 leaf 与导航重叠实测，避免 safe+56 / 虚高 kbGap 造成下沉再闪缩 ──
    const safeBot = Math.max(0, Math.round(safe.bottom || 0));
    let navClear = 0;
    document.querySelectorAll(
      ".mobile-toolbar, .navbar-action-bar, .mobile-navbar, .mobile-nav"
    ).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.height < 4 || r.width < 36) return;
      if (r.top < ih * 0.45) return; // 只要底栏 chrome
      // 与 leaf 底边重叠时，清出重叠量
      if (r.top < leafBottom - 2 && r.bottom > leafBottom - 140) {
        navClear = Math.max(navClear, Math.ceil(leafBottom - r.top + 6));
      }
    });

    let bottomInset;
    if (gapBelowLeaf >= 48) {
      // Obsidian 已把 leaf 收在底栏之上：只需少量呼吸间距，勿再叠 safe+56
      bottomInset = safeBot > 0 ? 12 : 14;
    } else if (navClear > 0) {
      bottomInset = Math.max(safeBot + 8, navClear);
    } else {
      // leaf 贴底：只让出 Home Indicator + 少量内边距
      bottomInset = Math.max(16, safeBot + 10);
    }

    // 键盘弹起才抬高；勿用未开键盘时的 kbGap（开屏时常虚高，导致先下沉再收缩）
    if (m?.keyboardOpen && m.kbGap > 80) {
      bottomInset = Math.max(56, Math.ceil(m.kbGap - gapBelowLeaf + 8));
      bottomInset = Math.min(bottomInset, Math.round(ih * 0.45));
    }

    // 保证 body+Tab 仍有可见高度
    {
      const tabReserve = 72;
      const bodyMin = 96;
      const maxBot = Math.max(48, Math.round(ih - topInset - tabReserve - bodyMin));
      bottomInset = Math.min(bottomInset, maxBot);
    }
    bottomInset = Math.min(160, Math.max(10, Math.round(bottomInset)));

    // 滞回：点 Tab / 轻触触发的微小重算不改 CSS，杜绝闪一下
    const prevBot = parseFloat(this.root.style.getPropertyValue("--plg-bottom-inset")) || 0;
    if (prevBot > 0 && Math.abs(prevBot - bottomInset) < 5) {
      bottomInset = prevBot;
    }
    const prevTop = parseFloat(this.root.style.getPropertyValue("--plg-top-inset")) || 0;
    if (prevTop > 0 && Math.abs(prevTop - topInset) < 3) {
      topInset = prevTop;
    }

    const topStr = `${topInset}px`;
    const botStr = `${bottomInset}px`;
    if (this.root.style.getPropertyValue("--plg-top-inset") !== topStr) {
      applyCssProps(this.root, { ["--plg-top-inset"]: topStr });
    }
    if (this.root.style.getPropertyValue("--plg-bottom-inset") !== botStr) {
      applyCssProps(this.root, { ["--plg-bottom-inset"]: botStr });
    }
  }

  _applyBottomInset() {
    if (!this.root) return;
    const tabbar = this.root.querySelector(".plg-tabbar");
    if (!tabbar) return;

    let inset = 0;
    const tr = tabbar.getBoundingClientRect();
    // 紧凑布局（含窄桌面侧栏）用手机版底栏高度做下限，否则 Tab 会压到内容上
    const compact = this.root.hasClass("plg-mobile");
    const floor = compact ? 56 : 22;
    const cap = compact ? 88 : 40;

    document.querySelectorAll(
      ".status-bar, .mobile-navbar, .navbar-action-bar, .mobile-toolbar, .app-container > .status-bar"
    ).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.height < 4 || r.width < 40) return;
      if (r.top < tr.bottom - 1 && r.bottom > tr.top + 1) {
        inset = Math.max(inset, tr.bottom - r.top + 6);
      }
    });

    const leaf = this.containerEl?.closest(".workspace-leaf-content");
    if (leaf) {
      const lr = leaf.getBoundingClientRect();
      if (tr.bottom > lr.bottom - 1) {
        inset = Math.max(inset, tr.bottom - lr.bottom + 6);
      }
    }

    if (compact && tr.bottom > window.innerHeight - 1) {
      inset = Math.max(inset, tr.bottom - window.innerHeight + 6);
    }

    const next = `${Math.max(floor, Math.min(cap, Math.round(inset)))}px`;
    const cur = this.root.style.getPropertyValue("--plg-bottom-inset");
    if (cur !== next) {
      applyCssProps(this.root, { ["--plg-bottom-inset"]: next });
    }
  }

  openBudgetEditor() {
    const plugin = this.plugin;
    const isMobile = this.root?.hasClass("plg-mobile")
      || (typeof Platform !== "undefined" && Platform.isMobile);
    openPlgOverlay({
      title: "本月预算",
      cls: isMobile ? "plg-budget-edit-modal" : "plg-budget-edit-modal",
      build: (body, close) => {
        addClasses(body, "plg-modal", "plg-budget-edit-modal");
        body.createDiv({ cls: "plg-muted", text: "填 0 表示不设预算，界面不再显示剩余额度与超支" });
        const inp = body.createEl("input", {
          type: "text",
          cls: "plg-budget-edit-input",
          attr: { placeholder: "例如 8000", inputmode: "decimal", autocomplete: "off" },
        });
        inp.value = plugin.settings.monthlyBudget > 0 ? String(plugin.settings.monthlyBudget) : "";
        const focusInput = () => {
          inp.focus({ preventScroll: true });
          if (typeof inp.setSelectionRange === "function") {
            const len = inp.value.length;
            inp.setSelectionRange(len, len);
          }
        };
        inp.addEventListener("touchend", (e) => {
          e.stopPropagation();
          focusInput();
        }, { passive: true });
        window.requestAnimationFrame(() => focusInput());
        const row = body.createDiv({ cls: "plg-modal-actions" });
        row.createEl("button", { text: "取消", attr: { type: "button" } }).onclick = close;
        row.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).onclick = async () => {
          const next = parseFloat(String(inp.value).replace(/[^\d.]/g, "")) || 0;
          plugin.settings.monthlyBudget = next;
          await plugin.saveSettings();
          new Notice(next > 0 ? `本月预算已设为 ¥${fmtMoney(next)}` : "已取消本月预算");
          this.render();
          close();
        };
      },
    });
  }

  beginSplitPage(parent, opts = {}) {
    const glassFixed = opts.glassFixed !== false;
    parent.addClass("plg-page-split");
    const fixedCls = glassFixed ? "plg-page-fixed plg-glass-panel" : "plg-page-fixed";
    return {
      fixed: parent.createDiv({ cls: fixedCls }),
      scroll: parent.createDiv({ cls: "plg-page-scroll" }),
    };
  }

  syncTabBarActive(tabbar) {
    const tabs = ["home", "stats", "capture", "reports", "settings"];
    tabbar.querySelectorAll(".plg-tab").forEach((btn) => {
      const tabId = btn.getAttr("data-tab");
      btn.toggleClass("active", tabId === this.tab && tabId !== "settings" && tabId !== "capture");
    });
  }

  async render() {
    if (!this.root) return;
    if (typeof isLicenseRequired === "function" && isLicenseRequired()
      && !isPluginLicensed(this.app, this.plugin.settings)) {
      this.root.empty();
      this.root.removeClass("plg-activation-panel");
      renderActivationPanel(this.root, this.plugin);
      if (Platform.isMobile || this.root.hasClass("plg-mobile")) this.syncMobileInsets();
      return;
    }

    if (this.root.querySelector(".plg-activation-wrap") || !this.root.querySelector(".plg-tabbar")) {
      this.root.empty();
      this.root.removeClass("plg-activation-panel");
    }

    const prevScroll = this.root.querySelector(".plg-page-scroll");
    const scrollTop = prevScroll?.scrollTop || 0;
    const tabbar = this.root.querySelector(".plg-tabbar");
    const prevBody = this.root.querySelector(".plg-body");

    if (prevBody && tabbar && (this.tab === "stats" || this.tab === "reports")) {
      const inset = prevBody.querySelector(".plg-sidebar-inset") || prevBody.querySelector(".lifeos-sidebar-inset");
      const blockId = `${this.tab}-page`;
      if (inset?.querySelector(`[data-plg-block="${blockId}"]`)) {
        if (this.tab === "stats") this.renderStats(inset, { patch: true });
        else this.renderReports(inset, { patch: true });
        this.syncTabBarActive(tabbar);
        const newScroll = prevBody.querySelector(".plg-page-scroll");
        if (newScroll && scrollTop > 0) newScroll.scrollTop = scrollTop;
        if (Platform.isMobile || this.root.hasClass("plg-mobile")) this.syncMobileInsets();
        return;
      }
    }

    this.root.querySelector(".plg-body")?.remove();

    const body = this.root.createDiv({ cls: "plg-body plg-body-split" });
    if (tabbar) this.root.insertBefore(body, tabbar);

    const inset = body.createDiv({ cls: "lifeos-sidebar-inset plg-sidebar-inset" });
    if (typeof renderTrialBanner === "function") renderTrialBanner(inset, this.plugin);

    if (this.tab === "home") this.renderHome(inset);
    else if (this.tab === "stats") this.renderStats(inset);
    else if (this.tab === "reports") this.renderReports(inset);
    else this.renderHome(inset);

    if (!tabbar) this.renderTabBar(this.root);
    else this.syncTabBarActive(tabbar);
    const newScroll = this.root.querySelector(".plg-page-scroll");
    if (newScroll && scrollTop > 0) newScroll.scrollTop = scrollTop;
    if (Platform.isMobile || this.root.hasClass("plg-mobile")) this.syncMobileInsets();
  }

  renderTxRow(listEl, t, data, opts = {}) {
    const stacked = !!opts.stacked;
    const carryover = isCarryoverTx(t);
    const iconMeta = getTransactionIconMeta(data.categories, t.category, t.subcategory, data.subscriptions, data.recurring);
    const row = listEl.createDiv({
      cls: "plg-tx-row plg-tx-row-interactive"
        + (stacked ? " plg-tx-row-stacked" : "")
        + (carryover ? " plg-tx-row-carryover" : ""),
    });
    const title = buildTransactionDisplayTitle(data.categories, t);
    const subline = buildTxSubline(t, { dateOnly: stacked || opts.dateOnly });
    const amtCls = t.flow === "income" ? "inc" : t.flow === "transfer" ? "xfer" : "exp";
    const prefix = t.flow === "income" ? "+" : t.flow === "transfer" ? "↔" : "-";

    if (stacked) {
      renderCategoryIcon(row, iconMeta, { panelIcon: true });
      const content = row.createDiv({ cls: "plg-tx-row-content" });
      content.createDiv({ cls: "plg-tx-title", text: title });
      const subWrap = content.createDiv({ cls: "plg-tx-sub" });
      if (subline) subWrap.setText(subline);
      if (carryover) subWrap.createSpan({ cls: "plg-tx-tag", text: "月结" });
      row.createDiv({ cls: `plg-tx-amt ${amtCls}`, text: prefix + fmtMoney(t.amount) });
    } else {
      renderCategoryIcon(row, iconMeta, { panelIcon: true });
      const mid = row.createDiv({ cls: "plg-tx-mid" });
      mid.createDiv({ cls: "plg-tx-title", text: title });
      const subWrap = mid.createDiv({ cls: "plg-tx-sub" });
      if (subline) subWrap.setText(subline);
      if (carryover) subWrap.createSpan({ cls: "plg-tx-tag", text: "月结" });
      row.createDiv({ cls: `plg-tx-amt ${amtCls}`, text: prefix + fmtMoney(t.amount) });
    }

    row.addEventListener("click", () => {
      if (carryover) {
        openCarryoverReadonlyOverlay(this.app, this.plugin, t);
        return;
      }
      openEditTransaction(
        this.app,
        this.plugin,
        { ...t },
        () => this.render(),
        () => this.render()
      );
    });
  }

  renderSettingsPanel(_parent) {
    /* 设置统一在 overlay 弹窗 + Obsidian 设置 → PlainLedger，面板内不再渲染设置页 */
  }

  renderPageToolbar(parent, opts = {}) {
    const toolbar = parent.createDiv({ cls: "plg-report-toolbar" + (opts.embedded ? " is-embedded" : "") });
    const glassRow = toolbar.createDiv({ cls: "plg-toolbar-glass" + (opts.embedded ? " is-embedded" : "") });
    const topRow = glassRow.createDiv({
      cls: "plg-toolbar-glass-top" + (opts.flowToggle ? "" : " is-period-only"),
    });
    const left = topRow.createDiv({ cls: "plg-toolbar-glass-left" });
    const periodSegs = left.createDiv({ cls: "plg-segments plg-seg-capsule plg-segments-period" });
    [
      { id: "all", label: "总" },
      { id: "year", label: "年" },
      { id: "month", label: "月" },
      { id: "week", label: "周" },
    ].forEach((it) => {
      const b = periodSegs.createEl("button", { text: it.label, cls: this.period === it.id ? "active" : "" });
      b.onclick = () => {
        this.period = it.id;
        persistDashboardUiState(this.plugin, this);
        this.render();
      };
    });
    const right = topRow.createDiv({ cls: "plg-toolbar-glass-right" });
    if (opts.flowToggle) {
      const flowSegs = right.createDiv({ cls: "plg-segments plg-seg-capsule plg-seg-capsule-accent plg-segments-flow" });
      ["expense", "income"].forEach((f) => {
        const b = flowSegs.createEl("button", {
          text: f === "expense" ? "支出" : "收入",
          cls: this.reportFlow === f ? "active" : "",
        });
        b.onclick = () => { this.reportFlow = f; persistDashboardUiState(this.plugin, this); this.render(); };
      });
    }
    if (this.period !== "all") {
      const navRow = glassRow.createDiv({ cls: "plg-toolbar-glass-nav-row" });
      this.renderPeriodNav(navRow, { scopeTip: opts.scopeTip });
    }
  }

  renderPeriodNav(parent, opts = {}) {
    const bar = parent.createDiv({ cls: "plg-period-nav-bar" });
    const nav = bar.createDiv({ cls: "plg-month-nav plg-toolbar-period-nav" });
    nav.createEl("button", { text: "‹" }).onclick = () => {
      if (this.period === "month") this.refDate = new Date(this.refDate.getFullYear(), this.refDate.getMonth() - 1, 1);
      else if (this.period === "year") this.refDate = new Date(this.refDate.getFullYear() - 1, 0, 1);
      else this.refDate = new Date(this.refDate.getTime() - 7 * 86400000);
      this.render();
    };
    const label = nav.createSpan({ cls: "plg-month-label" });
    if (this.period === "month") label.setText(`${this.refDate.getFullYear()}年 ${this.refDate.getMonth() + 1}月`);
    else if (this.period === "year") label.setText(`${this.refDate.getFullYear()}年`);
    else label.setText(weekLabel(this.refDate));
    nav.createEl("button", { text: "›" }).onclick = () => {
      if (this.period === "month") this.refDate = new Date(this.refDate.getFullYear(), this.refDate.getMonth() + 1, 1);
      else if (this.period === "year") this.refDate = new Date(this.refDate.getFullYear() + 1, 0, 1);
      else this.refDate = new Date(this.refDate.getTime() + 7 * 86400000);
      this.render();
    };
    if (opts.scopeTip) appendScopeTipBtn(bar, opts.scopeTip);
  }

  renderLedgerSubviewBar(parent) {
    const bar = parent.createDiv({ cls: "plg-ledger-subnav plg-ledger-subnav-immersive" });
    [
      { id: "list", label: "账单", iconKey: "bill" },
      { id: "calendar", label: "日历", iconKey: "calendar" },
    ].forEach((item) => {
      const btn = bar.createDiv({
        cls: "plg-ledger-subnav-btn" + (this.homeSubview === item.id ? " active" : ""),
        attr: { "data-subview": item.id },
      });
      renderPlgNavIcon(btn.createSpan({ cls: "plg-ledger-subnav-icon" }), item.iconKey, { settings: this.plugin.settings });
      btn.createSpan({ text: item.label });
      btn.setAttr("role", "button");
      btn.setAttr("tabindex", "0");
      const switchSubview = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.homeSubview === item.id) return;
        this.homeSubview = item.id;
        if (item.id === "calendar") {
          this.calendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
          this.selectedDay = new Date().getDate();
        }
        persistDashboardUiState(this.plugin, this);
        this.render();
      };
      btn.addEventListener("click", switchSubview);
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") switchSubview(e);
      });
    });
  }

  renderHome(parent) {
    const data = this.plugin.store.data;
    const now = new Date();
    const { fixed, scroll } = this.beginSplitPage(parent, { glassFixed: false });
    fixed.addClass("plg-has-glass-child");
    const immersive = fixed.createDiv({ cls: "plg-home-immersive plg-glass-panel" });
    this.renderLedgerSubviewBar(immersive);
    if (this.homeSubview === "calendar") {
      this.renderCalendarInto(immersive, scroll);
      return;
    }
    const isMobileHome = this.root?.hasClass("plg-mobile");
    this.renderHomeSummary(immersive, data, now);
    if (!isMobileHome) {
      renderPendingDuesPanel(immersive, this.plugin, {
        limit: this.plugin.settings.uiState?.pendingDuesShowAll ? 50 : 4,
        collapsible: true,
        onRefresh: () => this.render(),
      });
    }
    const listCard = scroll.createDiv({ cls: "plg-card plg-home-list-card" });
    this.renderHomeBillSection(listCard, data, now);
  }

  renderHomeSummary(hero, data, now) {
    const monthTx = filterTransactions(data.transactions, "month", now);
    const monthTxBase = excludeCarryover(monthTx);
    const yearTxBase = excludeCarryover(filterTransactions(data.transactions, "year", now));
    const weekTxBase = excludeCarryover(filterTransactions(data.transactions, "week", now));

    const mExp = sumFlow(monthTxBase, "expense");
    const mInc = sumFlow(monthTxBase, "income");
    const balance = mInc - mExp;
    const budgetExp = mExp;
    const budget = Number(this.plugin.settings.monthlyBudget) || 0;
    // 预算填 0 = 不启用；此时不算百分比、超支、剩余，避免把「未设置」显示成大红负数
    const budgetSet = budget > 0;
    const budgetPctRaw = budgetSet ? (budgetExp / budget) * 100 : 0;
    const budgetOver = budgetSet && budgetExp > budget;
    const budgetPct = budgetSet ? Math.min(100, budgetPctRaw) : 0;
    const budgetOverAmt = budgetOver ? budgetExp - budget : 0;
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const dayOfMonth = now.getDate();
    const dailyAvg = dayOfMonth > 0 ? budgetExp / dayOfMonth : 0;
    const remainDays = daysInMonth - dayOfMonth + 1;
    const remainDaily = budgetSet && remainDays > 0 ? (budget - budgetExp) / remainDays : 0;
    const remainAmt = budgetSet ? budget - budgetExp : 0;
    const ytdBal = yearToDateSettleBalanceThroughDate(data.transactions, now);
    const ytdMonth = now.getMonth() + 1;

    const banner = hero.createDiv({ cls: "plg-banner plg-banner-in-hero" });
    const tagRow = banner.createDiv({ cls: "plg-banner-tag-row" });
    tagRow.createDiv({ cls: "plg-banner-tag", text: `${now.getMonth() + 1}月 · 支出` });
    const syncBadge = tagRow.createDiv({
      cls: "plg-sync-badge",
      attr: { role: "button", tabindex: "0" },
    });
    const ledgerUpdated = formatSyncTime(this.plugin.store.data?.exportedAt);
    const syncChecked = formatSyncTime(this.plugin._lastSyncCheckedAt || Date.now());
    syncBadge.setText(`同步 · ${syncChecked}`);
    syncBadge.setAttr("title", `点击刷新同步 · 账本更新 ${ledgerUpdated}`);
    syncBadge.setAttr("aria-label", `刷新同步，账本更新 ${ledgerUpdated}`);
    const refreshSync = () => this.plugin.syncFromExternalSources(true);
    syncBadge.addEventListener("click", refreshSync);
    syncBadge.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        refreshSync();
      }
    });
    const expChain = periodSummaryChainCompare(data.transactions, "month", now, "expense");
    const mainRow = banner.createDiv({ cls: "plg-banner-main-row" });
    const amountWrap = mainRow.createDiv({ cls: "plg-banner-amount-wrap" });
    amountWrap.createDiv({ cls: "plg-banner-amount", text: fmtMoney(mExp) });
    if (expChain) {
      const sign = expChain.pct > 0 ? "+" : "";
      amountWrap.createSpan({
        cls: `plg-banner-exp-cmp ${compareTagClass("expense", expChain.pct)}`,
        text: `环${sign}${expChain.pct.toFixed(1)}%`,
      });
    }
    const sideStats = mainRow.createDiv({ cls: "plg-banner-side-stats" });
    const incLine = sideStats.createDiv({ cls: "plg-banner-side-line" });
    incLine.createSpan({ cls: "plg-banner-side-label", text: "收入" });
    incLine.createSpan({ cls: "plg-banner-side-val inc", text: fmtMoney(mInc) });
    const balLine = sideStats.createDiv({ cls: "plg-banner-side-line" });
    balLine.createSpan({ cls: "plg-banner-side-label", text: BALANCE_TERM_MONTHLY });
    balLine.createSpan({
      cls: "plg-banner-side-val " + (balance >= 0 ? "inc" : "over"),
      text: fmtMoney(balance),
    });
    const sub = banner.createDiv({ cls: "plg-banner-sub" });
    const ytdInline = sub.createDiv({ cls: "plg-banner-ytd-inline" });
    ytdInline.createSpan({
      text: `${ytdBalanceLabel(ytdMonth)} ${fmtMoney(ytdBal)}`,
      cls: ytdBal >= 0 ? "inc" : "over",
    });
    appendBalanceInfoBtn(ytdInline, this.app);

    const isMobileHome = this.root?.hasClass("plg-mobile");
    const metricsAlign = isMobileHome ? hero.createDiv({ cls: "plg-home-metrics-align" }) : null;
    const cardsParent = metricsAlign || hero;
    const cards = cardsParent.createDiv({
      cls: "plg-summary-cards plg-home-mini-row" + (isMobileHome ? " plg-metrics-align-cards" : ""),
    });
    const goReportPeriod = (period) => {
      this.tab = "reports";
      this.period = period;
      this.refDate = new Date();
      persistDashboardUiState(this.plugin, this);
      this.render();
    };
    // 三卡一律可点可键盘激活；日历仍由账本子导航进入
    [
      {
        label: "本年", iconKey: "year", hint: "查看本年报表",
        inc: sumFlow(yearTxBase, "income"), exp: sumFlow(yearTxBase, "expense"),
        activate: () => goReportPeriod("year"),
      },
      {
        label: "本月", iconKey: "month", hint: "查看本月报表",
        inc: mInc, exp: mExp,
        activate: () => goReportPeriod("month"),
      },
      {
        label: "本周", iconKey: "week", hint: "查看本周报表",
        inc: sumFlow(weekTxBase, "income"), exp: sumFlow(weekTxBase, "expense"),
        activate: () => goReportPeriod("week"),
      },
    ].forEach((c) => {
      const card = cards.createDiv({ cls: "plg-mini-card plg-home-period-card plg-mini-card-link" });
      card.setAttr("role", "button");
      card.setAttr("tabindex", "0");
      card.setAttr("aria-label", `${c.label} · ${c.hint}`);
      card.setAttr("title", c.hint);
      renderPlgNavIcon(card.createDiv({ cls: "plg-mini-icon" }), c.iconKey, { settings: this.plugin.settings });
      // 三卡保留图标与收支数，不显示「本年 / 本月 / 本周」文字
      card.createDiv({ cls: "plg-mini-inc", text: "+" + fmtMoney(c.inc) });
      card.createDiv({ cls: "plg-mini-exp", text: "-" + fmtMoney(c.exp) });
      const activate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        c.activate();
      };
      card.addEventListener("click", activate);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") activate(e);
      });
    });

    const budgetParent = metricsAlign || hero;
    const budgetCard = budgetParent.createDiv({
      cls: "plg-budget-card plg-compact plg-budget-mobile-stack"
        + (isMobileHome ? " plg-metrics-align-budget" : "")
        + (budgetSet ? "" : " plg-budget-unset")
        + (budgetOver ? " plg-budget-over" : ""),
    });

    const wireMobileBudgetInput = (host, inputCls) => {
      const budgetInp = host.createEl("input", {
        type: "text",
        cls: inputCls || "plg-budget-val-inline",
        attr: { inputmode: "decimal", autocomplete: "off", "aria-label": "本月预算" },
      });
      budgetInp.value = budget > 0 ? String(budget) : "";
      let budgetSaveTimer = null;
      const commitBudget = async () => {
        const v = parseFloat(String(budgetInp.value).replace(/[^\d.]/g, "")) || 0;
        if (v === this.plugin.settings.monthlyBudget) return;
        this.plugin.settings.monthlyBudget = v;
        await this.plugin.saveSettings();
        this.render();
      };
      budgetInp.oninput = () => {
        window.clearTimeout(budgetSaveTimer);
        budgetSaveTimer = window.setTimeout(commitBudget, 500);
      };
      budgetInp.onblur = () => commitBudget();
      budgetInp.onkeydown = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          budgetInp.blur();
        }
      };
      return budgetInp;
    };

    budgetCard.createDiv({ cls: "plg-budget-mobile-title-rule" });
    const bh = budgetCard.createDiv({ cls: "plg-budget-mobile-title" });
    bh.createSpan({
      cls: "plg-budget-mobile-title-text plg-budget-title-align-year",
      text: "本月预算",
    });
    const titleInputWrap = bh.createDiv({
      cls: "plg-budget-title-input-wrap plg-budget-title-align-week",
    });
    wireMobileBudgetInput(titleInputWrap, "plg-budget-val-inline plg-budget-mobile-amt-input plg-budget-title-input");

    const mobileRow = budgetCard.createDiv({ cls: "plg-budget-mobile-row" });

    const colRing = mobileRow.createDiv({ cls: "plg-budget-col-ring" });
    const ring = colRing.createDiv({
      cls: "plg-ring" + (budgetOver ? " over" : "") + (budgetSet ? "" : " is-unset"),
    });
    if (!budgetSet) {
      applyCssProps(ring, {
        "--plg-ring-bg": "conic-gradient(var(--background-modifier-border) 100%, var(--background-modifier-border) 0)",
      });
      ring.createDiv({ cls: "plg-ring-inner is-unset", text: "—" }).setAttr("aria-hidden", "true");
    } else {
      applyCssProps(ring, {
        "--plg-ring-bg": budgetOver
          ? "conic-gradient(var(--plg-budget-ring-over) 100%, var(--background-modifier-border) 0)"
          : `conic-gradient(var(--plg-budget-ring) ${budgetPct}%, var(--background-modifier-border) 0)`,
      });
      fillBudgetRingInner(ring, budgetPctRaw, budgetOver);
    }

    const stats = mobileRow.createDiv({
      cls: "plg-budget-mobile-stats" + (budgetSet ? "" : " is-unset"),
    });
    const addStatCol = (label, value, numCls, labelCls) => {
      const col = stats.createDiv({ cls: "plg-budget-amt-block" });
      col.createDiv({ cls: "lbl" + (labelCls ? ` ${labelCls}` : ""), text: label });
      col.createDiv({ cls: "num" + (numCls ? ` ${numCls}` : ""), text: value });
    };
    addStatCol("已消费", fmtMoney(budgetExp), "exp", "exp");
    if (budgetSet) {
      const overCls = budgetOverAmt > 0 ? "warn" : "is-weak";
      const remainCls = remainAmt < 0 ? "warn" : "inc";
      addStatCol("已超支", fmtMoney(budgetOverAmt), overCls, overCls);
      addStatCol("剩余额度", fmtMoney(remainAmt), remainCls, remainCls);
    }

    const dailyRow = budgetCard.createDiv({ cls: "plg-budget-mobile-daily" });
    const dailyLeft = dailyRow.createDiv({ cls: "plg-budget-inline-line is-left" });
    dailyLeft.createSpan({ cls: "lbl", text: "本月日均消费" });
    dailyLeft.createSpan({ cls: "num", text: fmtMoney(dailyAvg) });
    if (budgetSet) {
      const dailyRight = dailyRow.createDiv({
        cls: "plg-budget-inline-line is-right" + (remainDaily < 0 ? " over" : " inc"),
      });
      dailyRight.createSpan({ cls: "lbl", text: "剩余每日可消费" });
      dailyRight.createSpan({ cls: "num", text: fmtMoney(remainDaily) });
    }

    if (!budgetSet) {
      renderLifeOsEmptyState(budgetCard.createDiv({ cls: "plg-budget-unset-empty" }), {
        message: "还没设本月预算，设一个就能看到剩余额度和每日可花",
        ctaLabel: "设置预算",
        onCta: () => this.openBudgetEditor(),
      });
    }

    if (isMobileHome) {
      const pendingBottom = budgetCard.createDiv({ cls: "plg-budget-pending-bottom" });
      const expandSlot = budgetCard.createDiv({ cls: "plg-budget-pending-expand" });
      renderPendingDuesPanel(pendingBottom, this.plugin, {
        limit: this.plugin.settings.uiState?.pendingDuesShowAll ? 50 : 4,
        collapsible: true,
        compact: true,
        variant: "mobile-budget",
        listHost: expandSlot,
        onRefresh: () => this.render(),
      });
    }
  }

  renderHomeBillSection(listCard, data, now) {
    const lh = listCard.createDiv({ cls: "plg-card-head plg-list-head" });
    lh.createSpan({ text: "账单列表" });
    const catSel = lh.createEl("select", { cls: "plg-list-cat-inline" });
    catSel.createEl("option", { value: "all", text: "全部分类" });
    data.categories.forEach((c) => {
      const o = catSel.createEl("option", { value: c.name, text: c.name });
      if (c.name === this.listCategory) o.selected = true;
    });

    const toolbar = listCard.createDiv({ cls: "plg-list-toolbar" });
    const searchInput = toolbar.createEl("input", {
      type: "text",
      cls: "plg-list-search",
      attr: { placeholder: "搜索备注/分类…", autocomplete: "off" },
    });
    searchInput.value = this.listSearch;

    const listContainer = listCard.createDiv({ cls: "plg-tx-list" });
    const resetAndRefresh = () => {
      this.listGroupLimit = 20;
      this.fillBillList(listContainer, data, now);
    };

    const reimbCount = data.transactions.filter((t) => !!t.reimburse).length;
    const reimbBtn = toolbar.createEl("button", {
      text: reimbCount ? `报销 · ${reimbCount}` : "报销",
      cls: "plg-list-filter-chip" + (this.listReimburseOnly ? " active" : ""),
      attr: { type: "button" },
    });
    reimbBtn.onclick = () => {
      this.listReimburseOnly = !this.listReimburseOnly;
      reimbBtn.toggleClass("active", this.listReimburseOnly);
      resetAndRefresh();
      persistDashboardUiState(this.plugin, this);
    };

    let searchDebounceTimer = null;
    searchInput.addEventListener("input", () => {
      this.listSearch = searchInput.value;
      if (searchDebounceTimer) window.clearTimeout(searchDebounceTimer);
      searchDebounceTimer = window.setTimeout(() => {
        resetAndRefresh();
        persistDashboardUiState(this.plugin, this);
      }, 200);
    });
    catSel.onchange = () => {
      this.listCategory = catSel.value;
      resetAndRefresh();
      persistDashboardUiState(this.plugin, this);
    };

    this.bindBillListScroll(listContainer, data, now);
    resetAndRefresh();
  }

  bindBillListScroll(listContainer, data, now) {
    const scrollEl = listContainer.closest(".plg-page-scroll");
    if (!scrollEl) return;
    if (this._billScrollHandler) {
      scrollEl.removeEventListener("scroll", this._billScrollHandler);
    }
    this._billScrollHandler = () => {
      if (this.tab !== "home") return;
      if (scrollEl.scrollTop + scrollEl.clientHeight < scrollEl.scrollHeight - 96) return;
      if (this.listGroupLimit >= this._billGroupTotal) return;
      this.listGroupLimit += 15;
      this.fillBillList(listContainer, data, now);
    };
    scrollEl.addEventListener("scroll", this._billScrollHandler, { passive: true });
  }

  fillBillList(list, data, now) {
    list.empty();
    let recent = [...data.transactions];
    if (this.listCategory !== "all") {
      recent = recent.filter((t) => t.category === this.listCategory);
    }
    if (this.listSearch.trim()) {
      const q = this.listSearch.trim().toLowerCase();
      recent = recent.filter((t) => matchTransactionSearch(t, q));
    }
    if (this.listReimburseOnly) {
      recent = recent.filter((t) => !!t.reimburse);
    }

    const allGroups = groupByDate(recent);
    const totalTxCount = recent.length;
    this._billGroupTotal = allGroups.length;
    const groups = allGroups.slice(0, this.listGroupLimit);
    if (!groups.length) {
      const totalAll = data.transactions?.length || 0;
      const hasFilter = this.listCategory !== "all" || this.listSearch.trim() || this.listReimburseOnly;
      if (totalAll === 0 && !hasFilter) {
        renderLifeOsEmptyState(list, {
          icon: "◎",
          message: "还没有账单，点底部「记一笔」开始第一笔",
          ctaLabel: "记一笔",
          onCta: () => this.plugin.openCaptureModal("smart"),
        });
      } else if (hasFilter) {
        renderLifeOsEmptyState(list, {
          icon: "◎",
          message: "暂无匹配账单",
          ctaLabel: "清除筛选",
          onCta: () => {
            this.listCategory = "all";
            this.listSearch = "";
            this.listReimburseOnly = false;
            persistDashboardUiState(this.plugin, this);
            this.render();
          },
        });
      } else {
        list.createDiv({ cls: "plg-empty", text: "暂无匹配账单" });
      }
      return;
    }
    let shownTxCount = 0;
    groups.forEach(([day, items]) => {
      shownTxCount += items.length;
      const d = parseDateTime(day + " 12:00");
      const dayExp = items
        .filter((t) => t.flow === "expense" && !isCarryoverTx(t))
        .reduce((a, t) => a + t.amount, 0);
      const dayInc = items
        .filter((t) => t.flow === "income" && !isCarryoverTx(t))
        .reduce((a, t) => a + t.amount, 0);
      const collapsed = this.collapsedDays.has(day);
      const gh = list.createDiv({ cls: "plg-tx-group-head" + (collapsed ? " collapsed" : "") });
      gh.createSpan({
        cls: "plg-group-date",
        text: `${todayLabel(d)} ${d.getMonth() + 1}月${d.getDate()}日 ${weekdayLabel(d)}`.trim(),
      });
      const totals = gh.createDiv({ cls: "plg-group-totals" });
      totals.createSpan({ text: `收入 ${fmtMoney(dayInc)}`, cls: "plg-group-inc" });
      totals.createSpan({ text: `支出 ${fmtMoney(dayExp)}`, cls: "plg-group-exp" });
      const carryoverAmt = items
        .filter(isCarryoverTx)
        .reduce((a, t) => a + (Number(t.amount) || 0), 0);
      if (dayExp < 0.005 && carryoverAmt > 0.005) {
        totals.createSpan({
          text: `含月结 ${fmtMoney(carryoverAmt)}`,
          cls: "plg-group-carryover",
        });
      }
      const groupBody = list.createDiv({ cls: "plg-tx-group-body" + (collapsed ? " hidden" : "") });
      gh.onclick = () => {
        const nowCollapsed = !groupBody.hasClass("hidden");
        groupBody.toggleClass("hidden", nowCollapsed);
        gh.toggleClass("collapsed", nowCollapsed);
        if (nowCollapsed) this.collapsedDays.add(day);
        else this.collapsedDays.delete(day);
        persistDashboardUiState(this.plugin, this);
      };
      items.sort((a, b) => b.datetime.localeCompare(a.datetime)).forEach((t) => {
        this.renderTxRow(groupBody, t, data, { stacked: true });
      });
    });

    if (groups.length < allGroups.length) {
      list.createDiv({
        cls: "plg-list-load-hint",
        text: `已显示 ${shownTxCount}/${totalTxCount} 笔 · 上滑加载更多`,
      });
    } else if (totalTxCount > 0) {
      list.createDiv({ cls: "plg-list-load-hint", text: `已显示全部账单 ${totalTxCount} 笔` });
    }
  }

  renderSummaryCompareInline(parent, period, allTx, refDate, flow) {
    const spans = [];
    if (period === "month") {
      const yoy = periodCompareYoYAmount(allTx, period, refDate, flow);
      if (yoy) spans.push({ prefix: "同", pct: yoy.pct });
    }
    if (period === "month" || period === "year" || period === "week") {
      const chain = periodSummaryChainCompare(allTx, period, refDate, flow);
      if (chain) spans.push({ prefix: "环", pct: chain.pct });
    }
    if (!spans.length) return;
    const sub = parent.createDiv({ cls: "plg-summary-foot-sub" });
    spans.forEach((s, i) => {
      if (i > 0) sub.createSpan({ cls: "plg-summary-cmp-sep", text: " · " });
      const cls = compareTagClass(flow, s.pct);
      const sign = s.pct > 0 ? "+" : "";
      sub.createSpan({ cls: `plg-summary-cmp-tag ${cls}`, text: `${s.prefix}${sign}${s.pct.toFixed(1)}%` });
    });
  }

  renderSummaryTotalLine(parent, label, count, amount, flow, period, allTx, refDate) {
    const row = parent.createDiv({ cls: "plg-summary-total-line" });
    const main = row.createDiv({ cls: "plg-summary-total-main" });
    main.createSpan({ cls: "lbl", text: label });
    main.createSpan({ cls: "cnt", text: `${count}笔` });
    main.createSpan({ cls: `amt ${flow}`, text: fmtSummaryCellMoney(amount) });
    const cmp = row.createDiv({ cls: "plg-summary-total-cmp" });
    this.renderSummaryCompareInline(cmp, period, allTx, refDate, flow);
  }

  renderSummaryBalanceLine(parent, balance, period) {
    const row = parent.createDiv({ cls: "plg-summary-total-line is-balance-summary" });
    const main = row.createDiv({ cls: "plg-summary-total-main" });
    main.createSpan({ cls: "lbl", text: "总结余" });
    const balCls = balance < 0 ? "over" : balance > 0 ? "inc" : "";
    main.createSpan({ cls: `amt ${balCls}`, text: fmtSummaryCellMoney(balance, true) });
  }

  renderSummaryTotalFoot(tfoot, data) {
    const period = this.period;
    const refDate = this.refDate;
    const listAll = filterTransactions(data.transactions, period, refDate);
    const total = periodSummaryForRange(listAll);
    const incCount = periodFlowCount(data.transactions, period, refDate, "income");
    const expCount = periodFlowCount(data.transactions, period, refDate, "expense");

    const block = tfoot.createDiv({ cls: "plg-summary-total-infoot" });
    this.renderSummaryTotalLine(block, "收入", incCount, total.income, "income", period, data.transactions, refDate);
    this.renderSummaryTotalLine(block, "支出", expCount, total.expense, "expense", period, data.transactions, refDate);
    if (period === "all") {
      this.renderSummaryBalanceLine(block, total.balance, period);
    }
  }

  renderPeriodSummaryTable(parent, data) {
    const { rows } = buildStatsSummaryRows(data.transactions, this.period, this.refDate);
    const avg = buildStatsPeriodAverage(data.transactions, this.period, this.refDate);

    const table = parent.createDiv({ cls: "plg-summary-table" });
    const thead = table.createDiv({ cls: "plg-summary-table-head" });
    ["日期", "收入", "支出", "结余"].forEach((h) => thead.createSpan({ text: h }));

    const scrollable = (this.period === "year" || this.period === "month") && rows.length > PLG_SUMMARY_SCROLL_ROWS;
    const tbody = table.createDiv({
      cls: "plg-summary-table-body" + (scrollable ? " is-scrollable" : ""),
    });

    if (!rows.length) {
      tbody.createDiv({ cls: "plg-summary-table-empty", text: "暂无明细" });
    }

    rows.forEach((row) => {
      const tr = tbody.createDiv({
        cls: "plg-summary-table-row"
          + (row.meta === "year" || row.meta === "month" || row.meta === "day" ? " is-link" : ""),
      });
      const dateCell = tr.createSpan({ cls: "plg-summary-date" });
      dateCell.createSpan({ text: row.label });
      if (row.meta === "year" || row.meta === "month" || row.meta === "day") {
        dateCell.createSpan({ cls: "plg-drill-hint", text: "›" });
      }
      tr.createSpan({ cls: "plg-summary-inc", text: fmtSummaryCellMoney(row.income) });
      tr.createSpan({ cls: "plg-summary-exp", text: fmtSummaryCellMoney(row.expense) });
      const balCls = row.balance < 0 ? "over" : row.balance > 0 ? "inc" : "";
      tr.createSpan({
        cls: `plg-summary-bal ${balCls}`,
        text: fmtSummaryCellMoney(row.balance, true),
      });
      if (row.meta === "year") {
        tr.onclick = () => {
          this.period = "year";
          this.refDate = new Date(row.year, 0, 1);
          persistDashboardUiState(this.plugin, this);
          this.render();
        };
      } else if (row.meta === "month") {
        tr.onclick = () => {
          this.period = "month";
          this.refDate = new Date(row.year, row.month - 1, 1);
          persistDashboardUiState(this.plugin, this);
          this.render();
        };
      } else if (row.meta === "day" && (this.period === "month" || this.period === "week")) {
        tr.onclick = () => {
          this.tab = "home";
          this.homeSubview = "calendar";
          this.calendarMonth = new Date(row.year, row.month - 1, 1);
          this.selectedDay = row.day;
          persistDashboardUiState(this.plugin, this);
          this.render();
        };
      }
    });

    const tfoot = table.createDiv({ cls: "plg-summary-table-foot" });
    if (avg) {
      const avgTr = tfoot.createDiv({ cls: "plg-summary-table-row is-aggregate" });
      avgTr.createSpan({ cls: "plg-summary-date", text: avg.label });
      avgTr.createSpan({ cls: "plg-summary-inc", text: fmtSummaryCellMoney(avg.income) });
      avgTr.createSpan({ cls: "plg-summary-exp", text: fmtSummaryCellMoney(avg.expense) });
      const avgBalCls = avg.balance < 0 ? "over" : avg.balance > 0 ? "inc" : "";
      avgTr.createSpan({
        cls: `plg-summary-bal ${avgBalCls}`,
        text: fmtSummaryCellMoney(avg.balance, true),
      });
    }

    this.renderSummaryTotalFoot(tfoot, data);
  }

  renderStats(parent, opts = {}) {
    const data = this.plugin.store.data;
    if (opts.patch) {
      const page = parent.querySelector('[data-plg-block="stats-page"]');
      if (page) {
        const summaryHost = page.querySelector('[data-plg-block="stats-summary"]');
        if (summaryHost) {
          summaryHost.empty();
          this.renderPeriodSummaryTable(summaryHost, data);
        }
        const scrollHost = page.querySelector(".plg-page-scroll");
        if (scrollHost) {
          scrollHost.empty();
          this.renderStatsAnalysis(scrollHost, data);
        }
        return;
      }
    }

    parent.querySelector('[data-plg-block="stats-page"]')?.remove();
    const pageHost = parent.createDiv({ attr: { "data-plg-block": "stats-page" } });
    pageHost.addClass("plg-page-split");
    const fixedCls = "plg-page-fixed plg-has-glass-child";
    const fixed = pageHost.createDiv({ cls: fixedCls });
    const scroll = pageHost.createDiv({ cls: "plg-page-scroll" });
    const immersive = fixed.createDiv({ cls: "plg-stats-immersive plg-glass-panel" });
    this.renderPageToolbar(immersive, { embedded: true, scopeTip: STATS_SCOPE_TIP });
    const summaryHost = immersive.createDiv({ attr: { "data-plg-block": "stats-summary" } });
    this.renderPeriodSummaryTable(summaryHost, data);
    this.renderStatsAnalysis(scroll, data);
  }

  renderStatsAnalysis(scroll, data) {
    const listAll = filterTransactions(data.transactions, this.period, this.refDate);
    const list = excludeCarryover(listAll);
    const analysisCard = scroll.createDiv({ cls: "plg-card plg-analysis-card" });
    analysisCard.createDiv({ cls: "plg-card-title", text: "消费洞察" });
    const lines = buildPeriodAnalysis(list, this.period, this.refDate, data.categories, data.transactions, {
      monthlyBudget: this.plugin.settings.monthlyBudget,
    });
    if (!lines.length) {
      analysisCard.createDiv({ cls: "plg-empty", text: "暂无足够数据生成分析" });
    } else {
      lines.forEach((line) => {
        const row = analysisCard.createDiv({ cls: "plg-analysis-line" });
        renderPlgNavIcon(row.createSpan({ cls: "plg-analysis-icon" }), "insight", { settings: this.plugin.settings });
        row.createSpan({ cls: "plg-analysis-text", text: line });
      });
    }
  }

  renderReportTopicBar(parent) {
    const bar = parent.createDiv({ cls: "plg-report-topic-bar plg-glass-surface" });
    const inputRow = bar.createDiv({ cls: "plg-report-topic-input-row" });
    const input = inputRow.createEl("input", {
      type: "search",
      cls: "plg-report-topic-input",
      attr: { placeholder: "保险、餐饮、聚餐…" },
    });
    input.value = this.reportTopic || "";
    input.oninput = () => {
      window.clearTimeout(this._reportTopicTimer);
      this._reportTopicTimer = window.setTimeout(() => {
        this.reportTopic = input.value.trim();
        this._reportPresetId = null;
        this.expandedReportCats.clear();
        persistDashboardUiState(this.plugin, this);
        this.render();
      }, 350);
    };

    const selectRow = inputRow.createDiv({ cls: "plg-report-topic-select-row" });
    const flowSelect = selectRow.createEl("select", {
      cls: "plg-report-filter-select plg-report-flow-select",
      attr: { "aria-label": "收入或支出" },
    });
    [
      { id: "expense", label: "支出" },
      { id: "income", label: "收入" },
    ].forEach(({ id, label }) => {
      const opt = flowSelect.createEl("option", { text: label, value: id });
      if (this.reportFlow === id) opt.selected = true;
    });
    flowSelect.onchange = () => {
      const next = flowSelect.value;
      if (this.reportFlow === next) return;
      this.reportFlow = next;
      this.expandedReportCats.clear();
      persistDashboardUiState(this.plugin, this);
      this.render();
    };

    const groupSelect = selectRow.createEl("select", {
      cls: "plg-report-filter-select plg-report-group-select",
      attr: { "aria-label": "分类层级" },
    });
    [
      { id: "category", label: "一级" },
      { id: "subcategory", label: "二级" },
    ].forEach(({ id, label }) => {
      const opt = groupSelect.createEl("option", { text: label, value: id });
      if (this.reportGroupMode === id) opt.selected = true;
    });
    groupSelect.onchange = () => {
      const next = groupSelect.value;
      if (this.reportGroupMode === next) return;
      this.reportGroupMode = next;
      this.expandedReportCats.clear();
      persistDashboardUiState(this.plugin, this);
      this.render();
    };

    const chipRow = bar.createDiv({ cls: "plg-report-topic-chips" });
    const presetHost = chipRow.createDiv({ cls: "plg-report-topic-chips-presets" });
    REPORT_TOPIC_PRESETS.forEach((preset) => {
      const chip = presetHost.createEl("button", {
        text: preset.label,
        cls: "plg-report-topic-chip" + (this._reportPresetId === preset.id ? " active" : ""),
        attr: { type: "button" },
      });
      chip.onclick = () => {
        this._reportPresetId = this._reportPresetId === preset.id ? null : preset.id;
        this.reportTopic = "";
        input.value = "";
        this.expandedReportCats.clear();
        persistDashboardUiState(this.plugin, this);
        this.render();
      };
    });
  }

  renderReportPeriodMiniCards(parent, data) {
    const listAll = filterTransactions(data.transactions, this.period, this.refDate);
    const list = excludeCarryover(listAll);
    const inc = sumFlow(list, "income");
    const exp = sumFlow(list, "expense");
    const bal = inc - exp;
    const cards = parent.createDiv({ cls: "plg-summary-cards plg-report-period-mini" });
    [
      { title: "收入", val: fmtMoney(inc), iconKey: "income", valCls: "plg-mini-inc" },
      { title: "支出", val: fmtMoney(exp), iconKey: "expense", valCls: "plg-mini-exp" },
      { title: "结余", val: fmtMoney(bal), iconKey: "balance", valCls: bal >= 0 ? "plg-mini-inc" : "plg-mini-exp" },
    ].forEach((c) => {
      const mini = cards.createDiv({ cls: "plg-mini-card" });
      renderPlgNavIcon(mini.createDiv({ cls: "plg-mini-icon" }), c.iconKey, { settings: this.plugin.settings });
      mini.createDiv({ cls: "plg-mini-title", text: c.title });
      mini.createDiv({ cls: c.valCls, text: c.val });
    });
  }

  renderReports(parent, opts = {}) {
    const data = this.plugin.store.data;
    if (opts.patch) {
      const page = parent.querySelector('[data-plg-block="reports-page"]');
      if (page) {
        const head = page.querySelector(".plg-report-head-unified");
        if (head) {
          head.querySelector(".plg-report-period-mini")?.remove();
          this.renderReportPeriodMiniCards(head, data);
        }
        page.querySelector('[data-plg-block="reports-charts"]')?.empty();
        const chartsHost = page.querySelector('[data-plg-block="reports-charts"]');
        const scrollHost = page.querySelector(".plg-page-scroll");
        if (chartsHost) this.renderReportsCharts(chartsHost, data);
        if (scrollHost) {
          scrollHost.empty();
          this.renderReportsList(scrollHost, data);
        }
        return;
      }
    }

    parent.querySelector('[data-plg-block="reports-page"]')?.remove();
    const pageHost = parent.createDiv({ attr: { "data-plg-block": "reports-page" } });
    pageHost.addClass("plg-page-split");
    const fixed = pageHost.createDiv({ cls: "plg-page-fixed plg-has-glass-child" });
    const scroll = pageHost.createDiv({ cls: "plg-page-scroll" });

    const immersive = fixed.createDiv({ cls: "plg-report-immersive plg-glass-panel" });
    const head = immersive.createDiv({ cls: "plg-report-head-unified" });
    this.renderPageToolbar(head, { scopeTip: REPORT_SCOPE_TIP, embedded: true });
    this.renderReportPeriodMiniCards(head, data);
    this.renderReportTopicBar(head);
    const chartsHost = immersive.createDiv({ attr: { "data-plg-block": "reports-charts" } });
    this.renderReportsCharts(chartsHost, data);
    this.renderReportsList(scroll, data);
  }

  renderReportsCharts(immersive, data) {
    const periodAll = filterTransactions(data.transactions, this.period, this.refDate);
    const periodList = excludeCarryover(periodAll);
    const topicActive = Boolean(this.reportTopic || this._reportPresetId);
    const list = filterByReportTopic(
      periodList,
      data.categories,
      this.reportTopic,
      this._reportPresetId,
    );
    const stats = reportStatsForGroup(list, data.categories, this.reportFlow, this.reportGroupMode);
    const flowList = list.filter((t) => t.flow === this.reportFlow);
    const total = sumFlow(flowList, this.reportFlow);

    const donutCard = immersive.createDiv({ cls: "plg-card plg-report-donut-card" });
    const donutWrap = donutCard.createDiv({ cls: "plg-donut-wrap" });
    const donutTip = donutWrap.createDiv({ cls: "plg-donut-tooltip is-empty", text: "悬停查看占比" });
    let acc = 0;
    const sliceStats = buildDonutSliceStats(stats, 8);
    const stops = sliceStats.map((s) => {
      const start = acc;
      acc += s.pct;
      return `${s.meta.color} ${start}% ${acc}%`;
    }).join(", ");
    const donut = donutWrap.createDiv({ cls: "plg-donut" });
    if (stops) applyCssProps(donut, { "--plg-donut-bg": `conic-gradient(${stops})` });
    donut.createDiv({ cls: "plg-donut-hole" });
    const center = donut.createDiv({ cls: "plg-donut-center" });
    center.createDiv({ text: "合计" });
    center.createDiv({ text: fmtMoney(total), cls: "big" });
    if (topicActive && flowList.length) {
      const periodTotal = sumFlow(
        periodList.filter((t) => t.flow === this.reportFlow),
        this.reportFlow,
      ) || 1;
      center.createDiv({
        cls: "plg-donut-sub",
        text: `${((total / periodTotal) * 100).toFixed(1)}%`,
      });
    }
    bindDonutHover(donut, sliceStats.map((s) => ({
      name: s.name,
      pct: s.pct,
      amount: s.amount,
    })), donutTip);

    if (topicActive && flowList.length) {
      const trendCard = immersive.createDiv({ cls: "plg-card plg-report-trend-card" });
      const trendTitle = this.period === "month" ? "本月趋势" : "按月趋势";
      trendCard.createDiv({ cls: "plg-card-title", text: trendTitle });
      const trendHost = trendCard.createDiv({ cls: "plg-report-trend-host" });
      const trendPoints = reportFilterTrendPoints(flowList, this.period, this.refDate);
      renderInteractiveBarChart(trendHost, trendPoints, { compact: true, mini: true });
    }
  }

  renderReportsList(scroll, data) {
    const periodAll = filterTransactions(data.transactions, this.period, this.refDate);
    const periodList = excludeCarryover(periodAll);
    const topicActive = Boolean(this.reportTopic || this._reportPresetId);
    const list = filterByReportTopic(
      periodList,
      data.categories,
      this.reportTopic,
      this._reportPresetId,
    );
    const stats = reportStatsForGroup(list, data.categories, this.reportFlow, this.reportGroupMode);
    const flowList = list.filter((t) => t.flow === this.reportFlow);
    const total = sumFlow(flowList, this.reportFlow);
    const topicLabel = this.reportTopic
      || REPORT_TOPIC_PRESETS.find((p) => p.id === this._reportPresetId)?.label
      || "";

    const listCard = scroll.createDiv({ cls: "plg-card plg-report-list-card" });
    stats.forEach((s) => {
      const rowKey = s.key || s.name;
      const expanded = this.expandedReportCats.has(rowKey);
      const block = listCard.createDiv({ cls: "plg-report-cat-block" + (expanded ? " open" : "") });
      const row = block.createDiv({ cls: "plg-cat-row" });
      renderCategoryIcon(row, s.meta, { panelIcon: true });
      const info = row.createDiv({ cls: "plg-cat-info" });
      const rowLabel = topicActive
        ? s.name
        : `${s.name} (${s.pct.toFixed(1)}%, ${s.count}笔)`;
      info.createDiv({ cls: "plg-cat-name", text: rowLabel });
      const bar = info.createDiv({ cls: "plg-cat-bar" });
      bar.createDiv({ cls: "fill", attr: { style: `width:${s.pct}%;background:${s.meta.color}` } });
      row.createDiv({ cls: "plg-cat-amt", text: fmtMoney(s.amount) });
      row.onclick = () => {
        if (this.expandedReportCats.has(rowKey)) this.expandedReportCats.delete(rowKey);
        else this.expandedReportCats.add(rowKey);
        this.render();
      };
      if (expanded) {
        const detail = block.createDiv({ cls: "plg-cat-detail" });
        list
          .filter((t) => t.flow === this.reportFlow && txMatchesReportGroup(t, s, this.reportGroupMode))
          .sort((a, b) => b.datetime.localeCompare(a.datetime))
          .forEach((t) => this.renderTxRow(detail, t, data, { stacked: true }));
        if (!detail.childElementCount) {
          detail.createDiv({ cls: "plg-empty", text: "该分类暂无明细" });
        }
      }
    });
    if (!stats.length) {
      listCard.createDiv({
        cls: "plg-empty",
        text: topicActive ? "当前筛选条件下暂无数据，试试换关键词或调整时段" : "该时段暂无数据",
      });
    }
    if (topicActive && topicLabel) {
      listCard.createDiv({
        cls: "plg-report-filter-summary",
        text: `${topicLabel} · ${flowList.length}笔 合计${fmtMoney(total)}元`,
      });
    }
  }

  renderCalendar(parent) {
    const { fixed, scroll } = this.beginSplitPage(parent);
    this.renderCalendarInto(fixed, scroll);
  }

  renderCalendarInto(fixed, scroll) {
    const data = this.plugin.store.data;
    const y = this.calendarMonth.getFullYear();
    const m = this.calendarMonth.getMonth() + 1;
    const monthTxAll = filterTransactions(data.transactions, "month", this.calendarMonth);
    const monthTx = excludeCarryover(monthTxAll);
    const dayMap = dailyFlowMap(data.transactions, y, m);
    const maxExp = Math.max(...Object.values(dayMap).map((d) => d.expense), 1);

    const navBar = fixed.createDiv({ cls: "plg-period-nav-bar" });
    const nav = navBar.createDiv({ cls: "plg-month-nav" });
    nav.createEl("button", { text: "‹" }).onclick = () => {
      this.calendarMonth = new Date(y, m - 2, 1);
      this.selectedDay = null;
      this.render();
    };
    nav.createSpan({ cls: "plg-month-label", text: `${y}年 ${m}月` });
    nav.createEl("button", { text: "›" }).onclick = () => {
      this.calendarMonth = new Date(y, m, 1);
      this.selectedDay = null;
      this.render();
    };
    appendScopeTipBtn(navBar, CAL_SCOPE_TIP);

    const weekdays = fixed.createDiv({ cls: "plg-cal-weekdays" });
    ["一", "二", "三", "四", "五", "六", "日"].forEach((w, i) => {
      weekdays.createDiv({ cls: "plg-cal-wd" + (i >= 5 ? " weekend" : ""), text: w });
    });

    const grid = fixed.createDiv({ cls: "plg-cal-grid" });
    let calTooltip = document.querySelector(".plg-cal-tooltip-global");
    if (!calTooltip) {
      calTooltip = document.body.createDiv({ cls: "plg-cal-tooltip plg-cal-tooltip-global hidden" });
    }
    const first = new Date(y, m - 1, 1);
    const startPad = (first.getDay() || 7) - 1;
    const daysInMonth = new Date(y, m, 0).getDate();
    const today = dateKey(new Date());

    const placeTooltip = (e, text) => {
      if (!text || text === "暂无收支") {
        calTooltip.addClass("hidden");
        return;
      }
      calTooltip.setText(text);
      calTooltip.removeClass("hidden");
      let x = e.clientX;
      let y = e.clientY - 12;
      applyCssProps(calTooltip, { "--plg-tip-left": `${x}px`, "--plg-tip-top": `${y}px` });
      window.requestAnimationFrame(() => {
        const rect = calTooltip.getBoundingClientRect();
        if (rect.left < 8) x += 8 - rect.left;
        if (rect.right > window.innerWidth - 8) x -= rect.right - window.innerWidth + 8;
        if (rect.top < 8) y = e.clientY + 18;
        applyCssProps(calTooltip, { "--plg-tip-left": `${x}px`, "--plg-tip-top": `${y}px` });
      });
    };
    const hideTooltip = () => calTooltip.addClass("hidden");

    for (let i = 0; i < startPad; i++) grid.createDiv({ cls: "plg-cal-cell empty" });

    for (let day = 1; day <= daysInMonth; day++) {
      const info = dayMap[day] || { expense: 0, income: 0, count: 0 };
      const cell = grid.createDiv({ cls: "plg-cal-cell" });
      const dk = `${y}-${pad2(m)}-${pad2(day)}`;
      const isFuture = dk > today;
      if (dk === today) cell.addClass("today");
      if (this.selectedDay === day) cell.addClass("selected");
      if (isFuture) cell.addClass("future");
      if (isWeekendDateKey(dk)) cell.addClass("weekend");
      if (getCnHoliday(dk)) cell.addClass("holiday");
      if (info.expense > 0) {
        const intensity = Math.min(1, info.expense / maxExp);
        applyCssProps(cell, { "--heat": String(0.15 + intensity * 0.55) });
        cell.addClass("has-expense");
        cell.createDiv({ cls: "plg-cal-exp-badge", text: formatCalShortAmt(info.expense) });
      }
      if (info.income > 0) cell.addClass("has-income");

      const dayEl = cell.createDiv({ cls: "plg-cal-day" });
      if (dk === today) dayEl.createSpan({ cls: "plg-cal-today-tag", text: "今" });
      dayEl.createSpan({ cls: "plg-cal-solar", text: String(day) });

      const subLabel = getCalCellSubLabel(dk);
      if (subLabel) {
        const isHoliday = !!getCnHoliday(dk);
        cell.createDiv({
          cls: "plg-cal-lunar" + (isHoliday ? " holiday-label" : "") + (isFuture ? " future" : ""),
          text: subLabel,
        });
      }

      const tipText = buildCalDayTooltip(info);
      cell.addEventListener("mouseenter", (e) => placeTooltip(e, tipText));
      cell.addEventListener("mousemove", (e) => placeTooltip(e, tipText));
      cell.addEventListener("mouseleave", hideTooltip);
      cell.addEventListener("click", (e) => {
        if (isTouchLedgerUi() && info.count > 0) {
          placeTooltip(e, tipText);
          window.setTimeout(hideTooltip, 2200);
        }
        hideTooltip();
        this.selectedDay = this.selectedDay === day ? null : day;
        this.render();
      });
    }

    grid.addEventListener("mouseleave", hideTooltip);

    const mExp = sumFlow(monthTx, "expense");
    const mInc = sumFlow(monthTx, "income");
    const mBal = mInc - mExp;
    const summary = fixed.createDiv({ cls: "plg-cal-month-summary" });
    const row1 = summary.createDiv({ cls: "plg-cal-sum-line-row" });
    row1.createSpan({ cls: "plg-cal-sum-line inc", text: `收入 ${fmtMoney(mInc)}` });
    row1.createSpan({ cls: "plg-cal-sum-line exp", text: `支出 ${fmtMoney(mExp)}` });
    if (mBal < 0) {
      const overspend = -mBal;
      const pct = mInc > 0 ? ((overspend / mInc) * 100).toFixed(1) : "—";
      summary.createDiv({
        cls: "plg-cal-sum-line bal over",
        text: `超支 ${fmtMoney(overspend)}${pct !== "—" ? ` · ${pct}%` : ""}`,
      });
    } else {
      summary.createDiv({ cls: "plg-cal-sum-line bal", text: `结余 ${fmtMoney(mBal)}` });
    }

    if (this.selectedDay) {
      const dk = `${y}-${pad2(m)}-${pad2(this.selectedDay)}`;
      const dayItems = monthTxAll.filter((t) => t.datetime.startsWith(dk));
      const dayInfo = dayMap[this.selectedDay] || { expense: 0, income: 0, count: dayItems.length };
      const detail = scroll.createDiv({ cls: "plg-card plg-cal-detail plg-cal-day-sheet" });
      const head = detail.createDiv({ cls: "plg-cal-day-sheet-head" });
      head.createDiv({ cls: "plg-card-title", text: `${m}月${this.selectedDay}日` });
      head.createEl("button", {
        text: "收起",
        cls: "plg-btn-plain plg-cal-collapse-btn",
        attr: { type: "button" },
      }).onclick = () => {
        this.selectedDay = null;
        this.render();
      };
      const summary = detail.createDiv({ cls: "plg-cal-day-summary" });
      buildCalDaySummaryLines(dayInfo).forEach((line) => {
        summary.createDiv({ cls: "plg-cal-day-summary-line", text: line });
      });
      if (!dayItems.length) {
        detail.createDiv({ cls: "plg-empty", text: "当天无账单" });
      } else {
        const list = detail.createDiv({ cls: "plg-tx-list" });
        dayItems.sort((a, b) => b.datetime.localeCompare(a.datetime)).forEach((t) => {
          this.renderTxRow(list, t, data, { stacked: true });
        });
      }
    }
  }

  renderTabBar(parent) {
    const bar = parent.createDiv({ cls: "plg-tabbar plg-tabbar-fab-layout" });
    const plugin = this.plugin;

    const mkTab = (container, t) => {
      const btn = container.createDiv({
        cls: "plg-tab" + (this.tab === t.id ? " active" : ""),
        attr: { "data-tab": t.id },
      });
      renderPlgNavIcon(btn.createDiv({ cls: "plg-tab-icon" }), t.iconKey, { settings: this.plugin.settings });
      btn.createDiv({ cls: "plg-tab-label", text: t.label });
      btn.setAttr("role", "button");
      btn.setAttr("tabindex", "0");
      btn.setAttr("aria-label", t.aria);
      const activate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (t.id === "settings") {
          plugin.openDashboardSettings();
          return;
        }
        this.tab = t.id;
        if (t.id === "home" && !this.homeSubview) this.homeSubview = "list";
        persistDashboardUiState(plugin, this);
        this.render();
      };
      btn.addEventListener("click", activate);
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") activate(e);
      });
      return btn;
    };

    const left = bar.createDiv({ cls: "plg-tabbar-group" });
    mkTab(left, { id: "home", label: "账本", iconKey: "ledger", aria: "账本" });
    mkTab(left, { id: "stats", label: "统计", iconKey: "stats", aria: "统计" });

    const fabSlot = bar.createDiv({ cls: "plg-tabbar-fab-slot" });
    const fab = fabSlot.createEl("button", {
      cls: "plg-tab-fab",
      attr: { type: "button", "aria-label": "记一笔，打开记账" },
    });
    renderPlgNavIcon(fab.createSpan({ cls: "plg-tab-fab-icon" }), "add", { settings: this.plugin.settings });
    fabSlot.createDiv({ cls: "plg-tab-fab-label", text: "记一笔" });
    fab.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      plugin.openCaptureModal("smart");
    });

    const right = bar.createDiv({ cls: "plg-tabbar-group" });
    mkTab(right, { id: "reports", label: "报表", iconKey: "reports", aria: "报表" });
    mkTab(right, { id: "settings", label: "设置", iconKey: "settings", aria: "PlainLedger 设置" });
  }

  clearHomeSummary(immersive) {
    if (!immersive) return;
    immersive.querySelectorAll(":scope > *:not(.plg-ledger-subnav-immersive)").forEach((el) => el.remove());
  }

  refreshHomeBillList() {
    if (!this.root || this.tab !== "home" || this.homeSubview === "calendar") return false;
    if (this._homeBillRefreshLock) return true;
    this._homeBillRefreshLock = true;
    const data = this.plugin.store.data;
    const listContainer = this.root.querySelector(".plg-tx-list");
    if (!listContainer) {
      this._homeBillRefreshLock = false;
      return false;
    }
    const immersive = this.root.querySelector(".plg-home-immersive");
    if (immersive) {
      this.clearHomeSummary(immersive);
      const now = new Date();
      this.renderHomeSummary(immersive, data, now);
      refreshPlainLedgerHomeCache(this.plugin);
    }
    const now = new Date();
    this.fillBillList(listContainer, data, now);
    const catSel = this.root.querySelector(".plg-list-cat-inline");
    if (catSel) {
      const selected = this.listCategory;
      while (catSel.options.length > 1) catSel.remove(1);
      (data.categories || []).forEach((c) => {
        const o = catSel.createEl("option", { value: c.name, text: c.name });
        if (c.name === selected) o.selected = true;
      });
    }
    this._homeBillRefreshLock = false;
    return true;
  }
}

// ─── Settings ──────────────────────────────────────────────────────────────────

class PlainLedgerSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    void this.renderSettings();
  }

  async renderSettings() {
    if (typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public") {
      const seeded = await this.plugin.store.ensurePublicEditionDefaults();
      if (seeded) this.plugin.refreshView(true);
    }
    const focus = this.plugin._settingsFocus || null;
    this.plugin._settingsFocus = null;
    renderPluginSettings(this.containerEl, this.plugin, () => this.display(), focus);
  }
}

function isPlgWorkspaceSidebarLeaf(app, leaf) {
  try {
    const left = app.workspace.getLeftLeaf(false);
    const right = app.workspace.getRightLeaf(false);
    if (leaf === left || leaf === right) return true;
  } catch (_) { /* ignore */ }
  const el = leaf?.containerEl;
  if (!el) return false;
  return !!el.closest(".mod-sidedock, .workspace-drawer, .workspace-drawer-inner, .mobile-drawer");
}

function scorePlgDashboardLeaf(app, leaf) {
  if (!leaf) return -Infinity;
  let score = 0;
  if (!isPlgWorkspaceSidebarLeaf(app, leaf)) score += 1e6;
  const host = leaf.containerEl?.closest(".workspace-leaf");
  const rect = host?.getBoundingClientRect?.();
  if (rect) score += Math.min(rect.width * rect.height, 5e5);
  return score;
}

function pickPlainLedgerLeaf(app) {
  const leaves = app.workspace.getLeavesOfType(VIEW_TYPE);
  if (!leaves.length) return null;
  let best = leaves[0];
  let bestScore = scorePlgDashboardLeaf(app, best);
  for (let i = 1; i < leaves.length; i++) {
    const s = scorePlgDashboardLeaf(app, leaves[i]);
    if (s > bestScore) {
      best = leaves[i];
      bestScore = s;
    }
  }
  return best;
}

function dedupePlainLedgerLeaves(app, keep) {
  app.workspace.getLeavesOfType(VIEW_TYPE).forEach((leaf) => {
    if (leaf === keep) return;
    try { leaf.detach(); } catch (_) { /* ignore */ }
  });
}

// ─── Plugin ────────────────────────────────────────────────────────────────────

module.exports = class PlainLedgerPlugin extends Plugin {
  async onload() {
    try {
      await this._onloadSafe();
    } catch (err) {
      console.error("[PlainLedger] onload failed:", err);
      try {
        new Notice(`PlainLedger 加载失败：${err && err.message ? err.message : err}`);
      } catch (_) { /* ignore */ }
      throw err;
    }
  }

  async _onloadSafe() {
    // 协议尽早挂上：Obsidian 冷启动时 deep link 可能先于 settings/store 就绪
    this._deepLinkReady = false;
    this._pendingDeepLink = null;
    try {
      this.registerObsidianProtocolHandler("plainledger", async (params) => {
        const action = String(params?.action || params?.a || "capture").toLowerCase();
        if (!this._deepLinkReady) {
          this._pendingDeepLink = action;
          return;
        }
        await this.handlePlainLedgerDeepLink(action);
      });
    } catch (err) {
      console.warn("[PlainLedger] protocol handler:", err);
    }

    await this.loadSettings();
    this.store = new LedgerStore(this);
    try {
      await this.store.load();
    } catch (err) {
      console.error("[PlainLedger] store.load:", err);
      this.store.data = {
        version: 1,
        ledger: "默认账本",
        categories: [],
        transactions: [],
        recurring: [],
        subscriptions: [],
      };
    }
    if (typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "public") {
      try {
        await this.store.ensurePublicEditionDefaults();
      } catch (err) {
        console.warn("[PlainLedger] ensurePublicEditionDefaults:", err);
      }
    }

    this._deepLinkReady = true;
    if (this._pendingDeepLink) {
      const pending = this._pendingDeepLink;
      this._pendingDeepLink = null;
      void this.handlePlainLedgerDeepLink(pending);
    }

    this.registerInterval(window.setInterval(async () => {
      try {
        const n = await this.store.processDueRecurring();
        const m = await this.store.processDueSubscriptions();
        if (n > 0 || m > 0) this.refreshView();
      } catch (err) {
        console.warn("[PlainLedger] due jobs:", err);
      }
    }, 3600000));

    this.registerView(VIEW_TYPE, (leaf) => new LedgerDashboardView(leaf, this));

    // 与 4.0.3 一致：使用 Obsidian 内置 wallet，不覆盖自定义 SVG
    try {
      this.addRibbonIcon(ICON_NAME, "打开 PlainLedger", () => this.openDashboard());
    } catch (err) {
      console.warn("[PlainLedger] ribbon icon:", err);
      try {
        this.addRibbonIcon("wallet", "打开 PlainLedger", () => this.openDashboard());
      } catch (_) {
        try { this.addRibbonIcon("dice", "打开 PlainLedger", () => this.openDashboard()); } catch (__) { /* ignore */ }
      }
    }

    this.addCommand({
      id: "open-dashboard",
      name: "打开 PlainLedger 面板",
      callback: () => this.openDashboard(),
    });
    this.addCommand({
      id: "add-transaction",
      name: "记一笔",
      callback: () => {
        if (!requirePlainLedgerAccess(this)) return;
        this.openCaptureModal();
      },
    });
    this.addCommand({
      id: "open-ios-capture",
      name: "打开 PlainLedger 记一笔（快捷指令）",
      callback: () => {
        if (!requirePlainLedgerAccess(this)) return;
        this.openCaptureModal("smart");
      },
    });
    this.addCommand({
      id: "import-ledger",
      name: "导入账单",
      callback: () => {
        if (!requirePlainLedgerAccess(this)) return;
        new ImportFileModal(this.app, this, () => this.refreshView()).open();
      },
    });

    this.plainLedgerSettingTab = new PlainLedgerSettingTab(this.app, this);
    this.addSettingTab(this.plainLedgerSettingTab);

    this.addCommand({ id: "open-update-notice", name: "打开 PlainLedger 更新日志", callback: () => this.showUpdateNotice(true) });

    this.app.workspace.onLayoutReady(() => {
      checkTrialExpiryReminders(this);
      maybeShowLifeOsSuitePrompt(this.app, this.manifest.id, this.manifest.name);
      const isPersonal = typeof PLUGIN_EDITION === "string" && PLUGIN_EDITION === "personal";
      const txCount = this.store?.data?.transactions?.length || 0;
      if (isPersonal && !this.settings.onboardingComplete && txCount === 0 && !isLicenseRequired()) {
        window.setTimeout(() => {
          openOnboardingOverlay(this.app, this, () => this.refreshView(true));
        }, 400);
      }
    });

    this.registerSyncWatchers();
  }

  async handlePlainLedgerDeepLink(action) {
    const a = String(action || "capture").toLowerCase();
    if (a === "open" || a === "dashboard" || a === "panel") {
      await this.openDashboard();
      return;
    }
    // capture / add / smart / 默认：记一笔
    if (!requirePlainLedgerAccess(this)) return;
    this.openCaptureModal("smart");
  }

  async syncFromExternalSources(manual = false) {
    let changed = false;
    let ledgerChanged = false;
    const prevBudget = this.settings?.monthlyBudget;
    const prevSettingsJson = JSON.stringify(this.settings || {});
    try {
      await this.loadSettings();
      if (JSON.stringify(this.settings) !== prevSettingsJson) changed = true;
      if (this.settings.monthlyBudget !== prevBudget) changed = true;
    } catch (e) {
      console.warn("[PlainLedger] reload settings", e);
    }
    try {
      if (await this.store.reloadIfNewer()) {
        changed = true;
        ledgerChanged = true;
      }
    } catch (e) {
      console.warn("[PlainLedger] sync ledger", e);
    }
    if (ledgerChanged) {
      try {
        if (await this.store.processCarryovers()) changed = true;
      } catch (e) {
        console.warn("[PlainLedger] carryover", e);
      }
    }
    if (this._pendingSyncConflict) {
      const c = this._pendingSyncConflict;
      delete this._pendingSyncConflict;
      if (c.stale) {
        new Notice("检测到库内账本文件版本较旧，已保留你刚保存的数据");
      } else {
        new Notice(`检测到其他设备更新了账本（${c.remoteCount} 笔），已加载库内最新版本`);
      }
    }
    if (changed || manual) {
      this._lastSyncCheckedAt = Date.now();
    }
    if (changed) this.refreshView(true);
    refreshPlainLedgerHomeCache(this);
  }

  registerSyncWatchers() {
    this._syncTimer = null;
    const scheduleSync = () => {
      if (this._syncTimer) window.clearTimeout(this._syncTimer);
      this._syncTimer = window.setTimeout(() => this.syncFromExternalSources(false), 450);
    };

    const ledgerPath = () => this.store.filePath();
    const pluginDataPath = () => normalizePath(`.obsidian/plugins/${this.manifest.id}/data.json`);
    const isSyncPath = (p) => p === ledgerPath() || p === pluginDataPath();

    this.registerEvent(this.app.vault.on("modify", (file) => {
      if (isSyncPath(file?.path)) scheduleSync();
    }));
    this.registerEvent(this.app.vault.on("create", (file) => {
      if (isSyncPath(file?.path)) scheduleSync();
    }));

    this.registerDomEvent(document, "visibilitychange", () => {
      if (document.visibilityState === "visible") {
        scheduleSync();
        void (async () => {
          try {
            await this.store.processDueRecurring();
            await this.store.processDueSubscriptions();
          } catch (e) {
            console.warn("[PlainLedger] visibility due", e);
          }
        })();
      }
    });
    this.registerDomEvent(window, "focus", scheduleSync);

    this.registerInterval(window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (!this.app.workspace.getLeavesOfType(VIEW_TYPE).length) return;
      scheduleSync();
    }, 30000));
  }

  async onunload() {
    try {
      await this.store?.flushPendingSave?.();
    } catch {
      /* ignore */
    }
    // 与纪念日一致：禁用时勿同步 detach leaf（手机端易卡/报无法禁用）
    try {
      document.getElementById(LIFEOS_UI_STYLE_ID)?.remove();
      document.getElementById("lifeos-ui-shared-styles-v8")?.remove();
    } catch {
      /* ignore */
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.settings.uiState = Object.assign({}, DEFAULT_SETTINGS.uiState, this.settings.uiState || {});
    this.settings.navIcons = normalizeNavIcons(this.settings.navIcons);
    if (typeof syncLicenseState === "function") syncLicenseState(this.app, this.settings);
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  refreshView(forceFull = false) {
    this.app.workspace.getLeavesOfType(VIEW_TYPE).forEach((leaf) => {
      const v = leaf.view;
      if (!(v instanceof LedgerDashboardView)) return;
      if (!forceFull && v.tab === "home" && v.refreshHomeBillList()) return;
      v.render();
    });
  }

  openCaptureModal(mode = "smart", initialPreview = null) {
    if (!requirePlainLedgerAccess(this)) return;
    openCapturePanel(this, { mode, initialPreview });
  }

  openDashboardSettings(focusOpts) {
    if (focusOpts) {
      this._settingsFocus = focusOpts;
      this.pendingSettingsTab = resolvePlgSettingsTabFromFocus(focusOpts);
    }
    this.app.setting.open();
    this.app.setting.openTabById(this.manifest.id);
  }

  maybeShowUpdateNotice() {
    showUpdateNoticeModal(this.app, this);
  }

  showUpdateNotice(force = false) {
    showUpdateNoticeModal(this.app, this, { force });
  }

  showUpdateNoticeForce() {
    this.showUpdateNotice(true);
  }

  async onLicenseActivated() {
    const isPublic = typeof PLUGIN_EDITION === "string" && (PLUGIN_EDITION === "public" || PLUGIN_EDITION === "trial24h");
    if (isPublic) {
      await this.store.ensurePublicEditionDefaults();
      this.settings.onboardingComplete = true;
      this.settings.onboardingChoice = "sample";
      this.settings.initialized = true;
      this.settings.uiState = this.settings.uiState || {};
      this.settings.uiState.settingsSections = this.settings.uiState.settingsSections || {};
      this.settings.uiState.settingsSections.categories = true;
      this._settingsFocus = { section: "categories" };
      this.pendingSettingsTab = "categories";
      await this.saveSettings();
      const cats = this.store.data.categories?.length || 0;
      const subs = (this.store.data.categories || []).reduce((n, c) => n + (c.subcategories?.length || 0), 0);
      new Notice(`已加载 ${cats} 类 · ${subs} 二级分类，请在设置 → 分类 查看`);
    } else {
      const txCount = this.store?.data?.transactions?.length || 0;
      if (txCount === 0) {
        await this.store.importBundledDefault(true);
        this.settings.onboardingComplete = true;
        this.settings.onboardingChoice = "sample";
        this.settings.initialized = true;
        await this.saveSettings();
      }
    }
    this.refreshView(true);
  }

  openPluginSettings(focusOpts = null) {
    this.openDashboardSettings(focusOpts);
  }

  async openDashboard(opts = {}) {
    const { workspace } = this.app;
    const mobile = Platform.isMobile;

    let leaf = pickPlainLedgerLeaf(this.app);
    if (leaf) dedupePlainLedgerLeaves(this.app, leaf);

    if (!leaf) {
      if (mobile) {
        leaf = workspace.getLeaf("tab");
      } else {
        const right = workspace.getRightLeaf(false);
        leaf = right || workspace.getLeaf(true);
      }
      await leaf.setViewState({ type: VIEW_TYPE, active: true });
    } else if (mobile && isPlgWorkspaceSidebarLeaf(this.app, leaf)) {
      const main = workspace.getLeavesOfType(VIEW_TYPE)
        .find((l) => l !== leaf && !isPlgWorkspaceSidebarLeaf(this.app, l));
      if (main) {
        try { leaf.detach(); } catch (_) { /* ignore */ }
        leaf = main;
      }
    }

    await workspace.revealLeaf(leaf);

    if (isTrialEdition() && !this.settings.trialWelcomeSeen && !this.settings.licenseActivated) {
      maybeShowTrialWelcomeModal(this);
    }

    const view = leaf.view;
    if (view instanceof LedgerDashboardView) {
      const preserveTab = opts.landing === "preserve" || opts.preserveTab === true;
      if (!preserveTab && (mobile || opts.landing === "home")) {
        view.tab = "home";
        view.homeSubview = "list";
        await persistDashboardUiState(this, view);
        await view.render();
      }
    }
  }
};
