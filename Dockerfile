FROM debian

RUN apt-get -y update && apt-get install -y build-essential \
		wget && \
	\
	mkdir /usr/local/nvm && \
	\
	wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh \
		| PROFILE=/etc/profile NVM_DIR=/usr/local/nvm sh && \
	\
	useradd -M -r TOM && \
	mkdir -p /src/TOM

COPY . /src/

RUN . /etc/profile && \
	cd /src && \
	nvm install && \
    npm run build-client && \
	mkdir /opt/server && \
	mkdir /opt/client && \
	cp -r .nvmrc node_modules src/server/* /opt/server && \
	cp -r .nvmrc node_modules build/client/* /opt/client && \
	npm prune --production && \
	cp runClientServer.sh /bin/runClientServer && \
	chmod a+x /bin/runClientServer && \
	cd /opt/server && \
	rm -rf /src && \
	apt-get clean && \
	apt-get purge --auto-remove -y build-essential wget

USER TOM
EXPOSE 3000

CMD . /etc/profile && \
	cd /opt/server && \
	nvm use && \
	node server.js
