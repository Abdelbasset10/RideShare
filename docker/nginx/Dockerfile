
# Use an official Nginx image as a parent image
FROM nginx 

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration file
COPY ./site.conf /etc/nginx/conf.d/default.conf

# Copy static files from the client and admin services
COPY --from=client /usr/src/app/build /var/www/front-client
COPY --from=admin /usr/src/app/build /var/www/front-admin
#COPY --from=back /usr/src/app/build /var/www/back-api

# Expose port 80
EXPOSE 80

# The default command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]